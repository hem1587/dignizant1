import axios from 'axios';

export const fetchForms = () => async (dispatch: any) => {
  try {
    const res = await axios.get('http://localhost:5000/api/form');
   return dispatch({ type: 'FETCH_FORMS', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const submitForm = (formId: string, formData: any) => async (dispatch: any) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/form/${formId}/response`, formData);
    dispatch({ type: 'FORM_SUBMITTED', payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
