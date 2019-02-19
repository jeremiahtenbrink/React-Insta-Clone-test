import React from "react";
import PropTypes from "prop-types";
import { Card, Container, Image } from "semantic-ui-react";
import "./postContainer.scss";
import CommentSection from "../CommentSection/CommentSection";
import AddComment from "../CommentSection/AddComment";
import LikeCommentButtons from "../LikeCommentButtons/LikeCommentButtons";

const PostContainer = ( { post } ) => {
    console.log( post );
    return (
        <Container text>
            <Card className={ "post" }>
                <Card.Content>
                    <Image src={ post.thumbnailUrl } avatar className={ "post__avatar" } />
                    <span className="post__avatar-name">{ post.username }</span>
                    <Image src={ post.imageUrl } rounded />
                    <LikeCommentButtons/>
                    <Card.Header className={ "post__likes" }>{ post.likes } likes</Card.Header>
                </Card.Content>
                <CommentSection comments={ post.comments } />
                <Card.Meta className={"card-meta"}>{ post.timestamp }</Card.Meta>
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
