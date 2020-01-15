import React from 'react';
import './App.css';

function App() {
  return (
    <div class="field">
      <label for="email">
        <span class="field-label">メールアドレス</span>
      </label>
      <input type="email" id="email" name="email" />
    </div>
  );
}

export default App;
