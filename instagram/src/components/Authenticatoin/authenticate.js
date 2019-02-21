import React from "react";

const authenticate = PostPage => Login => props => {
    
    if( props.login ) {
        return <PostPage userName={ props.userName } logoutFun={ props.logoutFun } />;
    }else {
        return <Login loginFun={ props.loginFun } />;
    }
    
};

export default authenticate;