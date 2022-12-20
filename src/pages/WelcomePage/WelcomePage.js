import React from 'react';
import SectionAbout from '../../components/fragments/SectionAbout/SectionAbout';
import SectionHero from '../../components/fragments/SectionHero';
import SectionProduct from '../../components/fragments/SectionProduct';
import SectionPromoteMyPertamina from '../../components/fragments/SectionPromoteMyPertamina';
import SectionTesti from '../../components/fragments/SectionTesti';
import style from './styles.module.css';

export default function WelcomePage() {
  return (
    <div className={style.root}>
      <SectionHero/>
      <SectionAbout/>
      <SectionTesti/>
      <SectionProduct/>
      <SectionPromoteMyPertamina/>
      <footer>Copyright © 2022 TurboHolic | Powered by [S.A_Sibolga]</footer>
    </div>
  )
}
