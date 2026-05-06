import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './router/router'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const queryClient = new QueryClient()

const theme = createTheme({
  colors: {
    primary: [
      '#fff8f3',
      '#feefe5',
      '#fddfd0',
      '#fbc5a8',
      '#f8a97a',
      '#f28c4c',
      '#db6e2f',
      '#b85724',
      '#94461e',
      '#7a3a1a'
    ],

    secondary: [
      '#fffbea',
      '#fff3c4',
      '#fce588',
      '#fadb5f',
      '#f7c948',
      '#d9a514',
      '#b8890f',
      '#8d6e0a',
      '#6d5508',
      '#504006'
    ],

    accent: [
      '#f7f5ff',
      '#ede9fe',
      '#ddd6fe',
      '#c4b5fd',
      '#a78bfa',
      '#7c3aed',
      '#8b5cf6',
      '#6d28d9',
      '#5b21b6',
      '#4c1d95'
    ],

    success: [
      '#f3faf5',
      '#e3f6ea',
      '#c1eac5',
      '#9bd5a6',
      '#6fba82',
      '#4f9f67',
      '#3b8554',
      '#2f6e46',
      '#27593a',
      '#1f4530'
    ],

    warning: [
      '#fff8f1',
      '#feecdc',
      '#fcd9bd',
      '#fdba8c',
      '#f59e5b',
      '#d9772a',
      '#b65c1f',
      '#91471a',
      '#6e3615',
      '#4f250f'
    ],

    error: [
      '#fdf4f4',
      '#fce8e8',
      '#fbd5d5',
      '#f8b4b4',
      '#f28b8b',
      '#e06666',
      '#c94c4c',
      '#a63a3a',
      '#822d2d',
      '#5c1f1f'
    ]
  },

  primaryColor: 'primary',
  primaryShade: 6
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={theme} withNormalizeCSS withGlobalStyles>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
)
