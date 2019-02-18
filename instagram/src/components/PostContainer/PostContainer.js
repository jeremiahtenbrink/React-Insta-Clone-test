import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Image } from "semantic-ui-react";
import "./postContainer.scss";
import CommentSection from "../CommentSection/CommentSection";
import AddComment from "../CommentSection/AddComment";

const PostContainer = ( { post } ) => {
    console.log( post );
    return (
        <Container text>
            <Card className={ "post" }>
                <Card.Content>
                    <Image src={ post.thumbnailUrl } avatar />
                    <span>{ post.username }</span>
                    <Image src={ post.imageUrl } />
                    <Card.Header>{ post.likes } likes</Card.Header>
                </Card.Content>
                <CommentSection comments={ post.comments } />
                <Card.Meta>{ post.timestamp }</Card.Meta>
                <AddComment />
            </Card>
        </Container>
    );
};

PostContainer.propTypes = {
    post: PropTypes.shape( {
        username: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        likes: PropTypes.number,
        comments: PropTypes.arrayOf( PropTypes.shape( {
            text: PropTypes.string,
            username: PropTypes.string,
        } ) ),
        timestamp: PropTypes.string,
        
    } )
};
PostContainer.defaultProps = {};

export default PostContainer;
