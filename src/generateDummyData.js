import Faker from "faker";
import unsplash from "./components/Unsplash/unsplash";

export default function generateDummy( number, cb ) {
    debugger;
    let posts = [];
    unsplash.get( "/photos/random", {
        params: {
            orientation: "squarish",
            count: number,
        },
        
    } ).then( res => {
        debugger;
        // loop through to create new posts.
        for( let i = 0; i < number; i++ ) {
            
            // create post
            let post = {
                id: res.data[ i ].id,
                username: Faker.fake( "{{internet.userName}}" ),
                thumbnailUrl: Faker.fake( "{{image.avatar}}" ),
                imageUrl: res.data[ i ].urls.small,
                likes: Math.ceil( ( Math.random() * 100 ) ),
                // call get comments with a random number of comments from 0 to 10
                comments: getComments( Math.ceil( Math.random() * 10 ) ),
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
function getComments( number ) {
    let comments = [];
    // loop over the number amount of times
    for( let i = 0; i < number; i++ ) {
        let comment = {
            text: Faker.fake( "{{lorem.sentences}}" ),
            timestamp: Faker.fake( "{{date.past}}" ),
            username: Faker.fake( "{{internet.userName}}" ),
            avatar: Faker.fake( "{{image.avatar}}" )
        };
        //add to comments array
        comments.push( comment );
    }
    //return array
    return comments;
}