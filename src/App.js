import React, { useState } from 'react';
import styled from '@emotion/styled'
import './App.css';

const PageContent = styled.div`
  padding: 40px 20px;
`;

const H1 = styled.h1`
  max-width: 15em;
  margin-bottom: 25px;
  color: #222;
  font-size: 3.75em;
  line-height: 1;
`;

const Field = styled.div`
  max-width: 26em;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 1.125em;
  line-height: 1.38889;
`;

const FieldLabel = styled.span`
  display: block;
  font-weight: 700;
`;

const FieldHint = styled.span`
  color: #000;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1em;
  line-height: 1.25;
  font-family: inherit;
  box-sizing: border-box;
  appearance: none;
  border: 2px solid #222;
`;

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
`;

function App() {
  const [hidePassword, setHidePassword] = useState(true);

  function revealPassword(e) {
    setHidePassword(!hidePassword);
  }

  return (
    <PageContent>
      <H1>登録フォーム</H1>
      <Field>
        <Label htmlFor="email">
          <FieldLabel>メールアドレス</FieldLabel>
        </Label>
        <Input type="email" id="email" name="email" />
      </Field>

      <Field>
        <Label htmlFor="password">
          <FieldLabel>パスワード</FieldLabel>
        </Label>
        <FieldHint>数字と大文字をそれぞれ１文字以上含めて、８文字以上入力して下さい。</FieldHint>
        <PasswordRevealer>
          <InputPassword type={hidePassword ? 'password' : 'text'} id="password" name="password" />
          <RevealButton type="button" onClick={revealPassword}>
            {hidePassword ? '表示する' : '隠す'}
          </RevealButton>
        </PasswordRevealer>
      </Field>
    </PageContent>
  );
}

export default App;
