import React, { createContext, useContext } from 'react';
import { Redirect } from 'react-router-dom';


export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

const API_BASE_URL = "http://localhost:8000/api/";

class AuthService{

    setLogLocal(log){
        localStorage.setItem("isLog", JSON.stringify(log));
    }

    getLogLocal(){
        return JSON.parse(localStorage.getItem("isLog"));
    }

    setTokensLocal(token){
        localStorage.setItem("token", JSON.stringify(token));
    }
    
    getTokensLocal(){
       return JSON.parse(localStorage.getItem("token"));
    }

    getAuthHeader() {
        if(this.getTokensLocal() === null){
            return (<Redirect to={{ pathname: "/login", state: { referer: '' } }} />);
        }else{
            return { headers: { Authorization: 'Bearer ' + this.getTokensLocal().token } };
        }
    }

    logOut() {
        localStorage.clear();
        return (<Redirect to={{ pathname: "/login", state: { referer: '' } }} />);
    }

    getFiche(){
        return API_BASE_URL +"fiches";
    }

    getLogin(){
        return API_BASE_URL +"login_check";
    }  

    getUser(){
        return API_BASE_URL+"users";
    }

    tokenExpire(){
        this.logOut();
    }
    
}
export default new AuthService();