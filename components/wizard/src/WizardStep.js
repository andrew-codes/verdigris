import constant from 'lodash.constant';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Consumer } from './WizardContext';

class WizardStep extends Component {
  componentDidUpdate(prevProps) {
    const { onNext, onValidate } = this.props;
    if (prevProps.onValidate !== onValidate || prevProps.onNext !== onNext) {
      this.registerStep(this);
    }
  }

  render() {
    const { children, id } = this.props;
    return (
      <Consumer>
        {({ currentStep, registerStep }) => {
          this.registerStep = registerStep;
          registerStep(this);
          return currentStep === id ? children : null;
        }}
      </Consumer>
    );
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
