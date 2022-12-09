import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import Select from '../../fields/Select';
import Text from '../../fields/Text';
import style from './styles.module.css';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function FormKendaraan({
  handleSubmitForm,
  isLoading,
}) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const inputProps = [
    {type: "text", placeholder: "D1231XX"},
    {type: "text", placeholder: "Avanza"},
    {type: "text", placeholder: "Diesel"},
    {type: "text", placeholder: "Pertamax"},
    {type: "number", placeholder: "11"},
    {type: "number", placeholder: "1"},
    {type: "number", placeholder: "1"},
    {type: "number", placeholder: "100.000"},
  ];

  const buttonProps = {
    type: "submit",
    disabled: isLoading
  };

  const engineType = [
    {id: 1, engine_type: "Bensin"},
    {id: 1, engine_type: "Diesel"},
  ];

  const fuelType = [
    {id: 1, fuel_type: "Pertamax"},
    {id: 2, fuel_type: "Pertamax Turbo"},
    {id: 3, fuel_type: "Pertalite"},
    {id: 4, fuel_type: "Dexlite"},
  ];

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={style.root}>
      <Text
        label="Plat Nomor"
        name="plateNum"
        inputProps={inputProps[0]}
        register={register}
        error={errors?.plateNum?.message}
      />
      <Text
        label="Tipe/Merk Kendaraan"
        name="vehicleBrand"
        inputProps={inputProps[1]}
        register={register}
        error={errors?.vehicleBrand?.message}
      />
      <Select
        label="Jenis Mesin"
        name="engineType"
        inputProps={inputProps[2]}
        register={register}
        error={errors?.engineType?.message}
        options={engineType}
        displayValue={"engine_type"}
      />
      <Select
        label="Jenis BBM"
        name="fuelType"
        inputProps={inputProps[3]}
        register={register}
        error={errors?.fuelType?.message}
        options={fuelType}
        displayValue={"fuel_type"}
      />
      <div className={style.fuelGroup}>
        <Text
          additionalDesc="Liter"
          label="Kapasitas Tangki"
          name="tankCapacity"
          inputProps={inputProps[4]}
          register={register}
          error={errors?.tankCapacity?.message}
        />
        <Text
          additionalDesc="Bar"
          label="Total Bar"
          name="barTotal"
          inputProps={inputProps[5]}
          register={register}
          error={errors?.barTotal?.message}
        />
      </div>
      <Text
        additionalDesc="Bar"
        label="Bar Bensin Saat ini"
        name="initialBar"
        inputProps={inputProps[6]}
        register={register}
        error={errors?.initialBar?.message}
      />
      <Text
        label="Angka Odometer"
        name="initialOdo"
        inputProps={inputProps[6]}
        register={register}
        error={errors?.initialOdo?.message}
      />
      <Button 
        className={style.submitButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Tambah"}</Button>
    </form>
  )
}
