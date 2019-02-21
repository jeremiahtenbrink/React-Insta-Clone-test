import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Segment, Message } from "semantic-ui-react";
import "./login.scss";
import { savePassword, checkPassword } from "../Bcrypt/bcrypt";
import FormElement from "./FormElement";

class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            login: true,
            error: false,
            errorMessage: "",
            errorHeader: "",
        };
    }
    
    changeState = () => {
        this.setState( ( state ) => ( { login: !state.login } ) );
    };
    
    registerUser = ( e ) => {
        debugger;
        let username = e.target[ 0 ].value;
        let password = e.target[ 1 ].value;
        
        if( password.length > 0 ) {
            savePassword( username, password );
        }
        this.setState( { login: "login" } );
    };
    
    checkLoginDetails = ( e ) => {
        debugger;
        const rememberMe = e.target[ 2 ].checked;
        const username = e.target[ 0 ].value;
        const password = e.target[ 1 ].value;
        checkPassword( username, password, ( error, res ) => {
            debugger;
            if( res === true ) {
                if( rememberMe ) {
                    localStorage.setItem( "rememberMe", username );
                }
                this.props.loginFun( username );
            }else {
                if( error ) {
                    debugger;
                    this.setState( {
                        error: true,
                        errorMessage: "Could not find username",
                        errorHeader: "Error"
                    } );
                }else {
                    this.setState( {
                        error: true,
                        errorMessage: "Invalid password.",
                        errorHeader: "Password"
                    } );
                }
            }
        } );
    };
    
    render() {
        
        if( this.state.login ) {
            return (
                <Container className={ "login-container" }>
                    <Segment className={ "login-form" }>
                        <FormElement
                            submit={ this.checkLoginDetails }
                            error={ this.state.error }
                            errorHeader={ this.state.errorHeader }
                            errorMessage={ this.state.errorMessage } />
                        <Button
                            onClick={ this.changeState }
                            className="register-button">Register</Button>
                    </Segment>
                </Container>
            );
        }else {
            return (
                <Container className={ "login-container" }>
                    <Segment className={ "login-form" }>
                        <Form onSubmit={ this.registerUser }>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder="username" />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder="password" type="password" />
                            </Form.Field>
                            <Button type={ "submit" } className="login-button">Submit</Button>
                        </Form>
                        <Button
                            className="register-button"
                            onClick={ this.changeState }
                        >Login</Button>
                    </Segment>
                </Container>
            );
        }
    }
}

Login.propTypes = {
    loginFun: PropTypes.func
};
Login.defaultProps = {};

export default Login;
