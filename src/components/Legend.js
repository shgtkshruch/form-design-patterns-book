/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const legendStyle = css`
  font-size: 1.125em;
  line-height: 1.38889;
  margin-bottom: 5px;
  display: block;

  span {
    display: block;
    font-weight: 700;
  }
`;

export default ({ children }) => (
  <legend css={legendStyle}>
    <span>{children}</span>
  </legend>
)
