import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import Button from '../../components/elements/Button';
import Modal from '../../components/elements/Modal';
import FormKendaraan from '../../components/forms/FormKendaraan';
import ListKendaraan from '../../components/fragments/ListKendaraan';
import { UserContext } from '../../context/UserContext';
import vehicle from '../../api/Vehicle';
import Alert from '../../components/elements/Alert';
import axios from 'axios';
import CardHemat from '../../components/fragments/CardHemat';
import CardSummary from '../../components/fragments/CardSummary';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [modalTambahKendaraan, setModalTambahKendaraan] = useState(false);
  const [modalPilih, setModalPilih] = useState(false);
  const [kendaraan, setKendaraan] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({});

  console.log(user);
  
  const fetchData = async () => {
    const res = await vehicle.getAllVehicle({
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setKendaraan(res.data.content.vehicles)
  }

  useEffect(() => {
    fetchData();
  }, [])

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
    setModalPilih(false)
  }

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
      <CardHemat/>
      <CardSummary/>
      <Button>Update Data Pengisian</Button>
      <Button>Update Tanggal Service</Button>
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
    </section>
  )
}
