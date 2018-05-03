import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default Nav;

const Navigation = styled.aside`
background: lightgray;
box-sizing: border-box;
height: 100vh;
padding: 1.5rem;
width: 300px;
`;
function Nav() {
  return (
    <Navigation>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/packages/analytics">Analytics</Link>
        </li>
      </ol>
    </Navigation>
  );
}
