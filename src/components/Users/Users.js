import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import "./users.scss";
import PropTypes from "prop-types";

class Users extends Component {
    constructor( props ) {
        super( props );
        let users = [];
        if( localStorage.hasOwnProperty( "usres" ) ) {
            users = JSON.parse( localStorage.getItem( "users" ) );
        }
        this.state = {
            startingNumber: 0,
            users
        };
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ) {
        if( !this.state.users ) {
            if( localStorage.hasOwnProperty( "users" ) ) {
                let users = JSON.parse( localStorage.getItem( "users" ) );
                this.setState( { users } );
            }
        }
    }
    
    componentDidMount() {
        if( this.state.users.length === 0 ) {
            let users = JSON.parse( localStorage.getItem( "users" ) );
            this.setState( { users } );
        }
    }
    
    render() {
        
        debugger;
        return (
            <Container className={ "users-container" }>
                <div className="users">
                    { this.state.users && this.state.users.map( ( user, index ) => {
                        return (
                            <div className="user" key={ user.username }>
                                <div
                                    className={ `avatar avatar-` + ( index < 10 ? ( 20 - index ) :
                                        ( index - 9 ) ) }>
                                    <Image
                                        src={ user.thumbnailUrl }
                                        avatar
                                        className={ `users-section` }
                                        onClick={ () => {
                                            debugger;
                                            this.props.filterByUser( user );
                                        } }
                                    />
                                    <span className="users-section__username">{ user.username }</span>
                                </div>
                            
                            </div>
                        );
                    } ) }
                </div>
            </Container>
        
        );
    }
}

export default Users;
