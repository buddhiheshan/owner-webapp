import { SET_ROBOTS,PUSH_ROBOTINFO } from '../actionTypes';
import axios from 'axios'



export const getRobots = (propertyID) => async dispatch => {
    
    try{
        const response = await axios.get('properties/'+propertyID+'/robots')
        dispatch( {
            type: SET_ROBOTS,
            payload: response.data.data
        })
    } catch(e) {
        console.log('somthing bad happned fetching robots')
    }
}

export const pushRobotInfo = (robot) => async dispatch => {

    try{
        dispatch( {
            type: PUSH_ROBOTINFO,
            payload: robot
        })
    } catch(e) {
        console.log('somthing bad happned fetching robots')
    }
}