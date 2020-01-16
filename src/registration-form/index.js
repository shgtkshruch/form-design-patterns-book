import React, { useState, useRef, useEffect } from 'react';
import Validator from '../Validator';
import H1 from './H1';
import PageContent from './PageContent';
import Field from './Field';
import Label from './Lable';
import FieldLabel from './FieldLabel';
import FieldHint from './FieldHint';
import Input from './Input';
import PasswordRevealer from './Password-Revealer';
import InputPassword from './Input-Password';
import RevealButton from './Reveal-Button';
import Submit from './Submit';
import ErrorSummary from './Error-Summary';
import FieldError from './Field-Error';

let originalTitle = document.title;

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState(new Validator().errors);
  const refContainer = useRef(null);

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

  function revealPassword(e) {
    setHidePassword(!hidePassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(new Validator().errors);

    if (validator.invalid()) {
      const errors = validator.errorMessages();
      setErrors(errors);
      document.title = `(${errors.count()}件のエラー) - ${originalTitle}`;
    }
  }

  useEffect(() => {
    // focus error summary element if inputted values are invalid
    if (refContainer.current) refContainer.current.focus();
  }, [errors])

  return (
    <PageContent>
      {errors.count() > 0 &&
        <ErrorSummary tabIndex="-1" ref={refContainer}>
          <h2>問題があります</h2>
          <ul>
            {errors.all().map((error, i) => (
              <li key={i}>
                <a href={`#${error.key}`}>{error.message}</a>
              </li>
            ))}
          </ul>
        </ErrorSummary>
      }
      <H1>登録フォーム</H1>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="email">
            <FieldLabel>メールアドレス</FieldLabel>
             {emailErrorMessage &&
              <FieldError>
                <svg width="1.3em" height="1.3em">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#error-icon"></use>
                </svg>
                <span>{emailErrorMessage}</span>
              </FieldError>
            }
          </Label>
          <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>

        <Field>
          <Label htmlFor="password">
            <FieldLabel>パスワード</FieldLabel>
            <FieldHint>数字と大文字をそれぞれ1文字以上含めて、8文字以上入力して下さい。</FieldHint>
            {passwordErrorMessage &&
              <FieldError>
                <svg width="1.3em" height="1.3em">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#error-icon"></use>
                </svg>
                <span>{passwordErrorMessage}</span>
              </FieldError>
            }
          </Label>
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
