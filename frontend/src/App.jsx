import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
// import Landing from './components/LandingPage/Landing'
import Spots from './components/Spots/Spots'
import SpotDetails from './components/SpotItems/SpotDetails'
import CreateSpotForm from './components/SpotItems/CreateNewSpotForm';
import ManageSpots from './components/SpotItems/ManageSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Landing />
  // },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
        path: "spots/:spotId",
        element: <SpotDetails />
      },
      {
        path: "spots/new",
        element: <CreateSpotForm />
      },
      {
        path: "spots/current",
        element: <ManageSpots />
      },
      // {
      //   path: 'login',
      //   element: <LoginFormModal/>
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  },
  {
    path: '*',
    element: <h1>Page Not Found!</h1>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
