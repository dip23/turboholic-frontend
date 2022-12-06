import React from "react";
import TurboHolic from "../../../assets/logo-turboholic.svg";
import style from './styles.module.css';

export default function SectionAbout() {
  return (
    <section className={style.root}>
      <h1>
        Apa itu
        <br />
        Turbo<span>Holic</span>?
      </h1>
      <hr />
      <img alt="turboholic" src={TurboHolic} />
      <p>
        Program <span>Turbo Holic</span> hadir sebagai apresiasi kepada pelanggan setia
        produk unggulan kami. Kami akan memberikan reward kepada konsumen produk
        Unggulan khususnya Pertamax Turbo, Dexlite, dan Pertamina Dex dan
        Pertamax khusus untuk Wilayah <span>Sales Area Retail Sibolga</span>.
      </p>
    </section>
  );
}
