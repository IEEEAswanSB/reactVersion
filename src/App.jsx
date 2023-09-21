import Home from "./pages/Home"
import { CodeStorm } from "./pages/CodeStorm"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CodeStormForm from "./pages/CodeStormForm"
import {Route, Link, Routes} from 'react-router-dom';

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
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codestorm" element={<CodeStorm />} />
          <Route path="/form" element={<CodeStormForm />} />
        </Routes>
       </BrowserRouter>
  )
}

export default App
