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
        debugger;
        let avatar = "";
        if( localStorage.getItem( "avatar" ) ) {
            avatar = localStorage.getItem( "avatar" );
        }else {
            avatar = Faker.fake( "{{image.avatar}}" );
        }
        
        if( localStorage.getItem( "rememberMe" ) ) {
            this.setState( {
                login: true,
                userName: localStorage.getItem( "rememberMe" ),
                avatar: avatar
            } );
        }
    }
    
    loginFun = ( username ) => {
        if( localStorage.getItem( "avatar" ) ) {
            debugger;
            this.setState( {
                login: true,
                userName: username,
                avatar: localStorage.getItem( "avatar" )
            } );
        }else {
            this.changeAvatar();
            debugger;
            this.setState( { login: true, userName: username } );
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
                changeAvatar={ this.changeAvatar }
            />
        );
        
    }
}

export default App;
