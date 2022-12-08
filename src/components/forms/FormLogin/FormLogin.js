import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import Text from '../../fields/Text';
import style from './styles.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './validation';

export default function FormLogin({
  handleSubmitForm,
  isLoading,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });

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
        error={errors?.username?.message}
      />
      <Text
        label="Password"
        name="password"
        inputProps={inputProps[1]}
        register={register}
        error={errors?.password?.message}
      />
      <Button 
        className={style.loginButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Masuk"}</Button>
    </form>
  )
}
