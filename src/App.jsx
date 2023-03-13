import './App.css';
import React, {useEffect, useState} from 'react';

function Nav({email}) {
  return (
    <div className="container">
      <div className="flex justify-between items-center w-screen bg-purple-100 h-24 px-8 py-10">
        <p className="text-4xl font-semibold tracking-tight scale-y-90">astorik</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

// todo: refactor
function Preferences({user}) {
  let orgs = user.Orgs ?? [];
  let preferenceCentres = orgs.map(org => {
    return (
      <div className="container" key={org.Name}>
        <p className="text-4xl font-bold mb-4">{org.Name}</p>
        {org.Preferences.map(pref => 
          <div className="container p-2 ml-10 flex">
            <input type="checkbox" className="mx-4" name="" id="" />
            <div>
              <p className="text-3xl">{pref.Name}</p>
              <p>{pref.Description}</p>
            </div>
          </div>
        )}
      </div>
    );
  })
  return (
    <div className="container mx-auto max-w-screen-md py-12">
      <p className="text-5xl py-2">Welcome {user.Name}!</p>
      <p className="text-lg px-2 tracking-wide">View/update your preferences below</p>
      <div className="container pt-10 mb-10">
        {preferenceCentres}
      </div>
      <div className="container flex justify-center">
        <button className="py-4 px-6 bg-black text-white font-semibold text-xl shadow-md rounded-md">UPDATE</button>
      </div>
    </div>
  );
}

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async function loadUserData() {
      // todo: move this to a separate interface; 
      // todo: architect user-id parsing
      let userData = await fetch("http://localhost:8000/v0/user/hello@turtledev.in");
      if (userData.ok) {
        setUserData(await userData.json());
      }
    })();
  }, []);
  
  return (
    <div>
        <Nav email={userData.Email}></Nav>
        <Preferences user={userData}/>
    </div>
  );
}

export default App;
