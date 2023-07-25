import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext";
import { getAPICall, postAPICall } from 'utils/api';
// import logo from './logo.svg';
// import logo from 'public/Logo.svg';
import logo from 'assets/images/Logo.svg';
// import bgLogo from 'assets/images/login-bg-1.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%', // Set the height to full viewport height
    backgroundImage: `url('/login-bg-1.svg')`, // Replace with the path to your background image
    // backgroundSize: 'cover', // Adjust the background image size
    // backgroundPosition: 'center', // Center the background image
    height: "100vh",
    width: "100vw",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "70%",
    borderRadius: "20px",
  },
  submitWrap: {
    display: "flex",
    justifyContent: "center",
  },
  loading: {
    marginLeft: theme.spacing(2),
    color: "white",
  },
  formContainer: {
    background: "white",
    padding: "25px",
    marginTop: "15px",
    borderRadius: "7px",
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { handleLogin } = useLoginContext();

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = (currFormData) => {
    const newErrors = {};
    if (!currFormData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currFormData.emailId)) {
      newErrors.emailId = "Invalid emailId address";
    }
    if (!currFormData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(formData)) {
      setServerError("");
      setIsLoading(true);
      try {
        await postAPICall("/login", formData);
        setIsLoading(false);
        console.log("login successful:", formData);
        handleLogin();
        history.push("/project");
        //  Simulate API call for login (replace this with your actual login logic)
        // setTimeout(() => {
        //   setIsLoading(false);
        //   console.log("login successful:", formData);
        //   handleLogin();
        //   history.push("/project");
        //   // After successful login, you can redirect the user to the dashboard or another page
        // }, 2000);
        // const response = await axios.post('YOUR_API_ENDPOINT', formData);
        // console.log('Signup successful:', response.data);
        // Handle success (e.g., show success message, redirect to dashboard, etc.)
      } catch (error) {
        if (error.response && error.response.data) {
          // Server returned error messages
          setServerError(error.response.data.error);
        } else {
          // Other error (network, etc.)
          setServerError("An error occurred. Please try again later.");
        }
        setErrors({});
      }
      setIsLoading(false);
    }
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       emailId: data.get("emailId"),
  //       password: data.get("password"),
  //     });
  //     setIsLoading(true);

  //     // Simulate API call for login (replace this with your actual login logic)
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       // After successful login, you can redirect the user to the dashboard or another page
  //     }, 2000);
  //   };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // display: flex;
  // height: 100vh;
  // width: 100vw;
  // flex-direction: column;

  //   /* height: 88.5%; */
  // /* display: flex; */
  // /* align-items: center; */
  // background-size: contain;
  // /* justify-content: center; */
  // background-image: url(/login-bg-1.svg);
  // background-position: center;
  // width: 100%;
  // background-repeat: no-repeat;

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          <img src={logo} alt="Logo"
          />
          <Typography style={{ color: 'white', marginTop: '10px' }} component="h6" variant="h6">
            Online Project Management
          </Typography>
          <Paper className={classes.formContainer}>
            <Typography style={{ textAlign: 'center' }} component="h6" variant="h6">
              Login to get started
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="emailId"
                label="Email Address"
                name="emailId"
                autoComplete="emailId"
                onChange={handleChange}
                error={!!errors?.emailId}
                helperText={errors?.emailId}
                autoFocus
              />
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!errors?.password}
                helperText={errors?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signup">{"Forget Password?"}</Link>
                </Grid>
              </Grid>
              <div className={classes.submitWrap}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isLoading ? (
                    <>
                      Loading...
                      <CircularProgress size={20} className={classes.loading} />
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Paper>
          {serverError && (
            <Typography color="error" variant="body2" style={{ textAlign: 'center', marginTop: '15px' }}>
              {serverError}
            </Typography>
          )}
        </div>
      </Container>
    </div>
  );
}
