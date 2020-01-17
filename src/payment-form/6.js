/** @jsx jsx */
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { jsx, css } from '@emotion/core';
import Validator from '../Validator';
import H1 from '../components/H1';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import FieldError from '../components/Field-Error';
import ErrorSummary from '../components/Error-Summary';
import Input from '../components/Input';
import Submit from '../components/Submit';

import {
  useRouteMatch,
  useHistory
} from "react-router-dom";

let originalTitle = document.title;

export default () => {
  const validator = new Validator();

  const [cardnumber, setCardnumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState(new Validator().errors);

  let history = useHistory();
  let { path } = useRouteMatch();

  validator.add(
    {
      key: 'cardnumber',
      valid() {
        return cardnumber.length > 0
      },
      errorMessage: 'カード番号を入力してください。',
    }
  );
  validator.add(
    {
      key: 'expiry',
      valid() {
        return expiry.length > 0
      },
      errorMessage: '有効期限を入力してください。',
    }
  );
  validator.add(
    {
      key: 'cvc',
      valid() {
        return cvc.length > 0
      },
      errorMessage: 'セキュリティコードを入力してください。',
    }
  );

  let cardnumberErrorMessage = errors.getMessage('cardnumber');
  let expiryErrorMessage = errors.getMessage('expiry');
  let cvcErrorMessage = errors.getMessage('cvc');

  function handleSubmit(e) {
    e.preventDefault();

    if (validator.invalid()) {
      const errors = validator.errorMessages();
      setErrors(errors);
      document.title = `(${errors.count()}件のエラー) - ${originalTitle}`;
    } else {
      const nextPagePath = `${path.replace(/\d$/, 7)}`;
      history.push(nextPagePath);
    }
  }

  return (
    <>
      <ErrorSummary errors={errors} />
      <H1>支払いフォーム</H1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="cardnumber">
            <FieldLabel>カード番号</FieldLabel>
            <FieldHint>カード表面にある14桁から16桁の番号</FieldHint>
            <FieldError message={cardnumberErrorMessage} />
          </Label>
          <Input
            type="text"
            id="cardnumber"
            name="cardnumber"
            value={cardnumber}
            aria-invalid={cardnumberErrorMessage ? true : false}
            onChange={(e) => setCardnumber(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="expiry">
            <FieldLabel>有効期限</FieldLabel>
            <FieldHint>MMYY (月2桁と年2桁を続けて入力)</FieldHint>
            <FieldError message={expiryErrorMessage} />
          </Label>
          <Input
            type="text"
            id="expiry"
            name="expiry"
            value={expiry}
            aria-invalid={expiryErrorMessage ? true : false}
            onChange={(e) => setExpiry(e.target.value)}
            css={css`
              width: 5em;
            `}
          />
        </Field>

        <Field>
          <Label htmlFor="cvc">
            <FieldLabel>セキュリティコード</FieldLabel>
            <FieldHint>カード裏面にある下3桁の番号</FieldHint>
            <FieldError message={cvcErrorMessage} />
          </Label>
          <Input
            type="text"
            id="cvc"
            name="cvc"
            value={cvc}
            aria-invalid={cvcErrorMessage ? true : false}
            onChange={(e) => setCvc(e.target.value)}
            css={css`
              width: 4em;
            `}
          />
        </Field>
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
