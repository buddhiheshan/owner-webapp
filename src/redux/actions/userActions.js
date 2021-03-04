import { SET_USER, RESET_USER } from '../actionTypes';
import axios from 'axios';

export const login = (mobile, password) => async dispatch => {

    const data = {
        "mobile": mobile,
        "password": password
    }

    try {
        const response = await axios.post('auth/owner_login', data);
        localStorage.setItem('firstname', response.data.data.first_name);
        localStorage.setItem('lastname', response.data.data.last_name);
        localStorage.setItem('token', response.data.token);

        const payload = {
            firstname: response.data.data.first_name,
            lastname: response.data.data.last_name,
            token: response.data.token
        }
        
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        dispatch({
            type: SET_USER,
            payload: payload
        })

    } catch (e) {
        alert('Login failed');
        console.log('somthing bad happned with login')
    }
}

export const logout = () => async dispatch => {

    localStorage.removeItem('token');
    dispatch({ type: RESET_USER });
}