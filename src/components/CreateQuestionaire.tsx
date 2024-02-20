import React, { useState } from "react";
import "./CreateQuestionaire.css";

interface Question {
  question: string;
  possibleAnswers: string[];
  correctAnswer: string;
}

const CreateQuestionnaire: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [numAnswers, setNumAnswers] = useState<number>(2);
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      question: currentQuestion,
      possibleAnswers: possibleAnswers,
      correctAnswer: correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setPossibleAnswers([]);
    setCorrectAnswer("");
  };

  const onChangeAnswers = (index: number, answer: string) => {
    const arr = [...possibleAnswers];
    arr[index] = answer;
    setPossibleAnswers(arr);
  };

  return (
    <div className="create-questionnaire">
      <h1>Create Questionnaire</h1>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <h3>Question {index + 1}</h3>
          <p>{q.question}</p>
          <p>
            Possible Answers:
            <br />
            {q.possibleAnswers.map((answer, idx) => (
              <span key={idx}>
                {`${idx + 1}. ${answer}`}
                <br />
              </span>
            ))}
          </p>
          <p>Correct Answer: {q.correctAnswer}</p>
        </div>
      ))}
      <div className="form-group">
        <label>Question:</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
        />
      </div>
      <div>
        <div>Number of Answers</div>
        <input
          id="numAnswers"
          type="number"
          min={2}
          max={5}
          value={numAnswers}
          onChange={(e) => setNumAnswers(parseInt(e.target.value))}
          required
        />
      </div>
      <div>
        {Array.from({ length: numAnswers }).map((_, index) => (
          <div key={index}>
            <div>{`Answer ${index + 1}:`}</div>
            <input
              id="possibleAnswer"
              type="text"
              value={possibleAnswers[index]}
              onChange={(e) => onChangeAnswers(index, e.target.value)}
            ></input>
          </div>
        ))}
      </div>
      <div className="form-group">
        <label>Correct Answer:</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default CreateQuestionnaire;
