import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Image, Responsive, Segment } from "semantic-ui-react";
import "./postContainer.scss";
import CommentSection from "../CommentSection/CommentSection";
import AddComment from "../CommentSection/AddComment";
import LikeCommentButtons from "../LikeCommentButtons/LikeCommentButtons";
import Faker from "faker";
import Moment from "moment";

// contains one post
class PostContainer extends React.Component {
    constructor( props ) {
        super( props );
        // get post from props
        let post = this.props.post;
        // check if the post has been liked by the current user or if it is null
        if( !post.liked ) {
            // if false or null set to false
            post.liked = false;
        }
        // sort the post comments
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
            
            // check if post is before the other post
            if( Moment( a.timestamp ).isBefore( b.timestamp ) ) {
                return 1;
            }else {
                return -1;
            }
        } );
        
        // set the post to the state
        this.state = {
            post,
            userName: this.props.userName
        };
    }
    
    addComment = event => {
        let avatar = "";
        debugger;
        if( this.props.avatar ) {
            avatar = this.props.avatar;
        }else {
            avatar = Faker.fake( "{{image.avatar}}" );
            localStorage.setItem( "avatar", avatar );
        }
        
        const newComment = {
            username: this.state.userName,
            text: event.target[ 0 ].value,
            timestamp: Moment.now(),
            avatar: avatar
        };
        
        this.setState( ( state ) => {
            
            state.post.comments.unshift( newComment );
            
            this.props.setDataStorage( state );
            
            return ( {
                state
            } );
        } );
        
        event.target[ 0 ].value = "";
        
    };
    
    like = () => {
        
        this.setState( ( state ) => {
            if( state.post.liked ) {
                state.post.likes--;
                state.post.liked = false;
            }else {
                state.post.likes++;
                state.post.liked = true;
            }
            
            this.props.setDataStorage( state );
            return ( {
                post: state.post,
            } );
        } );
    };
    
    render() {
        return (
            <Container className={ "post-container" }>
                <Card className={ "post" }>
                    <Card.Content>
                        <div className="card-fistHalf">
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
                        </div>
                        <div className="card-second-half">
                            
                            <CommentSection comments={ this.state.post.comments } />
                            <AddComment onAddComment={ this.addComment } />
                        </div>
                    </Card.Content>
                
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
        avatar: PropTypes.string
        
    } ),
    
    setDataStorage: PropTypes.func.isRequired
    
};
PostContainer.defaultProps = {};

export default PostContainer;
