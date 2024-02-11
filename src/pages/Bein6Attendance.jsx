import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { RecordAttendanceBein6 } from "../../services/register.service";
import Info from "./Info";
import {
  Box,

} from "@mui/material";

export function Bein6Attendance() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [data, setData] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (!!data) {           
        RecordAttendanceBein6({TicketID:data})
        .then((res) => {
          setOpen(false);
          setResponse(res?.message);
          setSeverity("success");
          setOpen(true);
          setTimeout(() => {
            setData(null);
          }
          , 3000);
        })
        .catch((err) => {
          setOpen(false);
          setResponse(err?.response?.data?.message || "An error occurred");
          setSeverity("error");
          setOpen(true);

          setTimeout(() => {
            setData(null);
          }
          , 3000);

        });
    }    
  }, [data]);

  return (
    <Box>
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        key="environment"
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{
           width: "100%"}}
      />

      <Info
        response={response}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </Box>
  );
}
