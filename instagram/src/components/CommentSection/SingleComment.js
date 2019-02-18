import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";

const SingleComment = ( { comment } ) => {
    return (
        <div>
            <Comment>
                <Comment.Content>
                    <Comment.Author as='a'>{ comment.username }</Comment.Author>
                    <Comment.Text>{ comment.text }</Comment.Text>
                </Comment.Content>
            </Comment>
        </div>
    );
};

SingleComment.propTypes = {
    comment: PropTypes.shape( {
        username: PropTypes.string,
        text: PropTypes.string,
    } )
};
SingleComment.defaultProps = {};

export default SingleComment;
