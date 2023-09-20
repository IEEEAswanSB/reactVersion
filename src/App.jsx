import Home from "./pages/Home"
import CodeStorm from "./pages/CodeStorm"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/codestorm',
      element: <CodeStorm />
    }
  ])
  return (
      <RouterProvider router={router} />  
  )
}

export default App
