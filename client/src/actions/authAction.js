import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import * as actionTypes from './actionTypes'
// import { decode } from 'querystring';


//Register user
export const registerUser = (userData, history) => dispatch => {
    console.log(userData)
    axios.post('/users/post', userData)
    .then(res => history.push("/login"))
    .catch(err => 
        dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
        })
        )
}

//Login - get user token
export const loginUser = userData => dispatch => {
    axios.post("/users/login", userData)
    .then( res => {
        const { token } = res.data;
        console.log(token)
        //set token to localstorage
        localStorage.setItem('jwtToken', token);
        //Set token to auth header
        setAuthToken(token.token);
        const decoded = jwt_decode(token.token);
        //set current user
        dispatch(setCurrentUser(decoded));
        // console.log(token)
    }
    )    
    .catch(err => dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
    })
    )
}

//set logged in user
export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}


//User loading
export const setUserLoading = () => {
    return {
        type: actionTypes.USER_LOADING
    }
}

//User log out
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    
}
