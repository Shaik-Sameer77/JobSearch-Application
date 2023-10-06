import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slice/userSlice.js";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

// Schema

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .max(30, "First Name cannot exceed 30 characters")
    .matches(/^[^\s].*$/, "character cannot be a space")
    .matches(/^[A-Za-z\d\s]+$/, "Symbols are not allowed in First Name")
    .matches(
      /^(?!.* {2})[A-Za-z0-9\s\\]+$/,
      "Double spaces are not allowed in First Name"
    )
    .matches(/^[A-Za-z\s\\]+$/, "Numbers are not allowed in First Name"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(1, "LastName must be at least 1 character")
    .max(30, "Last Name cannot exceed 30 characters")
    .matches(/^[^\s].*$/, "character cannot be a space")
    .matches(/^[A-Za-z\d\s]+$/, "Symbols are not allowed in Last Name")
    .matches(
      /^(?!.* {2})[A-Za-z0-9\s\\]+$/,
      "*Double spaces are not allowed in Name"
    )
    .matches(/^[A-Za-z\s\\]+$/, "*Numbers are not allowed in Last Name"),
  email: yup
    .string()
    .required("*Email is required")
    .email("*Invalid email format")
    .matches(/^[^\s].*$/, "*First character cannot be a space")
    .test("domain", "*Invalid Email", (value) => {
      if (value) {
        const domain = value.split("@")[1];
        return domain?.endsWith(".com");
      }
      return true;
    }),
  password: yup
    .string()
    .required("*Password is required")
    .min(8, "*Password must be at least 8 characters"),
});

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.loggedinUser);

  useEffect(() => {
    if (user.email) {
      navigate("/home");
    }
  }, [user]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // ** Hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const formErrors = errors;
  const formSubmitted = isSubmitted;

  const onSubmit = (values) => {
    const email = values.email;
    const emailExists = allUsers.find((user) => user.email === email);
    if (emailExists) {
      setOpen(true);
      setSeverity("error");
      setMsg("Email already Exists");
    } else {
      dispatch(addUser(values));
      setOpen(true);
      setSeverity("success");
      reset();
      setMsg("User Created successfully, Please Login");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  size="small"
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span style={{ color: "#da251c", fontSize: "10px" }}>
                    {formErrors.firstName.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <span style={{ color: "#da251c", fontSize: "10px" }}>
                    {formErrors.lastName.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span style={{ color: "#da251c", fontSize: "10px" }}>
                    {formErrors.email.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                {errors.password && (
                  <span style={{ color: "#da251c", fontSize: "10px" }}>
                    {formErrors.password.message}
                  </span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
