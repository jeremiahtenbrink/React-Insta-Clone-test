import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import "./authenticate.scss";

const authenticate = PostPage => Login => props => {
  
  return ( <PostPage
      userName={ props.userName }
      logoutFun={ props.logoutFun }
      avatar={ props.avatar }
      changeAvatar={ props.changeAvatar }
    /> );
  
};

export default authenticate;

authenticate.PropTypes = {
  userName: PropTypes.string,
  logoutFun: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  loginFun: PropTypes.func,
};