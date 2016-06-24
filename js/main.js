var React = require('react');
var ReactDOM = require('react-dom');
var reactRouter = require('react-router');
var Router = reactRouter.Router;
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;
var browserHistory = reactRouter.browserHistory;

var App = require('./components/App');
var Home = require('./components/Home');
var Login = require('./components/Login');
var Lists = require('./components/Lists');
var List = require('./components/List');
var ListCreate = require('./components/ListCreate');

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/lists' component={Lists}/>
      <Route path='/lists/view/:list' component={List}/>
      <Route path='/lists/new' component={ListCreate}/>
    </Route>
  </Router>),
  document.getElementById('render-point')
);
