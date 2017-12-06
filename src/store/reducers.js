import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import {shopReducer as shop} from 'route/Shop';

export default combineReducers({
    reouter: routerReducer,
    shop
});
