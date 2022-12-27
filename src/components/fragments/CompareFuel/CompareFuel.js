import React, { useContext, useEffect, useState } from 'react';
import style from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/UserContext';
import dashboard from '../../../api/Dashboard';
import { addCommas } from '../../../utils/normalize';
import Loader from '../../elements/Loader';

export default function CompareFuel({engineType, vehicleId}) {
  const [dataCompare, setDataCompare] = useState(null);
  const [dataImage, setDataImage] = useState([]);
  const { user } = useContext(UserContext);

  
  useEffect(() => {
    let dataFuel = ['pertamaxturbo', 'pertamax'];
    let dataDiesel = ['dex', 'dexlite'];

    if(engineType === 1){
      setDataImage(dataDiesel)
    }else{
      setDataImage(dataFuel)
    }
  }, [engineType])
  

  const fetchData = async () => {
    const res = await dashboard.getSummary(vehicleId, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setDataCompare(res.data.content);
  }

  useEffect(() => {
    fetchData()
  }, [])
    

  return (
    <div className={style.root}>
      {dataCompare ? dataCompare?.map((i,idx)=>{
        if(idx < 2){
          return (
            <div className={style.compareCard} key={idx}>
              <div className={style.coloredBox}>
                <img alt='logo' src={`/img/logo-${dataImage[idx]}.svg`} />
              </div>
              <CompareItem title={'Konsumsi BBM'} value={`${Math.round(i.currentFuelUsage * 100)/100 || 0} Km/L`}/>
              <CompareItem title={'Total Jarak'} value={`${Math.round(i.totalDistance * 100)/100 || 0} Km`}/>
              <CompareItem title={'Penghematan'} value={`${Math.round(i.fuelSavingsLiter * 100)/100 || 0} Liter`}/>
              <div>
                <FontAwesomeIcon icon={faArrowsUpDown} />
                <p>Rp{addCommas(i.fuelSavingRupiah || 0)}</p>
              </div>
            </div>
          );
        }
        return null
      }) : (<Loader/>)}
    </div>
  )
}

export function CompareItem({title, value}) {
  return (
    <div className={style.itemCompare}>
      <p>{title}</p>
      <div>
        <p>{value}</p>
      </div>
    </div>
  )
}
