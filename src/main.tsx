import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import Sendtest from "./pages/Sendtest";
import Dashboard from "./pages/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Sendtest />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <RouterProvider router={router} />

  </>
)
