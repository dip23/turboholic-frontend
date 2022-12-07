import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import Text from '../../fields/Text';
import style from './styles.module.css';

export default function FormLogin({
  handleSubmitForm,
  isLoading,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const inputProps = [
    {type: "text", placeholder: "cth. test@email.com"},
    {type: "password", placeholder: "******"},
  ];

  const buttonProps = {
    type: "submit",
    disabled: isLoading
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={style.root}>
      <Text
        label="Email/Username"
        name="username"
        inputProps={inputProps[0]}
        register={register}
      />
      <Text
        label="Password"
        name="password"
        inputProps={inputProps[1]}
        register={register}
      />
      <Button 
        className={style.loginButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Masuk"}</Button>
    </form>
  )
}
