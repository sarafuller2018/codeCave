import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from "./App"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import SingleProjectDetails from './pages/SingleProjectDetails';
import ErrorPage from './pages/ErrorPage';
import AddProject from './pages/AddProject-Form'
import ProjectList from './components/ProjectList/ProjectList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <Home />,
                index: true
              }, 
              {
                path: '/home',
                element: <Home/>
              },{
                path: '/login',
                element: <Login />
              }, 
              {
                path: '/signup',
                element: <Signup />
              }, 
              {
                path: '/profiles/:username',
                element: <ProfilePage />
              }, {
                path: '/me',
                element: <ProfilePage />
              }, {
                path: '/projects/:projectId',
                element: <SingleProjectDetails />
              },{
              path: '/add-project',
              element: <AddProject />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)