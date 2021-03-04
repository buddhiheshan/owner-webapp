import { SET_ITEMS, SET_SELECTED_ITEM, ADD_ITEM, DELETE_ITEM} from '../actionTypes';
import axios from 'axios'

export const getItems = (propertyID) => async dispatch => {
    try {
        const response = await axios.get('properties/' + propertyID + '/items')
        dispatch({
            type: SET_ITEMS,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}

export const getItemDetail = (itemID) => async dispatch => {

    try {
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: null})
        const response = await axios.get('items/' + itemID)
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching item' + itemID)
    }
}

export const postItem = (propertyID, item) => async dispatch => {
    try {
        const response = await axios.post('properties/' + propertyID + '/items', item);
        dispatch({
            type: ADD_ITEM,
            payload: response.data.data
        })

    } catch (error) {

    }
}

export const deleteItem = (itemID) => async dispatch => {
    try {
        await axios.delete('items/' + itemID)
        dispatch({
            type: DELETE_ITEM,
            payload: itemID
        })
        alert("Item Deleted")
    } catch (e) {

    }
}

export const postEditItem = (itemID, item) => async dispatch => {
    console.log(itemID, item);
    try {
        const response = await axios.patch('items/' + itemID, item);
        console.log(response);
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: response.data.data
        })

    } catch (error) {

    }
}