import './App.css';
import React from 'react';
import { createBrowserRouter, useRouteError, Outlet, Link, useLoaderData, useNavigation } from 'react-router-dom';

function Nav({ email }) {
  const navigation = useNavigation();
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center w-screen bg-purple-100 h-24 px-8 py-10">
        <Link to="/" className="text-4xl font-semibold tracking-tight scale-y-90">astorik</Link>
        <p>{email}</p>
      </div>
      <div className="main">
        {
          navigation.state === "loading" ?
            <div className="flex flex-col container mx-auto my-72">
              <p className="text-center text-xl">loading ...</p>
              <span className="loader container mx-auto"></span>
            </div>
            :
            <Outlet />
        }
      </div>
    </div>
  );
}

function Preferences({ user }) {
  let orgs = user.Orgs ?? [];
  let preferenceCentres = orgs.map(org => {
    return (
      <div className="container" key={org.Name}>
        <p className="text-4xl font-bold mb-4">{org.Name}</p>
        {org.Preferences.map(pref =>
          <div key={pref.Name} className="container p-2 ml-10 flex">
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
    <div className="mx-auto max-w-screen-md py-12">
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
  const userData = useLoaderData();
  return (
    <div>
      <Preferences user={userData} />
    </div>
  );
}

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="container h-screen w-screen flex justify-around items-center flex-col">
      <div className="-translate-x-2/4 -translate-y-2/4">
        <p className="text-2xl font-bold">Error</p>
        <p>{error.statusText || error.message}</p>
        <p>Go <Link to="/" className="text-red-400">home</Link></p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <div className="p-6 flex flex-col items-center">
        <pre className="text-xs md:text-base">{hammerTime}</pre>
        <h1 className="text-2xl font-light">Work In Progress</h1>
        <div className="container flex flex-col md:flex-row text-center md:text-left justify-center gap-4 mt-20">
          <a className="btn-primary-inverted" href="https://astorik.com">Know More</a>
          <Link to={"/preferences/" + encodeURIComponent("hello@turtledev.in")} className="btn-primary">Preference Center Demo</Link>
        </div>
      </div>
    </div>
  )
}

const hammerTime = `
T                                    \\\`.    T
|    T     .--------------.___________) \\   |    T
!    |     |//////////////|___________[ ]   !  T |
     !     \`--------------'           ) (      | !
                                  mn  '-'      !
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "/preferences/:userId",
            element: <App />,
            loader: async ({ params }) => {
              const { userId } = params;
              const url = `http://localhost:8000/v0/user/${encodeURIComponent(userId)}`
              const userData = await fetch(url);
              if (userData.ok) {
                return userData.json();
              }
              throw Error(`failed to fetch data for user ${userId}`);
            },
          }
        ]
      }
    ]
  }
], {
  basename: "/web"
});

export default router;
