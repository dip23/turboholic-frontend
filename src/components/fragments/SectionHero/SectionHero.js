import React from 'react';
import style from './styles.module.css';
import PertaminaLogo from '../../../assets/logo-pertamina.svg';
import Button from '../../elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function SectionHero() {
  const navigate = useNavigate();

  const clickRegist = () => {
    navigate('/register');
  }

  return (
    <section className={style.root}>
        <div>
            <img alt="pertamina-logo" src={PertaminaLogo}/>
        </div>
        <div><h1>Turbo<span>Holic.</span></h1></div>
        <div>
          <Button className={style.button} onClick={clickRegist}>Bergabung</Button>
          <Button className={style.button}>Masuk</Button>
        </div>
        <div>
          <p>See More</p>
          <FontAwesomeIcon icon={faAngleDown}/>
        </div>
    </section>
  )
}
