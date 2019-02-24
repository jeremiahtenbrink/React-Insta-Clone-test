import React from "react";
import PropTypes from "prop-types";
import { Grid, Form, Input, Segment, Divider, Container, Icon, Button } from "semantic-ui-react";
import "./searchBar.scss";
import Avatar from "../Avatar/Avatar";

class SearchBar extends React.Component {
    
    constructor( props ) {
        super( props );
        this.state = {
            search: false
        };
    }
    
    onMouseEnter = () => {
        this.setState( { search: true } );
    };
    
    onMouseLeave = () => {
        this.setState( { search: false } );
    };
    
    render() {
        
        return (
            
            <div className="search-bar">
                <div className="search-bar__left">
                    <div className="search-bar__icon">
                        <Icon name="instagram" size="huge" />
                    </div>
                    <div className="search-bar__heading">
                        <h1>InstaClone</h1>
                    </div>
                </div>
                
                <div className="search-bar__middle">
                    
                    <div
                        id="search"
                        className={ `search-bar__search ${ ( this.state.search ? "active" :
                            "" ) }` }
                        onMouseEnter={ this.onMouseEnter }
                        onMouseLeave={ this.onMouseLeave }
                    >
                        <Form>
                            <Form.Field>
                                <Input
                                    placeholder={ "Search..." }
                                    onChange={ this.props.handleSearch }
                                    className="search-input"
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    <div
                        className="search-bar__icons"
                        onMouseEnter={ this.onMouseEnter }
                        onMouseLeave={ this.onMouseLeave }>
                        
                        <div
                            className="search-bar__icons-search"
                        >
                            <Icon name="search" size="large" />
                        </div>
                        
                        <div className="search-bar__icons-compas">
                            <Icon name="compass outline" size="large" />
                        </div>
                        
                        <div className="search-bar__icon-heart">
                            <Icon name="heart outline" size="large" />
                        </div>
                        <div className="search-bar__icon-user">
                            <Icon name="user outline" size="large" />
                        </div>
                    </div>
                </div>
                <div className="search-bar__right">
                    <Avatar
                        username={ this.props.userName }
                        avatar={ this.props.avatar }
                        changeAvatar={ this.props.changeAvatar } />
                </div>
            </div>
        
        );
    };
};

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {};

export default SearchBar;
