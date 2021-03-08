import { SET_TABLES, ADD_TABLE, DELETE_TABLE } from '../actionTypes';
import axios from 'axios'



export const getTables = (propertyID) => async dispatch => {
    try{
        const response = await axios.get('properties/'+propertyID+'/tables')
        dispatch( {
            type: SET_TABLES,
            payload: response.data.data
        })
    } catch(e) {
        console.log('somthing bad happned fetching robots')
    }
}

export const postTable = (propertyID, table) => async dispatch => {
    const data = {
        ...table,
        table_number: parseInt(table.table_number),
        junction: parseInt(table.junction),
    }
    try {
        const response = await axios.post('properties/' + propertyID + '/tables', data);
        console.log(response);
        dispatch({
            type: ADD_TABLE,
            payload: response.data.data
        })


    } catch (error) {

    }
}

export const deleteTable = (propertyID ,tableID) => async dispatch => {
    try {
        const response = await axios.delete('properties/' + propertyID + '/tables/' + tableID);
        console.log(response);
        dispatch({
            type: DELETE_TABLE,
            payload: tableID
        })
        alert("Table Deleted")
    } catch (e) {

    }
}
