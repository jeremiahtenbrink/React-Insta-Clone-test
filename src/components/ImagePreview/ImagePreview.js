import React from "react";
import { Modal, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

const ImagePreview = ( props ) => {
    return (
        <Modal
            open={ props.open }
            centered={ false }
            basic
            size={ "small" }
            onClose={ props.onClose }
            onClick={ props.onClose }
            dimmer={ "blurring" }
        >
            <Modal.Header>{ props.header }</Modal.Header>
            <Modal.Content image>
                <Image wrapped fluid src={ props.imageUrl } />
            
            </Modal.Content>
        </Modal>
    );
};

ImagePreview.propTypes = {
    open: PropTypes.bool.isRequired,
    header: PropTypes.string,
    imageUrl: PropTypes.string.isRequired
};

export default ImagePreview;
