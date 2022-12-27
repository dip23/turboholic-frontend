import React from "react";
import TurboHolic from "../../../assets/logo-turboholic.svg";
import { dataWinner } from "./dataWinner";
import style from './styles.module.css';

export default function SectionAbout() {
  const shortName = (name) => {
    const split = name.split(' ');
    const second = split[1] ? ` ${split[1].substring(0,1)}.` : '';
    return `${split[0]}${second}`;
  }

  return (
    <section className={style.root}>
      <section className={style.about}>
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
      <section className={style.rank}>
        <h1>Ranking Turbo<span>Holic</span></h1>
        <hr />
        <div className={style.primaryWinner}>
          <div className={style.winner}>
            <p>Rank 2</p>
            <img src={dataWinner[1].photo} alt="runnerup"/>
            <p title={dataWinner[1].name}>{shortName(dataWinner[1].name)}</p>
            {/* <p title={dataWinner[1].job}>{dataWinner[1].job}</p> */}
          </div>
          <div className={style.winner}>
            <p>Rank 1</p>
            <img src={dataWinner[0].photo} alt="first"/>
            <p>{shortName(dataWinner[0].name)}</p>
            <p>{dataWinner[0].job}</p>
          </div>
          <div className={style.winner}>
            <p>Rank 3</p>
            <img src={dataWinner[2].photo} alt="third"/>
            <p>{shortName(dataWinner[2].name)}</p>
            <p>{dataWinner[2].job}</p>
          </div>
        </div>
        <div className={style.winnerList}>
          <div>
            {dataWinner.map((i,idx) => {
              if(idx > 2 && idx < 7){
                return (
                  <p>{idx+1}. {i.name}</p>
                );
              }
              return null
            })}
          </div>
          <div>
            {dataWinner.map((i,idx) => {
              if(idx > 6){
                return (
                  <p>{idx+1}. {i.name}</p>
                );
              }
              return null
            })}
          </div>
        </div>
      </section>
    </section>
  );
}
