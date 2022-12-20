import React from 'react';
import style from './styles.module.css';

export default function SectionPromoteMyPertamina() {
  return (
    <section className={style.root}>
      <img alt='mypertamina' src='/img/logo-mypertamina-long.svg'/>
      <div>
        <div>
          <p><b>MyPertamina</b> adalah aplikasi yang mudah diakses dengan banyak keuntungan serta sarana pelanggan untuk mendapatkan point yang dapat ditukarkan dengan berbagai macam rewards melalui aplikasi.</p>
          <a target={'_blank'} href='https://play.google.com/store/apps/details?id=com.dafturn.mypertamina&hl=id&gl=US&pli=1' rel="noreferrer">
            <img alt='gplay' src='/img/googleplay-badge.svg'/>
          </a>
          <a target={'_blank'} href='https://apps.apple.com/id/app/mypertamina/id1295039064' rel="noreferrer">
            <img alt='appstore' src='/img/appstore-badge.svg'/>
          </a>
        </div>
        <img alt='mockup-phone' src='/img/MyPertamina-mockup.png'/>
      </div>
    </section>
  )
}
