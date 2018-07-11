import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

const Footer = styled('footer')`
  ${p => p.theme.CardFooter()(p)}
`;

function CardFooter (props) {
  return (
    <Footer {...props} />
  );
}

CardFooter.propTypes = propTypes;
CardFooter.defaultProps = defaultProps;

export default CardFooter;
