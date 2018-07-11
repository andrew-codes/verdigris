import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

const Content = styled('div')`
  ${p => p.theme.CardBody()(p)}
`;

function CardBody (props) {
  return (
    <Content {...props} />
  );
}

CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;

export default CardBody;
