import { createBrowserRouter, Navigate } from "react-router-dom"
import { lazy } from "react"
import App from "../App"
import ProtectedRoute from "../auth/ProtectedRoute"

const SignUp = lazy(() => import("../views/auth/SignUp"))
const SignIn = lazy(() => import("../views/auth/SignIn"))
const Home = lazy(() => import("../views/Home"))
const Profile = lazy(() => import("../views/Profile"))

const router = createBrowserRouter(
  [
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: 'signin',
      element: <SignIn />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <App />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: 'profile',
              element: <Profile />,
            },
          ],
        },
      ]
    },
  ],
  { basename: import.meta.env.VITE_BASE_URL }
)

export default router