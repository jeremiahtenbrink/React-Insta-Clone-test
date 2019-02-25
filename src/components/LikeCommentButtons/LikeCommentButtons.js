import React from "react";
import PropTypes from "prop-types";
import { Icon, Button, Modal, Header, Image, Form, Ref } from "semantic-ui-react";
import "./likeCommentButtons.scss";

class LikeCommentButtons extends React.Component {
    constructor( props ) {
        super( props );
        this.formRef = React.createRef();
    }
    
    state = { modalOpen: false };
    
    handleOpen = () => this.setState( { modalOpen: true } );
    
    handleClose = () => this.setState( { modalOpen: false } );
    
    handleSubmit = ( e ) => {
        
        e.target[ 0 ] = this.formRef.current.childNodes[ 0 ];
        this.props.handleSubmit( e );
        this.handleClose();
    };
    
    render() {
        let classes = "";
        if( this.props.liked ) {
            classes = "liked";
        }
        return (
            <div className="like-comment-buttons">
                <Button icon onClick={ this.props.onLikeClick } className="comment-like-buttons">
                    <Icon name="heart outline" size="big" className={ classes } />
                </Button>
                
                <Modal
                    trigger={
                        <Button icon onClick={ this.handleOpen }>
                            <Icon
                                name="comment outline"
                                size="big"
                                onClick={ this.handleOpen } />
                        </Button> }
                    open={ this.state.modalOpen }
                    onClose={ this.handleClose }
                >
                    <Header icon='comments outline' content='Post a comment' />
                    <Modal.Content image>
                        <Image wrapped size='medium' src={ this.props.imageUrl } />
                        <Form>
                            <Ref innerRef={ this.formRef }>
                                <Form.TextArea
                                    rows={ "5" }
                                    placeholder='Type comment here....'
                                />
                            </Ref>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={ this.handleClose }>Cancel</Button>
                        <Button
                            type='submit'
                            onClick={ e => this.handleSubmit( e ) }>Submit</Button>
                    </Modal.Actions>
                
                </Modal>
            </div>
        );
    }
    
}

LikeCommentButtons.propTypes = {
    liked: PropTypes.bool,
    onLikeClick: PropTypes.func.isRequired,
    imageUrl: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
};
LikeCommentButtons.defaultProps = {};

export default LikeCommentButtons;
