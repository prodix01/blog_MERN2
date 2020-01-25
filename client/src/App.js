import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/authActions";

import PrivateRoute from "./componets/common/PrivateRoute";
import Footer from "./componets/layout/Footer";
import Navbar from "./componets/layout/Navbar";
import Landing from "./componets/layout/Landing";
import Register from "./componets/auth/Register";
import Login from "./componets/auth/Login";
import Dashboard from "./componets/dashborad/Dashboard";
import "./App.css"



// check for token
if (localStorage.jwtToken) {
    //set auth token header auth
    setAuthToken(localStorage.jwtToken);

    //decode
    const decoded = jwt_decode(localStorage.jwtToken);

    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());

        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Navbar/>
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>

        );
    }
}

export default App;