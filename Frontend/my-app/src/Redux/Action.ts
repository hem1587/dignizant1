import axios from 'axios';
import { Dispatch } from 'redux';
import { FormActionTypes, FormAction } from './Types';

export const getFormDataCount = () => async (dispatch: Dispatch<FormAction>) => {
  try {
    const response = await axios.get('https://newdigback.onrender.com/api/form/length');
    dispatch({
      type: FormActionTypes.GET_FORM_DATA_COUNT,
      payload: response.data.count,
    });
  } catch (error) {
    console.error('Error fetching form data count:', error);
  }
};