/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Editor from './src/components/Editor';
import Home from './src/components/Home';

const App: () => React$Node = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [external, setExternal] = useState(false);
  const startEditing = (name = '') => {
    setFileName(name);
    setIsEditing(true);
  };
  const stopEditing = () => {
    setIsEditing(false);
    setFileName('');
  };
  return (
    <>
      {isEditing ? <Editor stopEditing={stopEditing} fileName={fileName} external={external} /> : <Home startEditing={startEditing} setExternal={setExternal} external={external} />}
    </>
  );
};

export default App;
