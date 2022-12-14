import React from 'react';
import { addCommas } from '../../../utils/normalize';
import style from './styles.module.css';

export default function CardHemat({ fuelSavingData, fuelPrice }) {
  return (
    <div className={style.root}>
      <p>Anda Sudah Menghemat</p>
      <div>
        <p>{Math.abs(fuelSavingData?.fuelSavingsLiter) || '0'} L</p>
        <div>
          <p>Senilai</p>
          <p>Rp{addCommas(Math.abs(fuelSavingData?.fuelSavingRupiah) || 0)}</p>
        </div>
        <p>*Harga: Rp{addCommas(fuelPrice || 0)}</p>
      </div>
    </div>
  )
}
