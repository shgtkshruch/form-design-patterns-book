import React from 'react';
import styled from '@emotion/styled';

const FieldError = styled.span`
  display: block;
  margin-bottom: 10px;
  color: #b00f1f;
  font-weight: 700;

  svg {
    width: 1.5625em;
    margin-top: 5px;
    margin-right: 5px;
    fill: #b00f1f;
    vertical-align: bottom;
  }
`;

export default ({ message }) => (
  <>
    {message &&
      <FieldError>
        <svg width="1.3em" height="1.3em">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#error-icon"></use>
        </svg>
        <span>{message}</span>
      </FieldError>
    }
  </>
);
