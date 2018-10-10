import * as types from '../constants/actionTypes';


export const requestFetchHasErrored = (state=false , action) =>{
    
    switch(action.type){
    
        case types.REQUESTS_FETCH_ERROR:
            return {...state,
                        requestFetchHasErrored:true
            }
        
        default:return state;
    }

}
export const requestsFetch = (state=[] , action) => {
    
    switch(action.type){
    
        case types.FETCH_REQUESTS_SUCCESS:
            return {...state,
                        requests:action.requests
            }
    
        default: return state;


    }
}

export const ticketFetchHasErrored = (state=false , action) => {

    switch(action.type){

        case types.TICKETS_FETCH_ERROR:
            return {...state ,
                        ticketFetchHasErrored:true}

        default :return state;
    }
}

export const ticketsFetch = (state=[],action) => {

    switch(action.type){

        case types.FETCH_TICKETS_SUCCESS:
            return {...state,
                        tickets:action.tickets
            }
        
        default : return state;
    }
}

export const addRequest = (state=[],action) => {
    
    switch(action.type){

        case types.ADD_REQUEST_SUCCESS:
            return [...state,
                        action.request
            ]
        
        default : return state;
    }
}
const adminNotificationsInitialState = {
    notifications:[],
    notificationsCount:0,
}
export const adminNotifications = (state=adminNotificationsInitialState,action) => {

    switch(action.type){
        case types.GET_ADMIN_NOTIFICATIONS_SUCCESS:
            return {...state,
                        notifications:action.notifications,
                        notificationsCount:action.notificationsCount
            }
        

        default : return state
    }
}

const errorsReducerInitialState = {
    nameError:false,
    descriptionError:false
}
export const errorsReducer =(state=errorsReducerInitialState , action)=>{

    switch(action.type){

        case types.SET_NAME_ERROR:
            return {
                ...state,
                    nameError:action.nameError
            }
        
        case types.SET_DESCRIPTION_ERROR:
            return {
                ...state,
                    descriptionError:action.descriptionError
            }

        default : return state;

    }
}