import React, { Component } from 'react'
import AuthService from '../../auth/auth'
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
       
    render() {
        return (
         <div>
            { AuthService.logOut()}
            <Redirect to={{ pathname: "/login", state: { referer: '' }}} />
         </div>
        );
    }
}
