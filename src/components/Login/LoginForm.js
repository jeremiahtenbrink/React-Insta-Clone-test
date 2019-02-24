import React, { Component } from "react";
import { Modal, Form, Checkbox, Input, Message, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

class LoginForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            state: "warning",
            form: "login",
            open: true,
            username: "",
            password: "",
            message: "Use blank username and password to generate random username or register" +
                " your own username and password to be able to log in and out." +
                " Username and" +
                " password is stored in local storage for purposes of demonstration only. Do not" +
                " enter your real password!",
            messageHeader: "Attention",
            rememberMe: false
        };
    }
    
    handleChecked = e => {
        this.setState( { rememberMe: !this.state.rememberMe } );
    };
    
    handleChange = ( e ) => {
        debugger;
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    handleSubmit = e => {
        if(this.state.form === "login"){
        
        }
    };
    
    render() {
        return (
            <Modal
                open={ this.state.open }
                size={ "tiny" }
            >
                <Modal.Header>Login Form</Modal.Header>
                <Modal.Content>
                    <Form className={ this.state.state }>
                        <Form.Field className={ this.state.state }>
                            <label>User Name</label>
                            <Input
                                placeholder='User Name'
                                onChange={ this.handleChange }
                                name={ "username" } />
                        </Form.Field>
                        <Form.Field className={ this.state.state }>
                            <label>Password</label>
                            <input
                                placeholder='Password'
                                onChange={ this.handleChange }
                                name="password" />
                        </Form.Field>
                        <Form.Field className={ this.state.state }>
                            <Checkbox
                                label="Remember Me"
                                onChange={ this.handleChecked }
                                name={ "rememberMe" }
                                checked={ this.state.rememberMe }
                                toggle
                            />
                        </Form.Field>
                        { this.state.message &&
                        <Message
                            className={ this.state.state }
                            header={ this.state.messageHeader }
                            content={ this.state.message }
                        /> }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button primary>Register</Button>
                        <Button.Or />
                        <Button positive>Submit</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default LoginForm;
