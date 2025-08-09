import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import NotFound from './pages/not-found/NotFound';
import Groups from './pages/groups/Groups';
import Roles from './pages/roles/Roles';
import Modules from './pages/modules/Modules';
import Permissions from './pages/permissions/Permissions';
import "./index.css"
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route element={<ProtectedRoute />}>
      <Route index={true} path='/dashboard' element={<Dashboard />} />
      <Route path='/users' element={<Users />} />
      <Route path='/groups' element={<Groups />} />
      <Route path='/roles' element={<Roles />} />
      <Route path='/modules' element={<Modules />} />
      <Route path='/permissions' element={<Permissions />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/*' element={<NotFound />} />
  </Route>
));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
