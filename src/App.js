import React, { useState } from 'react';
import styled from '@emotion/styled'
import './App.css';
import Validator from './Validator';

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

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }
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

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }
`;

const Submit = styled.input`
  padding: 10px 20px;
  border: none;
  background-color: #0074d9;
  color: #fff;
  font: inherit;
  font-size: 1em;
  line-height: 1.5625;
  appearance: none;
`;

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState([]);

  function revealPassword(e) {
    setHidePassword(!hidePassword);
  }

  const validator = new Validator();
  validator.add(
    {
      key: 'email',
      valid() {
        return email.length > 0
      },
      errorMessage: 'メールアドレスを入力してください',
    }
  );
  validator.add(
    {
      key: 'email',
      valid() {
        return email.includes('@')
      },
      errorMessage: '@を入れてください',
    },
  );
  validator.add(
    {
      key: 'password',
      valid() {
        return password.length > 8;
      },
      errorMessage: '８文字以上入力してください'
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    if (validator.invalid()) {
      setErrors(validator.errorMessages());
    }
  }

  return (
    <PageContent>
      <H1>登録フォーム</H1>
      {errors.map((error, i) => (<p key={i}>{error.message}</p>))}
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="email">
            <FieldLabel>メールアドレス</FieldLabel>
          </Label>
          <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>

        <Field>
          <Label htmlFor="password">
            <FieldLabel>パスワード</FieldLabel>
          </Label>
          <FieldHint>数字と大文字をそれぞれ１文字以上含めて、８文字以上入力して下さい。</FieldHint>
          <PasswordRevealer>
            <InputPassword
              type={hidePassword ? 'password' : 'text'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RevealButton type="button" onClick={revealPassword} aria-pressed={hidePassword ? false : true}>
              {hidePassword ? '表示する' : '隠す'}
            </RevealButton>
          </PasswordRevealer>
        </Field>
        <Submit type="submit" value="登録する" />
      </form>
    </PageContent>
  );
}

export default App;
