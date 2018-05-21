import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

export default function Home() {
  return (
    <Page width="large">
      <h1>Verdigris Heading</h1>
      <Link to="/error">Error page</Link>
    </Page>
  );
}
