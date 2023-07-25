import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import { postAPICall } from 'utils/api';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    marginLeft: theme.spacing(2),
    color: "white",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = (currFormData) => {
    const newErrors = {};
    if (!currFormData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!currFormData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
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
      setIsLoading(true);
      try {
          await postAPICall('/user', formData)
          setIsLoading(false);
          console.log("Signup successful:", formData);
          history.push('/login');
        //  Simulate API call for login (replace this with your actual login logic)
        // setTimeout(() => {
        //   setIsLoading(false);
        //   console.log("Signup successful:", formData);
        //   history.push('/login');
        //   // After successful login, you can redirect the user to the dashboard or another page
        // }, 2000);
        // const response = await axios.post('YOUR_API_ENDPOINT', formData);
        // console.log('Signup successful:', response.data);
        // Handle success (e.g., show success message, redirect to dashboard, etc.)
      } catch (error) {
        console.error("Signup error:", error);
        // Handle error (e.g., show error message)
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       emailId: data.get("emailId"),
  //       password: data.get("password"),
  //       firstName: data.get("firstName"),
  //       lastName: data.get("lastName"),
  //     });
  //     setIsLoading(true);

  //     // Simulate API call for login (replace this with your actual login logic)
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       // After successful login, you can redirect the user to the dashboard or another page
  //     }, 2000);
  //   };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */
        }
         <img
      src="/path/to/your/logo.png" // Replace this with the actual path to your logo image
      alt="Logo"
      className={classes.logo}
    />

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="emailId"
                label="Email Address"
                onChange={handleChange}
                name="emailId"
                autoComplete="emailId"
                error={!!errors.emailId}
                helperText={errors.emailId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                autoComplete="current-password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
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
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
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
              "Sign Up"
            )}
          </Button>

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
