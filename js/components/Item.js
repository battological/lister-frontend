var React = require('react');
var request = require('superagent');

var Token = require('../token');

var Item = React.createClass({
  getInitialState() {
    return ({
      token: Token.getValidToken()
    });
  },

  delete() {
    request
      .delete('http://localhost:8000/api/item/'+this.props.item.id)
      .set('Authorization', 'Bearer '+this.state.token)
      .end(function(err, res) {
        if (err) {
          alert(err);
        } else {
          this.props.repopulate();
        }
      }.bind(this));
  },

  render() {
    return (
      <div className='item' key={this.props.item.id}>
        <h3>{this.props.item.title}</h3>
        <p>{this.props.item.description}</p>
        <a className='delete' onClick={this.delete}>
          delete
        </a>
      </div>
    );
  }
});

module.exports = Item;
