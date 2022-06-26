import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  // get user
  const user = useSelector(state => state.userReducer);
  // get dispatch
  const dispatch = useDispatch();

  const pageRendering = () => {
    // if user is logged in, render the home page
    if (user.username) {
      return <HomePage/>;
    }
    // if user is not logged in, render the login page
    return <LoginPage />;
  }

  return (
    <div className="App">
      {pageRendering()}
    </div>
  );
}

export default App;
