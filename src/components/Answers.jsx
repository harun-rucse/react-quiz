import React, { Fragment } from 'react';
import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers({ options = [], input = true, handleChange }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              key={index}
              value={option.checked}
              checked={option.checked}
              onChange={(e) => handleChange(e, index)}
            >
              {option.title}
            </Checkbox>
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              key={index}
              defaultChecked={option.checked}
              disabled
            >
              {option.title}
            </Checkbox>
          )}
        </Fragment>
      ))}
    </div>
  );
}
