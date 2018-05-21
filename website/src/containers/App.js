import React, { Component } from 'react';
import ReactGA from 'react-ga';
import styled, { injectGlobal } from 'react-emotion';
import { AnalyticsListener } from '@verdigris/analytics';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as PropTypes from 'prop-types';

import Document from '../pages/Document';
import Home from '../pages/Home';
import Nav from './Nav';
import PackagePage from '../pages/PackagePage';
import ApplicationPage from '../components/ApplicationPage';
import PackageExamples from '../pages/PackageExamples';
import PageNotFound from '../pages/PageNotFound';
import RouteAnalyticsListener from '../components/RouteAnalyticsListener';

class GoogleAnalyticsListener extends Component {
  static propTypes = {
    gaId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    ReactGA.initialize(props.gaId);
  }

  render() {
    const { children } = this.props;
    return (
      <AnalyticsListener channel="navigate" onEvent={this.handleAnalyticsEvent}>
        <RouteAnalyticsListener>
          {children}
        </RouteAnalyticsListener>
      </AnalyticsListener>
    );
  }

  handleAnalyticsEvent = event => {
    ReactGA.pageview(event.payload.location.pathname);
  }
}

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

const ScrollHandler = withRouter(ScrollToTop);

class RouteBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <PageNotFound />;
    }
    return this.props.children;
  }
}

const AppContent = styled.div`
  flex: 1 1 auto;
`;

injectGlobal`
body {
  margin: 0px;
  font-family: Roboto,Helvetica,Arial,"Lucida Grande",sans-serif;
}
`;

export default function App(props) {
  const {
    gaId,
  } = props;
  return (
    <BrowserRouter>
      <GoogleAnalyticsListener gaId={gaId}>
        <Route>
          <ScrollHandler />
        </Route>
        <Switch>
          <Route>
            <RouteBoundary>
              <AppContent>
                <ApplicationPage nav={() => (
                  <Switch>
                    <Route path="/" component={Nav} />
                  </Switch>
                )}>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/docs/:docId" component={Document} />
                    <Route path="/packages/:packageName/examples/:exampleId/:exampleType" component={PackageExamples} />
                    <Route path="/packages/:packageName" component={PackagePage} />
                    <Route path="/error" component={PageNotFound} />
                    <Route component={PageNotFound} />
                  </Switch>
                </ApplicationPage>
              </AppContent>
            </RouteBoundary>
          </Route>
        </Switch>
      </GoogleAnalyticsListener>
    </BrowserRouter>
  );
}
