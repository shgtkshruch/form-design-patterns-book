/** @jsx jsx */
import { Link } from "react-router-dom";
import { jsx, css } from '@emotion/core'

const style = css`
  display: inline-block;
  margin-bottom: 0.5em;
  color: currentColor;

  &:hover {
    color: red;
  }

  &::before {
    content: '< ';
  }
`

export default ({ to, text }) => (
  <Link to={to} css={style}>{text}</Link>
)
