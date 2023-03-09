import './App.css';
import React, {useEffect, useState} from 'react';

function Nav() {
  return (
    <div className="container">
      <div className="flex justify-between items-center w-screen bg-purple-100 h-24 px-8 py-10">
        <p className="text-4xl font-semibold tracking-tight scale-y-90">astorik</p>
      </div>
    </div>
  );
}

function App() {
  let [userData, setUserData] = useState({});

  // load userdata
  useEffect(() => {
    async function load() {
      let userData = await fetch("http://localhost:8000/v0/user/hello@turtledev.in");
      if (userData.ok) {
        let data = await userData.json();
        setUserData(data);
      }
    }
    load();
  }, []);

  return (
    <div>
        <Nav></Nav>
        <div className="container">
          <p>{userData.Name}</p>
        </div>
    </div>
  )
}

export default App;
