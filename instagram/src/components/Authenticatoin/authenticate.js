import React from "react";

const authenticate = PostPage => Login => props => {
    
    if( props.login ) {
        return <PostPage logoutFun={ props.logoutFun } />;
    }else {
        return <Login loginFun={ props.loginFun } />;
    }
    
};

export default authenticate;