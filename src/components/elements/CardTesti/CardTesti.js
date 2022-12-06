import React from 'react';
import style from './styles.module.css';

export default function CardTesti(props) {
  const {
    className,
    photo,
    name,
    jobTitle,
    desc
  } = props;

  const classes = [style.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div>
        <img alt="profile" src={photo}/>
        <div>
          <p>{name}</p>
          <p>{jobTitle}</p>
        </div>
      </div>
      <p>{desc}</p>
    </div>
  )
}
