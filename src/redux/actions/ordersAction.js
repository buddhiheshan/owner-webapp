import axios from 'axios'
import { PUSH_ORDER } from '../actionTypes';

export const getOrders = (propertyID, status, actionType) => async dispatch => {

    try {
        const response = await axios.get('properties/' + propertyID + '/orders?status='+status)
        dispatch({
            type: actionType,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}

export const pushOrder = (order) => async dispatch => {
    try{
        dispatch( {
            type: PUSH_ORDER,
            payload: order
        })
    } catch(e) {
        console.log('somthing bad happned when pushing order')
    }
}