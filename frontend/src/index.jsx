import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import NotFound from './pages/not-found/NotFound';
import "./index.css"
import Groups from './pages/groups/Groups';
import Roles from './pages/roles/Roles';
import Modules from './pages/modules/Modules';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index={true} path='/' element={<Dashboard />} />
    <Route path='/users' element={<Users />} />
    <Route path='/groups' element={<Groups />} />
    <Route path='/roles' element={<Roles />} />
    <Route path='/modules' element={<Modules />} />
    <Route path='/*' element={<NotFound />} />
  </Route>
));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
