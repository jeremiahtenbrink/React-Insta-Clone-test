import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import styled from "styled-components";
import "./users.scss";

const UsersComponent = styled.div`
    position: relative;
    margin: 15rem 0 35rem 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    transform-origin: bottom;
    transform-style: preserve-3d;
    transform: rotateX(77deg);
    @media (max-width: 1000px) {
        margin-bottom: 20rem;
    }
    @media (max-width: 1200px) {
        margin-bottom: 24rem;
    }
    
    
`;

const User = styled.div`
    position: absolute;
    top: 50%;
    right: 45%;
    width: 10%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: translate( calc(${ props => props.x } * 25vw), calc(${ props => props.y } * 25vw));
    transition: all 1s;
    
    @media (max-width: 1200px) {
        transform: translate( calc(${ props => props.x } * 30vw), calc(${ props => props.y } * 30vw));
    }
`;

const Avatar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateX(-77deg);
    cursor: pointer;
    
    `;

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
        
        window.setInterval( () => {
            this.setState( ( state ) => {
                if( state.startingNumber >= 20 ) {
                    return { startingNumber: 1 };
                }else {
                    return { startingNumber: state.startingNumber + 1 };
                }
            } );
        }, 2000 );
    }
    
    render() {
        
        return (
            <Container className={ "users-container" }>
                <UsersComponent zRotation={ "135" }>
                    { this.state.users && this.state.users.map( ( user, index ) => {
                        return (
                            <User
                                key={ user.username }
                                x={ Math.cos( ( 18 * ( index + this.state.startingNumber ) *
                                    Math.PI / 180 ) ) }
                                y={ Math.sin( ( 18 * ( index + this.state.startingNumber ) *
                                    Math.PI / 180 ) ) }
                            >
                                <Avatar
                                    zRotation={ "135" }
                                >
                                    <Image
                                        src={ user.thumbnailUrl }
                                        avatar
                                        className={ `users-section` }
                                        onClick={ () => {
                                            
                                            this.props.filterByUser( user );
                                        } }
                                    />
                                    <span className="users-section__username">{ user.username }</span>
                                </Avatar>
                            
                            </User>
                        );
                    } ) }
                </UsersComponent>
            </Container>
        
        );
    }
}

export default Users;
