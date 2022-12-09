import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faAdd } from '@fortawesome/free-solid-svg-icons';
import style from './styles.module.css';

export default function ListKendaraan(props) {
  const { handleChoose, handleAddVehicle } = props;

  const vehicleList = [
    {vehicleBrand: 'Avanza', plateNum: 'D1616AB'},
    {vehicleBrand: 'Kia Picanto', plateNum: 'D1616AB'},
    {vehicleBrand: 'Kijang', plateNum: 'D1616AB'},
  ];

  return (
    <div className={style.root}>
      {vehicleList && vehicleList.map((i,idx)=>(
        <div onClick={handleChoose} key={idx}>
          <div>
            <FontAwesomeIcon icon={faCar}/>
          </div>
          <p>{i.plateNum}</p>
          <p>{i.vehicleBrand}</p>
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
