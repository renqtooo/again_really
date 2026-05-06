import { Suspense } from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from "./components/AppBar"
import Loading from "./components/Loading"

function App() {
  return (
    <>
      <AppBar />

      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default App