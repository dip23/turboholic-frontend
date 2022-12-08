import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from './styles.module.css';

export default function SectionProduct() {
  const image = ['patraniaga', 'pertamax', 'pertamaxturbo', 'dexlite', 'dex'];

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
        {image && image.map((el, idx) => (
          <div className={style.logo} key={idx}>
            <img alt='logo' src={process.env.PUBLIC_URL + `/img/logo-${el}.svg`}/>
          </div>
        ))}
      </Slider>
    </section>
  )
}
