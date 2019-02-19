import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon } from "semantic-ui-react";

const AddComment = ( props ) => {
    return (
        <Form className={ "add-comment-section" }>
            <Form.Field className={ "add-comment-section__input" }>
                <Input
                    placeholder={ "Add a comment..." } icon={
                    <Button icon>
                        <Icon name="ellipsis horizontal"></Icon>
                    </Button>
                } />
            </Form.Field>
        </Form>
    );
};

AddComment.propTypes = {};
AddComment.defaultProps = {};

export default AddComment;
