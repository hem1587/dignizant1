import React, { useState, Component } from 'react';
import axios from 'axios';
import { FaDotCircle, FaCheckSquare, FaCaretDown } from 'react-icons/fa';
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import Switch from "react-switch";

import { FaPlus, FaFileImport, FaFileAlt, FaVideo, FaTrash } from 'react-icons/fa';


interface Question {
  _id?: string;
  title: string;
  description: string;
  questionText: string;
  options: string[];
  optionType: string;
  isSwitchOn: boolean;
}


const QuestionList: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('Description');
  const [questions, setQuestions] = useState<Question[]>([{
    title: '',
    description: '',
    questionText: '',
    options: [],
    optionType: 'radio',
    isSwitchOn: false
  }]);
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].isSwitchOn = !updatedQuestions[questionIndex].isSwitchOn;
    setQuestions(updatedQuestions);
  };
  const addQuestion = () => {
    const newQuestion: Question = {
      title: '',
      description: '',
      questionText: '',
      options: [],
      optionType: 'radio',
      isSwitchOn: false
    };
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLHeadingElement>) => {
    setFormTitle(event.target.innerText);
  };
  const handledescriptionChange = (event: React.ChangeEvent<HTMLHeadingElement>) => {
    setFormDescription(event.target.innerText);
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

    const selectElement = document.getElementById(`question-select-${questionIndex}`);
    if (selectElement) {
      selectElement.classList.remove('question-input '); // Remove existing class
      if (event.target.value === 'checkbox') {
        selectElement.classList.add('checkbox-style'); // Add class for checkbox style
      }
    }
  };
  const handleRemoveQuestion = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };
  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };
  const handleSubmit = async () => {
    try {
      await axios.post('https://newdigback.onrender.com/api/form', {
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
  const deleteQuestion = async (questionId: string) => {
    try {
      await axios.delete(`/api/form/questions/${questionId}`);
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error(error);

    }
  };

  const renderOptions = (question: Question, questionIndex: number) => {
    return question.options.map((option, optionIndex) => (
      <div className='option' key={optionIndex}>
        <input
          type={question.optionType === 'checkbox' ? 'checkbox' : 'radio'}
          value={option}

          className={question.optionType === 'checkbox' ? 'text-input' : 'questio-input'}
        />
        <input onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)} type="text" className='question' placeholder='Enter Option' />
        <BsX onClick={() => handleRemoveOption(questionIndex, optionIndex)} style={{ height: '45px', width: '250px', color: 'grey', marginRight: "2px", cursor: "pointer" }} />

      </div>
    ));
  };

  return (
    <div>
      <div className="form-container">
        <div className="title-and-description">
          <div className="try"></div>
          <div className="title-line"></div>
          <h1 contentEditable onInput={handleTitleChange} >{formTitle}</h1>
          <p contentEditable onInput={handledescriptionChange}>{formDescription}</p>
        </div>


        <div >
          <div className="vertical-box">
            <div className="icon-container">
              <FaPlus className="icon" onClick={addQuestion} />
            </div>
            <div className="icon-container">
              <FaFileImport className="icon" />
            </div>
            <div className="icon-container">
              <FaFileAlt className="icon" />
            </div>
            <div className="icon-container">
              <FaVideo className="icon" />
            </div>
            <div className="icon-container">
              <FaTrash className="icon" />
            </div>
          </div>

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
                  <option value="radio"> Radio Buttons</option>
                  <option className='check' value="checkbox"> Checkboxes</option>
                  <option value="select"> Select Dropdown</option>
                </select>
              </div>
              <a href="#" className='addoption' onClick={() => addOption(questionIndex)}> Add Option</a>
              {renderOptions(question, questionIndex)}
              <div className="question-line2"></div>
              <div className='last'>
                <div></div>
                <div className='icons'>
                  <FaRegCopy style={{ height: '25px', width: '25px', color: "grey" }} />
                  <RiDeleteBinLine onClick={() => handleRemoveQuestion(questionIndex)} style={{ height: '25px', width: '25px', color: "grey" }} className="delete-icon" />
                  <div className="vertical-line"></div>
                  <p className='req'>Required</p>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={question.isSwitchOn}
                      onChange={() => toggleSwitch(questionIndex)}
                    />
                    <span className="slider round"></span>
                  </label>

                  <BsThreeDotsVertical />

                </div>

              </div>
            </div>

          ))}
        </div>




        
        <br />
        <button className="button1" onClick={handleSubmit}>Submit</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default QuestionList;
