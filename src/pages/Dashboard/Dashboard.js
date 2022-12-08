import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className={style.root}>
      <div>
        <p>Hi, User!</p>
        <FontAwesomeIcon onClick={()=>navigate('/')} icon={faSignOut}/>
      </div>
    </section>
  )
}
