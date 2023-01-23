import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  function handleQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions)
      });
  }, []);

  function answerChange(id,index) {
    fetch(` http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    })
      .then((r) => r.json())
      .then((updateQuestion) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updateQuestion) return updateQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }
  const questionItems = questions.map((question) => (
    <QuestionItem key={question.id}
      question={question}
      onAnswerChange={answerChange}
      onDelete={ handleQuestion}
    />

  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
      <h1>Quiz Questions </h1>
      <ul> {questionItems}</ul>
    </section>
  );
}

export default QuestionList;