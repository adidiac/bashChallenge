import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// include userReducer
import userReducer from './userReducer';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
const store=createStore(combineReducers({userReducer}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


