import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function Alert({ message, className }) {
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {message}
    </div>
  );
}

Alert.defaultProps = {
  className: '',
  message: '',
}

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
}


