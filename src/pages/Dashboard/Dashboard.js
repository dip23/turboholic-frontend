import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import Button from '../../components/elements/Button';
import Modal from '../../components/elements/Modal';
import FormKendaraan from '../../components/forms/FormKendaraan';
import ListKendaraan from '../../components/fragments/ListKendaraan';
import { UserContext } from '../../context/UserContext';
import vehicle from '../../api/Vehicle';
import Alert from '../../components/elements/Alert';
import CardHemat from '../../components/fragments/CardHemat';
import CardSummary from '../../components/fragments/CardSummary';
import Chart from '../../components/fragments/Chart';
import FormUpdateData from '../../components/forms/FormUpdateData';
import dashboard from '../../api/Dashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [modalTambahKendaraan, setModalTambahKendaraan] = useState(false);
  const [modalPilih, setModalPilih] = useState(false);
  const [kendaraan, setKendaraan] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [modalMaintenance, setModalMaintenance] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({});
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });
  
  const fetchData = async () => {
    const res = await vehicle.getAllVehicle({
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setKendaraan(res.data.content.vehicles)
  }

  const now = new Date();
  const firsDate = new Date(now.getFullYear(), now.getMonth(), 1);

  const fetchUpdate = async (fuelId) => {
    const res = await dashboard.getFuelUpdate(
      selectedVehicle?.id || kendaraan[0]?.id,
      fuelId || selectedVehicle?.initialFuelTypeId || kendaraan[0]?.initialFuelTypeId,
      dateFilter?.startDate || firsDate,
      dateFilter?.endDate || now,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
    });
    setDataDashboard(res.data.content);
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  useEffect(() => {
    if(kendaraan[0]){
      fetchUpdate();
    }
  }, [kendaraan, selectedVehicle, dateFilter])

  const {
    chartData,
    currentFuelUsage,
    totalDistance,
    fuelSavingsData,
    fuelPrice
  } = dataDashboard;

  const clearStorage = () => {
    return localStorage.removeItem('user');
  }

  const logout = () => {
    setUser(null);
    clearStorage();
    navigate('/');
  }

  const handleAddVehicle = async (data) => {
    const params = new URLSearchParams();
    params.append('licensePlate', data?.plateNum);
    params.append('brand', data?.vehicleBrand);
    params.append('engineTypeId', data?.engineType);
    params.append('initialFuelTypeId', data?.fuelType);
    params.append('maxFuelCapacity', data?.tankCapacity);
    params.append('maxFuelGauge', data?.barTotal);
    params.append('initialFuelGauge', data?.initialBar);
    params.append('initialOdometer', Number(data?.initialOdo.replace('.','')));

    try {
      setLoading(true);
      const res = await vehicle.addVehicle(params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${user?.token}`
        }
      });
      if(res.status === 200){
        setModalTambahKendaraan(false)
        setLoading(false);
        fetchData();
      }
    } catch (error) {
      if(error.response.status === 401){
        setAlertMessage('Periksa kembali data anda.')
      }
      setLoading(false)
    }
  };

  const submitUpdate = async (data) => {
    const dataOdo = Number(data?.odoNum.replace('.',''));
    console.log(typeof dataOdo);
    const params = new URLSearchParams();
    params.append('vehicleId', selectedVehicle?.id || kendaraan[0]?.id);
    params.append('fuelTypeId', data?.fuelType);
    params.append('fuelGaugeBefore', data?.startGauge);
    params.append('fuelGaugeAfter', data?.newGauge);
    params.append('refuelAmount', data?.fuelAmount);
    params.append('refuelDate', data?.buyDate);
    params.append('currentOdometer', dataOdo);

    try {
      setLoading(true);
      const res = await dashboard.addFuel(params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${user?.token}`
        }
      });
      if(res.status === 200){
        setUpdateData(false);
        setLoading(false);
        fetchUpdate();
      }
    } catch (error) {
      if(error.response.status === 401 || error.response.status === 400){
        setAlertMessage('Periksa kembali data anda.')
      }
      setLoading(false)
    }
  }

  const choosedVehicle = (e) =>{
    setSelectedVehicle(e);
    fetchUpdate();
    setModalPilih(false)
  }


  const changeFuel = (e) => {
    fetchUpdate(e);
  };

  const changeDate = (startDate, endDate) => {
    setDateFilter({
      startDate,
      endDate
    })
  };

  return (
    <section className={style.root}>
      <div className={style.header}>
        <div>
          <p>Hi, {user?.name}!</p>
          {kendaraan?.length !== 0 ? (
            <div className={style.change}>
              <p>{selectedVehicle?.licensePlate || kendaraan[0]?.licensePlate} 
                - {selectedVehicle?.brand || kendaraan[0]?.brand}</p>
              <Button onClick={()=>setModalPilih(true)}>Ganti</Button>
            </div>
          ) : (
            <div className={style.add}>
              <Button onClick={()=>setModalTambahKendaraan(true)}>Tambah Kendaraan</Button>
              <p>Tambahkan kendaraan untuk menggunakan aplikasi!</p>
            </div>
          )}
        </div>
        <FontAwesomeIcon onClick={logout} icon={faSignOut}/>
      </div>
      <CardHemat fuelSavingData={fuelSavingsData} fuelPrice={fuelPrice}/>
      <Chart 
        dataChart={chartData}
        engineId={selectedVehicle?.engineTypeId || kendaraan[0]?.engineTypeId}
        vehicleId={selectedVehicle?.id || kendaraan[0]?.id}
        fuelId={selectedVehicle?.initialFuelTypeId || kendaraan[0]?.initialFuelTypeId}
        handleChangeFuel={changeFuel}
        handleChangeDate={changeDate}
      />
      <CardSummary currentFuelUsage={currentFuelUsage} totalDistance={totalDistance} />
      <Button onClick={()=>setUpdateData(!updateData)}>
        <p>Update Data Pengisian</p>
        <FontAwesomeIcon icon={updateData ? faCaretUp : faCaretDown}/>
      </Button>
      {updateData && (
        <FormUpdateData
          handleSubmitForm={submitUpdate}
          engineId={selectedVehicle?.engineTypeId || kendaraan[0]?.engineTypeId}
          isLoading={loading}
        />
      )}
      <Button onClick={()=>setModalMaintenance(true)}>Update Tanggal Service</Button>
      <Modal
        show={modalTambahKendaraan} 
        title="Tambah Kendaraan"
        onClose={()=>setModalTambahKendaraan(false)}
      >
        {alertMessage && <Alert message={alertMessage}/>}
        <FormKendaraan handleSubmitForm={handleAddVehicle} isLoading={loading}/>
      </Modal>
      <Modal
        show={modalPilih} 
        title="Pilih Kendaraan"
        onClose={()=>setModalPilih(false)}
      >
        <ListKendaraan
          handleChoose={choosedVehicle}
          handleAddVehicle={()=>{
            setModalPilih(false);
            setModalTambahKendaraan(true);
          }}
          vehicleList={kendaraan}
        />
      </Modal>
      <Modal
        show={modalMaintenance}
        title="Coming Soon"
        onClose={()=>setModalMaintenance(false)}
      >
        <div className={style.modalMaintenance}>
          <img alt='maintenance' src={process.env.PUBLIC_URL + `/img/Robot.png`}/>
        </div>
      </Modal>
    </section>
  )
}
