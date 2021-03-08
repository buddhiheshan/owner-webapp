import { SET_ITEMS, SET_SELECTED_ITEM, ADD_ITEM, DELETE_ITEM } from '../actionTypes'

const initialState = {
    items: [],
    isLoading: true,
    selectedItem: null
}

export default function itemsReducer(state = initialState, action) {

    switch (action.type) {

        case SET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }

        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: action.payload
            }

        case ADD_ITEM:
            return {
                ...state,
                items: state.items.concat(action.payload)
            }

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload)
            }


        default:
            return state
    }

}