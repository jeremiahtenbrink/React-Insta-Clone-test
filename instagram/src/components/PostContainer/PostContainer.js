import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Image } from "semantic-ui-react";
import "./postContainer.scss";
import CommentSection from "../CommentSection/CommentSection";
import AddComment from "../CommentSection/AddComment";
import LikeCommentButtons from "../LikeCommentButtons/LikeCommentButtons";
import Faker from "faker";
import Moment from "moment";

class PostContainer extends React.Component {
    constructor( props ) {
        super( props );
        let post = this.props.post;
        if( !post.liked ) {
            post.liked = false;
        }
        post.comments.sort( ( a, b ) => {
            
            if( !a.avatar ) {
                a.avatar = Faker.fake( "{{image.avatar}}" );
            }
            
            if( !a.timestamp ) {
                a.timestamp = Faker.fake( "{{date.past}}" );
            }
            
            if( !b.avatar ) {
                b.avatar = Faker.fake( "{{image.avatar}}" );
            }
            
            if( !b.timestamp ) {
                b.timestamp = Faker.fake( "{{date.past}}" );
            }
            
            if( Moment( a.timestamp ).isBefore( b.timestamp ) ) {
                return -1;
            }else {
                return 1;
            }
        } );
        
        this.state = {
            post,
        };
    }
    
    addComment = event => {
        debugger;
        const newComment = {
            username: Faker.fake( "{{internet.userName}}" ),
            text: event.target[ 0 ].value,
            timestamp: Moment.now(),
            avatar: Faker.fake( "{{image.avatar}}" )
        };
        
        this.setState( ( state ) => {
            
            state.post.comments.push( newComment );
            
            this.props.setDataStorage( state );
            
            return ( {
                state
            } );
        } );
        
        event.target[ 0 ].value = "";
        
    };
    
    like = () => {
        if( this.state.post.liked ) {
            return;
        }
        this.setState( ( state ) => {
            state.post.likes++;
            state.post.liked = true;
            this.props.setDataStorage( state );
            return ( {
                post: state.post,
            } );
        } );
    };
    
    render() {
        return (
            <Container text className={ "post-container" }>
                <Card className={ "post" }>
                    <Card.Content>
                        <Image
                            src={ this.state.post.thumbnailUrl }
                            avatar
                            className={ "post__avatar" } />
                        <span className="post__avatar-name">{ this.state.post.username }
                            <span className="metadata">
                            { this.state.post && Moment( this.state.post.timestamp ).fromNow() }
                        </span>
                        </span>
                        
                        <Image src={ this.state.post.imageUrl } rounded />
                        <LikeCommentButtons
                            liked={ this.state.post.liked }
                            onLikeClick={ this.like }
                            imageUrl={ this.state.post.imageUrl }
                            handleSubmit={ this.addComment }
                        />
                        <Card.Header className={ "post__likes" }>{ this.state.post.likes } likes</Card.Header>
                    </Card.Content>
                    <CommentSection comments={ this.state.post.comments } />
                    <AddComment onAddComment={ this.addComment } />
                </Card>
            </Container>
        );
    }
}

PostContainer.propTypes = {
    post: PropTypes.shape( {
        username: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        likes: PropTypes.number,
        comments: PropTypes.arrayOf( PropTypes.shape( {
            text: PropTypes.string,
            username: PropTypes.string,
            timestamp: PropTypes.oneOfType( [
                PropTypes.string,
                PropTypes.number
            ] ),
            avatar: PropTypes.string
        } ) ),
        timestamp: PropTypes.string,
        liked: PropTypes.bool,
        
    } ),
    
    setDataStorage: PropTypes.func.isRequired
    
};
PostContainer.defaultProps = {};

export default PostContainer;
