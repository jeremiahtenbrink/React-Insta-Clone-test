import React from "react";
import PropTypes from "prop-types";

const authenticate = PostPage => Login => props => {
    if( props.login ) {
        return <PostPage
            userName={ props.userName }
            logoutFun={ props.logoutFun }
            avatar={ props.avatar } />;
    }else {
        return <Login loginFun={ props.loginFun } />;
    }
    
};

export default authenticate;

authenticate.PropTypes = {
    userName: PropTypes.string,
    logoutFun: PropTypes.func.isRequired,
    avatar: PropTypes.string,
    loginFun: PropTypes.func
};