import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

const Dl = styled.dl`
  > div {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  dt {
    width: 8em;
    font-weight: bold;
  }

  dd {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  pre {
    display: inline-block;
    font-family: inherit;
  }

  a {
    align-self: flex-end;
    margin-left: 1em;
    color: currentColor;

    &:hover {
      color: red;
    }
  }
`

export default ({ items }) => (
  <Dl>
    {items.map((item, i) => (
      <div key={i}>
        <dt>{item.title}</dt>
        <dd>
          <pre>{item.value}</pre>
          <Link to={item.path}>編集</Link>
        </dd>
      </div>
    ))}
  </Dl>
);
