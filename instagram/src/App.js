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

class App extends Component {
    constructor( props ) {
        super( props );
        // posts is a array of post objects. Stored in state.data
        this.state = {
            data: [],
            page: 1,
            storeData: false,
        };
    }
    
    editPostDataStorage = ( post ) => {
        
        //Store the new data being set up from post container.
        this.state.data.forEach( ( dataPost ) => {
            if( dataPost.username === post.post.username ) {
                dataPost = post.post.post;
            }
        } );
        
        this.storeData();
        
    };
    
    storeData = () => {
        let i = 0;
        let pageNumber = 0;
        let storage = [];
        while( i < this.state.data.length ) {
            let remainder = storage.length % 20;
            if( storage.length !== 0 && ( storage.length % 20 ) === 0 ) {
                if( pageNumber !== 0 ) {
                    localStorage.setItem( `posts${ pageNumber }`, JSON.stringify( storage ) );
                }else {
                    localStorage.setItem( `posts`, JSON.stringify( storage ) );
                }
                storage = [];
                pageNumber++;
            }
            
            storage.push( this.state.data[ i ] );
            i++;
        }
        
        if( storage.length % 20 !== 0 || storage.length === 20 ) {
            if( pageNumber > 0 ) {
                localStorage.setItem( `posts${ pageNumber }`, JSON.stringify( storage ) );
            }else {
                localStorage.setItem( "posts", JSON.stringify( storage ) );
            }
        }
    };
    
    loadMore = () => {
        if( localStorage.hasOwnProperty( `posts${ this.state.page }` ) ) {
            let more = JSON.parse( localStorage.getItem( `posts${ this.state.page }` ) );
            more = this.sortPosts( more );
            
            this.setState( ( state ) => ( {
                data: [ ...state.data, ...more ],
                page: ( state.page + 1 )
            } ) );
            return;
        }
        
        let more = generateDummy( 20 );
        this.setState( ( state ) => ( { data: [ ...state.data, ...more ], storeData: true } ) );
        
    };
    
    componentDidUpdate( prevProps, prevState, snapshot ) {
        if( this.state.storeData ) {
            this.storeData();
            this.setState( { storeData: false } );
        }
    }
    
    componentDidMount() {
        //check if we have local storage data. Use local storage data if we have.
        if( localStorage.hasOwnProperty( "posts" ) ) {
            
            //get data from storage
            let data = JSON.parse( localStorage.getItem( "posts" ) );
            
            if( data.length < 20 ) {
                let dummy = generateDummy( 20 );
                dummy.forEach( ( post ) => {
                    data.push( post );
                } );
            }
            //sort data by timestamp
            data = this.sortPosts( data );
            //set it as state and then return;
            this.setState( { data } );
            
            return;
        }
        
        // sort the data array by timestamp the post was created.
        let data = this.sortPosts( dummyData );
        
        this.setState( { data } );
    }
    
    sortPosts( posts ) {
        posts.sort( ( a, b ) => {
            if( !a.edited ) {
                a.timestamp = Faker.fake( "{{date.past}}" );
                a.edited = true;
            }
            
            if( !b.edited ) {
                b.timestamp = Faker.fake( "{{date.past}}" );
                b.edited = true;
            }
            
            if( Moment( a.timestamp ).isBefore( Moment( b.timestamp ) ) ) {
                return 1;
            }else {
                return -1;
            }
        } );
        
        return posts;
    }
    
    handleSearch = ( e ) => {
        let word = e.target.value;
        
        if( e.target.value === "" ) {
            let results = JSON.parse( ( localStorage.getItem( "posts" ) ) );
            this.setState( { data: results } );
            return;
        }
        
        let posts = JSON.parse( localStorage.getItem( "posts" ) );
        
        var options = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "username",
            ]
        };
        var fuse = new Fuse( posts, options ); // "list" is the item array
        var result = fuse.search( word );
        debugger;
        
        this.setState( { data: result } );
        
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
                        setDataStorage={ this.editPostDataStorage } />;
                } ) }
                <Divider horizontal><a onClick={ this.loadMore }>Load More</a></Divider>
            </div>
        
        );
    }
}

export default App;
