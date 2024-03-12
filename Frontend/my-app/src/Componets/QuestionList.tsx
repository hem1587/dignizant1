import React, { useState } from 'react';
import axios from 'axios';
import { FaDotCircle, FaCheckSquare, FaCaretDown } from 'react-icons/fa';



interface Question {
  title: string;
  description: string;
  questionText: string;
  options: string[];
  optionType: string;
}

const QuestionList: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Description');
  const [questions, setQuestions] = useState<Question[]>([{ title: '', description: '', questionText: '', options: [], optionType: 'radio' }]);

  const addQuestion = () => {
    const newQuestion: Question = { title: '', description: '', questionText: `Question ${questions.length + 1}`, options: [], optionType: 'radio' };
    setQuestions([...questions, newQuestion]);
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push(`Option ${updatedQuestions[questionIndex].options.length + 1}`);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleTitleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].title = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleDescriptionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].description = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionTypeChange = (questionIndex: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].optionType = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/form', {
        title: formTitle,
        description: formDescription,
        questions: questions.map(question => ({
          title: question.title,
          description: question.description,
          questionText: question.questionText,
          options: question.options,
          optionType: question.optionType
        }))
      });
      alert('Questions submitted successfully!');
    } catch (error) {
      console.error('Error submitting questions:', error);
      alert('Error submitting questions. Please try again later.');
    }
  };

  const renderOptions = (question: Question, questionIndex: number) => {
    return question.options.map((option, optionIndex) => (
      <div key={optionIndex}>
        <input
          type={question.optionType === 'checkbox' ? 'checkbox' : 'text'}
          value={option}
          onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)}
          className="question-input"
        />
        <label>{option}</label>
      </div>
    ));
  };

  return (
    <div className="form-container">
      <div className="title-and-description">
        <div className="try"></div>
        <div className="title-line"></div>
        <h1 contentEditable>{formTitle}</h1>
        <p contentEditable>{formDescription}</p>
      </div>
      <h2>Question List</h2>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <div className="question-line"></div>
          <div className='h'>
            <input
              type="text"
              value={question.questionText}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
              className="question-input"
              placeholder="Enter question"
            />
            <select className="question-select" value={question.optionType} onChange={(event) => handleOptionTypeChange(questionIndex, event)}>
              <option value="radio"> <FaDotCircle/>Radio Buttons</option>
              <option value="checkbox"> Checkboxes</option>
              <option value="select"> Select Dropdown</option>
            </select>
          </div>
          <a href="#" className='addoption' onClick={() => addOption(questionIndex)}> <span className='span'>add option  </span>Add Other</a>
          {renderOptions(question, questionIndex)}
        </div>
      ))}
      <button className="button" onClick={addQuestion}>Add Question</button>
      <br />
      <button className="button1" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionList;
