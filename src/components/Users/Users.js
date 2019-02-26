import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import styled from "styled-components";
import "./users.scss";

const UsersComponent = styled.div`
    position: relative;
    margin: 14rem 0 17rem 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    transform-origin: bottom;
    transform-style: preserve-3d;
    transform: rotateX(74deg);
    
    
    @media (min-width: 1200px) {
        transform: rotateX(65deg)
    }
    @media (max-width: 1200px) {
        margin-bottom: 13rem;
        
    }
    @media (max-width: 1000px) {
        margin-bottom: 20rem;
    }
    @media (max-width: 768px) {
      transform: rotateX(74deg) translateX(0) translateY(300px) translateZ(0);
    }
    
    
    
    
`;

const User = styled.div`
    position: absolute;
    top: 50%;
    right: 45%;
    width: 10%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: translate( calc(${ props => props.x } * 28vw), calc(${ props => props.y } * 28vw));
    transition: all 1s;
   
    @media (max-width: 1400px) {
        transform: translate( calc(${ props => props.x } * 30vw), calc(${ props => props.y } * 30vw));
    }
    
    @media (max-width: 1000px) {
        transform: translate( calc(${ props => props.x } * 35vw), calc(${ props => props.y } * 35vw));
    }
    @media (max-width: 768px) {
        transform: translate( calc(${ props => props.x } * 50vw), calc(${ props => props.y } * 50vw));
    }
    
    @media (max-width: 500px) {
      transform: translate( calc(${ props => props.x } * 250px), calc(${ props => props.y } * 250px));
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
    transform: rotateX(-74deg);
    
    @media (min-width: 1200px) {
        transform: rotateX(-65deg)
    }
    @media (max-width: 768px) {
        width: 4rem;
        height: 4rem;
    }
    
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
                <UsersComponent>
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
