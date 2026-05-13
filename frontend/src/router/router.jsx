import { createHashRouter } from 'react-router-dom'
import { lazy } from 'react'
import App from '../App'
import ProtectedRoute from '../auth/ProtectedRoute'

const SignUp = lazy(() => import('../views/auth/SignUp'))
const SignIn = lazy(() => import('../views/auth/SignIn'))
const Home = lazy(() => import('../views/Home'))
const ExpenseCreation = lazy(() => import('../views/ExpenseCreation'))
const Profile = lazy(() => import('../views/Profile'))
const Customize = lazy(() => import('../views/Customize'))
const CategoryDetail = lazy(() => import('../views/CategoryDetail'))

const router = createHashRouter(
  [
    {
      path: 'signup',
      element: <SignUp />
    },
    {
      path: 'signin',
      element: <SignIn />
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <App />,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: 'expense/create',
              element: <ExpenseCreation />
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'customize',
              element: <Customize />
            },
            {
              path: 'category/:id',
              element: <CategoryDetail />
            }
          ]
        }
      ]
    }
  ]
  // { basename: import.meta.env.VITE_BASE_URL }
)

export default router
