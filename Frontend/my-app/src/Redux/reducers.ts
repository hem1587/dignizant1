// reducer.ts

import { FormActionTypes, FormAction, FormState } from './Types';


const initialState: FormState = {
  count: 0,
};

const formReducer = (state = initialState, action: FormAction): FormState => {
  switch (action.type) {
    case FormActionTypes.GET_FORM_DATA_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
