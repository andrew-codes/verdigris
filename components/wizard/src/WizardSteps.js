import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CarouselViewport } from '@andrew-codes/verdigris-carousel';

class WizardSteps extends Component {
  render() {
    const { children } = this.props;
    return <CarouselViewport>{children}</CarouselViewport>;
  }
}
WizardSteps.propTypes = {
  /** Node to render step items. */
  children: PropTypes.node,
};

export default WizardSteps;
