import { Suspense } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />a
        </Suspense>
      </main>
    </>
  )
}

export default App