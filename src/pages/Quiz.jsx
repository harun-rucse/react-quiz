import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Answers from '../components/Answers';
import MiniPlayer from '../components/MiniPlayer';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import useQuestions from '../hooks/useQuestions';

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case 'questions':
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case 'answer':
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const history = useHistory();
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { loading, questions, error } = useQuestions(id);
  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  function nextQuestion() {
    if (questions.length > currentQuestion + 1) {
      setCurrentQuestion((prevCurrentQ) => prevCurrentQ + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0 && questions.length >= currentQuestion) {
      setCurrentQuestion((prevCurrentQ) => prevCurrentQ - 1);
    }
  }

  async function handleSubmit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    try {
      await set(resultRef, {
        [id]: qna,
      });
    } catch (err) {
      console.log(err);
    }

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={handleSubmit}
            progress={percentage}
          />
          <MiniPlayer id={id} title={qna[currentQuestion].title} />
        </>
      )}
    </>
  );
}
