import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const ErrorSummary = styled.div`
  max-width: 41em;
  padding: 16px;
  margin-bottom: 20px;
  border: 4px solid #b00f1f;

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    margin-left: 0;
    margin-bottom: 0;
    color: #b00f1f;
    font-size: 1.125em;
    line-height: 1.38889;
  }

  a {
    color: #b00f1f;
    font-weight: 700;
  }
`;

export default ({ errors }) => {
  const refContainer = useRef(null);

  useEffect(() => {
    // focus error summary element if inputted values are invalid
    if (refContainer.current) refContainer.current.focus();
  }, [errors])

  return (
    <>
      {errors.count() > 0 &&
        <ErrorSummary tabIndex="-1" ref={refContainer}>
          <h2>問題があります</h2>
          <ul>
            {errors.all().map((error, i) => (
              <li key={i}>
                <a href={`#${error.key}`}>{error.message}</a>
              </li>
            ))}
          </ul>
        </ErrorSummary>
      }
    </>
  )
}
