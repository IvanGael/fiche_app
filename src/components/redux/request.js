import axios from 'axios';
import AuthService from '../../auth/auth'; 


const API_ROOT = 'http://localhost:8000/api';
const responseBody = response => response.data;

export const request = {
    post: (url, data = null ) =>
        axios.post(`${API_ROOT}${url}`, data, AuthService.getAuthHeader()).then(responseBody),
    get: (url)=>
        axios.get(`${API_ROOT}${url}`, AuthService.getAuthHeader()).then(responseBody)
}