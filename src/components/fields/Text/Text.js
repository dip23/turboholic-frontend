import React from 'react';
import styles from './styles.module.css';

export default function Text(props) {
  const {
    label,
    inputProps,
    disabled,
    className,
    register,
    name,
    error
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <input {...inputProps} disabled={disabled} {...register(name)} />
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}