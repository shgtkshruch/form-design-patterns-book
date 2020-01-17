/** @jsx jsx */
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { jsx, css } from '@emotion/core';
import { useRouteMatch, useHistory } from "react-router-dom";

import Validator from '../Validator';
import H1 from '../components/H1';
import Input from '../components/Input';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldError from '../components/Field-Error';
import ErrorSummary from '../components/Error-Summary';
import Submit from '../components/Submit';

let originalTitle = document.title;

export default () => {
  const validator = new Validator();

  const [address1, setAddress1] = UseStateWithLocalStorage('address1');
  const [address2, setAddress2] = UseStateWithLocalStorage('address2');
  const [city, setCity] = UseStateWithLocalStorage('city');
  const [postcode, setPostcode] = UseStateWithLocalStorage('postcode')
  const [errors, setErrors] = useState(new Validator().errors);

  let history = useHistory();
  let { path } = useRouteMatch();

  validator.add(
    {
      key: 'address1',
      valid() {
        return address1.length > 0
      },
      errorMessage: '住所1を入力してください。',
    }
  );
  validator.add(
    {
      key: 'city',
      valid() {
        return city.length > 0
      },
      errorMessage: '市を入力してください。',
    },
  );
  validator.add(
    {
      key: 'postcode',
      valid() {
        return postcode.length > 0
      },
      errorMessage: '郵便番号を入力してください。',
    },
  );

  let address1ErrorMessage = errors.getMessage('address1');
  let cityErrorMessage = errors.getMessage('city');
  let postcodeErrorMessage = errors.getMessage('postcode');

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(new Validator().errors);

    if (validator.invalid()) {
      const errors = validator.errorMessages();
      setErrors(errors);
      document.title = `(${errors.count()}件のエラー) - ${originalTitle}`;
    } else {
      const nextPagePath = `${path.replace(/\d$/, 4)}`;
      history.push(nextPagePath);
    }
  }

  return (
    <>
      <ErrorSummary errors={errors} />
      <H1>支払いフォーム</H1>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>

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
          <Label htmlFor="city">
            <FieldLabel>市</FieldLabel>
            <FieldError message={cityErrorMessage} />
          </Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={city}
            aria-invalid={cityErrorMessage ? true : false}
            onChange={(e) => setCity(e.target.value)}
            css={css`
              max-width: 16em;
            `}
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
              max-width: 10em;
            `}
          />
        </Field>

        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
