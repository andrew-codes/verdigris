import last from 'lodash.last';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from './WizardContext';

/* eslint-disable react/prop-types */
const WizardImpl = ({
  children,
  currentStep,
  goBack,
  goForward,
  isValid,
  registerStep,
  steps,
}) => {
  return (
    <Provider
      value={{
        currentStep,
        registerStep,
      }}
    >
      <div>
        {children({
          currentStepId: currentStep,
          currentStepIndex: steps.indexOf(currentStep),
          goBack,
          goForward,
          isValid,
          totalSteps: steps.length,
        })}
      </div>
    </Provider>
  );
};
/* eslint-enable react/prop-types */

class Wizard extends Component {
  constructor(props) {
    super(props);

    this.steps = {};
    this.stepIds = [];
    this.state = {
      stepHistory: [props.currentStep],
    };

    this.goBack = this.goBack.bind(this);
    this.goTo = this.goTo.bind(this);
    this.registerStep = this.registerStep.bind(this);
    renderToString(
      <WizardImpl
        {...props}
        isValid={false}
        steps={this.stepIds}
        registerStep={this.registerStep}
      />,
    );
  }

  render() {
    const { children } = this.props;
    const { stepHistory } = this.state;
    const currentStep = last(stepHistory);
    const isValid = this.steps[currentStep].onValidate();
    const nextStep =
      this.steps[currentStep].onNext() ||
      this.stepIds[
        Math.min(this.stepIds.length - 1, this.stepIds.indexOf(currentStep) + 1)
      ];

    return (
      <WizardImpl
        currentStep={currentStep}
        goBack={this.goBack}
        goForward={() => this.goTo(nextStep)}
        isValid={isValid}
        steps={this.stepIds}
        registerStep={this.registerStep}
      >
        {children}
      </WizardImpl>
    );
  }

  goBack() {
    this.setState(({ stepHistory }) => {
      if (stepHistory.length > 1) {
        stepHistory.pop();
      }

      return { stepHistory };
    });
  }

  goTo(stepId) {
    const { stepHistory } = this.state;
    const currentStep = last(stepHistory);
    if (!this.steps[currentStep].onValidate()) {
      return;
    }
    this.setState(({ stepHistory: history }) => ({
      stepHistory: history.concat([stepId]),
    }));
  }

  registerStep(step) {
    if (!this.stepIds.includes(step.props.id)) {
      this.stepIds.push(step.props.id);
    }
    this.steps[step.props.id] = step.props;
  }
}
Wizard.propTypes = {
  /** Render prop; params: { currentStepId, currentStepIndex, goBack, goForward, isValid, totalSteps } */
  children: PropTypes.func.isRequired,
  /** Current step's ID; typically to indicate which step to begin the Wizard. */
  currentStep: PropTypes.number.isRequired,
};
Wizard.defaultProps = {};

export default Wizard;
