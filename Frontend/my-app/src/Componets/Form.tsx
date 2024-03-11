// src/components/Form.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchForms, submitForm } from '../Redux/Action';
import './form.css';

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
      <h2>Available Forms</h2>
      <ul>
        {forms.map((form: any) => (
          <li key={form._id}>{form.title}</li>
        ))}
      </ul>
      <h2>Submit Response</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Textbox:
          <input type="text" name="textbox" onChange={handleInputChange} />
        </label>
        <label>
          Radio Button:
          <input type="radio" name="radio" value="Option 1" onChange={handleInputChange} />
          Option 1
          <input type="radio" name="radio" value="Option 2" onChange={handleInputChange} />
          Option 2
        </label>
        <label>
          Checkbox:
          <input type="checkbox" name="checkbox" onChange={handleCheckboxChange} />
        </label>
        <label>
          Dropdown:
          <select name="dropdown" onChange={handleDropdownChange}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
