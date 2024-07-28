import React, { useState } from 'react';

function LocalStorageTest() {
  const [input, setInput] = useState('');

  const saveToLocalStorage = () => {
    localStorage.setItem('testInput', input);
    alert('Data saved to local storage!');
  };

  const loadFromLocalStorage = () => {
    const savedInput = localStorage.getItem('testInput');
    alert(`Data retrieved: ${savedInput}`);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={saveToLocalStorage}>Save to Local Storage</button>
      <button onClick={loadFromLocalStorage}>Load from Local Storage</button>
    </div>
  );
}

export default LocalStorageTest;
