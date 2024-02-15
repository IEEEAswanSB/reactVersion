import { Suspense, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

import {
  ValidateBein6,
  exportBein6Certificate,
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
  const [data, setData] = useState(null);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!!data) {
      // exportBein6Certificate({TicketID:"54187-B6-88780"})
      // .then((r)=>{
      //   downloadBase64File(r[0].PDF,'lol.pdf')
      // })
      // .then((res) => {
      //   setLoading(false);
      //   downloadBase64File(res[0].PDF, `${res[0].TicketID}.pdf`);
      //   setResponse("Downloaded");
      //   setSeverity("success");
      //   setOpen(true);
      //   setTimeout(() => {
      //     setData(null);
      //   }
      //   , 3000);
      // })
      // .catch((err) => {
      //   setResponse(err?.response?.data?.message || 'Not enough hours attended. Please contact authorities for resolution.');
      //   setSeverity("error");
      //   setOpen(true);
      //   setLoading(false);
      //   setTimeout(() => {
      //     setData(null);
      //   }
      //   , 3000);
      // });
    }
  }, [data]);

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

    let id = document.getElementsByName("id")[0].value;
    // let password = document.getElementsByName("Password")[0].value;
    const buttonName = e.nativeEvent.submitter.name;

    if (buttonName === "Download") {
      exportBein6Certificate({ id: id })
        .then((res) => {
          setLoading(false);
          downloadBase64File(res[0].PDF, `${res[0].id}.pdf`);
          setResponse("Downloaded");
          setSeverity("success");
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setResponse(
            err?.response?.data?.message ||
              "Not enough hours attended. Please contact authorities for resolution."
          );
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
        // paddingTop:'100px',
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        bgcolor: "rgba(0,0,0,0.3)",
        "& p.MuiFormHelperText-root": {
          // position: "absolute",
          // color: "#f44336",
          color: "rgba(255, 255, 255, 0.7) ",
          // textAlign: "center",
          // fontWeight: "bolder",
          direction: "rtl",
          textAlign: "right",
          // ! Add a symbol before the helper text
          "&::before": {
            content: '"ⓘ "',
          },
        },
      }}
    >
      {/* <input type="text" name="id" placeholder="Ticket ID" />
      <input type="submit" onClick={Validate} value="Validate" />
      <p>{response}</p> */}
      <TextField
        variant="filled"
        label={errors.id ? "Invalid ID" : "ID"}
        {...register("id", {
          required: "ID is required",
          pattern: {
            value: /^[0-9]{14}$/,
            message: "Invalid egyptian ID",
          },
        })}
        error={errors?.id}
        // reset value
        helperText={"الرقم القومي المكون من 14 خانة أمام البطاقة الشخصية"}
      />
      {/* <div className="w-screen flex justify-center items-center text-center text-2xl">IEEE ASW QR READER</div>
    <div className="border-2 border-red-700 py-2 h-[400px] w-screen">
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
        </div>
      <div className="w-screen flex justify-center text-red-500 items-center text-center text-lg mt-10">IF YOU HAVE ANY PROBLEM CONTACT US</div> */}

      <LoadingButton
        variant="contained"
        color="success"
        loading={loading}
        type="submit"
        name="Download"
      >
        Download Certificate
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
