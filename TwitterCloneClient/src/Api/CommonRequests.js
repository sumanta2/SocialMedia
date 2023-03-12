import axios from "axios";
import jwt_decode from "jwt-decode";
import { logOut } from "../Actions/AuthAction";
import store from "../store/ReduxStore"

export const instance = axios.create({
  baseURL:process.env.REACT_APP_BASE_URL
});

// this logic execute when any api request call using this axios instance
instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('profile')).token; 
    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
            alert('Your session has expired. Please log in again.');
            localStorage.clear();
            store.dispatch(logOut())
            // Redirect to login page
            return Promise.reject(new Error('session expired.'));
            // window.location.href = '/auth';
        }
        } catch (error) {
            console.log(error.message)
        }
    }
    else {
        console.log(token);
        alert("Invalid token. Please Log in again.")
        try {
            localStorage.clear();
            store.dispatch(logOut())
            // Redirect to login page
            return Promise.reject(new Error('session expired.'));
        } catch (error) {
            console.log(error.message)
        }
    }
  return config;
});

