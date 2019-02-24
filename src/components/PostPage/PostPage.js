import React, { Component } from "react";
import PropTypes from "prop-types";
import generateDummy from "../../generateDummyData";
import dummyData from "../../dummy-data";
import Faker from "faker";
import Moment from "moment";
import SearchBar from "../SearchBar/SearchBar";
import PostContainer from "../PostContainer/PostContainer";
import { Divider, Visibility } from "semantic-ui-react";
import Fuse from "fuse.js";
import Avatar from "../Avatar/Avatar";
import ImagePreview from "../ImagePreview/ImagePreview";
import Users from "../Users/Users";

class PostPage extends Component {
    
    constructor( props ) {
        super( props );
        // posts is a array of post objects. Stored in state.data
        this.state = {
            // the posts array
            data: [],
            // the page of data we are at in storage
            page: 1,
            // boolean value indicating if data should be stored or not
            storeData: false,
            
            userName: this.props.userName,
            
            loading: false,
            
            modalOpen: false,
            
            modalUrl: "",
            
            modalHeader: ""
        };
    }
    
    // save the edited post
    editPostDataStorage = ( post ) => {
        
        //Store the new data being set up from post container.
        this.state.data.forEach( ( dataPost ) => {
            // find the post object in the array and replace it with new post data
            if( dataPost.username === post.post.username ) {
                dataPost = post.post.post;
            }
        } );
        
        //call store data to save data to local storage
        this.storeData();
        
    };
    
    //stores are posts to local storage
    storeData = () => {
        let i = 0;
        let pageNumber = 0;
        let storage = [];
        
        // loop as long as the index does not equal the posts array length
        while( i < this.state.data.length ) {
            // check if the array to be stored is 20
            if( storage.length !== 0 && ( storage.length % 20 ) === 0 ) {
                
                // if at 20 store it in local storage
                
                if( pageNumber !== 0 ) {
                    // if the pagenumber is bigger than 0 then add the page number to the key
                    // to keep arrays of 20
                    localStorage.setItem( `posts${ pageNumber }`, JSON.stringify( storage ) );
                }else {
                    // if page number is 0 then store the array in posts.
                    localStorage.setItem( `posts`, JSON.stringify( storage ) );
                }
                
                // reset the storage array
                storage = [];
                // increment the page number for the next stored array
                pageNumber++;
            }
            
            // push the data object at index i into the array to be stored
            storage.push( this.state.data[ i ] );
            i++;
        }
        
        // check to see if storage array have been saved.
        // if its storage length is not 20. Then it hasn't been stored so store the last bit
        // of posts
        if( storage.length % 20 !== 0 || storage.length === 20 ) {
            if( pageNumber > 0 ) {
                localStorage.setItem( `posts${ pageNumber }`, JSON.stringify( storage ) );
            }else {
                localStorage.setItem( "posts", JSON.stringify( storage ) );
            }
        }
    };
    
    // used to load more posts from storage or generate more if we don't have any more in storage
    loadMore = () => {
        debugger;
        // check if local storage has posts at the page number we are at
        if( localStorage.hasOwnProperty( `posts${ this.state.page }` ) ) {
            // get the data from storage
            let more = JSON.parse( localStorage.getItem( `posts${ this.state.page }` ) );
            //sort the array by date
            more = this.sortPosts( more );
            // add more to the state posts array
            this.setState( ( state ) => ( {
                // spread prev posts and then add the newly loaded posts
                data: [ ...state.data, ...more ],
                // increment page number for next set of data
                page: ( state.page + 1 ),
                loading: false
            } ) );
            // return so we don't generate more if we were able to load more
            return;
        }
        
        // we couldn't load from local storage so we are going to generate more posts.
        generateDummy( 20, posts => {
            // add the new posts to posts array
            // set store data to true so we save the data once state has been updated
            this.setState( ( state ) => ( {
                data: [ ...state.data, ...posts ],
                storeData: true,
                loading: false
            } ) );
        } );
        
    };
    
    // called when component updated its state
    componentDidUpdate() {
        // check if we need to save the new data to storage
        if( this.state.storeData ) {
            //call store data
            this.storeData();
            // change store data to false because we stored it
            this.setState( { storeData: false } );
        }
    }
    
    componentDidMount() {
        debugger;
        //check if we have local storage data. Use local storage data if we have.
        if( localStorage.hasOwnProperty( "posts" ) ) {
            
            //get data from storage
            let data = JSON.parse( localStorage.getItem( "posts" ) );
            
            if( data.length < 20 ) {
                this.loadMore();
            }else {
                this.setState( { data } );
            }
            
        }else {
            this.loadMore();
        }
    }
    
    // used to sort the posts by the post timestamp
    sortPosts( posts ) {
        posts.sort( ( a, b ) => {
            // checking if it has been edited to include timestamp
            if( !a.edited ) {
                a.timestamp = Faker.fake( "{{date.past}}" );
                a.edited = true;
                a.id = Faker.fake( "{{random.uuid}}" );
            }
            // ame thing with b
            if( !b.edited ) {
                b.timestamp = Faker.fake( "{{date.past}}" );
                b.edited = true;
                b.id = Faker.fake( "{{random.uuid}}" );
            }
            
            //compare dates
            if( Moment( a.timestamp ).isBefore( Moment( b.timestamp ) ) ) {
                return 1;
            }else {
                return -1;
            }
        } );
        // return the sorted array
        return posts;
    }
    
    // handle the user typing in the search bar
    handleSearch = ( e ) => {
        
        debugger;
        // get the word the user is typing
        let word = e.target.value;
        
        // check if the value is blank
        if( e.target.value === "" ) {
            // if value of search is blank then just load 20 posts from storage
            let results = JSON.parse( ( localStorage.getItem( "posts" ) ) );
            // set the posts state to the 20 posts we got from storage
            this.setState( { data: results } );
            // return so we don't try to search with a blank word
            return;
        }
        
        let posts = this.getPostsFromStorage();
        
        // set the search options up.
        const options = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            // set the value of the posts object to search over
            keys: [
                "username",
            ]
        };
        
        // use fuse to fuzzy search for value
        const fuse = new Fuse( posts, options ); // "list" is the item array
        //get results from search
        const result = fuse.search( word );
        // set the results to the state so we can see them
        this.setState( { data: result } );
        
    };
    
    getPostsFromStorage() {
        // get posts from storage
        let posts = JSON.parse( localStorage.getItem( "posts" ) );
        let i = 1;
        
        while( localStorage.getItem( `posts${ i }` ) ) {
            // get data from local storage
            let data = JSON.parse( localStorage.getItem( `posts${ i }` ) );
            // loop over data and add post to the posts array
            data.forEach( ( post ) => {
                posts.push( post );
            } );
            i++;
        }
        return posts;
    }
    
    handleUpdate = ( e, { calculations } ) => {
        debugger;
        if( calculations.percentagePassed > .9 && !this.state.loading && calculations.direction ===
            "down" ) {
            if( this.state.loading ) {
                return;
            }
            this.setState( { loading: true } );
            this.loadMore();
        }
    };
    
    previewImage = ( imgUrl, header ) => {
        debugger;
        this.setState( { modalOpen: true, modalHeader: header, modalUrl: imgUrl } );
    };
    
    previewClose = () => {
        this.setState( { modalOpen: false, modalHeader: "", modalUrl: "" } );
    };
    
    filterByLiked = () => {
        let posts = this.getPostsFromStorage();
        
        posts = posts.filter( ( post ) => {
            if( post.liked ) {
                return true;
            }
            return false;
        } );
        
        this.setState( { data: posts } );
    };
    
    filterByUser = user => {
        let posts = this.getPostsFromStorage();
        let data = posts.filter( ( post ) => post.username === user.username );
        this.setState( { data } );
    };
    
    goHome = () => {
        let data = JSON.parse( localStorage.getItem( "posts" ) );
        this.setState( { data } );
    };
    
    render() {
        return (
            <div>
                <SearchBar
                    logoutFun={ this.props.logoutFun }
                    userName={ this.state.userName }
                    avatar={ this.props.avatar }
                    changeAvatar={ this.props.changeAvatar }
                    handleSearch={ this.handleSearch }
                    filterByLiked={ this.filterByLiked }
                    goHome={ this.goHome }
                />
                {/*if we have state data then map over it and create a PostContainer for each post*/ }
                <Visibility onUpdate={ this.handleUpdate }>
                    <Users filterByUser={ this.filterByUser } />
                    { this.state.data && this.state.data.map( ( data ) => {
                        return <PostContainer
                            key={ data.id }
                            post={ data }
                            setDataStorage={ this.editPostDataStorage }
                            userName={ this.state.userName }
                            avatar={ this.props.avatar }
                            previewImage={ this.previewImage }
                        />;
                    } ) }
                    {/*create the divider at the bottom with a link to load more posts*/ }
                    <Divider horizontal><a onClick={ this.loadMore }>Load More</a></Divider>
                </Visibility>
                <ImagePreview
                    open={ this.state.modalOpen }
                    imageUrl={ this.state.modalUrl }
                    header={ this.state.modalHeader }
                    onClose={ this.previewClose }
                />
            
            </div>
        );
    }
}

export default PostPage;
