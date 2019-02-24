import Faker from "faker";
import unsplash from "./components/Unsplash/unsplash";

export default function generateDummy( number, cb ) {
    debugger;
    let users = [];
    
    // check local storage for users
    if( localStorage.getItem( "users" ) ) {
        // load our simulated friends data
        users = JSON.parse( localStorage.getItem( "users" ) );
    }else {
        // generate friends data
        for( let i = 0; i < 20; i++ ) {
            let user = {
                username: Faker.fake( "{{internet.userName}}" ),
                thumbnailUrl: Faker.fake( "{{image.avatar}}" ),
            };
            users.push( user );
        }
        // store users after generating them.
        localStorage.setItem( "users", JSON.stringify( users ) );
    }
    
    // get pictures
    let posts = [];
    unsplash.get( "/photos/random", {
        params: {
            orientation: "squarish",
            count: number,
        },
    } ).then( res => {
        // loop through to create new posts.
        for( let i = 0; i < number; i++ ) {
            //pick random user for the post data to simulate our 20 friends
            // and their posts.
            let random = Math.floor( Math.random() * 20 );
            
            // create post
            let post = {
                id: res.data[ i ].id,
                // place random selected user data in for post data
                username: users[ random ].username,
                thumbnailUrl: users[ random ].thumbnailUrl,
                imageUrl: res.data[ i ].urls.small,
                imageUrlBig: res.data[ i ].urls.raw,
                likes: Math.ceil( ( Math.random() * 100 ) ),
                // call get comments with a random number of comments from 0 to 10
                comments: getComments( Math.ceil( Math.random() * 10 ), users ),
                timestamp: Faker.fake( "{{date.past}}" ),
                liked: false
            };
            //add post to posts array
            posts.push( post );
            
        }
        cb( posts );
    } );
    
}

// gets a number of comments from the number passed in
function getComments( number, users ) {
    let comments = [];
    
    // loop over the number amount of times
    for( let i = 0; i < number; i++ ) {
        
        // get random number between one and two. Flip a coin
        let random = Math.random() * 2;
        
        let username = "";
        let avatar = "";
        
        // if heads create new user for comment
        // to simulate users we don't know making comments
        if( random > 1 ) {
            username = Faker.fake( "{{internet.userName}}" );
            avatar = Faker.fake( "{{image.avatar}}" );
        }else {
            //if tails use one of our "friends" users
            // simulate users we do know making comments
            random = Math.floor( Math.random() * 20 );
            username = users[ random ].username;
            avatar = users[ random ].thumbnailUrl;
        }
        
        // create comment
        let comment = {
            text: Faker.fake( "{{lorem.sentences}}" ),
            timestamp: Faker.fake( "{{date.past}}" ),
            username,
            avatar,
        };
        //add to comments array
        comments.push( comment );
    }
    //return array
    return comments;
}