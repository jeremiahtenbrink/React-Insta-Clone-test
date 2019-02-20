import React from "react";
import PropTypes from "prop-types";
import { Grid, Form, Input, Segment, Divider, Container, Icon } from "semantic-ui-react";
import "./searchBar.scss";

const SearchBar = ( props ) => {
    return (
        <Container className={ "search-bar" }>
            <Segment>
                <Grid columns={ 3 }>
                    <Grid.Row>
                        <Grid.Column
                            name={ "first-col" }
                            mobile={ 16 }
                            tablet={ 8 }
                            computer={ 4 }>
                            <Grid columns={ 2 } divided>
                                <Grid.Column width={ 7 }>
                                    <div className="search-bar__icon">
                                        <Icon name="instagram" size="huge" />
                                    </div>
                                </Grid.Column>
                                
                                <Grid.Column width={ 9 }>
                                    <h1>Instagram</h1>
                                </Grid.Column>
                            </Grid>
                            <Divider vertical />
                        </Grid.Column>
                        <Grid.Column
                            name={ "second-col" }
                            mobile={ 16 }
                            tablet={ 8 }
                            computer={ 8 }>
                            <Form>
                                <Form.Field>
                                    <Input
                                        icon={ "search" }
                                        placeholder={ "Search..." }
                                        onChange={ props.handleSearch } />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column
                            name={ "third-col" }
                            mobile={ 16 }
                            tablet={ 8 }
                            computer={ 4 }>
                            <Grid
                                columns={ 3 }
                                textAlign={ "center" }
                                verticalAlign='middle'
                                stretched>
                                <Grid.Column className={ "search-bar__icon-small" }>
                                    <Icon name="compass outline" size="large" />
                                </Grid.Column>
                                <Grid.Column className={ "search-bar__icon-small" }>
                                    <Icon name="heart outline" size="large" />
                                </Grid.Column>
                                <Grid.Column className={ "search-bar__icon-small" }>
                                    <Icon name="user outline" size="large" />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
            </Segment>
        </Container>
    );
};

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {};

export default SearchBar;
