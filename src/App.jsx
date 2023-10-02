import Home from "./pages/Home"
import { CodeStorm } from "./pages/CodeStorm"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CodeStormForm from "./pages/CodeStormForm"
import {Route, Link, Routes} from 'react-router-dom';
import Ending from "./components/Ending";
import { useNavigate } from "react-router";
function App() {


  if(window.location.pathname === "/codestorm") {
    const navigae = useNavigate();
    navigae("/codestorm");
  }
  if(window.location.pathname === "/form") {
    const navigae = useNavigate();
    navigae("/form");
  }

  return (

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codestorm" element={<CodeStormForm />} />
          <Route path="/done" element={<Ending />} />
        </Routes>

  )
}

export default App
