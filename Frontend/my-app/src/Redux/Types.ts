// types.ts

export enum FormActionTypes {
    GET_FORM_DATA_COUNT = 'GET_FORM_DATA_COUNT',
  }
  
  export interface FormState {
    count: number;
  }
  
  interface GetFormDataCountAction {
    type: typeof FormActionTypes.GET_FORM_DATA_COUNT;
    payload: number;
  }
  
  export type FormAction = GetFormDataCountAction;
  