import { CodeStorm } from "./pages/CodeStorm";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import Upload from "./components/upload";
import Email from "./components/email";

import React, { Suspense } from "react";
import Home from "./pages/Home";

const CodeStormForm = React.lazy(() => import("./pages/CodeStormForm"));
const VerifyCodeStorm = React.lazy(() => import("./pages/VerifyCodeStorm"));
const Bein6 = React.lazy(() => import("./pages/Bein6"));
import {Bein6Attendance} from "./pages/Bein6Attendance";
// const Bein6Attendance = React.lazy(() => import("./pages/Bein6Attendance"));
const Bein6Validate = React.lazy(() => import("./pages/Bein6Validate"));
const Bein6Register = React.lazy(() => import("./pages/Bein6Register"));
const Ending = React.lazy(() => import("./components/Ending"));
const CiCodeStormForm = React.lazy(() => import("./pages/ciPage"));

function App() {
  if (
    window?.location.pathname.toLowerCase() === "/bein6/register" ||
    window?.location.pathname.toLowerCase() === "/bein6/validate" ||
    window?.location.pathname.toLowerCase() === "/bein6/attend"
  )
    import("./bein6.css");
  else {
    import("./App.css");
    import("./index.css");
  }

  return (
    <Suspense fallback={<div>error</div>}>
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

        <Route path="/certificate" element={<CiCodeStormForm />} />
      </Routes>
    </Suspense>
  );
}

export default App;
