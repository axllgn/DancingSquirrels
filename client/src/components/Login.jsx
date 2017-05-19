import React from 'react';
import Signup from './Signup.jsx';
import LocalLogin from './LocalLogin.jsx';
import $ from 'jquery';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className="loginForms">
      <div>
        <div className="authButtons">
          <a href="/login/facebook">
            <img src="https://i.stack.imgur.com/Vk9SO.png" width="300"/>
          </a>
        </div>
        <div className="authButtons">
          <a href="/login/google">
            <img src="https://i.stack.imgur.com/XzoRm.png" width="300"/>
          </a>
        </div>
        <div className="authButtons">
          <a href="/login/github">
            <img src='https://help.dropsource.com/wp-content/uploads/sites/4/2017/02/gh-login-button.png' width ="300"/>
          </a>
        </div>

        <div className="login">
          <Link to="/loginLocal" className='header-link'>Login</Link>
        </div>

        <div className="login">
          <Link to="/signup" className='header-link'>Signup</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Login;