import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import App from './App';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import NotFound from './pages/not-found/NotFound';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index={true} path='/' element={<Home />} />
    <Route path='/users' element={<Users />} />
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
