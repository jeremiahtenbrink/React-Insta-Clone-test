import React from "react";
import { Modal, Image, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./imagePreview.scss";

const ImagePreview = ( props ) => {
    return (
        <Container>
            <Modal
                open={ props.open }
                basic
                onClose={ props.onClose }
                onClick={ props.onClose }
                dimmer={ "blurring" }
            >
                <Modal.Header>{ props.header }</Modal.Header>
                <Modal.Content>
                    <Image src={ props.imageUrl } centered />
                
                </Modal.Content>
            </Modal>
        </Container>
    
    );
};

ImagePreview.propTypes = {
    open: PropTypes.bool.isRequired,
    header: PropTypes.string,
    imageUrl: PropTypes.string.isRequired
};

export default ImagePreview;
