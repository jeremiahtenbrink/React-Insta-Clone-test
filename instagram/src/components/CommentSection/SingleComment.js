import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import Moment from "moment";

const SingleComment = ( { comment } ) => {
    
    return (
        <Comment>
            <Comment.Avatar as='a' src={ comment.avatar } />
            <Comment.Content>
                <Comment.Author as='a'>{ comment.username }</Comment.Author>
                <Comment.Metadata>
                    <span>{ Moment( comment.timestamp )
                        .fromNow() }</span>
                </Comment.Metadata>
                <Comment.Text>{ comment.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
};

SingleComment.propTypes = {
    comment: PropTypes.shape( {
        username: PropTypes.string,
        text: PropTypes.string,
        avatar: PropTypes.string,
        timestamp: PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.number
        ] ),
    } )
};
SingleComment.defaultProps = {};

export default SingleComment;
