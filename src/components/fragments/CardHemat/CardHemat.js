import React from 'react';
import style from './styles.module.css';

export default function CardHemat() {
  return (
    <div className={style.root}>
      <p>Anda Sudah Menghemat</p>
      <div>
        <p>100 L</p>
        <div>
          <p>Senilai</p>
          <p>Rp1.390.000</p>
        </div>
      </div>
    </div>
  )
}
