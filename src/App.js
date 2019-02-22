import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import PostPage from "./components/PostPage/PostPage";
import authenticate from "./components/Authenticatoin/authenticate";
import Login from "./components/Login/Login";
import Faker from "faker";

const Auth = authenticate( PostPage )( Login );

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            login: false,
            userName: ""
        };
    }
    
    componentDidMount() {
        if( localStorage.getItem( "rememberMe" ) ) {
            this.setState( { login: true, userName: localStorage.getItem( "rememberMe" ) } );
        }
    }
    
    loginFun = ( username ) => {
        if( localStorage.getItem( "avatar" ) ) {
            this.setState( { login: true, username, avatar: localStorage.getItem( "avatar" ) } );
        }else {
            this.changeAvatar();
            this.setState( { login: true, username: username } );
        }
    };
    
    logoutFun = () => {
        localStorage.removeItem( "username" );
        localStorage.removeItem( "rememberMe" );
        this.setState( { login: false } );
    };
    
    changeAvatar = () => {
        let avatar = Faker.fake( "{{image.avatar}}" );
        localStorage.setItem( "avatar", avatar );
        this.setState( { avatar } );
    };
    
    render() {
        return (
            <Auth
                loginFun={ this.loginFun }
                login={ this.state.login }
                logoutFun={ this.logoutFun }
                userName={ this.state.userName }
                avatar={ this.state.avatar }
            />
        );
        
    }
}

export default App;
