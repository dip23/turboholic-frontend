import React from 'react'
import style from './styles.module.css';

export default function Button(props) {
  const {
    className,
    children,
    buttonProps,
    onClick
  } = props;

  const classes = [style.root, className].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
