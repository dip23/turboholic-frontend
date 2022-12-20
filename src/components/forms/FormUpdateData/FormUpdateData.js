import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import Text from '../../fields/Text';
import style from './styles.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../../fields/Select';
import vehicle from '../../../api/Vehicle';
import { UserContext } from '../../../context/UserContext';
import { addCommas, removeNonNumeric } from '../../../utils/normalize';
// import { loginSchema } from './validation';

export default function FormUpdateData({
  handleSubmitForm,
  isLoading,
  engineId,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [fuelType, setFuelType] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState({});
  const [value, setValue] = useState({
    fuelAmount: 0,
    odoNum: ''
  });
  const { user } = useContext(UserContext);

  const fuelData = async (id) => {
    const res = await vehicle.getFuelById(id, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setFuelType(res.data.content.fuelType);
    setValue({...value, fuelAmount: addCommas(res.data.content.fuelType[0].price)})
  }

  useEffect(() => {
    if(engineId){
      fuelData(engineId)
    }
  }, [engineId])

  const handleSeparator = (e) => {
    setValue({
      ...value,
      odoNum: addCommas(removeNonNumeric(e.target.value))
    })
  }

  const convertRupiah = (e) => {
    setValue({
      ...value,
      fuelAmount: addCommas(e.target.value * selectedFuelType?.price)
    })
  }

  const inputProps = [
    {type: "number", placeholder: "1"},
    {type: "number", placeholder: "11", onChange: convertRupiah},
    {type: "date", placeholder: "DD/MM/YYY"},
    {type: "text", placeholder: "100.000", maxLength: 7, value: value?.odoNum, onChange: handleSeparator},
  ];

  const buttonProps = {
    type: "submit",
    disabled: isLoading
  };

  const changeFuelType = (e) => {
    const val = fuelType.find(item => item.id === Number(e.target.value))
    setValue({...value, fuelAmount: addCommas(val.price)})
    setSelectedFuelType(val);
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={style.root}>
      <Select
        label="Jenis BBM"
        name="fuelType"
        register={register}
        error={errors?.fuelType?.message}
        options={fuelType}
        displayValue={"name"}
        onChange={changeFuelType}
      />
      <div className={style.formGroup}>
        <Text
          additionalDesc="Bar"
          className={style.smallInput}
          label="Sebelum Pengisian"
          name="startGauge"
          inputProps={inputProps[0]}
          register={register}
          error={errors?.startGauge?.message}
        />
        <Text
          additionalDesc="Bar"
          className={style.smallInput}
          label="Setelah Pengisian"
          name="newGauge"
          inputProps={inputProps[0]}
          register={register}
          error={errors?.newGauge?.message}
        />
        <Text
          additionalDesc={`= Rp${value.fuelAmount}`}
          className={style.smallInput}
          label="Jumlah Pengisian (liter)"
          name="fuelAmount"
          inputProps={inputProps[1]}
          register={register}
          error={errors?.fuelAmount?.message}
        />
        <Text
          label="Tanggal Pembelian"
          name="buyDate"
          inputProps={inputProps[2]}
          register={register}
          error={errors?.buyDate?.message}
        />
        <Text
          label="Angka Odometer"
          name="odoNum"
          inputProps={inputProps[3]}
          register={register}
          error={errors?.odoNum?.message}
        />
        <Text
          label="Tanggal Update"
          name="odoDate"
          inputProps={inputProps[2]}
          register={register}
          error={errors?.odoDate?.message}
        />
      </div>
      <Button 
        className={style.submitButton} 
        buttonProps={buttonProps}
      >{isLoading ? "Loading..." : "Update Data"}</Button>
    </form>
  )
}
