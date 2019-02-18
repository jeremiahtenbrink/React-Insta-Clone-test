import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import dummyData from "./dummy-data";
import PostContainer from "./components/PostContainer/PostContainer";

class App extends Component {
    render() {
        return (
            <div>
                <SearchBar />
                { dummyData && dummyData.map( ( data ) => {
                    return <PostContainer post={ data } />;
                } ) }
            </div>
        
        );
    }
}

export default App;
