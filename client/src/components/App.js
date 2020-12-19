import React from 'react';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import MenuBar from './Nav/MenuBar';
import { HashRouter, Route } from 'react-router-dom';
import { UserProvider } from './Context';
import User from './User';

const App = () => {
    return (
        <UserProvider>
            <HashRouter>
            <MenuBar />
                <Route exact path='/' component={Header} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/user' component={User} />
            </HashRouter>
        </UserProvider>
    )
}

export default App