import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon } from "semantic-ui-react";

const AddComment = ( props ) => {
    return (
        <Form>
            <Form.Field>
                <Input placeholder={ "Add a comment..." } />
            </Form.Field>
            <Form.Field>
                <Button icon>
                    <Icon name="ellipsis horizontal"></Icon>
                </Button>
            </Form.Field>
        </Form>
    );
};

AddComment.propTypes = {};
AddComment.defaultProps = {};

export default AddComment;
