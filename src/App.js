import logo from './logo.svg';
import './App.css';
import React from 'react'
import InputFile from './components/inputfile'
import Login from './components/login'
import {BrowserRouter  as Router,Route,Switch,Link} from 'react-router-dom'
import Register from './components/register'

function App() {
  return (
    <Router> 
    <Switch >
      <Route exact path='/' > 
      { localStorage.getItem('useruid') ?  (<InputFile />) :  (<Login />) }
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/Register' >
          <Register />
        </Route>
    </Switch>
    </Router>
  );
}

export default App;
