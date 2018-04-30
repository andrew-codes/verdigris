import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Verdigris Heading</h1>
      <Link to="/error">Error page</Link>
    </div>
  );
}
