import { SET_ROBOTS, PUSH_ROBOTINFO } from '../actionTypes'

const initialState = {
    robots: [],
    isLoading: true
}

export default function robotReducers(state = initialState, action) {

    switch (action.type) {

        case SET_ROBOTS:
            return { ...state, robots: action.payload, isLoading: false }

        case PUSH_ROBOTINFO:
            let robots = state.robots.filter((robot) => robot._id !== action.payload._id);
            return { ...state, robots: [...robots, action.payload]}

        default:
            return state
    }

}