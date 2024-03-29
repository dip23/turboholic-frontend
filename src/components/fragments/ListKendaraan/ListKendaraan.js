import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faAdd } from '@fortawesome/free-solid-svg-icons';
import style from './styles.module.css';

export default function ListKendaraan(props) {
  const { handleChoose, handleAddVehicle, vehicleList } = props;

  return (
    <div className={style.root}>
      {vehicleList && vehicleList.map((i,idx)=>(
        <div onClick={() => handleChoose(i)} key={idx}>
          <div>
            <FontAwesomeIcon icon={faCar}/>
          </div>
          <p>{i.licensePlate}</p>
          <p>{i.brand}</p>
        </div>
      ))}
      <div onClick={handleAddVehicle}>
        <div>
          <FontAwesomeIcon icon={faAdd}/>
        </div>
      </div>
    </div>
  )
}