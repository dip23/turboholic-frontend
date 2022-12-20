import React from 'react';
import { addCommas } from '../../../utils/normalize';
import style from './styles.module.css';

export default function CardHemat({ fuelSavingData, fuelPrice }) {
  return (
    <div className={style.root}>
      <p>Anda Sudah Menghemat</p>
      <div>
        <p>{fuelSavingData?.fuelSavingsLiter || '0'} L</p>
        <div>
          <p>Senilai</p>
          <p>Rp{addCommas(fuelSavingData?.fuelSavingRupiah || 0)}</p>
        </div>
        <p>*Harga: Rp{addCommas(fuelPrice || 0)}</p>
      </div>
      {fuelSavingData?.fuelSavingsLiter < 0 && (
        <p>Penggunaan BBM anda 
          kurang efisien, simak artikel 
          <a href='https://mypertamina.id/cara-hemat-bbm-dalam-penggunaan-seharihari' target={'_blank'} rel="noreferrer"> berikut</a>
        </p>
      )}
    </div>
  )
}
