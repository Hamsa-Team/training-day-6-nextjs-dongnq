import React from 'react';
import axios from 'axios';
import Router from 'next/router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null
    }
  }

  onChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  onSubmit = async () => {
    const { username, password } = this.state;
    try {
      const res = await axios.post('/api/login', {
        username: username,
        password: password
      });
      Router.push('/employees')
    } catch (err) {
      this.setState({
        errorMessage: "Login Failed"
      })
      console.log(err);
    }
  }

  render = () => {
    const { username, password, errorMessage } = this.state;

    return (
      <div>
        <span>Username: </span> <input type="text" value={username} onChange={e => this.onChange('username', e)} />
        <br />
        <br />
        <span>Password: </span> <input type="text" value={password} onChange={e => this.onChange('password', e)} />
        <br />
        <br />
        <button onClick={this.onSubmit}>Login</button>
        <br />
        <br />
        <p style={{ color: "red"}}>{errorMessage ? errorMessage : null}</p>
      </div>
    );
  }
}
