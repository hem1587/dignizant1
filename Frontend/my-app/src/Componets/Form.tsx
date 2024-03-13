// src/components/Form.tsx

import React, { useState, useEffect } from 'react';

import './form.css';


import QuestionList from './QuestionList';
import Navbar from './Navbar';

const Form: React.FC = () => {
 
  return (
    <div>
     <Navbar/>
      
      
      <QuestionList/>
      
    </div>
  );
};

export default Form;
