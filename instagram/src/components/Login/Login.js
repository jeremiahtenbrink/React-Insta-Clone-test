import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Segment } from "semantic-ui-react";
import "./login.scss";

const Login = ( props ) => {
        
        return (
            <Container>
                <Segment className={ "login-form" }>
                    <Form onSubmit={ props.loginFun }>
                        <Form.Field>
                            <label>Username</label>
                            <input placeholder="username" />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder="password" />
                        </Form.Field>
                        <Button type={ "submit" }>Submit</Button>
                    </Form>
                </Segment>
            
            </Container>
        
        );
        
    }
;

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
