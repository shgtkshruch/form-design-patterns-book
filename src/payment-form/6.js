/** @jsx jsx */
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { jsx, css } from '@emotion/core';
import { useRouteMatch, useHistory } from "react-router-dom";

import Validator from '../Validator';
import H1 from '../components/H1';
import Field from '../components/Field';
import Legend from '../components/Legend';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import FieldError from '../components/Field-Error';
import ErrorSummary from '../components/Error-Summary';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import BackBtn from '../components/Back-Button';
import Submit from '../components/Submit';

let originalTitle = document.title;

export default () => {
  const validator = new Validator();

  const [cardnumber, setCardnumber] = UseStateWithLocalStorage('cardnumber');
  const [expiry, setExpiry] = UseStateWithLocalStorage('expiry');
  const [cvc, setCvc] = UseStateWithLocalStorage('cvc');
  const [same, setSame] = UseStateWithLocalStorage('same', true);
  const [address1, setAddress1] = UseStateWithLocalStorage('billingAddress1');
  const [address2, setAddress2] = UseStateWithLocalStorage('billingAaddress2');
  const [postcode, setPostcode] = UseStateWithLocalStorage('billingPostcode');
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
  validator.add(
    {
      key: 'address1',
      valid() {
        if (same) return true
        return address1.length > 0
      },
      errorMessage: '住所を入力してください。',
    }
  );
  validator.add(
    {
      key: 'postcode',
      valid() {
        if (same) return true
        return postcode.length > 0
      },
      errorMessage: '郵便番号を入力してください。',
    }
  );

  let cardnumberErrorMessage = errors.getMessage('cardnumber');
  let expiryErrorMessage = errors.getMessage('expiry');
  let cvcErrorMessage = errors.getMessage('cvc');
  let address1ErrorMessage = errors.getMessage('address1');
  let postcodeErrorMessage = errors.getMessage('postcode');

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
      <BackBtn to={path.replace(/\d$/, 5)} text="戻る" />
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

        <Field>
          <Legend>請求先住所</Legend>
          <Checkbox
            id="same"
            name="same"
            checked={same}
            onChange={(e) => setSame(e.target.checked)}
            text="請求先の住所は配送先と同じ"
          />
        </Field>

        {!same &&
          <div>
            <Field>
              <Label htmlFor="address1">
                <FieldLabel>住所1</FieldLabel>
                <FieldError message={address1ErrorMessage} />
              </Label>
              <Input
                type="text"
                id="address1"
                name="address1"
                value={address1}
                aria-invalid={address1ErrorMessage ? true : false}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="address2">
                <FieldLabel>住所2（任意）</FieldLabel>
              </Label>
              <Input
                type="text"
                id="address2"
                name="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="postcode">
                <FieldLabel>郵便番号</FieldLabel>
                <FieldError message={postcodeErrorMessage} />
              </Label>
              <Input
                type="text"
                id="postcode"
                name="postcode"
                value={postcode}
                aria-invalid={postcodeErrorMessage ? true : false}
                onChange={(e) => setPostcode(e.target.value)}
                css={css`
                  width: 8em;
                `}
              />
            </Field>
          </div>
        }
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
