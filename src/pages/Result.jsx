import _ from 'lodash';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Analysis from '../components//Analysis';
import Summary from '../components/Summary';
import useAnswers from '../hooks/useAnswers';

export default function Result() {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswers(id);

  function calculate() {
    let score = 0;
    let correct = 0;

    answers.forEach((question, index1) => {
      let correctIndexs = [],
        checkedIndexs = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexs.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexs.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexs, checkedIndexs)) {
        score = score + 5;
        correct = correct + 1;
      }
    });
    return { score, correct };
  }

  const { score, correct } = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      <Summary score={score} noq={answers.length} />
      <Analysis correct={correct} noq={answers.length} answers={answers} />
    </>
  );
}
