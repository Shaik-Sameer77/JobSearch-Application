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
import { useNavigate } from "react-router";
import { loggedinUser } from "../redux/slice/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultTheme = createTheme();

// Schema

const schema = yup.object().shape({
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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("success");
  const [msg, setMsg] = useState("");

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

    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const formErrors = errors;
  const formSubmitted = isSubmitted;

  const onSubmit = (values) => {
    // const data = new FormData(event.currentTarget);
    const email = values.email;
    const password = values.password;
    let userDetails;
    const userExist = allUsers.find((user) => {
      if (user.email === email && user.password == password) {
        return user;
      } else {
        return false;
      }
    });
    if (userExist) {
      const payload = {
        email,
        password,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
      };

      dispatch(loggedinUser(payload));
      setMsg("User loggedin successfully");
      setOpen(true);
      setSeverity("success");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setMsg(
        "User with the credentials does not exist, please check the credentials"
      );
      setOpen(true);
      setSeverity("error");
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email")}
              autoFocus
            />
            {errors.email && (
              <span style={{ color: "#da251c", fontSize: "10px" }}>
                {formErrors.email.message}
              </span>
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <span style={{ color: "#da251c", fontSize: "10px" }}>
                {formErrors.password.message}
              </span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
          posi
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
