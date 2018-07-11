import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

const Header = styled('header')`
  ${p => p.theme.CardHeader()(p)}
`;

function CardHeader (props) {
  return (
    <Header {...props} />
  );
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
