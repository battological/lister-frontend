var React = require('react');
var Link = require('react-router').Link;
var request = require('superagent');

var Token = require('../token');

var Lists = React.createClass({
  getInitialState() {
    return ({
      lists: [],
      listDetails: [],
      token: Token.getValidToken(),
      userId: localStorage.getItem('userId')
    })
  },

  componentDidMount() {
    if (this.state.token && this.state.userId) {
      request
        .get('http://localhost:8000/api/user/'+this.state.userId+'/lists')
        .set('Authorization', 'Bearer '+this.state.token)
        .end(function(err, res) {
          if (err) {
            alert(err);
          } else {
              res.body.forEach(function(list) {
                request
                  .get('http://localhost:8000/api/list/'+list)
                  .set('Authorization', 'Bearer '+this.state.token)
                  .end(function(err, res) {
                    if (err) {
                      alert(err);
                    } else {
                      this.setState({
                        listDetails: this.state.listDetails.concat(res.body)
                      });
                    }
                  }.bind(this));
              }.bind(this));
          }
        }.bind(this));
      
    }
  },

  renderLists() {
    return this.state.listDetails.map(function(list) {
      return (<li key={list.id}><Link to={'/lists/view/'+list.id}>{list.title}</Link></li>);
    });
  },

  render() {
    return (
      <div>
        <h2>Lists</h2>
        <Link to='/lists/new'>Create</Link>
        <ul>
          {this.renderLists()}
        </ul>
      </div>
    )
  }
});

module.exports = Lists;
