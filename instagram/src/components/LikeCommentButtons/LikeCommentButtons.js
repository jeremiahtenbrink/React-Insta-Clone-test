import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "./likeCommentButtons.scss";

const LikeCommentButtons = ( props ) => {
    return (
        <div className="like-comment-buttons">
            <Icon name="heart outline" size="big" />
            <Icon name="comment outline" size="big" />
        </div>
    );
};

LikeCommentButtons.propTypes = {};
LikeCommentButtons.defaultProps = {};

export default LikeCommentButtons;
