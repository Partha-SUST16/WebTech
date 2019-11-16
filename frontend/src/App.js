import React from 'react';
import logo from './logo.svg';
import NavBarPage from './views/NavBar';
import Signup from './views/Signup';
import Home from './views/Home';
import { HashRouter, Route, Switch,BrowserRouter } from 'react-router-dom';
import {MainRouter} from './routes';
import Login from './views/Login';
import Profile from './views/Profile';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
  return (
    <BrowserRouter>
   <MainRouter/>
   </BrowserRouter>
  );
}

export default App;
