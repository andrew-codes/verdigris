import React, { Component } from 'react';
import styled from 'react-emotion';
import { Redirect, withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';

const EditButton = styled('button') `
font-size: 1rem;
padding: 12px;
`;

class EditInGitHubLink extends Component {

  state = {
    isInEditMode: false,
  };

  render() {
    const { location: { pathname }, } = this.props;
    const { isInEditMode } = this.state;

    return isInEditMode
      ? <Redirect to={`${pathname}/edit`} />
      : (
        <EditButton onClick={this.handleClick}>
          edit in github
        </EditButton >
      );
  }

  handleClick = () => {
    this.setState({
      isInEditMode: true,
    });
  }
}
EditInGitHubLink.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired
};

export default withRouter(EditInGitHubLink);
