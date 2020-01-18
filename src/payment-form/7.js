/** @jsx jsx */
import React from 'react'; // eslint-disable-line no-unused-vars
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { jsx } from '@emotion/core';
import { useRouteMatch, useHistory } from "react-router-dom";

import H1 from '../components/H1';
import Field from '../components/Field';
import Submit from '../components/Submit';
import ConfirmList from '../components/Confirm-List';

export default () => {
  let history = useHistory();
  let { path } = useRouteMatch();

  const [email] = UseStateWithLocalStorage('email');
  const [mobile] = UseStateWithLocalStorage('mobile');
  const [address1] = UseStateWithLocalStorage('address1');
  const [address2] = UseStateWithLocalStorage('address2');
  const [city] = UseStateWithLocalStorage('city');
  const [postcode] = UseStateWithLocalStorage('postcode');
  const [option] = UseStateWithLocalStorage('option');
  const [notes] = UseStateWithLocalStorage('notes');
  const [cardnumber] = UseStateWithLocalStorage('cardnumber');

  const items = [
    {
      title: 'メール',
      value: email,
      path: path.replace(/\d$/, 1)
    },
    {
      title: '携帯電話番号',
      value: mobile,
      path: path.replace(/\d$/, 2)
    },
    {
      title: '住所1',
      value: address1,
      path: path.replace(/\d$/, 3)
    },
    {
      title: '住所2',
      value: address2,
      path: path.replace(/\d$/, 4)
    },
    {
      title: '市',
      value: city,
      path: path.replace(/\d$/, 3)
    },
    {
      title: '郵便番号',
      value: postcode,
      path: path.replace(/\d$/, 3)
    },
    {
      title: 'オプション',
      value: option,
      path: path.replace(/\d$/, 4)
    },
    {
      title: '配送メモ',
      value: notes,
      path: path.replace(/\d$/, 5)
    },
    {
      title: '支払い',
      value: cardnumber.replace(/./g, '*'),
      path: path.replace(/\d$/, 6)
    },
  ]

  function handleSubmit(e) {
    e.preventDefault();

    const nextPagePath = `${path.replace(/\d$/, 8)}`;
    history.push(nextPagePath);
  }

  return (
    <>
      <H1>支払いフォーム</H1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <ConfirmList items={items} />
        </Field>
        <Submit type="submit" value="注文を確定する" />
      </form>
    </>
  )
}
