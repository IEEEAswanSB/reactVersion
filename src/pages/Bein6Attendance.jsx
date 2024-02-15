import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { RecordAttendanceBein6 } from "../../services/register.service";

import Info from "./Info";
import { Box } from "@mui/material";
import { func } from "prop-types";

export function Bein6Attendance() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [data, setData] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!!data) {
      RecordAttendanceBein6({ TicketID: data })
        .then((res) => {
          setOpen(false);
          setResponse(res?.message);
          setSeverity("success");
          setOpen(true);
          setTimeout(() => {
            setData(null);
          }, 3000);
        })
        .catch((err) => {
          setOpen(false);
          setResponse(err?.response?.data?.message || "An error occurred");
          setSeverity("error");
          setOpen(true);

          setTimeout(() => {
            setData(null);
          }, 3000);
        });
    }
  }, [data]);


  return (
   <div>
    <QrReader
            constraints={{
            audio: false,
            video: { facingMode: "environment" }}}

        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{
          width: "100%",
        }}
      />

      <Info
        response={response}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </div>
  );
}


function Closed() {
  return (
    <Box
      sx={{
        bgcolor: "#00000090",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <div className="test">
          Attendance requires AUTH
          <p>BE IN</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="squiggly-0">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves={3}
                result="noise"
                seed={0}
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale={6}
              />
            </filter>
            <filter id="squiggly-1">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves={3}
                result="noise"
                seed={1}
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={8} />
            </filter>
            <filter id="squiggly-2">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves={3}
                result="noise"
                seed={2}
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={6} />
            </filter>
            <filter id="squiggly-3">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves={3}
                result="noise"
                seed={3}
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={8} />
            </filter>
            <filter id="squiggly-4">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves={3}
                result="noise"
                seed={4}
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={6} />
            </filter>
          </defs>
        </svg>
      </Box>
    </Box>
  );
}
export default function Main() {
  return (
    <Box>
      {/* <Bein6Attendance /> */}
      <Closed />
    </Box>
  );
      
}
