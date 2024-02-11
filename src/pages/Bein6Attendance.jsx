import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { RecordAttendanceBein6 } from "../../services/register.service";
import Info from "./Info";

export function Bein6Attendance() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const [stamp, setStamp] = useState(0);
  const [ticketID, setTicketID] = useState("");
  const [response, setResponse] = useState("");

  const handelAttendance = (result, ticketID) => {
    console.log(ticketID);
    if (result?.text === null) return;
    // if (result?.text === ticketID) console.log("rep");

    setTicketID("testing");
    setStamp(result?.timestamp);

    RecordAttendanceBein6({ TicketID: result?.text })
      .then((res) => {
        setOpen(false);

        setResponse(res.message);
        setSeverity("success");
        setOpen(true);
      })
      .catch((err) => {
        setOpen(false);

        setResponse(err.response.data.message);
        setSeverity("error");
        setOpen(true);
      });
  };

  return (
    <>
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        key="environment"
        onResult={(result, error) => {
          if (!!result) {
            console.log(result);
            handelAttendance(result, ticketID);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{response}</p>
      {/* <h1>ds</h1> */}

      <Info
        response={response}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </>
  );
}
