import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DefaultView from './Default.js';
import { Route, Switch } from 'react-router-dom'
import PostView from './PostView.js'
import CreateEditView from './CreateEditView.js'
import NotFound from './NotFound.js'

class App extends Component {

  render() {
    return (
        <Switch>
          <Route exact path="/" component={DefaultView}/>
          <Route exact path="/add" component={CreateEditView}/>
          <Route path="/edit" component={CreateEditView}/>
          <Route exact path="/:category" component={DefaultView}/>
          <Route exact path="/:category/:postId" component={PostView}/>
          <Route path='*' component={NotFound}/> 
        </Switch>
    );
  }
}

export default App
