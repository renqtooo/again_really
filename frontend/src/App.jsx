import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from './components/AppBar'
import Loading from './components/Loading'

function App() {
  return (
    <>
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>

      <AppBar />
    </>
  )
}

export default App
