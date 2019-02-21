import React from "react";
import PropTypes from "prop-types";
import SingleComment from "./SingleComment";
import { Comment } from "semantic-ui-react";
import "./comments.scss";

const CommentSection = ( { comments } ) => {
    return (
        <div className="comment-section">
            <Comment.Group size='large'>
                { comments && comments.map( ( comment, index ) => {
                    return <SingleComment
                        key={ comment.username + ":" + index }
                        comment={ comment } />;
                } ) }
            </Comment.Group>
        </div>
    );
    
};

CommentSection.propTypes = {
    comments: PropTypes.arrayOf( PropTypes.shape( {
        text: PropTypes.string,
        username: PropTypes.string,
        timestamp: PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.number
        ] ),
        avatar: PropTypes.string
    } ) ),
};
CommentSection.defaultProps = {};

export default CommentSection;
