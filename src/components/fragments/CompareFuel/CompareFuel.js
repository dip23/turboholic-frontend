import React from 'react';
import style from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

export default function CompareFuel() {
  const dummyData = [
    {image: 'pertamax', bbmConsumption: 14.6, rangeTotal: 100, summary: 100, summaryRupiah: 100000},
    {image: 'pertamaxturbo', bbmConsumption: 14.6, rangeTotal: 100, summary: 100, summaryRupiah: 100000},
  ];

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
