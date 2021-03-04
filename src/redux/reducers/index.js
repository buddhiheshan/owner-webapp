import { combineReducers } from 'redux';

import userReducer from './userReducer';
import propertyReducer from './propertyReducer';
import itemsReducer from './itemsReducer';
import robotsReducer from './robotsReducer';
import ordersReducer from './ordersReducer';
import reviewsReducer from './reviewsReducer';
import tablesReducer from './tablesReducer';

export default combineReducers({
    user: userReducer,
    property: propertyReducer,
    items: itemsReducer,
    robots: robotsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    tables: tablesReducer
});