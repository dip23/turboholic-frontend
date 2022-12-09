import React from 'react';
import style from './styles.module.css';

export default function CardSummary() {
  return (
    <div className={style.root}>
      <div>
        <p>Konsumsi BBM</p>
        <div>
          <p>14,6</p>
          <p>Km/L</p>
        </div>
      </div>
      <div>
        <p>Total Jarak</p>
        <div>
          <p>100</p>
          <p>Km/L</p>
        </div>
      </div>
    </div>
  )
}
