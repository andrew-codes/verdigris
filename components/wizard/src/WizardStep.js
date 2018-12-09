import constant from 'lodash.constant';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CarouselItem } from '@andrew-codes/verdigris-carousel';

class WizardStep extends Component {
  render() {
    const { children, ...rest } = this.props;
    return <CarouselItem {...rest}>{children}</CarouselItem>;
  }
}
WizardStep.propTypes = {
  /** Node to render as the step content. */
  children: PropTypes.node,
  /** Unique identifier for the step. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Function that returns the next step's ID. */
  onNext: PropTypes.func,
  /** Function which, when returns false, prevents the progression of the Wizard. */
  onValidate: PropTypes.func,
};
WizardStep.defaultProps = {
  onNext: noop,
  onValidate: constant(true),
};

export default WizardStep;
