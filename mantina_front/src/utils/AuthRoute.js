import React from "react";
import {  Route, Redirect } from 'react-router-dom';

class AuthRoute extends React.Component {
    render() {

       const props = this.props;

       //CHECK THE EXPIRATION TIME
       var isAuthenticated = false;
       var hours = 1; // Reset when storage is more than 24hours
       var now = new Date().getTime();
       var setupTime = localStorage.getItem('setupTime');

       if (setupTime == null) {
           isAuthenticated = false
       } else {
           //si esta expirado
           if(now - setupTime > hours*60*60*1000) {
               localStorage.clear()
               isAuthenticated = false
           } else {
               isAuthenticated = localStorage.getItem('token');
           }
       }

        if ( isAuthenticated ) {
             return <Route {...props} />;
        } else {
             return <Redirect to="/login"/>;
        }
    }
}

export default AuthRoute;