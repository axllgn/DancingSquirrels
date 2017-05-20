import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import MUI from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

class LocalLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    };

    this.localLoginUsernameChange = this.localLoginUsernameChange.bind(this);
    this.localLoginPasswordChange = this.localLoginPasswordChange.bind(this);
    this.localLoginSubmit = this.localLoginSubmit.bind(this);
  }

  localLoginUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  localLoginPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  localLoginSubmit(e) {
    let options = {
      username: this.state.username,
      password: this.state.password
    }
    $.post('/loginLocal', options, (results) => {
      if (results.user) {
        this.props.history.push(`/${results.user}`);
      } else {
        alert('Invalid username or password');
      }
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className="loginForms">
        <h3>Login</h3>
        <form onSubmit={this.localLoginSubmit} >
          <label className="loginLabel">Username</label> 
          <input type="text" 
            name="username" 
            value={this.state.username} 
            onChange={this.localLoginUsernameChange} />
          <br></br>
          <label className="loginLabel">Password</label> 
          <input type="text" 
            name="password" 
            value={this.state.password} 
            onChange={this.localLoginPasswordChange} />
          <br></br>
          <MUI>
            <FlatButton className="toolbarBtn"
                        label="Submit" 
                        type="submit"
                        style={{ color: 'white' }}/>

          </MUI>
        </form>
      </div>
    )
  }
}

export default LocalLogin;