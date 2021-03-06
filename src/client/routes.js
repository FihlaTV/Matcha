import React from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Auth from './components/Auth';
import Register from './components/Register';
import EditProfil from './components/EditProfil';
import Lost from './components/Lost';
import Profil from './components/Profil';
import Chat from './components/Chat'
import User from './components/User';
import ResetPassword from './components/ResetPassword';

export default (
  <Switch>
    <Route exact path="/" component={() => <Auth><Home /></Auth>}/>
    <Route exact path="/login" component={() => <Auth revertCheck={true} path="/login" ><Login /></Auth>}/>
    <Route exact path="/register" component={() => <Auth revertCheck={true} path="/register"><Register /></Auth>}/>
    <Route exact path="/lost" component={() => <Lost />}/>
    <Route exact path="/reset" component={() => <Auth revertCheck={true} path="/reset"><ResetPassword /></Auth>}/>
    <Route exact path="/editprofil" component={() => <Auth><EditProfil /></Auth>}/>
    <Route exact path="/profil" component={() => <Auth><Profil /></Auth>}/>
    <Route path="/user/:login" component={() => <Auth><User /></Auth>}/>
    <Route exact path="/chat/:login" component={() => <Auth chat={true}><Chat /></Auth>}/>
    <Redirect from="*" to="/" />
  </Switch>
);
