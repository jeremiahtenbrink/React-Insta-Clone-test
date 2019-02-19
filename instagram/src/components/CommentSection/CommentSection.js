import React from "react";
import PropTypes from "prop-types";
import SingleComment from "./SingleComment";
import { Comment, Header } from "semantic-ui-react";
import "./comments.scss";

const CommentSection = ( { comments } ) => {
    return (
        <div className="comment-section">
            <Comment.Group size='large'>
                { comments && comments.map( ( comment ) => {
                    return <SingleComment comment={ comment } />;
                } ) }
            </Comment.Group>
        </div>
    );
};

CommentSection.propTypes = {
    comments: PropTypes.arrayOf( PropTypes.shape( {
        text: PropTypes.string,
        username: PropTypes.string,
    } ) ),
};
CommentSection.defaultProps = {};

export default CommentSection;
