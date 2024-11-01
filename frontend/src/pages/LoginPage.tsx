import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useRef, useState } from "react";
import { Base_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate the form data
    if (!email || !password) {
      setError("Check submitted data!");
      return;
    }

    // Make the call to API to create the user
    const response = await fetch(`${Base_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError(
        "Unable to login user, please try different credentials or register if you don't have an account!"
      );
      return;
    }

    const data = await response.json();

    if (!data.token) {
      setError("Incorrect token");
      return;
    }

    login(email, data.token, data.isAdmin);

    if (data.isAdmin) {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
};

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Login to Your Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button onClick={redirectToRegister}>Register here</Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
