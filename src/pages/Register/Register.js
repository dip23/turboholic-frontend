import React, { useState } from 'react';
import Button from '../../components/elements/Button';
import myPertamina from '../../assets/logo-mypertamina.svg';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import FormRegister from '../../components/forms/FormRegister';
import auth from '../../api/Auth';
import Alert from '../../components/elements/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitForm = async (data) => {
    const params = new URLSearchParams();
    params.append('email', data?.email);
    params.append('name', data?.name);
    params.append('password', data?.password);
    params.append('phone', data?.phone);

    try {
      setLoading(true);
      const res = await auth.register(params);
      if(res.status === 200){
        navigate('/login');
        setLoading(false);
      }
    } catch (error) {
      if(error.response.status === 401){
        setAlertMessage('Periksa kembali data anda.')
      }
      setLoading(false)
    }
  };

  return (
    <section className={style.root}>
      <h1>Register</h1>
      {alertMessage && <Alert message={alertMessage}/>}
      <Button onClick={()=>navigate('/loginpertamina')}>
        <div>
          <p>Masuk dengan</p>
          <img alt='mypertamina' src={myPertamina}/>
        </div>
      </Button>
      <FormRegister handleSubmitForm={submitForm} isLoading={loading}/>
    </section>
  )
}
