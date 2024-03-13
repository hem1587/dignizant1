import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Form {
  _id: string;
  title: string;
  description: string;
}

const FormList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Form[]>('https://newdigback.onrender.com/api/form/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      {forms.map(form => (
        <div className='responsemap' key={form._id}>
          <h2>Title:{form.title}</h2>
          <p>Description:{form.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FormList;
