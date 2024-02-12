import { Suspense, useRef, useState } from "react";
import {
  ValidateBein6,
  confirmBein6RegistrationAdmin,
  generateBein6Ticket,
  sendBein6Ticket,
} from "../../services/register.service";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Info from "./Info";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VerifiedIcon from "@mui/icons-material/Verified";

import { Bein6Attendance } from "./Bein6Attendance";
import { Bein6Register } from "./Bein6Register";

function Main({
  password,
  setPassword,
  response,
  setResponse,
  open,
  setOpen,
  severity,
  setSeverity,
}) {
  const [loading, setLoading] = useState(false);

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
    // if (restCounter > 10) {
    //   setSeverity("warning");
    //   setRestOpen(true);
    // }

    setLoading(true);

    let ticketID = document.getElementsByName("TicketID")[0].value;
    let password = document.getElementsByName("Password")[0].value;
    setPassword(password);
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
      console.log("Download");

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
    </Box>
  );
}

function Attendance() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0 0 0 0",
        zIndex: "15",
      }}
    >
      <Bein6Attendance />;
    </Box>
  );
}
function Register() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0 0 0 0",
        zIndex: "15",
      }}
    >
      <Bein6Register />;
    </Box>
  );
}

const CustomIconButton = ({
  color,
  border,
  Icon,
  password,
  confirmBein6RegistrationAdmin,
  setSeverity,
  setResponse,
  setOpen,
  setStates,
}) => (
  <IconButton
    sx={{
      zIndex: "50",
      border: border ? "1px solid #ff0f0f" : "none",
      color: color ? "#ff0f0f" : "white",
    }}
    onClick={() => {
      console.log(password);
      if (password === "") return;
      if (color) return;
      confirmBein6RegistrationAdmin({ Password: password })
        .then((res) => {
          if (res.message === "Correct Password") {
            setStates(true);
          } else {
            throw new Error("Incorrect Password");
          }
        })
        .catch((err) => {
          setSeverity("error");
          setResponse(err?.response?.data?.message || "An error occurred");
          setOpen(true);
        });
    }}
  >
    <Icon />
  </IconButton>
);

export default function Bein6Validate() {
  const [password, setPassword] = useState("");
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [allowVideo, setAllowVideo] = useState(false);
  const [register, setRegister] = useState(false);
  const [validation, setValidation] = useState(true);

  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("Alert");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {validation && (
        <Main
          password={password}
          setPassword={setPassword}
          response={response}
          setResponse={setResponse}
          open={open}
          setOpen={setOpen}
          severity={severity}
          setSeverity={setSeverity}
        />
      )}
      {register && <Register />}

      {allowVideo && <Attendance />}
      <Box
        sx={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          display: "flex",
          gap: "1rem",
          zIndex: "50",
        }}
      >
        <CustomIconButton
          color={register}
          border={register}
          Icon={GroupAddIcon}
          password={password}
          confirmBein6RegistrationAdmin={confirmBein6RegistrationAdmin}
          setSeverity={setSeverity}
          setResponse={setResponse}
          setOpen={setOpen}
          setStates={(value) => {
            setValidation(false);
            setAllowVideo(false);
            setRegister(value);
          }}
        />

        <CustomIconButton
          color={allowVideo}
          border={allowVideo}
          Icon={CameraAltIcon}
          password={password}
          confirmBein6RegistrationAdmin={confirmBein6RegistrationAdmin}
          setSeverity={setSeverity}
          setResponse={setResponse}
          setOpen={setOpen}
          setStates={(value) => {
            setValidation(false);
            setRegister(false);
            setAllowVideo(value);
          }}
        />

        <CustomIconButton
          color={validation}
          border={validation}
          Icon={VerifiedIcon}
          password={password}
          confirmBein6RegistrationAdmin={confirmBein6RegistrationAdmin}
          setSeverity={setSeverity}
          setResponse={setResponse}
          setOpen={setOpen}
          setStates={(value) => {
            setAllowVideo(false);
            setRegister(false);
            setValidation(value);
          }}
        />
      </Box>

      <Info
        response={response}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </ThemeProvider>
  );
}
