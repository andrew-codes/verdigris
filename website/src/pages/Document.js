import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import { md } from '@verdigris/docs';
import * as PropTypes from 'prop-types';
import EditInGitHubLink from '../components/EditInGitHubLink';
import Loading from '../components/Loading';
import Page from '../components/Page';
import PageNotFound from './PageNotFound';
import { getDocs } from '../siteData';

const FloatingButton = styled('div') `
  position: fixed;
  right: 24px;
  top: 24px;
`

export default function Document({ match: { params: { docId, docSectionId } } }) {
  if (!docId || !docSectionId) {
    return PageNotFound;
  }

  const doc = getDocs().find(section => section.id === docSectionId)
    .pages.find(d => d.id === docId);

  const Content = Loadable({
    loader: () => doc.contents(),
    loading: Loading,
    render(contents) {
      return md([contents.default]);
    },
  });

  return (
    <Page width="large">
      <FloatingButton>
        <EditInGitHubLink />
      </FloatingButton>
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
