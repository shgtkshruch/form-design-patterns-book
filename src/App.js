import React from 'react';
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

function App() {
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
        <Input type="password" id="password" name="password" />
      </Field>
    </PageContent>
  );
}

export default App;
