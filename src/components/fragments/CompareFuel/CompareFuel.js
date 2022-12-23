import React, { useContext, useEffect } from 'react';
import style from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../context/UserContext';
import dashboard from '../../../api/Dashboard';

export default function CompareFuel({engineType, vehicleId}) {
  const { user } = useContext(UserContext);
  const dummyData = [
    {image: 'pertamax', bbmConsumption: 14.6, rangeTotal: 100, summary: 100, summaryRupiah: 100000},
    {image: 'pertamaxturbo', bbmConsumption: 14.6, rangeTotal: 100, summary: 100, summaryRupiah: 100000},
  ];

  const fetchData = async () => {
    const res = await dashboard.getSummary(vehicleId, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    console.log(res)
  }

  useEffect(() => {
    fetchData()
  }, [])
    

  return (
    <div className={style.root}>
      {dummyData && dummyData.map((i,idx)=>(
        <div key={idx}>
          <div className={style.coloredBox}>
            <img alt='logo' src={`/img/logo-${i.image}.svg`} />
          </div>
          <CompareItem title={'Konsumsi BBM'} value={`${i.bbmConsumption} Km/L`}/>
          <CompareItem title={'Total Jarak'} value={`${i.rangeTotal} Km`}/>
          <CompareItem title={'Penghematan'} value={`${i.summary} Liter`}/>
          <div>
            <FontAwesomeIcon icon={faArrowsUpDown} />
            <p>Rp100.000</p>
          </div>
        </div>
      ))}
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
