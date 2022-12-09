import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import Button from '../../components/elements/Button';
import Modal from '../../components/elements/Modal';
import FormKendaraan from '../../components/forms/FormKendaraan';
import ListKendaraan from '../../components/fragments/ListKendaraan';
import { UserContext } from '../../context/UserContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [modalTambahKendaraan, setModalTambahKendaraan] = useState(false);
  const [modalPilih, setModalPilih] = useState(false);

  const kendaraan = [];

  const logout = () => {
    setUser(null);
    navigate('/');
  }

  return (
    <section className={style.root}>
      <div className={style.header}>
        <div>
          <p>Hi, {user?.name}!</p>
          {kendaraan?.length === 0 ? (
            <div className={style.change}>
              <p>D 1616 AB - Avanza</p>
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
      <Modal
        show={modalTambahKendaraan} 
        title="Tambah Kendaraan"
        onClose={()=>setModalTambahKendaraan(false)}
      >
        <FormKendaraan handleSubmitForm={()=>setModalTambahKendaraan(false)}/>
      </Modal>
      <Modal
        show={modalPilih} 
        title="Pilih Kendaraan"
        onClose={()=>setModalPilih(false)}
      >
        <ListKendaraan
          handleChoose={()=>setModalPilih(false)}
          handleAddVehicle={()=>{
            setModalPilih(false);
            setModalTambahKendaraan(true);
          }}
        />
      </Modal>
    </section>
  )
}
