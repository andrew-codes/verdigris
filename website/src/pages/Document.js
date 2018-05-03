import Loadable from 'react-loadable';
import React from 'react';
import * as PropTypes from 'prop-types';

import Loading from '../components/Loading';
import Markdown from '../components/Markdown';
import Page from '../components/Page';
import PageNotFound from './PageNotFound';

export default function Document({ match: { params: { docId } } }) {
  if (!docId) {
    return PageNotFound;
  }

  const Content = Loadable({
    loader: () => import(`../../../docs/tour-of-the-code-base.md`),
    loading: Loading,
    render(mdContent) {
      if (mdContent) {
        return <Markdown>{mdContent.default}</Markdown>;
      }
      return <PageNotFound />;
    },
  });

  return (
    <Page>
      <Content />
    </Page>
  );
};
Document.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      docId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
