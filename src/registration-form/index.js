import React, { useState } from 'react';
import Validator from '../Validator';
import H1 from '../components/H1';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import Input from '../components/Input';
import InputPassword from '../components/Input-Password';
import Submit from '../components/Submit';
import ErrorSummary from '../components/Error-Summary';
import FieldError from '../components/Field-Error';

let originalTitle = document.title;

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(new Validator().errors);

  const validator = new Validator();

  validator.add(
    {
      key: 'email',
      valid() {
        return email.length > 0
      },
      errorMessage: 'メールアドレスを入力してください。',
    }
  );
  validator.add(
    {
      key: 'email',
      valid() {
        return email.includes('@')
      },
      errorMessage: '@を入れてください。',
    },
  );
  validator.add(
    {
      key: 'password',
      valid() {
        return password.length > 0;
      },
      errorMessage: 'パスワードを入力してください。'
    }
  );
  validator.add(
    {
      key: 'password',
      valid() {
        return password.length > 8;
      },
      errorMessage: 'パスワードには8文字以上が必要です。'
    }
  );

  let emailErrorMessage = errors.getMessage('email');
  let passwordErrorMessage = errors.getMessage('password');

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(new Validator().errors);

    if (validator.invalid()) {
      const errors = validator.errorMessages();
      setErrors(errors);
      document.title = `(${errors.count()}件のエラー) - ${originalTitle}`;
    }
  }

  return (
    <>
      <ErrorSummary errors={errors} />
      <H1>登録フォーム</H1>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="email">
            <FieldLabel>メールアドレス</FieldLabel>
            <FieldError message={emailErrorMessage} />
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            aria-invalid={emailErrorMessage ? true : false}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="password">
            <FieldLabel>パスワード</FieldLabel>
            <FieldHint>数字と大文字をそれぞれ1文字以上含めて、8文字以上入力して下さい。</FieldHint>
            <FieldError message={passwordErrorMessage} />
          </Label>
          <InputPassword
            id="password"
            name="password"
            value={password}
            aria-invalid={passwordErrorMessage ? true : false}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Submit type="submit" value="登録する" />
      </form>
    </>
  );
}
