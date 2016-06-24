var React = require('react');
var browserHistory = require('react-router').browserHistory;
var request = require('superagent');

var Token = require('../token');

var Login = React.createClass({
  getInitialState() {
    return ({
      email: '',
      password: ''
    });
  },

  changeEmail(e) {
    this.setState({
      email: e.target.value
    })
  },

  changePassword(e) {
    this.setState({
      password: e.target.value
    })
  },

  loginSubmit(e) {
    e.preventDefault();

    request
      .post('http://localhost:8000/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        email: this.state.email,
        password: this.state.password
      })
      .end(function(err, res) {
        if (err) {
          alert(err);
        } else {
          Token.setToken(res.body.jwt);
          localStorage.setItem('userId', res.body.id);
          browserHistory.push('/');
        }
      });
  },

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.loginSubmit}>
          <label>Email Address</label>
          <input
            type='text'
            ref='email'
            placeholder='joe@schmoe.com'
            value={this.state.email}
            onChange={this.changeEmail}
          />
          <label>Password</label>
          <input
            type='password'
            ref='password'
            placeholder='suPersECret123'
            value={this.state.password}
            onChange={this.changePassword}
          />
          <button type='submit' onClick={this.loginSubmit}>Login</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
