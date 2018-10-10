import React from 'react'
import { Card, Grid, Button, Icon, Label} from 'semantic-ui-react'

class Shelf extends React.Component{
    state={
      items:[],
      firstCounter:0,
      secondCounter:6
    }    

    fetchItems =() => {
      const items=[]
      
      this.props.cards.slice(this.state.firstCounter , this.state.secondCounter).map((item) =>{
          items.push({
            key:item.id,
            header:item.user_id,
            description:item.desc,
            priority:item.priority 
          })
      })
      this.setState(() => ({
        items:items
      }))

    }

    componentDidMount(){
      this.fetchItems()

    }

    showMore = () => {
        
      this.setState((prevState)=>{
          
          if (prevState.secondCounter  === this.props.cards.length){
              console.log('second')
              return {
                  firstCounter:0,
                  secondCounter:6               }
          }
          else if (prevState.secondCounter + 6 > this.props.cards.length){
              console.log('first')
              return {
                  firstCounter:prevState.secondCounter,
                  secondCounter:this.props.cards.length               }
          }
          else{
              console.log('third')
              return{
                  firstCounter:prevState.secondCounter,
                  secondCounter:prevState.secondCounter+6
                  
              }
          }
         
       })
       this.fetchItems()
  }  
  render(){
    console.log('items are : ' ,this.state.items)

    return(
        
          <Grid  centered> 
            <br></br>
            {this.state.items.map((item)=> (
                <Grid.Column computer={4} mobile={16}>
                  <Card raised color="blue" centered>
                      {item.priority &&
                        <Label  as='a' corner="left" color="grey" size="small">
                            <Icon name="star" color="blue"></Icon>
                        </Label>
                      }
                      <Card.Content textAlign="right" header={item.header} />
                      <Card.Content textAlign="right" description={item.description} />
                      <Card.Content textAlign="right" extra>
                          <Icon name='calendar alternate' />
                          1397/4/2
                      </Card.Content>   
            
                  </Card>  
                </Grid.Column>
            ))}
            <Grid.Row centered>
              <Grid.Column computer={2} mobile={5}>
                  <Button  primary onClick={this.showMore}>بیشتر</Button>        
              </Grid.Column>
            </Grid.Row>
          </Grid>
    )
  }
}


export default Shelf