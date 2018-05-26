import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import { md } from '@verdigris/docs';
import EditInGitHubLink from '../components/EditInGitHubLink';
import Loading from '../components/Loading';

const FloatingButton = styled('div') `
  position: fixed;
  right: 24px;
  top: 24px;
`;

export default function createLoadableMarkdownContent(doc) {
  return Loadable({
    loader: () => doc.contents(),
    loading: Loading,
    render(contents) {
      return (
        <React.Fragment >
          <FloatingButton>
            <EditInGitHubLink />
          </FloatingButton>
          {md([contents.default])}
        </React.Fragment>
      );
    },
  });
}
