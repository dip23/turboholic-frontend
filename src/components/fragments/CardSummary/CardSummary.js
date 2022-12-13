import React from 'react';
import style from './styles.module.css';

export default function CardSummary(props) {
  const {
    currentFuelUsage,
    totalDistance,
  } = props;

  return (
    <div className={style.root}>
      <div>
        <p>Konsumsi BBM</p>
        <div>
          <p>{Math.round(currentFuelUsage) || '-'}</p>
          <p>Km/L</p>
        </div>
      </div>
      <div>
        <p>Total Jarak</p>
        <div>
          <p>{Math.round(totalDistance) || '-'}</p>
          <p>Km</p>
        </div>
      </div>
    </div>
  )
}
