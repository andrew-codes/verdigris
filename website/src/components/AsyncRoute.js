import React from 'react';

export default function generateAsyncRouteComponent({ loader, Placeholder }) {
  let Component = null;

  return class AsyncRouteComponent extends React.Component {
    constructor() {
      super();
      this.updateState = this.updateState.bind(this);
      this.state = {
        Component,
      };
    }

    componentWillMount() {
      AsyncRouteComponent.load().then(this.updateState);
    }

    updateState() {
      if (this.state.Component !== Component) {
        this.setState({
          Component,
        });
      }
    }

    static load() {
      return loader().then((ResolvedComponent) => {
        Component = ResolvedComponent.default || ResolvedComponent;
      });
    }

    render() {
      const { Component: ComponentFromState } = this.state;
      if (ComponentFromState) {
        return <ComponentFromState {...this.props} />;
      }
      if (Placeholder) {
        return <Placeholder {...this.props} />;
      }
      return null;
    }
  };
}
