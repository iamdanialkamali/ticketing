import React from 'react'
import { Icon ,Card} from 'semantic-ui-react';

class Notification extends React.Component{
    
    render(){
       if(!this.props.seen){

            return(       
                <Card raised color="red">
                    <Card.Content textAlign="right" header={this.props.user} />
                    <Card.Content textAlign="right" description={this.props.description} />
                    <Card.Content textAlign="right" extra>
                        <Icon name='calendar alternate' />
                        {this.props.time}
                    </Card.Content>   
                </Card>
            )
       }else{
           
            return(
                    
                <Card raised >
                    <Card.Content textAlign="right" header={this.props.user} />
                    <Card.Content textAlign="right" description={this.props.description} />
                    <Card.Content textAlign="right" extra>
                        <Icon name='calendar alternate' />
                        {this.props.time}
                    </Card.Content>   
                </Card>
            )   
       }
         
    }
}

export default Notification;