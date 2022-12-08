import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import Text from '../../fields/Text';
import style from './styles.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './validation';

export default function FormRegister({
  handleSubmitForm,
  isLoading,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) });

  const inputProps = [
    {type: "text", placeholder: "cth. Budi"},
    {type: "email", placeholder: "cth. test@email.com"},
    {type: "text", placeholder: "0821xxxxxxxx", maxLength: 13},
    {type: "password", placeholder: "******"},
    {type: "password", placeholder: "******"},
  ];

  const buttonProps = {
    type: "submit",
    disabled: isLoading
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={style.root}>
      <Text
        label="Nama"
        name="name"
        inputProps={inputProps[0]}
        register={register}
        error={errors?.name?.message}
      />
      <Text
        label="Email"
        name="email"
        inputProps={inputProps[1]}
        register={register}
        error={errors?.email?.message}
      />
      <Text
        label="No. Hp"
        name="phone"
        inputProps={inputProps[2]}
        register={register}
        error={errors?.phone?.message}
      />
      <Text
        label="Password"
        name="password"
        inputProps={inputProps[3]}
        register={register}
        error={errors?.password?.message}
      />
      <Text
        label="Confirm Password"
        name="secpass"
        inputProps={inputProps[4]}
        register={register}
        error={errors?.secpass?.message}
      />
      <Button 
        className={style.loginButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Daftar"}</Button>
    </form>
  )
}
