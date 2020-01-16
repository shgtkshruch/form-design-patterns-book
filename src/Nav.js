import React from 'react';
import styled from '@emotion/styled'

const Nav = styled.nav`
  font-size: 1.3rem;
  font-weight: bold;
  border-right: 5px solid #000;
  height: 100vh;

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: currentColor;

    &:hover {
      color: red;
      text-decoration: underline;
    }

    &.is-active {
      color: red;
    }
  }
`;

export default ({ children }) => (
  <Nav>
    <ul>
      {children.map((link, i) => (
        <li key={i}>{link}</li>
      ))}
    </ul>
  </Nav>
);
