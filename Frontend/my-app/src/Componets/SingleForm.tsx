// src/components/SingleForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { submitForm } from '../Redux/Action';

interface SingleFormProps {
  form: any;
}

const SingleForm: React.FC<SingleFormProps> = ({ form }) => {
  const dispatch = useDispatch<Dispatch>();
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(submitForm(form._id, formData));
  };

  return (
    <div>
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      <form onSubmit={handleSubmit}>
        {form.fields.map((field: any) => (
          <div key={field._id}>
            {field.type === 'text' && (
              <label>
                {field.label}:
                <input type="text" name={field.label} onChange={handleInputChange} />
              </label>
            )}
            {field.type === 'checkbox' && (
              <label>
                {field.label}:
                <input type="checkbox" name={field.label} onChange={handleCheckboxChange} />
              </label>
            )}
            {field.type === 'dropdown' && (
              <label>
                {field.label}:
                <select name={field.label} onChange={handleDropdownChange}>
                  {field.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingleForm;
