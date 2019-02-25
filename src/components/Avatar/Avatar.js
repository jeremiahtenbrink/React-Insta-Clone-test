import React from "react";
import { Container, Image } from "semantic-ui-react";
import "./avatar.scss";

const Avatar = ( props ) => {
    return (
        <Container className={ "avatar" }>
            <Image src={ props.avatar } avatar className={ "avatar-img" } />
            <div className="avatar-information">
                <h1>{ `Welcome  ${ props.username } ` }</h1>
                <p onClick={ props.changeAvatar }>Generate new avatar.</p>
            </div>
        </Container>
    );
};

Avatar.propTypes = {};
Avatar.defaultProps = {};

export default Avatar;
