
import React, { useState } from "react";

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: parseInt(formData.correctIndex),
      })
    });
  }
};

export default QuestionForm;
