import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Home from '../pages/Home';
import GoogleAnalyticsListener from '../components/GoogleAnalyticsListener';
import PageNotFound from '../pages/PageNotFound';
import { GOOGLE_ANALYTICS_ID } from '../constants';

const SiteAnalytics = ({ children }) => {
  return (
    <GoogleAnalyticsListener gaId={GOOGLE_ANALYTICS_ID}>
      {children}
    </GoogleAnalyticsListener>
  );
};

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
    let { hasError } = this.state;
    if (hasError) {
      return <PageNotFound />;
    }
    return this.props.children;
  }
}

const AppContent = styled.div`
  flex: 1 1 auto;
`;

export default function App() {
  return (
    <BrowserRouter>
      <SiteAnalytics>
        <Route>
          <ScrollHandler />
        </Route>
        <Switch>
          <Route>
            <RouteBoundary>
              <AppContent>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/error" component={PageNotFound} />
                  <Route component={PageNotFound} />
                </Switch>
              </AppContent>
            </RouteBoundary>
          </Route>
        </Switch>
      </SiteAnalytics>
    </BrowserRouter>
  );
}
