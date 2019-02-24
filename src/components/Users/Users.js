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
    
    componentDidMount() {
        if( this.state.users.length === 0 ) {
            let users = JSON.parse( localStorage.getItem( "users" ) );
            this.setState( { users } );
        }
    }
    
    render() {
        debugger;
        let arrayU = [];
        if( this.state.users.length > 0 ) {
            for( let i = 0; i < 10; i++ ) {
                let number = this.state.startingNumber + i;
                if( number >= 20 ) {
                    number = number - 20;
                }
                arrayU.push( this.state.users[ number ] );
                
            }
        }
        
        return (
            <Container>
                <div className="users">
                    { arrayU.map( ( user, index ) => {
                        return (
                            <div className="user">
                                <div className={ `avatar avatar-${ index + 1 }` }>
                                    <Image
                                        src={ user.thumbnailUrl }
                                        avatar
                                        className={ "users-section" }
                                        onClick={ () => {
                                            debugger;
                                            this.props.filterByUser( user );
                                        } }
                                    />
                                    <span>{ user.username }</span>
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
