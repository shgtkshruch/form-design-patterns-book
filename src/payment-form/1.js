import React, { useState } from 'react';
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { useRouteMatch, useHistory } from "react-router-dom";

import Validator from '../Validator';
import H1 from '../components/H1';
import Input from '../components/Input';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import FieldError from '../components/Field-Error';
import ErrorSummary from '../components/Error-Summary';
import Submit from '../components/Submit';

let originalTitle = document.title;

export default () => {
  const validator = new Validator();
  const [email, setEmail] = UseStateWithLocalStorage('email');
  const [errors, setErrors] = useState(new Validator().errors);
  let history = useHistory();
  let { path } = useRouteMatch();

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

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(new Validator().errors);

    if (validator.invalid()) {
      const errors = validator.errorMessages();
      setErrors(errors);
      document.title = `(${errors.count()}件のエラー) - ${originalTitle}`;
    } else {
      const nextPagePath = `${path.replace(/\d$/, 2)}`;
      history.push(nextPagePath);
    }
  }

  let emailErrorMessage = errors.getMessage('email');

  return (
    <>
      <ErrorSummary errors={errors} />
      <H1>支払いフォーム</H1>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="email">
            <FieldLabel>メールアドレス</FieldLabel>
            <FieldHint>こちらにご注文の確認メールをお送りします。</FieldHint>
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
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
