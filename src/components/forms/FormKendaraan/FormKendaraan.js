import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import vehicle from '../../../api/Vehicle';
import Button from '../../elements/Button';
import Select from '../../fields/Select';
import Text from '../../fields/Text';
import style from './styles.module.css';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function FormKendaraan({handleSubmitForm, isLoading,}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [engineType, setEngineType] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [selectEngine, setSelectEngine] = useState(1);
  const [value, setValue] = useState(0);

  const engineData = async () => {
    const res = await vehicle.getAllEngine();
    setEngineType(res.data.content.engineType);
  };

  const fuelData = async (id) => {
    const res = await vehicle.getFuelById(id);
    setFuelType(res.data.content.fuelType);
  }

  useEffect(() => {
    engineData()
  }, []);

  useEffect(() => {
    fuelData(selectEngine)
  }, [selectEngine])
  
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleSeparator = (e) => {
    setValue(addCommas(removeNonNumeric(e.target.value)));
  }

  const inputProps = [
    {type: "text", placeholder: "D1231XX"},
    {type: "text", placeholder: "Avanza"},
    {type: "text", placeholder: "Diesel"},
    {type: "text", placeholder: "Pertamax"},
    {type: "number", placeholder: "11"},
    {type: "number", placeholder: "1"},
    {type: "number", placeholder: "1"},
    {type: "text", placeholder: "100.000", maxLength: 7},
  ];

  const buttonProps = {
    type: "submit",
    disabled: isLoading
  };

  const onChangeEngine = (e) => {
    setSelectEngine(e.target.value);
  };

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
        displayValue={"name"}
        onChange={onChangeEngine}
      />
      <Select
        label="Jenis BBM"
        name="fuelType"
        inputProps={inputProps[3]}
        register={register}
        error={errors?.fuelType?.message}
        options={fuelType}
        displayValue={"name"}
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
        inputProps={inputProps[7]}
        register={register}
        value={value}
        onChange={handleSeparator}
        error={errors?.initialOdo?.message}
      />
      <Button 
        className={style.submitButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Tambah"}</Button>
    </form>
  )
}
