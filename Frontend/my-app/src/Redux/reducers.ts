const initialState = {
    forms: [],
  };
  
  const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_FORMS':
        return {
          ...state,
          forms: action.payload,
        };
      case 'FORM_SUBMITTED':
        return {
          ...state,
          forms: state.forms.map((form: any) =>
            form._id === action.payload._id ? action.payload : form
          ),
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  