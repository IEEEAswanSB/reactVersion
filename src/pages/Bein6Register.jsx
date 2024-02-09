import {
  Alert,
  Autocomplete,
  Box,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RadioGroup } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReCAPTCHA from "react-google-recaptcha";
import FormClosedImage from "../assets/img/bein6/formClosed.webp";

// theme black
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Info from "./Info";
import { RegisterBein6 } from "../../services/register.service";

const university = [
  {
    label: "Aswan University",
    value: "aswan",
  },
  {
    label: "AAST Aswan",
    value: "AAST",
  },
  {
    label: "EELU university",
    value: "EELU",
  },
  {
    label: "Other",
    value: "other",
  },
];

const faculty = [
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Energy Engineering",
    value: "energy",
  },
  {
    label: "Computer Engineering",
    value: "computer",
  },
  {
    label: "Other",
    value: "other",
  },
];

const academicYear = [
  {
    label: "prep",
    value: "prep",
  },
  {
    label: "1st",
    value: "1",
  },
  {
    label: "2nd",
    value: "2",
  },
  {
    label: "3rd",
    value: "3",
  },
  {
    label: "4th",
    value: "4",
  },
  {
    label: "5th",
    value: "5",
  },
];

const tracks = [
  {
    label: "Data analysis",
    value: "Data analysis",
  },
  {
    label: "Business development",
    value: "Business development",
  },
  {
    label: "2D - Graphic design",
    value: "2D - Graphic design",
  },
  {
    label: "3D max",
    value: "3D max",
  },
  {
    label: "Classic Control",
    value: "Classic Control",
  },
];

function RHFAutoComplete({ name, control, options, isSubmitting, helperText }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${name} is required` }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Autocomplete
              disabled={isSubmitting}
              fullWidth
              error={!!error}
              disablePortal
              id="university"
              options={options}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.value : null);
              }}
              value={
                value
                  ? options.find((obj) => {
                      return obj.value === value;
                    }) ?? null
                  : null
              }
              renderInput={(params) => (
                <TextField
                  disabled={isSubmitting}
                  color={!error ? "success" : "error"}
                  {...params}
                  label={!error ? name : error.message}
                  inputRef={ref}
                  error={!!error}
                  helperText={helperText}
                />
              )}
            />
          </Box>
        );
      }}
    />
  );
}

function Main() {
  const [severity, setSeverity] = useState("alert");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const recaptchaRef = useRef(null);
  const paymentRef = useRef(null);
  console.log("Abdo Tolba was here :)");
  const handleClick = () => {
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const validateAge = (value) => {
    const birthDate = new Date(value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    const minAge = 5;
    const maxAge = 60;

    return (age >= minAge && age <= maxAge) || `${minAge} : ${maxAge} year old`;
  };

  const onSubmit = async (data) => {
    const captchaTempValue = await recaptchaRef.current.executeAsync();

    data["image"] = paymentRef.current?.files[0] || "Cash";
    data["Captcha"] = captchaTempValue;

    delete data["paymentProof"];

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    RegisterBein6(formData)
      .then((res) => {
        setResponse(res.message);
        setLoading(false);
        setIsSubmitting(false);
        setSeverity("success");
        setOpen(true);
        recaptchaRef.current.reset();
      })
      .catch((err) => {
        setIsSubmitting(false);
        setLoading(false);
        setResponse(err?.response?.data?.message || err.message);
        setSeverity("error");
        setOpen(true);
        recaptchaRef.current.reset();
      });

    setIsSubmitting(true);
    setLoading(true);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        margin: {
          sm: "10vw 10vw 5vw 30vw",
          xs: "3ch",
        },

        display: "flex",
        flexDirection: "column",
        gap: "3ch",
        "& .MuiGrid-container": {},

        //  ! Make the helper text red and bold. also on the top of the input
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

        "& .MuiFormLabel-root": {
          color: "white",
          fontWeight: "bolder",
        },

        "& .MuiPaper-root.myPaper": {
          border: "1px solid white",
        },

        "& .myGridLabel": {
          display: {
            sm: "flex",
            xs: "none",
          },
        },
      }}
    >
      {/* Header content for description */}
      <Paper
        className="myPaper"
        sx={{
          p: {
            sm: "3ch",
            xs: "1ch",
          },
          py: {
            xs: "2ch",
          },
          "&.myPaper ": {
            borderColor: "#a72d25 !important",
            borderWidth: "2px !important",
          },
        }}
        elevation={8}
      >
        <Typography variant="p" fontWeight={"bolder"}>
          By submitting this form, you confirm that you have read and agree to
          our terms and conditions.
        </Typography>
        <br />
        <br />
        <Typography
          variant="p"
          sx={{
            fontSize: ".8rem",
          }}
        >
          <div className="bg-red-100 border border-red-400 text-red-700 pl-7 pr-3 my-3 py-4 rounded relative">
            <Box
              container="ul"
              sx={{
                "& li": {
                  mb: "1.3ch",
                  "&::marker": {
                    content: '"➜ "',
                  },
                },
              }}
            >
              <li>
                Attendees have to bring their own laptops, as IEEE Aswan &
                CREATIVA won&#39;t afford any PCs.
              </li>
              <li>
                Attendees have to bring pens, notebooks, and any other
                stationeries.
              </li>
              <li>
                Attendees will receive digital certificates upon attending at
                least 80% of the course.
              </li>
              <li>
                If any entered data are fake, the ticket shall be canceled
                without a refund.
              </li>
              <li>Your email will be included in our email list.</li>
              <li>
                We do not accept any responsibility for any loss or damage to
                personal property brought to the venue.
              </li>
            </Box>
            <br />
            <h2>
              <b>
                IEEE Aswan SB reserves the right to take action against any
                person who breaches any of the above terms and conditions.
              </b>
            </h2>
          </div>
        </Typography>
      </Paper>
      {/* Form content */}
      <Paper
        className="myPaper"
        sx={{
          background:
            "linear-gradient(180deg, rgba(106,106,106,.7) 0%, rgba(31,31,31,1) 75%, rgba(105,105,105,.5) 100%)",
          color: "white",

          p: "3ch",
        }}
        elevation={8}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3ch",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className="myGridLabel" item xs={0} sm={5}>
              <Typography className="myLabel" variant="p">
                ID
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                disabled={isSubmitting}
                color={!errors.id ? "success" : "success"}
                variant="outlined"
                fullWidth
                type="number"
                label={errors.id ? errors.id.message : "ID"}
                {...register("id", {
                  required: "ID is required",
                  pattern: {
                    value: /^[0-9]{14}$/,
                    message: "Invalid egyptian ID",
                  },
                })}
                error={!!errors.id}
                helperText={
                  "الرقم القومي المكون من 14 خانة أمام البطاقة الشخصية"
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Name{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                color={!errors.name ? "success" : "success"}
                variant="outlined"
                fullWidth
                label={errors.name ? errors.name.message : "Name"}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Min length is 3" },
                  pattern: {
                    value: /^[a-zA-Z\u0600-\u06FF ]{2,30}$/,
                    message:
                      "Only Arabic, English letters and spaces are allowed",
                  },
                })}
                error={!!errors.name}
                helperText={
                  "الاسم الرباعي كما هو مكتوب في أمام البطاقة الشخصية"
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Certificate Name{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                color={!errors.certificateName ? "success" : "success"}
                variant="outlined"
                fullWidth
                label={
                  errors.certificateName
                    ? errors.certificateName.message
                    : "Certificate Name"
                }
                {...register("certificateName", {
                  required: "Certificate Name is required",

                  pattern: {
                    value: /^[a-zA-Z ]{2,30}$/,
                    message: "only English letters and spaces are allowed",
                  },
                })}
                error={!!errors.certificateName}
                helperText={
                  "الاسم الذي سيظهر على الشهادة المستلمة بعد الدورة التدريبية"
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Email{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                color={!errors.email ? "success" : "success"}
                variant="outlined"
                fullWidth
                label={errors.email ? errors.email.message : "Email"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={
                  "سيتم إرسال الشهادة على البريد الإلكتروني وباقي التواصل سيتم عليه"
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Phone{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                color={!errors.phone ? "success" : "success"}
                variant="outlined"
                fullWidth
                type="number"
                label={errors.phone ? errors.phone.message : "Phone"}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^(010|011|012|015)[0-9]{8}$/,
                    message: "Invalid Egyptian phone number",
                  },
                })}
                error={!!errors.phone}
                helperText={
                  "رقم الهاتف المحمول المكون من 11 رقم، بدون المسافات او ال+"
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Birth{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                color={!errors.birth ? "success" : "error"}
                {...register("birth", {
                  required: "Birthdate is required",
                  validate: validateAge,
                })}
                type="date"
                fullWidth
                error={!!errors.birth}
                sx={{
                  "& .MuiFormHelperText-root": {
                    position: "absolute !important",
                    color: errors.birth
                      ? "#f44336 !important"
                      : "white !important",
                    // color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center !important",
                    fontWeight: "bolder !important",

                    // ! Add a ymbol before the helper text
                    "&::before": {
                      content: '""',
                    },
                  },
                }}
                helperText={errors.birth ? errors.birth.message : "Birthdate"}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                University{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <RHFAutoComplete
                isSubmitting={isSubmitting}
                name="university"
                control={control}
                options={university}
                helperText={"الجامعة التي تدرس بها"}
              />
            </Grid>
          </Grid>

          {watch("university") == "other" ? (
            <>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  animation: "fadeIn .5s ease-in-out",
                }}
              >
                <Grid className={"myGridLabel"} item sm={5} xs={0}>
                  <Typography className={"myLabel"} variant="p">
                    {" "}
                    Other University{" "}
                  </Typography>
                </Grid>
                <Grid item sm={7} xs={12}>
                  <TextField
                    disabled={isSubmitting}
                    color={!errors.otherUniversity ? "success" : "success"}
                    variant="outlined"
                    fullWidth
                    label={
                      errors.otherUniversity
                        ? errors.OtherUniversity.message
                        : "Other University"
                    }
                    {...register("otherUniversity", {
                      required: "otherUniversity is required",
                    })}
                    error={!!errors.otherUniversity}
                    helperText={
                      "الجامعة التي تدرس بها حاليا، غير المذكورين في القائمة بالأعلى"
                    }
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            ""
          )}
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Faculty{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <RHFAutoComplete
                isSubmitting={isSubmitting}
                name="faculty"
                control={control}
                options={faculty}
                helperText={"الكلية التي تدرسها حاليا"}
              />
            </Grid>
          </Grid>
          {watch("faculty") == "other" ? (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                animation: "fadeIn .5s ease-in-out",
                alignItems: "center",
              }}
            >
              <Grid className={"myGridLabel"} item sm={5} xs={0}>
                <Typography className={"myLabel"} variant="p">
                  {" "}
                  Other Faculties{" "}
                </Typography>
              </Grid>
              <Grid item sm={7} xs={12}>
                <TextField
                  disabled={isSubmitting}
                  color={!errors.otherFaculties ? "success" : "success"}
                  variant="outlined"
                  fullWidth
                  label={
                    errors.otherFaculties
                      ? errors.otherFaculties.message
                      : "Other Faculties"
                  }
                  {...register("otherFaculties", {
                    required: "otherFaculties is required",
                  })}
                  error={!!errors.otherFaculties}
                  helperText={
                    " الكلية التي تدرس بها حاليا، غير المذكورين في القائمة بالأعلى"
                  }
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Year{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <RHFAutoComplete
                isSubmitting={isSubmitting}
                name="year"
                control={control}
                options={academicYear}
                helperText={"السنة الدراسية الحالية"}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Department{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <TextField
                disabled={isSubmitting}
                variant="outlined"
                fullWidth
                color={!errors.department ? "success" : "error"}
                label={
                  errors.department ? errors.department.message : "Department"
                }
                {...register("department", {
                  required: "department is required",
                })}
                error={!!errors.department}
                helperText={"القسم الذي تدرس به حاليا"}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid className={"myGridLabel"} item sm={5} xs={0}>
              <Typography className={"myLabel"} variant="p">
                {" "}
                Track{" "}
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <RHFAutoComplete
                isSubmitting={isSubmitting}
                name="track"
                control={control}
                options={tracks}
                helperText={"التخصص الذي ترغب في الالتحاق به"}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item xs={0} sm={5}>
              <Typography variant="p">
                {" "}
                Payment
                <RadioGroup
                  name="use-radio-group"
                  defaultValue="Cash"
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="Cash"
                    label="Cash"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="Wallet"
                    label="Wallet"
                    control={<Radio />}
                  />
                </RadioGroup>
              </Typography>
            </Grid>

            {paymentMethod === "Wallet" ? (
              <Grid item sm={7} xs={12}>
                <p
                  style={{
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  صورة إيصال الدفع أو صورة للتحويل بمبلغ <b>70 جنيه مصري </b>
                  &nbsp; إلى المحفظة برقم <b>01070039593</b>.
                </p>
                <br />
                <TextField
                  fullWidth
                  sx={{
                    // position: "absolute",
                    "& fieldset": {
                      border: "0",
                    },
                    "& .MuiButtonBase-root": {},

                    "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled.MuiInputBase-inputAdornedStart":
                      {
                        position: "absolute",
                        transform: "translateY(100%)",
                      },

                    "& label.MuiFormLabel-root": {
                      position: "relative",
                      color: "#f44336",
                    },
                  }}
                  value={paymentRef.current?.files[0]?.name || ""}
                  {...register("paymentProof", {
                    required: "payment Proof is required",
                  })}
                  disabled
                  label={errors.paymentProof ? errors.paymentProof.message : ""}
                  error={!!errors.paymentProof}
                  InputProps={{
                    startAdornment: (
                      <Button
                        variant="contained"
                        component="label"
                        disabled={isSubmitting}
                        fullWidth
                        color={
                          errors.paymentProof
                            ? "error"
                            : paymentRef.current?.files[0]
                            ? "success"
                            : "info"
                        }
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload File
                        <input
                          {...register("paymentProof", {
                            required: "payment Proof is required",
                          })}
                          style={{
                            clip: "rect(0 0 0 0)",
                            clipPath: "inset(50%)",
                            height: 1,
                            overflow: "hidden",
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            whiteSpace: "nowrap",
                            width: 100,
                          }}
                          ref={paymentRef}
                          accept=".png, .jpg, .jpeg"
                          disabled={isSubmitting}
                          type="file"
                        />
                      </Button>
                    ),
                  }}
                />
              </Grid>
            ) : (
              <Grid item sm={7} xs={12}>
                <p
                  style={{
                    direction: "rtl",
                    textAlign: "right",
                  }}
                >
                  سيتم تحصيل مبلغ <b>70 جنيه مصري </b> نقدي عند الحضور في اول
                  يوم
                </p>
                <br />
              </Grid>
            )}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />

        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ display: "block" }}
          color="success"
          loading={loading}
        >
          Submit
        </LoadingButton>
      </Paper>
      <Info
        open={open}
        response={response}
        setOpen={setOpen}
        severity={severity}
      />

      <ReCAPTCHA
        size="invisible"
        ref={recaptchaRef}
        sitekey="6LfZR2YpAAAAAFAksXQSF8zsf9YMvb-16VBPvNA4"
        badge="bottomright"
        theme="dark"
      />
    </Box>
  );
}

function Closed() {
  console.log(FormClosedImage);
  return (
    <Box
      sx={{
        bgcolor: "#00000090",
      }}
    >
      <>
        <div className="test">
          Form closed
          <p className="small">– SEE YOU TOMORROW – </p>
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
      </>
    </Box>
  );
}

export default function Bein6Register() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Main /> */}
      <Closed />
    </ThemeProvider>
  );
}
