import React from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
import Notification from './Notification'
import {getAdminNotifications , setAdminNotificationStatus} from '../actions/userActions'
class NotificationsList extends React.Component{
    componentDidMount(){
        this.props.getAdminNotifications()
        console.log('notification-list mounted and notifs are : ' ,this.props.notifications)
    }
    
    render(){
        return(
            <div>
                {this.props.notifications &&  this.props.notifications.map((notification) => {
                    if(!notification.seen){
                        return(
                            <Menu.Item
                                onClick={() => {this.props.setAdminNotificationStatus(notification.id)}}
                            >
                                <Notification
                                    user={notification.user_id}
                                    description="شما یک اعلان خوانده نشده دارید"
                                    time={notification.time}
                                    
                                />
                            </Menu.Item>
                        )
                    }
                })}
            </div>
           
        )
    }

    
}

const mapStateToProps = (state) => {
    
    console.log(state)
    return{
        notifications:state.adminNotifications.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return{
        getAdminNotifications : () => dispatch(getAdminNotifications()),
        setAdminNotificationStatus : (id) => dispatch(setAdminNotificationStatus(id))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(NotificationsList)