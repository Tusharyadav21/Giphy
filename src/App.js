import React from 'react';
import Header from './Components/Header/Header';
import Input from './Components/Input/Input';

const App = () => {


  return (
    <div style={{ display: "flex", flexDirection: "Column", alignItems: 'center', backgroundColor: "#f0f0f0" }}>
      <Header />
      <Input />
    </div>
  );
}

export default App;
