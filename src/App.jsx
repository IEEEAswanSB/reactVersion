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
// import Bein_event from "./components/bein-event";
import React, { Suspense } from "react";
import Home from "./pages/Home";

const CodeStormForm = React.lazy(() => import("./pages/CodeStormForm"));
const Bein_event = React.lazy(() => import("./components/bein-event"));
const VerifyCodeStorm = React.lazy(() => import("./pages/VerifyCodeStorm"));
// const Bein6 = React.lazy(() => import("./pages/Bein6"));
import Bein6Attendance from "./pages/Bein6Attendance";
import { Box, Typography } from "@mui/material";
// const Bein6Attendance = React.lazy(() => import("./pages/Bein6Attendance"));
const Bein6Validate = React.lazy(() => import("./pages/Bein6Validate"));
const Bein6Register = React.lazy(() => import("./pages/Bein6Register"));
const Ending = React.lazy(() => import("./components/Ending"));
const CiCodeStormForm = React.lazy(() => import("./pages/ciPage"));

function App() {

  if (window?.location.pathname.toLowerCase() === "/bein6/validate") {
    import("./bein6.css");
  } else if (
    window?.location.pathname.toLowerCase() === "/bein6/register" ||
    window?.location.pathname.toLowerCase() === "/bein6/attend"
  ) {
    import("./bein6ClosedForm.css");

  } else {
    import("./App.css");
    import("./index.css");
  }

  return (
    <Suspense
      fallback={
        <>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n  main {\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #090707;\n}\n.dank-ass-loader {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.dank-ass-loader .row {\n  display: flex;\n}\n.arrow {\n  width: 0;\n  height: 0;\n  margin: 0 -6px;\n  border-left: 12px solid transparent;\n  border-right: 12px solid transparent;\n  border-bottom: 21.6px solid #fff;\n  animation: blink 1s infinite;\n  filter: drop-shadow(0 0 18px #fff);\n}\n.arrow.down {\n  transform: rotate(180deg);\n}\n.arrow.outer-1 {\n  animation-delay: -0.0555555556s;\n}\n.arrow.outer-2 {\n  animation-delay: -0.1111111111s;\n}\n.arrow.outer-3 {\n  animation-delay: -0.1666666667s;\n}\n.arrow.outer-4 {\n  animation-delay: -0.2222222222s;\n}\n.arrow.outer-5 {\n  animation-delay: -0.2777777778s;\n}\n.arrow.outer-6 {\n  animation-delay: -0.3333333333s;\n}\n.arrow.outer-7 {\n  animation-delay: -0.3888888889s;\n}\n.arrow.outer-8 {\n  animation-delay: -0.4444444444s;\n}\n.arrow.outer-9 {\n  animation-delay: -0.5s;\n}\n.arrow.outer-10 {\n  animation-delay: -0.5555555556s;\n}\n.arrow.outer-11 {\n  animation-delay: -0.6111111111s;\n}\n.arrow.outer-12 {\n  animation-delay: -0.6666666667s;\n}\n.arrow.outer-13 {\n  animation-delay: -0.7222222222s;\n}\n.arrow.outer-14 {\n  animation-delay: -0.7777777778s;\n}\n.arrow.outer-15 {\n  animation-delay: -0.8333333333s;\n}\n.arrow.outer-16 {\n  animation-delay: -0.8888888889s;\n}\n.arrow.outer-17 {\n  animation-delay: -0.9444444444s;\n}\n.arrow.outer-18 {\n  animation-delay: -1s;\n}\n.arrow.inner-1 {\n  animation-delay: -0.1666666667s;\n}\n.arrow.inner-2 {\n  animation-delay: -0.3333333333s;\n}\n.arrow.inner-3 {\n  animation-delay: -0.5s;\n}\n.arrow.inner-4 {\n  animation-delay: -0.6666666667s;\n}\n.arrow.inner-5 {\n  animation-delay: -0.8333333333s;\n}\n.arrow.inner-6 {\n  animation-delay: -1s;\n}\n@keyframes blink {\n  0% {\n    opacity: 0.1;\n  }\n  30% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.1;\n  }\n}\n\n  ",
            }}
          />
          <main>
            <div className="dank-ass-loader">
              <div className="row">
                <div className="arrow up outer outer-18" />
                <div className="arrow down outer outer-17" />
                <div className="arrow up outer outer-16" />
                <div className="arrow down outer outer-15" />
                <div className="arrow up outer outer-14" />
              </div>
              <div className="row">
                <div className="arrow up outer outer-1" />
                <div className="arrow down outer outer-2" />
                <div className="arrow up inner inner-6" />
                <div className="arrow down inner inner-5" />
                <div className="arrow up inner inner-4" />
                <div className="arrow down outer outer-13" />
                <div className="arrow up outer outer-12" />
              </div>
              <div className="row">
                <div className="arrow down outer outer-3" />
                <div className="arrow up outer outer-4" />
                <div className="arrow down inner inner-1" />
                <div className="arrow up inner inner-2" />
                <div className="arrow down inner inner-3" />
                <div className="arrow up outer outer-11" />
                <div className="arrow down outer outer-10" />
              </div>
              <div className="row">
                <div className="arrow down outer outer-5" />
                <div className="arrow up outer outer-6" />
                <div className="arrow down outer outer-7" />
                <div className="arrow up outer outer-8" />
                <div className="arrow down outer outer-9" />
              </div>
            </div>
          </main>
          <>
            <Box
              // center
              sx={{
                position: "absolute",
                top: "80%",

                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography variant="h6" align="center">
                Loading...
              </Typography>
            </Box>
          </>
        </>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codestorm" element={<CodeStormForm />} />
        <Route path="/codestorm/verify" element={<VerifyCodeStorm />} />

        <Route path="/Bein6/attend" element={<Bein6Attendance />} />
        <Route path="/Bein6" element={<Bein_event />} />
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
