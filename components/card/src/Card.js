import styled from 'react-emotion';
import React from 'react';
import PropTypes from 'prop-types';
import { defaultTheme } from '@verdigris/theme';
import { ThemeProvider } from 'emotion-theming';
import { withAnalytics } from '@verdigris/analytics';

import CardBody from './CardBody';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

const propTypes = {
  /**
   * One of CardHeader, CardBody, CardFooter
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Applies border around entire card when true
   */
  hasBorder: PropTypes.bool,
  /**
   * Applies shadow below card to simulate 3-d space when true
   */
  hasShadow: PropTypes.bool,
};

const defaultProps = {
  children: [],
  hasBorder: false,
  hasShadow: true,
};

const Section = styled('section')`
  ${p => p.theme.Card()(p)}
`;

function Card (props) {
  const {
    children,
    hasShadow,
    ...restProps
  } = props;

  const wrappedChildren = children ? React.Children.toArray(children) : [];
  const cardHeader = wrappedChildren.filter(child => child.type.displayName === 'CardHeader');
  const cardBody = wrappedChildren.filter(child => child.type.displayName === 'CardBody');
  const cardFooter = wrappedChildren.filter(child => child.type.displayName === 'CardFooter');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section
        hasShadow={hasShadow}
        {...restProps}
      >
        {cardHeader}
        {cardBody}
        {cardFooter}
      </Section>
    </ThemeProvider>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default withAnalytics()(Card);
