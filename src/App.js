import React from 'react';
import './App.css';
import Nav from './Nav';
import EnterItems from './EnterItems'

function App(props) {
  return (
    <>  
      <Nav />
      <EnterItems todo={props.todo}/>
    </>
  );
}

export default App;
