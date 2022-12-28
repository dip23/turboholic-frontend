import React, { useContext, useState } from 'react';
import myPertamina from '../../assets/logo-mypertamina.svg';
import FormLogin from '../../components/forms/FormLogin';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import { UserContext } from '../../context/UserContext';
import auth from '../../api/Auth';
import Alert from '../../components/elements/Alert';

export default function LoginMyPertamina() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState('');

  const submitForm = async (data) => {
    try {
      setLoading(true);
      const res = await auth.login(data);
      if(res.status === 200){
        setUser(res.data.content);
        setLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response.status === 401){
        setAlertMessage('username dan password tidak sesuai!')
      }
      setLoading(false);
    }
  };

  return (
    <section className={style.root}>
      <div>
        <img alt='mypertamina' src={myPertamina}/>
      </div>
      <h1>Sign In</h1>
      {alertMessage && <Alert message={alertMessage}/>}
      <FormLogin handleSubmitForm={submitForm} isLoading={loading}/>
    </section>
  )
}
