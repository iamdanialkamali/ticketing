import * as types from '../constants/actionTypes';
import Api from '../api/api'
export const fetchRequestsSuccess = (requests) => {
    return {
        type:types.FETCH_REQUESTS_SUCCESS,
        requests:requests
    }
}
export const requestsFetchError = (bool) =>{
    return{
        type:types.REQUESTS_FETCH_ERROR,
        requestsFetchError:bool
    }
}
export const fetchTicketsSuccess = (tickets) => {
    return {
        type:types.FETCH_TICKETS_SUCCESS,
        tickets:tickets
    }
}

export const ticketsFetchError = (bool) => {
    return {
        type:types.TICKETS_FETCH_ERROR,
        ticketsFetchError:bool
    }
}

export const addRequestSuccess = (request) => {
    return {
        type:types.ADD_REQUEST_SUCCESS,
        request:request
    }
}

export const setNameError = (text) => {
    return {
        type : types.SET_NAME_ERROR,
        nameError:text
    }
}

export const setDescriptionError = (text) => {
    return {
        type : types.SET_DESCRIPTION_ERROR,
        descriptionError:text
    }
}

export const getAdminNotificationsSuccess = (notifications , notificationsCount) => {
    return {
        type : types.GET_ADMIN_NOTIFICATIONS_SUCCESS,
        notifications:notifications,
        notificationsCount:notificationsCount
    }
}

export const setAdminNotificationStatusSuccess = () => {
    return {
        type : types.SET_ADMIN_NOTIFICATION_STATUS_SUCCESS
    }
}
export const fetchRequest = () => {
    return function(dispatch){
        return Api.getRequests()
                        .then((response) => {
                            if(response){
                                //console.log('response from get requests : ' , response);
                                console.log(response)
                                dispatch(fetchRequestsSuccess(response))
                            }else{
                                //console.log('fetch request error')
                                dispatch(requestsFetchError(true));
                            }
                        }).catch((error) => {
                            throw (error)
                        });
    }
}

export const fetchTicket = () => {
    return function(dispatch){
        return Api.getTickets()
                        .then((response) => {
                            if(response){
                                dispatch(fetchTicketsSuccess(response))
                            }else{
                                dispatch(ticketsFetchError(true));
                            }
                        })
    }
}

export const addRequest = (credentials) => {
    return function(dispatch){
        return Api.addRequest(credentials)
                    .then((response) => {
                        if(response){
                            console.log('response from add request : ',response);
                            dispatch(addRequestSuccess(response))
                            dispatch(fetchRequest())
                            dispatch(getAdminNotifications())
                        }else{
                            console.log('add request error')
                        }
                    })
    }
}

export const getAdminNotifications = () =>{
    return function(dispatch){
        return Api.getAdminNotifications()
                        .then((response) => {
                            if(response){
                                console.log('response from getAdminNotifs: ',response)
                                let notificationsCount = 0
                                response.forEach(notification => {
                                    if(!notification.seen){notificationsCount ++}
                                });
                                dispatch(getAdminNotificationsSuccess(response , notificationsCount))
                            }
                            else{
                                console.log('error in getAdminNotifications .')
                            }
                        })
    }
}

export const setAdminNotificationStatus = (notifID) => {
    return function(dispatch){
        return Api.setAdminNotificationStatus(notifID)
                        .then((response) => {
                            if(response){
                                console.log('response from setAdminNotification : ',response)
                                dispatch(getAdminNotifications())
                            }else{
                                console.log('error in setAdminNotificationStatus')
                            }
                        })
    }
}
