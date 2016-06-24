var React = require('react');
var Link = require('react-router').Link;

var Token = require('../token');

var App = React.createClass({
  getInitialState() {
    return ({
      token: Token.getValidToken()
    });
  },

  logout() {
    this.setState({
      token: Token.removeToken()
    });
  },

  renderLogInOrOut() {
    if (this.state.token) {
      return (<li><a href='#' onClick={this.logout}>Logout</a></li>);
    } else {
      return (<li><Link to='/login'>Login</Link></li>);
    }
  },

  render() {
    return (
      <div>
        <ul role='nav'>
	  <li><Link to='/'>Home</Link></li>
	  <li><Link to='/lists'>Lists</Link></li>
	  {this.renderLogInOrOut()}
	</ul>

        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
