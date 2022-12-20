import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from './styles.module.css';
import { dataProduct } from './productData';

export default function SectionProduct() {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };
  
  return (
    <section className={style.root}>
      <h1>Our Product</h1>
      <Slider {...settings}>
        {dataProduct && dataProduct.map((el, idx) => (
          <div className={style.logo} key={idx}>
            <img alt='logo' src={process.env.PUBLIC_URL + `/img/logo-${el.image}.svg`}/>
            <p>{el.name}</p>
            <p>{el.desc}</p>
          </div>
        ))}
      </Slider>
      <div>
        <img alt='pertamina' src={process.env.PUBLIC_URL + `/img/logo-pertamina.svg`}/>
        <img alt='patraniaga' src={process.env.PUBLIC_URL + `/img/logo-patraniaga.svg`}/>
      </div>
    </section>
  )
}
