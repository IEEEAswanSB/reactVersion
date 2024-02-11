import { Suspense, useRef, useState } from "react";
import {
  ValidateBein6,
  generateBein6Ticket,
  sendBein6Ticket,
} from "../../services/register.service";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Info from "./Info";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
function Main() {
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("Alert");

  const [loading, setLoading] = useState(false);

  const [restCounter, setRestCounter] = useState(0);
  const [restOpen, setRestOpen] = useState(false);
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const ps = localStorage.getItem("password");
    if (ps) {
      document.getElementsByName("Password")[0].value = ps;
      setPassword(ps);
    }
  }, []);

  function downloadBase64File(contentBase64, fileName) {
    const linkSource = `${contentBase64}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = fileName;
    downloadLink.click();
  }

  function onSubmit(data, e) {
    if (loading) return;
    if (restCounter > 10) {
      setSeverity("warning");
      setRestOpen(true);
    }
    setRestCounter((prev) => {
      return prev + 1;
    });
    setLoading(true);

    let ticketID = document.getElementsByName("TicketID")[0].value;
    let password = document.getElementsByName("Password")[0].value;
    const buttonName = e.nativeEvent.submitter.name;

    if (buttonName === "Download") {
      generateBein6Ticket({ TicketID: ticketID, Password: password })
        .then((res) => {
          setLoading(false);
          downloadBase64File(res.pdf, `${ticketID}.pdf`);
          setResponse("Downloaded");
          setSeverity("success");
          setOpen(true);
        })
        .catch((err) => {
          setResponse(err?.response?.data?.message || "An error occurred");
          setSeverity("error");
          setOpen(true);

          setLoading(false);
        });
    } else if (buttonName === "Send") {
      sendBein6Ticket({ TicketID: ticketID, Password: password })
        .then((res) => {
          setLoading(false);
          setResponse(res.message);
          setSeverity("success");
          setOpen(true);
        })
        .catch((err) => {
          setResponse(err?.response?.data?.message || "An error occurred");
          setSeverity("error");
          setOpen(true);

          setLoading(false);
        });
    } else {
      ValidateBein6({ TicketID: ticketID, Password: password })
        .then((res) => {
          setLoading(false);
          setResponse(res.message);
          setSeverity("success");
          setOpen(true);
          localStorage.setItem("password", password);
        })
        .catch((err) => {
          setResponse(err?.response?.data?.message || "An error occurred");
          setSeverity("error");
          setOpen(true);

          setLoading(false);
        });
    }
  }

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* <input type="text" name="TicketID" placeholder="Ticket ID" />
      <input type="submit" onClick={Validate} value="Validate" />
      <p>{response}</p> */}
      <TextField
        variant="filled"
        label={errors.TicketID ? "Invalid Ticket ID" : "Ticket ID"}
        {...register("TicketID", {
          required: true,
          pattern: {
            value: /^[0-9]{5}-B6-[0-9]{5}$/,
            message: "Invalid Ticket ID",
          },
        })}
        error={errors?.TicketID}
        // reset value
      />

      <TextField
        variant="filled"
        type="Password"
        onInput={(e) => {
          setPassword(e.target.value);
        }}
        {...register("Password")}
      />

      <LoadingButton
        variant="contained"
        color="success"
        loading={loading}
        type="submit"
        name="Validate"
      >
        Validate
      </LoadingButton>

      <LoadingButton
        variant="contained"
        color="success"
        loading={loading}
        type="submit"
        name="Download"
      >
        Download Ticket
      </LoadingButton>

      <LoadingButton
        variant="contained"
        color="success"
        loading={loading}
        type="submit"
        name="Send"
      >
        Send Ticket by Email
      </LoadingButton>

      <Info
        response={response}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </Box>
  );
}

export default function Bein6Validate() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [allowed, setAllowed] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {allowed ? <Main /> : <Button>Auth</Button>}
    </ThemeProvider>
  );
}
