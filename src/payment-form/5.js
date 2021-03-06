import React from 'react';
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { useRouteMatch, useHistory } from "react-router-dom";

import H1 from '../components/H1';
import Field from '../components/Field';
import Label from '../components/Lable';
import FieldLabel from '../components/Field-Label';
import FieldHint from '../components/Field-Hint';
import Textarea from '../components/Textarea';
import BackBtn from '../components/Back-Button';
import Submit from '../components/Submit';

export default () => {
  const [notes, setNotes] = UseStateWithLocalStorage('notes');

  let history = useHistory();
  let { path } = useRouteMatch();

  function handleSubmit(e) {
    e.preventDefault();

    const nextPagePath = `${path.replace(/\d$/, 6)}`;
    history.push(nextPagePath);
  }

  return (
    <>
      <H1>支払いフォーム</H1>
      <BackBtn to={path.replace(/\d$/, 4)} text="戻る" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Label htmlFor="notes">
            <FieldLabel>配送メモ（任意）</FieldLabel>
            <FieldHint>ご不在時の対応をお知らせください。（近所の人に預ける など）</FieldHint>
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            max={100}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
