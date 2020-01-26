import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import Home from './pages/Home';
import DevInfo from './components/DevInfo';
import DevUpdate from './components/DevUpdate';



function App() {
  return(
    <Router>
      <Main />
    </Router>
  )
}

function Main(){
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/devs/:_id" component={DevInfo}/>
      <Route exact path="/devs/update/:_id" component={DevUpdate}/>
    </Switch>
  ) 
}

export default App;