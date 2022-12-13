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
  
  const fetchData = async () => {
    const res = await vehicle.getAllVehicle({
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setKendaraan(res.data.content.vehicles)
  }

  const fetchUpdate = async (fuelId) => {
    const res = await dashboard.getFuelUpdate(
      selectedVehicle?.id || kendaraan[0]?.id,
      fuelId || selectedVehicle?.initialFuelTypeId || kendaraan[0]?.initialFuelTypeId,
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
  }, [kendaraan, selectedVehicle])

  const {
    chartData,
    currentFuelUsage,
    totalDistance,
    fuelSavingsData
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

  const choosedVehicle = (e) =>{
    setSelectedVehicle(e);
    fetchUpdate();
    setModalPilih(false)
  }

  const submitUpdate = (data) => {
    setUpdateData(false);
  }

  const changeFuel = (e) => {
    console.log(e)
    fetchUpdate(e);
  };

  console.log(chartData);

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
      <CardHemat fuelSavingData={fuelSavingsData}/>
      <Chart 
        dataChart={chartData}
        engineId={selectedVehicle?.engineTypeId || kendaraan[0]?.engineTypeId}
        vehicleId={selectedVehicle?.id || kendaraan[0]?.id}
        fuelId={selectedVehicle?.initialFuelTypeId || kendaraan[0]?.initialFuelTypeId}
        handleChangeFuel={changeFuel}
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
