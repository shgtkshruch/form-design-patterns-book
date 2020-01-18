/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = css`
  display: block;
  padding: 13px 18px;
  margin-bottom: 10px;
  background-color: #ddd;
  border: 2px solid #ddd;

  &:hover {
    border-color: #222;
  }

  input {
    margin-right: 10px;
  }
}
`;

export default ({ labelText, ...props }) => (
  <label css={styles}>
    <input type="radio" {...props} />
    <span>{labelText}</span>
  </label>
)
