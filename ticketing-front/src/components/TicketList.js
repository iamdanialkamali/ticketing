import React from 'react';
import {connect} from 'react-redux';
import {fetchTicket} from '../actions/userActions';
import Shelf from './Shelf';
import { Segment , Header ,Icon } from 'semantic-ui-react';

class TicketList extends React.Component{
    componentDidMount(){
        this.props.fetchTickets();
    }
   
   
    render(){
        const style={
            display:'flex',
            justifyContent:'space-between'
        }
        return(
            <Segment 
                stacked
                padded
                color="blue"
            >
                <Header as='h3' style={style}>
                        <span><Icon size="large" name='ticket alternate' /> <Header.Content>تیکت ها</Header.Content></span>           
                </Header>
                <br></br>
                {(this.props.tickets) && 
                    <Shelf 
                        cards= {this.props.tickets}
                    />
                }

          </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        tickets:state.ticketsFetch.tickets

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchTickets : () => dispatch(fetchTicket())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TicketList);