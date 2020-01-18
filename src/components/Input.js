/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const style = css`
  width: 100%;
  padding: 8px;
  font-size: 1em;
  line-height: 1.25;
  font-family: inherit;
  box-sizing: border-box;
  appearance: none;
  border: 2px solid #222;

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }
`;

export default ({ ...props }) => <input css={style} {...props} />
