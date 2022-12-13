import React from 'react';
import { addCommas } from '../../../utils/normalize';
import style from './styles.module.css';

export default function CardHemat({ fuelSavingData }) {
  console.log(fuelSavingData)

  return (
    <div className={style.root}>
      <p>Anda Sudah Menghemat</p>
      <div>
        <p>{fuelSavingData?.fuelSavingsLiter || '-'} L</p>
        <div>
          <p>Senilai</p>
          <p>Rp{addCommas(fuelSavingData?.fuelSavingRupiah || 0)}</p>
        </div>
      </div>
    </div>
  )
}
