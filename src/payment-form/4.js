import React from 'react';
import UseStateWithLocalStorage from '../components/Use-State-With-LocalStorage';
import { useRouteMatch, useHistory } from "react-router-dom";

import H1 from '../components/H1';
import Field from '../components/Field';
import Legend from '../components/Legend';
import Radio from '../components/Radio';
import BackBtn from '../components/Back-Button';
import Submit from '../components/Submit';

export default () => {
  const [option, setOption] = UseStateWithLocalStorage('option', 'standard');

  let history = useHistory();
  let { path } = useRouteMatch();

  function handleSubmit(e) {
    e.preventDefault();

    const nextPagePath = `${path.replace(/\d$/, 5)}`;
    history.push(nextPagePath);
  }

  return (
    <>
      <H1>支払いフォーム</H1>
      <BackBtn to={path.replace(/\d$/, 3)} text="戻る" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Field>
          <Legend>配送オプション</Legend>
          <Radio
            name="option"
            id="option"
            value="standard"
            checked={option === 'standard' ? true : false}
            labelText="スタンダード（無料、2~3日で配送）"
            onChange={(e) => setOption(e.target.value)}
          />
          <Radio
            name="option"
            id="option2"
            value="premium"
            checked={option === 'premium' ? true : false}
            labelText="プレミアム（€6 、翌日配送）"
            onChange={(e) => setOption(e.target.value)}
          />
        </Field>
        <Submit type="submit" value="続ける" />
      </form>
    </>
  )
}
