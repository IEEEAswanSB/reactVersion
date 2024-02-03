import Home from "./pages/Home"
import { CodeStorm } from "./pages/CodeStorm"
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CodeStormForm from "./pages/CodeStormForm"
import VerifyCodeStorm from "./pages/VerifyCodeStorm"
import { Bein6 } from "./pages/Bein6"
import { Bein6Attendance } from "./pages/Bein6Attendance"
import { Bein6Validate } from "./pages/Bein6Validate"
import { Bein6Register } from "./pages/Bein6Register"

import {Route, Link, Routes} from 'react-router-dom';
import Ending from "./components/Ending";
import { useNavigate } from "react-router";
import Upload from "./components/upload"
import CiCodeStormForm from "./pages/ciPage"
import Email from "./components/email"
function App() {


  if (window?.location.pathname.toLowerCase() === '/bein6/register')
    import('./bein6.css');
  else{
    import('./App.css')
    import('./index.css')
  }

  return (

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codestorm" element={<CodeStormForm />} />
          <Route path="/codestorm/verify" element={<VerifyCodeStorm />} />
          <Route path="/Bein6/" element={<Bein6 />} />

          <Route path="/Bein6/attend" element={<Bein6Attendance />} />
          <Route path="/Bein6/validate" element={<Bein6Validate />} />

          <Route path="/Bein6/register" element={<Bein6Register />} />


          <Route path="/done" element={<Ending />} />
          {/* <Route path="/upload" element={<Upload/>}/> */}
          {/* <Route path="/email" element={<Email/>}/> */}

          <Route path="/certificate" element={<CiCodeStormForm/>}/>
          

        </Routes>

  )
}

export default App
