import {Route,Switch} from 'react-router-dom';
import React from 'react';
import Login from './views/Login';
import Home from './views/Home';
import Signup from './views/Signup';
import BlogItem from './views/BlogItem';
import Profile from './views/Profile';
import CreatePost from './views/CreatePost';
export const MainRouter = ()=>(
    <div>
    <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/post/:postID" component={BlogItem}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/postcreate" component={CreatePost}/>
        </Switch>
    </div>
);