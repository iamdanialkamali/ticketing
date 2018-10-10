import {combineReducers} from 'redux';
import {adminNotifications,errorsReducer,addRequest,requestFetchHasErrored,requestsFetch,ticketFetchHasErrored,ticketsFetch} from './userReducer'
const rootReducer = combineReducers({
    requestsFetch,
    requestFetchHasErrored,
    ticketFetchHasErrored,
    ticketsFetch,
    addRequest,
    errorsReducer,
    adminNotifications
})

export default rootReducer;