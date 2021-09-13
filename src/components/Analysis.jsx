import React from 'react';
import classes from '../styles/Analysis.module.css';
import Question from './Question';

export default function Analysis({ correct, noq, answers }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <h4>
        You answerd {correct} out of {noq} questions correctly
      </h4>
      {answers?.map((question, index) => (
        <Question key={index} question={question} />
      ))}
    </div>
  );
}
