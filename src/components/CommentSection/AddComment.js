import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon } from "semantic-ui-react";

const AddComment = ( { onAddComment } ) => {
    return (
        <Form className={ "add-comment-section" } onSubmit={ ( e ) => onAddComment( e ) }>
            <Form.Field className={ "add-comment-section__input" }>
                <Input
                    placeholder={ "Add a comment..." } icon={
                    <Button icon className="add-comment">
                        <Icon name="ellipsis horizontal"></Icon>
                    </Button>
                } />
            </Form.Field>
        </Form>
    );
};

AddComment.propTypes = {
    onAddComment: PropTypes.func.isRequired,
};
AddComment.defaultProps = {};

export default AddComment;
