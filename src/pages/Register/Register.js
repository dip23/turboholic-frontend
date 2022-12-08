import React from 'react';
import Button from '../../components/elements/Button';
import myPertamina from '../../assets/logo-mypertamina.svg';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import FormRegister from '../../components/forms/FormRegister';

export default function Register() {
  const navigate = useNavigate();

  const submitForm = () => {
    navigate('/login');
  }

  return (
    <section className={style.root}>
      <h1>Register</h1>
      <Button onClick={()=>navigate('/loginpertamina')}>
        <div>
          <p>Masuk dengan</p>
          <img alt='mypertamina' src={myPertamina}/>
        </div>
      </Button>
      <FormRegister handleSubmitForm={submitForm}/>
    </section>
  )
}
