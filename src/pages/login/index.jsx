import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import Cookies from "js-cookie";

const larahost = process.env.REACT_APP_HOST;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        LARA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const { dispatch } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  const [data, setData] = useState({});
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    const rememberMe = Cookies.get("rememberMe");
    if (rememberMe) {
      setRememberMe(true);
      setData({ email: rememberMe });
    }
  }, []);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setData({ ...data, isSubmit: true, errorMessage: null });

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(larahost + "/login", requestBody, config)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data.data,
        });
        //console.log(res.data.data);

        if (rememberMe) {
          Cookies.set("rememberMe", requestBody.email, { expires: 365 });
        } else {
          Cookies.remove("rememberMe");
        }
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmit: false,
          errorMessage: error.response.data.message,
        });
        setErrorLogin(true);
        //console.log(error.response);
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
            LARA ADMIN
          </Typography>
          {errorLogin && !data.isSubmit && (
            <Alert severity="error" variant="outlined">
              {data.errorMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              placeholder="root@chatlara.com"
              value={data.email}
              onChange={handleOnChange}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              placeholder="root"
              onChange={handleOnChange}
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox checked={rememberMe} color="primary" />}
              label="Remember me"
              onClick={() => {
                setRememberMe(!rememberMe);
                Cookies.remove("rememberMe");
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={data.isSubmit}
            >
              Login
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
