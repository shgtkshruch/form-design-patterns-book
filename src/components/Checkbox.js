/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = css`
  display: block;
  padding: 13px 18px;
  margin-bottom: 10px;
  background-color: #ddd;
  border: 2px solid #ddd;
  font-size: 1.125em;
  line-height: 1.38889;

  &:hover {
    border-color: #222;
  }

  input {
    margin-right: 10px;
  }
}
`;

export default ({ text, ...props }) => (
  <label css={styles}>
    <input type="checkbox" {...props} />
    <span>{text}</span>
  </label>
)
