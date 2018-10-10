import React from 'react';
import {connect} from 'react-redux';
import {fetchRequest} from '../actions/userActions'
import Shelf from './Shelf'
import { Segment , Header , Icon ,Modal , Button} from 'semantic-ui-react';
import RequestForm from './RequestForm'

class RequestList extends React.Component{

    componentDidMount(){
        this.props.fetchRequests();  
        console.log(this.props.cards)  
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
                <Header as='h3' >
                    <span style={style}>
                        <span>
                            <Icon name='question' />

                            <Header.Content>درخواست ها </Header.Content>
                        </span>
                       
                        <Header.Content>
                            <Modal trigger={<Button primary>درخواست تیکت</Button>} centered closeIcon>
                                    <Modal.Content >
                                        <RequestForm />
                                    </Modal.Content>
                                </Modal>
                                
                        </Header.Content>
                    </span>
                    
                </Header>
                <br></br>
                {(this.props.requests) && 
                            <Shelf 
                                cards= {this.props.requests}
                            />
                }
            </Segment>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        requests:state.requestsFetch.requests 

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchRequests : () => dispatch(fetchRequest())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RequestList);