import {  legacy_createStore,applyMiddleware, combineReducers} from "redux";

import {thunk} from 'redux-thunk';

 import formReducer from './reducers';
 import { FormState } from "./Types";

// // Combine all reducers into a root reducer
 const rootReducer = combineReducers({
  form: formReducer,
});

// // Define RootState type to represent the overall state of the Redux store
export type RootState = {
  form: FormState; // Include states from other reducers as needed
};

//@ts-ignore
const store = legacy_createStore(rootReducer,applyMiddleware(thunk));


export default store;
// store.ts

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
