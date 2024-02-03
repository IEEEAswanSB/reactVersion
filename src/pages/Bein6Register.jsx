import {
    Alert,
    Autocomplete,
    Box,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography,
  } from "@mui/material";
  import {useRef, useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import LoadingButton from "@mui/lab/LoadingButton";
  import Button from "@mui/material/Button";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import ReCAPTCHA from "react-google-recaptcha";
import { RegisterBein6 } from '../../services/register.service';

  // const VisuallyHiddenInput = styled("input")({
  
  // });
  
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
      label: "Structural Revit",
      value: "Structural Revit",
    },
    {
      label: "Classic Control",
      value: "Classic Control",
    },
  ];
  
  function RHFAutoComplete({ name, control, options, isSubmitting }) {
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
                // value={university.find((obj) => obj.value === "aswan")}
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
                  />
                )}
              />
            </Box>
          );
        }}
      />
    );
  }
  
  function Info({ response ,open, setOpen, severity }) {
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpen(false);
    };
    return (
      <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
            {response}
          </Alert>
        </Snackbar>
      </>
    );
  }
  
  export function Bein6Register() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [response, setResponse] = useState("");
    const recaptchaRef = useRef(null);
    const paymentRef = useRef(null);
  
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
  
      return (age >= minAge && age <= maxAge) || `${minAge} : ${maxAge} `;
    };
  
    const onSubmit = (data) => {
        data["image"] = paymentRef.current?.files[0];
        data["Captcha"] = captchaValue;
        
        delete data["paymentProof"];
        const formData = new FormData();
        
        for ( const key in data ) {
            formData.append(key, data[key]);
        }
        
        console.log(data);
        console.log(formData);

        RegisterBein6(formData).then((res) => {
            // setResponse(res.message);
        }).catch((err) => {
            setResponse(err.response.data.message);
            setOpen(true);
            setIsSubmitting(false);
            setLoading(false);
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
            md: "10vh 10vh 5vh 80vh",
            sm: "0 0 0 0",
          },
  
          display: "flex",
          flexDirection: "column",
          gap: "3ch",
          "& .MuiGrid-container": {},
  
          //  ! Make the helper text red and bold. also on the top of the input
          "& .MuiFormHelperText-root": {
            position: "absolute",
            color: "red",
            textAlign: "center",
            fontWeight: "bolder",
            "&::before": {
              content: '"*"',
            },
          },
  
          // "& .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          // },
  
          "& .MuiFormLabel-root": {
            color: "white",
            fontWeight: "bolder",
          },
  
          "& .MuiPaper-root.myPaper": {
            bgcolor: "transparent",
            color: "white",
            // blur
            backdropFilter: "blur(100px)",
            border: "1px solid white",
          },
        }}
      >
        {/* Header content for description */}
        <Paper
          className="myPaper"
          sx={{
            p: "3ch",
            "&.myPaper ": {
              borderColor: "red !important",
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
                  "& li::marker": {
                    content: '"➜ "',
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
              <br/>
              <h2>
                <b>IEEE Aswan SB reserves the right to take action against any person
                who breaches any of the above terms and conditions.</b>
              </h2>
            </div>
          </Typography>
        </Paper>
        {/* Form content */}
        <Paper
          className="myPaper"
          sx={{
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
            {/* id : string
  name : string
  certificateName : string    
  email : string
  phone : number
  birth  : date
  university : string 
  otherUniversity : string
  faculty : string
  otherFaculties : string
  year : number
  department : string
  track : string */}
  
            {/* 5 is for title */}
            {/* 7 is for input */}
  
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={5}>
                <Typography variant="p"> ID </Typography>
              </Grid>
              <Grid item xs={7}>
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
                      message: "Invalid ID",
                    },
                  })}
                  error={!!errors.id}
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
              <Grid item xs={5}>
                <Typography variant="p"> Name </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  disabled={isSubmitting}
                  color={!errors.name ? "success" : "success"}
                  variant="outlined"
                  fullWidth
                  label={errors.name ? errors.name.message : "Name"}
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Min length is 3" },
                    // regex for /^[a-zA-Z\u0600-\u06FF ]{2,30}$/
                    pattern: {
                      value: /^[a-zA-Z\u0600-\u06FF ]{2,30}$/,
                      message: "Only Arabic, English letters and spaces are allowed",
                    },
                  })}
                  error={!!errors.name}
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
              <Grid item xs={5}>
                <Typography variant="p"> Certificate Name </Typography>
              </Grid>
              <Grid item xs={7}>
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
              <Grid item xs={5}>
                <Typography variant="p"> Email </Typography>
              </Grid>
              <Grid item xs={7}>
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
              <Grid item xs={5}>
                <Typography variant="p"> Phone </Typography>
              </Grid>
              <Grid item xs={7}>
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
              <Grid item xs={5}>
                <Typography variant="p"> Birth </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  disabled={isSubmitting}
                  color={!errors.birth ? "success" : "success"}
                  // label={errors.birth ? errors.birth.message : "Birth"}
                  {...register("birth", {
                    required: "Birthday is required",
                    validate: validateAge,
                  })}
                  type="date"
                  fullWidth
                  error={!!errors.birth}
                  helperText={errors.birth ? errors.birth.message : ""}
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
              <Grid item xs={5}>
                <Typography variant="p"> University </Typography>
              </Grid>
              <Grid item xs={7}>
                {/* <TextField
                  color={!errors. ? 'success' : 'success'}
                  variant="outlined"
                  fullWidth
                  label={
                    errors.university ? errors.university.message : "University"
                  }
                  {...register("university", {
                    required: "University is required",
                  })}
                  error={!!errors.university}
                /> */}
                <RHFAutoComplete
                  isSubmitting={isSubmitting}
                  name="university"
                  control={control}
                  options={university}
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
                  <Grid item xs={5}>
                    <Typography variant="p"> Other University </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      disabled={isSubmitting}
                      color={!errors.OtherUniversity ? "success" : "success"}
                      variant="outlined"
                      fullWidth
                      label={
                        errors.OtherUniversity
                          ? errors.OtherUniversity.message
                          : "Other University"
                      }
                      {...register("OtherUniversity", {
                        required: "OtherUniversity is required",
                      })}
                      error={!!errors.OtherUniversity}
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
              <Grid item xs={5}>
                <Typography variant="p"> Faculty </Typography>
              </Grid>
              <Grid item xs={7}>
                <RHFAutoComplete
                  isSubmitting={isSubmitting}
                  name="faculty"
                  control={control}
                  options={faculty}
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
                <Grid item xs={5}>
                  <Typography variant="p"> Other Faculties </Typography>
                </Grid>
                <Grid item xs={7}>
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
              <Grid item xs={5}>
                <Typography variant="p"> Year </Typography>
              </Grid>
              <Grid item xs={7}>
                <RHFAutoComplete
                  isSubmitting={isSubmitting}
                  name="year"
                  control={control}
                  options={academicYear}
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
              <Grid item xs={5}>
                <Typography variant="p"> Department </Typography>
              </Grid>
              <Grid item xs={7}>
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
              <Grid item xs={5}>
                <Typography variant="p"> Track </Typography>
              </Grid>
              <Grid item xs={7}>
                <RHFAutoComplete
                  isSubmitting={isSubmitting}
                  name="track"
                  control={control}
                  options={tracks}
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
              <Grid item xs={5}>
                <Typography variant="p"> Payment Proof </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  sx={{
                    "& fieldset": {
                      border: "1px solid white",
                    },
                    "& .MuiButtonBase-root": {
                      // bgcolor: !!errors.paymentProof ? "#f44336" : "#28b4f5",
                    },
                  }}
                  value={selectedFileName}
                  {...register("paymentProof", {
                    required: "payment Proof is required",
                  })}
                  disabled
                  label={errors.paymentProof ? errors.paymentProof.message : ""}
                  // register
  
                  error={!!errors.paymentProof}
                  InputProps={{
                    startAdornment: (
                      <Button
                        variant="contained"
                        component="label"
                        disabled={isSubmitting}
                        style={{
                          marginRight: "1.5rem",
                        }}
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
                            width: 1,
                          }}
                          ref={paymentRef}
                          onChange={(e) => {
                            setSelectedFileName(e?.target?.files[0]?.name || "");
                          }}
  
                          accept=".png, .jpg, .jpeg"
                          disabled={isSubmitting}
                          type="file"
                        />
  
                        
                      </Button>
  
                    ),
                  }}
                />
                <br />
                <br />
  
                Upload your <b>70 EGP</b> payment receipt or screenshot of
                transfer to <b>01070039593</b> wallet

                <ReCAPTCHA
                ref= {recaptchaRef}
        sitekey="6Lci-F4pAAAAAPYSkYGxHYf7-dp9PGiHkGU9Z7MG"
        onChange={(value) =>setCaptchaValue(value)}
        theme="dark"
        />
              </Grid>
            </Grid>
          </Grid>
  
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
        <Info open={open} response={response} setOpen={setOpen} severity={"error"} />
      </Box>
    );
  }
  