var React = require('react');
var browserHistory = require('react-router').browserHistory;
var request = require('superagent');

var Token = require('../token');

var Item = require('./Item');

var List = React.createClass({
  getInitialState() {
    return ({
      addItem: false,
      items: [],
      itemTitle: '',
      itemDescription: '',
      itemNumber: -1,
      description: '',
      title: '',
      token: Token.getValidToken()
    })
  },

  getListData() {
    if (this.state.token) {
      request
        .get('http://localhost:8000/api/list/'+this.props.params.list)
        .set('Authorization', 'Bearer '+this.state.token)
        .end(function(err, res) {
          if (err) {
            alert(err);
          } else {
            this.setState({
              items: res.body.items,
              description: res.body.description,
              title: res.body.title
            });
          }
        }.bind(this));
    }
  },

  componentDidMount() {
    this.getListData();
  },

  changeDescription(e) {
    this.setState({
      itemDescription: e.target.value
    });
  },

  changeNumber(e) {
    this.setState({
      itemNumber: e.target.value
    });
  },

  changeTitle(e) {
    this.setState({
      itemTitle: e.target.value
    });
  },

  delete() {
    request
      .delete('http://localhost:8000/api/list/'+this.props.params.list)
      .set('Authorization', 'Bearer '+this.state.token)
      .end(function(err, res) {
        if (err) {
          alert(err);
        } else {
          browserHistory.push('/lists');
        }
      });
  },

  revealAddItem() {
    this.setState({
      addItem: true
    });
  },

  addItem(e) {
    e.preventDefault();

    if (!this.state.itemTitle) {
      alert('You must name your new item');
    } else {
      var item = {
        title: this.state.itemTitle,
        description: this.state.itemDescription || null,
        number: Math.max((this.state.itemNumber || 0) - 1, -1)
      };
      request
        .post('http://localhost:8000/api/list/'+this.props.params.list+'/add')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+this.state.token)
        .send(item)
        .end(function(err, res) {
          if (err) {
            alert(err);
          } else {
            this.setState({
              itemTitle: '',
              itemDescription: '',
              itemNumber: -1
            });
            this.getListData();
          }
        }.bind(this));
    }
  },

  maxItemNumber() {
    return Math.max.apply(Math, this.state.items.map(function(item) {
      return item.number;
    }));
  },

  renderItems() {
    return this.state.items.sort(function(a, b) {
      if (a.number == -1 && b.number != -1) {
        return 1;
      } else if (a.number != -1 && b.number == -1) {
        return -1;
      } else {
        return a.number - b.number;
      }
    }).map(function(item) {
      return (
        <Item
          key={item.id}
          item={item}
          repopulate={this.getListData}
        />
      );
    }.bind(this));
  },
  
  render() {
    return (
      <div>
        <div>
          <h2>{this.state.title}</h2>
          <a className='delete' onClick={this.delete}>
            delete
          </a>
          <p>{this.state.description}</p>
        </div>
        <div>
          <a href='#' onClick={this.revealAddItem}>Add</a>
          {
            this.state.addItem && 
            <form onSubmit={this.addItem}>
              <input
                type='text'
                ref='title'
                placeholder='Item'
                required
                value={this.state.itemTitle}
                onChange={this.changeTitle}
              />
              <input
                type='text'
                ref='description'
                placeholder='Description'
                value={this.state.itemDescription}
                onChange={this.changeDescription}
              />
              <input
                type='number'
                ref='number'
                min='1'
                max={this.maxItemNumber()+1}
                onChange={this.changeNumber}
              />
              <button type='submit'>Add</button>
            </form>
          }
        </div>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
});

module.exports = List;
