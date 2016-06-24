var React = require('react');
var browserHistory = require('react-router').browserHistory;
var request = require('superagent');

var Token = require('../token');

var ListCreate = React.createClass({
  getInitialState() {
    return ({
      description: '',
      publicList: 0,
      title: '',
      token: Token.getValidToken()
    });
  },

  changeTitle(e) {
    this.setState({
      title: e.target.value
    });
  },

  changeDescription(e) {
    this.setState({
      description: e.target.value
    });
  },

  changePublic(e) {
    this.setState({
      publicList: +!this.state.publicList
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.title) {
      alert('You must include a title.');
    } else {
      request.
        post('http://localhost:8000/api/list/new')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+this.state.token)
        .send({
          title: this.state.title,
          description: this.state.description,
          public: this.state.publicList
        })
        .end(function(err, res) {
          if (err) {
            alert(err);
          } else {
            browserHistory.push('/lists/view/'+res.body.id);
          }
        });
     }
  },

  formOrLogin() {
    if (!this.state.token) {
      return (<Link to='/login'>Please login first</Link>);
    }

    return (
      <div>
        <h2>Create New List</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type='text'
            ref='title'
            placeholder='My List'
            value={this.state.title}
            onChange={this.changeTitle}
          />
          <label>Description</label>
          <input
            type='textarea'
            ref='description'
            placeholder='Optional'
            value={this.state.description}
            onChange={this.changeDescription}
          />
          <label>Public</label>
          <input
            type='checkbox'
            ref='publicBox'
            onChange={this.changePublic}
          />
          <button type='submit' onClick={this.handleSubmit}>Create</button>
        </form>
      </div>
    );
  },

  render() {
    return (<div>{this.formOrLogin()}</div>);
  }
});

module.exports = ListCreate;
