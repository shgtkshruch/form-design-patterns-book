/** @jsx jsx */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx, css } from '@emotion/core';

const styles = css`
  width: 100%;
  height: 10em;
  padding: 8px;
  border: 2px solid #222;
  font-size: 1em;
  font-family: inherit;
  line-height: 1.25;
  appearance: none;
`;

export default ({ ...props }) => {
  const { value, maxLength } = props

  return (
    <>
      <textarea css={styles} {...props} />
      {maxLength &&
        <div role="status" aria-live="polite">残り{maxLength - value.length}文字</div>
      }
    </>
  )
}
