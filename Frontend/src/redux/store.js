import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

// Import your other reducers here
import user from './reducers/user';
import user2 from './reducers/user2';
import contact from './reducers/contacts';
import patient from "./reducers/patient"
import therapist from "./reducers/therapist"
import country from "./reducers/country"
import category from './reducers/category';
// Combine your reducers using combineReducers
const combinedReducers = combineReducers({
  user,
  user2,
  contact,
  patient,
  therapist,
  category,
  country
});

const middleware = [...getDefaultMiddleware(), thunk];

const enableDevTools = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined;


const store = configureStore({
  reducer: combinedReducers,
  middleware,
  devTools: enableDevTools, // Enable Redux DevTools in development
});

export default store;