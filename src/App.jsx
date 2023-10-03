import Home from "./pages/Home"
import { CodeStorm } from "./pages/CodeStorm"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CodeStormForm from "./pages/CodeStormForm"
import VerifyCodeStorm from "./pages/VerifyCodeStorm"
import {Route, Link, Routes} from 'react-router-dom';
import Ending from "./components/Ending";
import { useNavigate } from "react-router";
import Upload from "./components/upload"
import CiCodeStormForm from "./pages/ciPage"
import Email from "./components/email"
function App() {


  // if(window.location.pathname === "/codestorm") {
  //   const navigae = useNavigate();
  //   navigae("/codestorm");
  // }
  // if(window.location.pathname === "/form") {
  //   const navigae = useNavigate();
  //   navigae("/form");
  // }

  return (

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codestorm" element={<CodeStormForm />} />
          <Route path="/codestorm/verify" element={<VerifyCodeStorm />} />

          <Route path="/done" element={<Ending />} />
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/email" element={<Email/>}/>

          <Route path="/certificate" element={<CiCodeStormForm/>}/>
          

        </Routes>

  )
}

export default App
