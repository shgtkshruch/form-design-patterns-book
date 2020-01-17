import React from 'react';
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { useRouteMatch, useHistory } from "react-router-dom";

import H1 from '../components/H1';
import Input from '../components/Input';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import Submit from '../components/Submit';

export default ({ props }) => {
  const [mobile, setMobile] = UseStateWithLocalStorage('mobile');
  let history = useHistory();
  let { path } = useRouteMatch();

  function handleSubmit(e) {
    e.preventDefault();

    const nextPagePath = `${path.replace(/\d$/, 3)}`;
    history.push(nextPagePath);
  }

  return (
    <>
      <H1>支払いフォーム</H1>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="mobile">
            <FieldLabel>携帯電話番号（任意）</FieldLabel>
            <FieldHint>配送に関するお知らせをお送りします。</FieldHint>
          </Label>
          <Input
            type="tel"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Field>
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
