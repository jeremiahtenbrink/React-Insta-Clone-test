import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import dummyData from "./dummy-data";
import PostContainer from "./components/PostContainer/PostContainer";
import Faker from "faker";
import Moment from "moment";

class App extends Component {
    constructor( props ) {
        super( props );
        // posts is a array of post objects. Stored in state.data
        this.state = {
            data: []
        };
    }
    
    setDataStorage = ( post ) => {
        
        //Store the new data being set up from post container.
        this.state.data.forEach( ( dataPost ) => {
            if( dataPost.username === post.username ) {
                dataPost = post;
            }
        } );
        
        localStorage.setItem( "posts", JSON.stringify( this.state.data ) );
        
    };
    
    componentDidMount() {
        //check if we have local storage data. Use local storage data if we have.
        if( localStorage.getItem( "posts" ) ) {
            
            //get data from storage
            let data = JSON.parse( localStorage.getItem( "posts" ) );
            
            //sort data by timestamp
            data.sort( ( a, b ) => {
                if( Moment( a.timestamp ).isBefore( Moment( b.timestamp ) ) ) {
                    return 1;
                }else {
                    return -1;
                }
            } );
            //set it as state and then return;
            this.setState( { data } );
            
            return;
        }
        
        // sort the data array by timestamp the post was created.
        let data = dummyData.sort( ( a, b ) => {
            if( !a.edited ) {
                a.timestamp = Faker.fake( "{{date.past}}" );
                a.edited = true;
            }
            
            if( !b.edited ) {
                b.timestamp = Faker.fake( "{{date.past}}" );
                b.edited = true;
            }
            
            if( Moment( a ).isBefore( Moment( b ) ) ) {
                return 1;
            }else {
                return -1;
            }
        } );
        
        this.setState( { data } );
    }
    
    handleSearch = ( e ) => {
        let word = e.target.value;
        let posts = JSON.parse( localStorage.getItem( "posts" ) );
        posts = posts.filter( ( post ) => post.username.includes( word ) );
        this.setState( { data: posts } );
        
    };
    
    render() {
        return (
            <div>
                <SearchBar handleSearch={ this.handleSearch } />
                {/*if we have state data then map over it and create a PostContainer for each post*/ }
                { this.state.data && this.state.data.map( ( data ) => {
                    return <PostContainer
                        key={ data.username }
                        post={ data }
                        setDataStorage={ this.setDataStorage } />;
                } ) }
            </div>
        
        );
    }
}

export default App;
