import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './Auth/Login/Login.component';
import { Register } from './Auth/Register/Register.component';
import { Header } from './Common/Header/Header.component';

const Home = (props) => {
    console.log('props in home ', props);
    return (
        <p>Home Page</p>
    )
}
const Dashboard = (props) => {
    console.log('props in Dashboard ', props);
    return (
        <p>Dashboard Page</p>
    )
}

const About = (props) => {
    console.log('props in About ', props);
    return (
        <p>About Page</p>
    )
}

const Settings = (props) => {
    console.log('props in Settings ', props);
    return (
        <p>Settings Page</p>
    )
}

const NotFound = (props) => {
    // console.
    return (
        <div>
            <h2>Not Found</h2>
            <img width="400" src="./images/notfound.jpg" alt="not_found.png"></img>
        </div>
    )
}




export const AppRouting = (props) => {
    return (
        <BrowserRouter>
            <Header isLoggedIn={true}></Header>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={Login} >

                </Route>
                <Route
                    path="/register" component={Register}></Route>


                <Route path="/about" component={About} />
                <Route path="/settings" component={Settings} />
                <Route path="/home/:name" component={Home}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route component={NotFound}></Route>

            </Switch>



        </BrowserRouter>
    )
}
