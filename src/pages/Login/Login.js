import React, { useContext, useState } from 'react';
import Button from '../../components/elements/Button';
import myPertamina from '../../assets/logo-mypertamina.svg';
import FormLogin from '../../components/forms/FormLogin';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import auth from '../../api/Auth';
import Alert from '../../components/elements/Alert';
import { UserContext } from '../../context/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState('');

  const submitForm = async (data) => {
    try {
      setLoading(true);
      const res = await auth.login(data);
      if(res.status === 200){
        console.log(res)
        setUser(res.data.content);
        setLoading(false);
        navigate('/dashboard');
      }
      console.log(res);
    } catch (error) {
      if(error.response.status === 401){
        setAlertMessage('username dan password tidak sesuai!')
      }
      setLoading(false);
    }
  };

  return (
    <section className={style.root}>
      <h1>Sign In</h1>
      {alertMessage && <Alert message={alertMessage}/>}
      <Button onClick={()=>navigate('/loginpertamina')}>
        <div>
          <p>Masuk dengan</p>
          <img alt='mypertamina' src={myPertamina}/>
        </div>
      </Button>
      <FormLogin handleSubmitForm={submitForm} isLoading={loading}/>
    </section>
  )
}
