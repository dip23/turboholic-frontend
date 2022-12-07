import React from 'react';
import Button from '../../components/elements/Button';
import myPertamina from '../../assets/logo-mypertamina.svg';
import FormLogin from '../../components/forms/FormLogin';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';

export default function Login() {
  const navigate = useNavigate();

  const submitForm = () => {
    navigate('/dashboard');
  }

  return (
    <section className={style.root}>
      <h1>Sign In</h1>
      <Button>
        <div>
          <p>Masuk dengan</p>
          <img alt='mypertamina' src={myPertamina}/>
        </div>
      </Button>
      <FormLogin handleSubmitForm={submitForm}/>
    </section>
  )
}
