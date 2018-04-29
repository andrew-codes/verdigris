import React, { Component } from 'react';
import { shallow } from 'enzyme';
import * as PropTypes from 'prop-types';
import withAnalytics from '../withAnalytics';

test('it should render the provided component', () => {
  const ButtonWithAnalytics = withAnalytics()(Button);
  const wrapper = shallow(<ButtonWithAnalytics>Hello</ButtonWithAnalytics>);
  expect(wrapper.html()).toBe('<button>Hello</button>');
});

test('the component has a descriptive display name', () => {
  const ButtonWithAnalytics = withAnalytics()(Button);
  expect(ButtonWithAnalytics.displayName).toEqual('WithAnalytics(Button)');

  const ClassButtonWithAnalytics = withAnalytics()(ClassButton);
  expect(ClassButtonWithAnalytics.displayName).toEqual('WithAnalytics(ClassButton)');
});

test('passes a createAnalyticsEvent function prop to the wrapped component', () => {
  const ButtonWithAnalytics = withAnalytics()(Button);
  const wrapper = shallow(<ButtonWithAnalytics>Hello</ButtonWithAnalytics>);

  expect(typeof wrapper.find(Button).prop('createAnalyticsEvent')).toBe('function');
});

class ClassButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
  };
  render() {
    const {
      children,
      onClick,
    } = this.props;
    return (
      <button onClick={onClick}>{children}</button>
    );
  }
}
function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>{children}</button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}
