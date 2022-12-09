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
    error,
    additionalDesc
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <div>
        <input {...inputProps} disabled={disabled} {...register(name)} />
        {additionalDesc && <p>{additionalDesc}</p>}
      </div>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}