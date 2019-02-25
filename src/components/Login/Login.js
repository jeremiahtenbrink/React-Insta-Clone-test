import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Form, Checkbox, Message, Modal } from "semantic-ui-react";
import "./login.scss";
import { savePassword, checkPassword } from "../Bcrypt/bcrypt";
import Faker from "faker";

class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.formMessage =
            "Use blank username and password to generate random username or register" +
            " your own username and password to be able to log in and out." +
            " Username and" +
            " password is stored in local storage for purposes of demonstration only. Do not" +
            " enter your real password!";
        
        this.state = {
            state: "warning",
            form: "login",
            open: true,
            username: "",
            password: "",
            message: this.formMessage,
            messageHeader: "Attention",
            rememberMe: false
        };
    }
    
    handleRememberMeToggle = e => {
        this.setState( { rememberMe: !this.state.rememberMe } );
    };
    
    handleChange = ( e ) => {
        
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    handleSubmit = () => {
        this.setState( { state: "loading" } );
        if( this.state.form === "login" ) {
            this.checkLoginDetails();
        }else {
            this.registerUser();
        }
    };
    
    changeForm = () => {
        if( this.state.form === "login" ) {
            this.setState( {
                form: "register",
                message: this.formMessage,
                messageHeader: "Attention",
                state: "warning"
            } );
        }else {
            this.setState( {
                form: "login",
                message: this.formMessage,
                messageHeader: "Attention",
                state: "warning"
            } );
        }
    };
    
    registerUser = () => {
        
        let username = this.state.username;
        let password = this.state.password;
        
        if( password.length > 0 && username.length > 0 ) {
            savePassword( username, password );
            this.setState( {
                form: "login",
                state: "warning",
                message: this.formMessage,
                messageHeader: "Attention"
            } );
        }else {
            this.setState( {
                state: "error",
                message: "Please enter a valid username and password for registration",
                messageHeader: "Error"
            } );
        }
        
    };
    
    checkLoginDetails = () => {
        this.setState( { state: "loading" } );
        const rememberMe = this.state.rememberMe;
        let username = this.state.username;
        let password = this.state.password;
        let timeout = null;
        
        if( username === "" ) {
            username = Faker.fake( "{{internet.userName}}" );
            password = "blank";
            
            savePassword( username, password );
        }
        
        if( password === "" ) {
            password = "blank";
        }
        
        timeout = window.setInterval( () => {
            this.checkPassword( username, password, rememberMe, timeout );
        }, 100 );
        
    };
    
    checkPassword = ( username, password, rememberMe, timeout ) => {
        checkPassword( username, password, ( error, res ) => {
            
            if( res === true ) {
                if( rememberMe ) {
                    localStorage.setItem( "rememberMe", username );
                }
                
                if( timeout ) {
                    window.clearInterval( timeout );
                }
                
                this.props.loginFun( username );
            }else {
                if( error ) {
                    
                    this.setState( {
                        state: "error",
                        message: "Could not find username",
                        messageHeader: "Error"
                    } );
                }else {
                    this.setState( {
                        state: "error",
                        message: "Invalid password.",
                        messageHeader: "Password"
                    } );
                }
            }
        } );
    };
    
    render() {
        return (
            <Modal
                open={ this.state.open }
                size={ "tiny" }
            >
                <Modal.Header>{ ( this.state.form === "login" ? "Login form" :
                    "Registration form" ) }</Modal.Header>
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
                                onChange={ this.handleRememberMeToggle }
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
                        <Button onClick={ this.changeForm } primary>{ ( this.state.form ===
                        "login" ? "Register" : "Login" ) }</Button>
                        <Button.Or />
                        <Button onClick={ this.handleSubmit } positive>Submit</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        );
    }
}

Login.propTypes = {
    loginFun: PropTypes.func
};
Login.defaultProps = {};

export default Login;
