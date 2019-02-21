import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import dummyData from "./dummy-data";
import PostContainer from "./components/PostContainer/PostContainer";
import Faker from "faker";
import Moment from "moment";
import Fuse from "fuse.js";
import generateDummy from "./generateDummyData";
import { Divider } from "semantic-ui-react";
import PostPage from "./components/PostPage/PostPage";
import authenticate from "./components/Authenticatoin/authenticate";
import Login from "./components/Login/Login";

const Auth = authenticate( PostPage )( Login );

class App extends Component {
    constructor( props ) {
        debugger;
        super( props );
        this.state = {
            login: false
        };
    }
    
    componentDidMount() {
        if( localStorage.getItem( "username" ) ) {
            this.setState( { login: true } );
        }
    }
    
    loginFun = ( e ) => {
        debugger;
        const username = e.target[ 0 ].value;
        localStorage.setItem( "username", username );
        this.setState( { login: true } );
    };
    
    logoutFun = () => {
        localStorage.removeItem( "username" );
        this.setState( { login: false } );
    };
    
    render() {
        return (
            <Auth
                loginFun={ this.loginFun }
                login={ this.state.login }
                logoutFun={ this.logoutFun } />
        );
        
    }
}

export default App;
