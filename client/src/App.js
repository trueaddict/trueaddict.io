import './App.css';

import React, { createContext, useReducer } from 'react';
import reducer, {initialState} from "./store/reducer";

// Router
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// Pages
import Home from './home/home';
import Photos from './photos/photos';
import About from './about/about';
import Login from './login/login';

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  console.log(state);
  
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  }
  
  return (
    <AuthContext.Provider value={{state, dispatch}}>
    <Router>
      <div className='nav-wrapper'>
        <nav className='grey'>
          <ul className='right'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {!state.isLoggedIn ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ): (
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/photos" element={<Photos/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>

    </Router>
    </AuthContext.Provider>
  );
}

export default App;
