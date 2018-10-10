import React from 'react';
import {connect} from 'react-redux';
import {addRequest,setNameError,setDescriptionError} from '../actions/userActions'
import {Checkbox,Button,Form,Message, Grid } from 'semantic-ui-react';


class RequestForm extends React.Component{
    
    state={
        credentials :{
            urgent:false ,
            description:''
        },
        addRequestSuccess:false
    }


    onDescriptionChange = (e) => {
        
        const description = e.target.value ;
        let credentials = this.state.credentials ;
        credentials.description = description ;
        this.setState(() => ({credentials : credentials}))
    }

    descriptionValidation = (e) => {
        let description = this.state.credentials.description;
        if(description.length < 1){
            this.props.setDescriptionError('رمز عبور نباید خالی باشد .')
            return false
            
        }else{
            this.props.setDescriptionError('')
            return true
        }
    }
    onUrgentChange =() => {
       let credentials = this.state.credentials ;
       credentials.urgent = !credentials.urgent
       this.setState(() => ({credentials : credentials}))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.descriptionValidation()){
            this.props.addRequest(this.state.credentials)
            this.setState(() => ({addRequestSuccess:true}))
        }          
    }
    render(){
        const styles={
        }
        return(
            <div style={styles}>
                <Grid  centered columns={2}>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column>
                            {this.state.addRequestSuccess ? (
                                <Message 
                                    success
                                    content = "تیکت شما با موفقیت ثبت شد ."
                                />
                            ):(
                                <Form onSubmit={this.onSubmit}>
                                    <br></br>
                                    <Form.Field>
                                        <Form.Input
                                            fluid
                                            label="توضیحات"
                                            name="description"
                                            onBlur={this.descriptionValidation}
                                            value={this.state.credentials.description}
                                            onChange={this.onDescriptionChange}
                                        />
                                        {this.props.descriptionError && (
                                            <Message
                                                negative
                                                content={this.props.descriptionError}
                                                />    
                                        )}
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <Checkbox 
                                            label='فوری' 
                                            onClick={this.onUrgentChange}
                                        />
                                    </Form.Field>
                                    <Button primary type='submit'>Submit</Button>

                                </Form>
            
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        nameError : state.errorsReducer.nameError,
        descriptionError : state.errorsReducer.descriptionError
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addRequest : (credentials) => dispatch(addRequest(credentials)),
        setNameError : (text) => dispatch(setNameError(text)),
        setDescriptionError : (text) => dispatch(setDescriptionError(text))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RequestForm);