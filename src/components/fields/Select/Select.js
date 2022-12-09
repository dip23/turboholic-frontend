import React from 'react';
import styles from './styles.module.css';

export default function Select(props) {
  const {
    label,
    inputProps,
    disabled,
    className,
    register,
    name,
    error,
    options,
    displayValue,
    onChange,
    selected
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <select
        {...register(name)}
        name={name}
        onChange={onChange}
        {...inputProps}
        disabled={disabled}
      >
        {options?.length > 0 && options.map((i, idx) => (
          <option
            key={idx}
            value={i.id}
            selected={selected === i.id}
          >
            {i[displayValue]}
          </option>
        ))}
      </select>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}