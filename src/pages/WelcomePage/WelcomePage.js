import React from 'react';
import SectionAbout from '../../components/fragments/SectionAbout/SectionAbout';
import SectionHero from '../../components/fragments/SectionHero';
import SectionTesti from '../../components/fragments/SectionTesti';
import style from './styles.module.css';

export default function WelcomePage() {
  return (
    <div className={style.root}>
      <SectionHero/>
      <SectionAbout/>
      <SectionTesti/>
    </div>
  )
}
