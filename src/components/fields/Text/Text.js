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
    additionalDesc,
    onChange,
    value
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <div>
        <input {...register(name)} onChange={onChange} value={value} {...inputProps} disabled={disabled} />
        {additionalDesc && <p>{additionalDesc}</p>}
      </div>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}