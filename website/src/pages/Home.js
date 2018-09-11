import React from 'react';
import { Redirect } from 'react-router';

export default function Home() {
  return (
    <Redirect from="/" to="/docs/getting-started/start-here" />
  );
}
