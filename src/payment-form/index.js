import React, { useState } from 'react';
import H1 from '../components/H1';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/FieldLabel';
import FieldHint from '../components/FieldHint';
import FieldError from '../components/Field-Error';
import Input from '../components/Input';

export default () => {
  const [email, setEmail] = useState('');

  return (
    <>
      <H1>支払いフォーム</H1>
      <Field>
        <Label htmlFor="email">
          <FieldLabel>メールアドレス</FieldLabel>
          <FieldHint>こちらにご注文の確認メールをお送りします。</FieldHint>
          <FieldError message={''} />
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          aria-invalid={false}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
    </>
  )
}
