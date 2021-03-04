import { SET_PROPERTY } from '../actionTypes';
import axios from 'axios';

export const getPropertyInfo = () => async dispatch => {
    
    try {
        const response = await axios.get('properties');
        dispatch({
            type: SET_PROPERTY,
            payload: response.data.data[0]
        })

    } catch (e) {
        console.log('somthing bad happned fetching property info')
    }
}

export const postEditProperty = (propertyID, property) => async dispatch => {
    try {
        const response = await axios.patch('properties/' + propertyID, property);
        dispatch({
            type: SET_PROPERTY,
            payload: response.data.data
        })

    } catch (error) {

    }
}