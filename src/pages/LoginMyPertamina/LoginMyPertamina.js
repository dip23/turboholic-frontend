import React from 'react';
import myPertamina from '../../assets/logo-mypertamina.svg';
import FormLogin from '../../components/forms/FormLogin';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';

export default function LoginMyPertamina() {
  const navigate = useNavigate();

  const submitForm = () => {
    navigate('/dashboard');
  }

  return (
    <section className={style.root}>
      <div>
        <img alt='mypertamina' src={myPertamina}/>
      </div>
      <h1>Sign In</h1>
      <FormLogin handleSubmitForm={submitForm}/>
    </section>
  )
}
