import React from 'react';
import CardTesti from '../../elements/CardTesti';
import style from './styles.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { dataTesti as data } from './dataTesti';

export default function SectionTesti() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className={style.root}>
      <h1>Apa Kata Konsumen</h1>
      <Slider {...settings}>
        {data && data.map((i,idx)=>(
          <CardTesti
            key={idx}
            className={style.card}
            photo={i.photo}
            name={i.name}
            jobTitle={i.job}
            desc={i.desc}
          />
        ))}
      </Slider>
      <iframe 
        src="https://www.youtube.com/embed/pBFV9kyglmk" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen></iframe>
    </section>
  )
}
