import React from 'react';
import logo from './logo.svg';
import NavBarPage from './views/NavBar';
import Signup from './views/Signup';
import Home from './views/Home';
import { HashRouter, Route, Switch,BrowserRouter } from 'react-router-dom';
import {MainRouter} from './routes';
import Login from './views/Login';
import Profile from './views/Profile';
import BlogItem from './views/BlogItem';
import CreatePost from './views/CreatePost';
import BlogUpdate from './views/BlogUpdate';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/signin" name="Login Page" render={props => <Login {...props}/>} />
      <Route exact path="/signup" name="Signup Page" render={props => <Signup {...props}/>} />
      <Route exact path="/" name="Home Page" render={props => <Home {...props}/>} />
      <Route exact path="/postcreate" name="Post Create" render={props => <CreatePost {...props}/>} />
      <Route exact path="/profile" name="Profile Page" render={props => <Profile {...props}/>} />
      <Route exact path="/post/:postID" name="Post Details Page" render={props => <BlogItem {...props}/>} />
      <Route exact path="/postupdate/:postID" name="Post Update Page" render={props => <BlogUpdate {...props}/>} />
      </Switch>
   </BrowserRouter>
  );
}

export default App;
