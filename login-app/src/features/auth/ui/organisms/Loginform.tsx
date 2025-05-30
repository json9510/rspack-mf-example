// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore } from "../../model/auth-store";
type Props = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { isRequestingLogin } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleBlur = () => {
    setError(!validateEmail(email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className="Box-grid-center">
        <Box className="TextField-without-border-radius TextField-width-login">
          <InputLabel shrink className="Input-label">
            Correo electrónico
          </InputLabel>
          <TextField
            fullWidth
            name="email"
            onBlur={handleBlur}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            helperText={error ? "Correo electrónico inválido" : ""}
            sx={{
              borderRadius: "14px",
              "& fieldset": { borderRadius: "14px" },
            }}
          />
        </Box>
        <Box className="TextField-without-border-radius TextField-width-login">
          <InputLabel shrink className="Input-label">
            Contraseña
          </InputLabel>
          <TextField
            fullWidth
            name="password"
            sx={{
              borderRadius: "14px",
              "& fieldset": { borderRadius: "14px" },
            }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={togglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box className="TextField-without-border-radius TextField-width-login">
          <Button
            fullWidth
            loading={isRequestingLogin}
            loadingPosition="start"
            variant="outlined"
            className="Loading-button"
            type="submit"
          >
            Iniciar sesión
          </Button>
        </Box>

        {/* <Box>
          <Button className="Forgot-password">Olvidé mi contraseña</Button>
        </Box> */}
      </Box>
    </form>
  );
};

export default LoginForm;
