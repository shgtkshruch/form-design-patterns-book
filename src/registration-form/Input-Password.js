import React, { useState } from 'react';
import styled from '@emotion/styled';
import Input from './Input';

const PasswordRevealer = styled.div`
  position: relative;
`;

const InputPassword = styled(Input)`
  padding-right: 70px;

  ::-ms-reveal {
    display: none;
  }
`;

const RevealButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  width: 80px;
  padding: 8px 0;
  border: none;
  border-radius: 0;
  appearance: none;
  font-size: 1em;
  background-color: #fff;
  color: #222;
  font: inherit;
  line-height: 1.5625;

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }
`;

export default ({ id, name, value, handleChange }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <PasswordRevealer>
      <InputPassword
        type={hidePassword ? 'password' : 'text'}
        id="password"
        name="password"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <RevealButton
        type="button"
        onClick={() => setHidePassword(!hidePassword)}
        aria-pressed={hidePassword ? false : true}>
        {hidePassword ? '表示する' : '隠す'}
      </RevealButton>
    </PasswordRevealer>
  )
}
