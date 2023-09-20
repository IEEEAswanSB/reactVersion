import Home from "./pages/Home"
import CodeStorm from "./pages/CodeStorm"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CodeStormForm from "./pages/CodeStormForm"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/codestorm',
      element: <CodeStorm />,
    },
    {
      path: '/form',
      element: <CodeStormForm />
    }
  ])
  return (
      <RouterProvider router={router} />  
  )
}

export default App
