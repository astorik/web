import './App.css';
import React from 'react';

function Nav() {
  return (
    <div className="container">
      <div className="flex justify-between items-center w-screen bg-purple-100 h-24 px-8 py-10">
        <p className="text-4xl font-semibold tracking-tight scale-y-90">astorik</p>
      </div>
    </div>
  );
}

async function App() {
  // todo: figure how to make async requests work
  let userData = await fetch("http://localhost:8000/v0/user/hello@turtledev.in");
  return (
    <React.Fragment>
      <Nav></Nav>
      <div className="container">
        <p>text</p>
      </div>
    </React.Fragment>
  )
}

export default App;
