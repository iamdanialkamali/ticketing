import React from 'react' ;
import TicketList from './TicketList';
import RequsetList from './RequestList';
import {Grid,Segment, Sidebar, Menu , Label ,Icon} from 'semantic-ui-react'
import NotificationsList from './NotificationsList'
import {getAdminNotifications} from '../actions/userActions'
import {connect} from 'react-redux' ;

class Panel extends React.Component{
    state = { 
        visible: false ,
        notificationsCount:0
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
  
    handleSidebarHide = () => this.setState({ visible: false })
  
    componentDidMount(){
        this.props.getAdminNotifications()
        console.log('panel mounted and notifs are : ' ,this.props.notifications)
    }     
    render(){
        const style={
            display:'flex',
            justifyContent:'space-between'
        }

        const sidebarStyle = {
            backgroundColor:'#d7e3f7'
        }
        const { visible } = this.state

        return(
            <Grid centered>
                <Grid.Column computer={14} mobile={16}> 
                    <span style={style}>
                        
                        <Label
                            
                            onClick={this.handleButtonClick}
                            
                        >
                            <Icon name='inbox' size="large"/> {this.props.notificationsCount}
                        </Label>

                        <Label color="blue">
                            امیرحسین اسدی
                        </Label>
                    </span>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            style={sidebarStyle}
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            onHide={this.handleSidebarHide}
                            vertical
                            visible={visible}
                            width='wide'
                            direction="right"
                        >
                            
                            <NotificationsList/>
                            
                        </Sidebar>
                        <Sidebar.Pusher dimmed={visible} >
                            <Segment raised padded>
                                <RequsetList
                                  title="درخواست ها"
                                />
                                <br></br>
                                <TicketList
                                    title="تیکت ها"
                                />
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                 
                </Grid.Column>
            </Grid>
        )
    }
}
const mapStateToProps = (state) => {
    
    console.log(state)
    return{
        notificationsCount:state.adminNotifications.notificationsCount
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return{
        getAdminNotifications : () => dispatch(getAdminNotifications())
    }
} 


export default connect(mapStateToProps,mapDispatchToProps)(Panel)  ;