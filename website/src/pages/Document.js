import Loadable from 'react-loadable';
import React from 'react';
import { md } from '@verdigris/docs';
import * as PropTypes from 'prop-types';

import Loading from '../components/Loading';
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
    loader: () => doc.contents(),
    loading: Loading,
    render(contents) {
      return md([contents.default]);
    },
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
