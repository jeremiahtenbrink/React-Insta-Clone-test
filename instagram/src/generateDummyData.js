import Faker from "faker";

export default function generateDummy( number ) {
    
    let posts = [];
    for( let i = 0; i < number; i++ ) {
        
        let post = {
            username: Faker.fake( "{{internet.userName}}" ),
            thumbnailUrl: Faker.fake( "{{image.avatar}}" ),
            imageUrl: Faker.fake( "{{image.image}}" ),
            likes: Math.ceil( ( Math.random() * 100 ) ),
            comments: getComments( Math.ceil( Math.random() * 10 ) ),
            timestamp: Faker.fake( "{{date.past}}" ),
            liked: false
        };
        posts.push( post );
    }
    
    return posts;
}

function getComments( number ) {
    let comments = [];
    for( let i = 0; i < number; i++ ) {
        let comment = {
            text: Faker.fake( "{{lorem.sentences}}" ),
            timestamp: Faker.fake( "{{date.past}}" ),
            username: Faker.fake( "{{internet.userName}}" ),
            avatar: Faker.fake( "{{image.avatar}}" )
        };
        comments.push( comment );
    }
    return comments;
}