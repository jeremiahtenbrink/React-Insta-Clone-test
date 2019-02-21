import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import PostPage from "./components/PostPage/PostPage";
import authenticate from "./components/Authenticatoin/authenticate";
import Login from "./components/Login/Login";

const Auth = authenticate( PostPage )( Login );

class App extends Component {
    constructor( props ) {
        debugger;
        super( props );
        this.state = {
            login: false,
            userName: ""
        };
    }
    
    componentDidMount() {
        if( localStorage.getItem( "rememberMe" ) ) {
            debugger;
            this.setState( { login: true, userName: localStorage.getItem( "rememberMe" ) } );
        }
    }
    
    loginFun = ( username ) => {
        this.setState( { login: true, username } );
    };
    
    logoutFun = () => {
        localStorage.removeItem( "username" );
        localStorage.removeItem( "rememberMe" );
        this.setState( { login: false } );
    };
    
    render() {
        return (
            <Auth
                loginFun={ this.loginFun }
                login={ this.state.login }
                logoutFun={ this.logoutFun }
                userName={ this.state.userName }
            />
        );
        
    }
}

export default App;
