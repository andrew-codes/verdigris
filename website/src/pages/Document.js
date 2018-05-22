import Loadable from 'react-loadable';
import React from 'react';
import * as PropTypes from 'prop-types';

import Loading from '../components/Loading';
import Markdown from '../components/Markdown';
import Page from '../components/Page';
import PageNotFound from './PageNotFound';
import { getDocs } from '../siteData';

export default function Document({ match: { params: { docId, docSectionId } } }) {
  if (!docId || !docSectionId) {
    return PageNotFound;
  }

  const doc = getDocs().find(docSection => docSection.id === docSectionId)
    .pages.find(d => d.id === docId);

  const Content = Loadable({
    loader: () => doc.exports(),
    loading: Loading,
  });

  return (
    <Page width="xlarge">
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
