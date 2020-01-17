import { useState, useEffect } from 'react';

export default (key, defaultValue = '') => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
