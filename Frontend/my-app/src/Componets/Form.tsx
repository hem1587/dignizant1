// src/components/Form.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchForms, submitForm } from '../Redux/Action';
import './form.css';


import QuestionList from './QuestionList';

const Form: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const forms = useSelector((state: any) => state.forms);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchForms());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedForm = forms[0];

    if (selectedForm) {
      //@ts-ignore
      dispatch(submitForm(selectedForm._id, formData));
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>Questions</li>
          <li>Responses</li>
          <li>Settings</li>
        </ul>
      </nav>
      
      <ul>
        {forms.map((form: any) => (
          <li key={form._id}>{form.title}</li>
        ))}
      </ul>
      <QuestionList/>
      
    </div>
  );
};

export default Form;
