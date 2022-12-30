import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';


function PrivateRoute({ component: Component, isAuth, ...rest}){
    const { authTokens } = useAuth();
    return(
        <Route
             {...rest} 
             render={props =>
                authTokens ? (
            <Component {...props} isAuth={isAuth} />
            ):(
            <Redirect to={{ pathname:"/login", state: {referer: props.location} }} />
            )
        }
     />
    );
}

export default PrivateRoute;