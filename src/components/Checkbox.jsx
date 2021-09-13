import React from 'react';
import classes from '../styles/Checkbox.module.css';

export default function Checkbox({ className, children, ...rest }) {
  return (
    <label className={`${classes.checkbox} ${className}`}>
      <input type="checkbox" {...rest} />
      {children}
    </label>
  );
}
