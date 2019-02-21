import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

const FormElement = ( props ) => {
    
    if( props.error ) {
        return (
            <Form error onSubmit={ e => props.submit( e ) }>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder="username" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder="password" type="password" />
                    <Message
                        error
                        header={ props.errorHeader }
                        content={ props.errorMessage }
                    />
                </Form.Field>
                <Form.Checkbox label='Remember Me' />
                <Button type={ "submit" } className="login-button">Submit</Button>
            </Form>
        );
    }else {
        return (
            <Form onSubmit={ e => props.submit( e ) }>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder="username" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder="password" type="password" />
                
                </Form.Field>
                <Form.Checkbox label='Remember Me' />
                <Button type={ "submit" } className="login-button">Submit</Button>
            </Form>
        );
    }
    
};

export default FormElement;