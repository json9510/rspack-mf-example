import React, { lazy, useEffect } from "react";
import LoginForm from "../../features/auth/ui/organisms/Loginform";
import { loginUseCase } from "../../features/auth/application/LoginUser";
import { Box, Grid } from "@mui/material";
import { useAuthStore } from "../../features/auth/model/auth-store";

type Props = {
  currentClient: string;
};

const LoginPage = ({ currentClient }: Props) => {
  console.log("🔥 Props recibidos en LoginPage remoto:", {
    currentClient,
  });

  const { setRequestingLogin } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      setRequestingLogin(true);
      const user = await loginUseCase(email, password);
      alert(`Bienvenido ${user}`);
      setRequestingLogin(false);
    } catch (error) {
      alert("Login failed");
      setRequestingLogin(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid className="Login-img-grid" size={{ xs: 12, md: 6 }}>
          <img
            src={`http://localhost:3000/assets/logos/${currentClient}.png`}
            width="40%"
            style={{ padding: "20px 20px" }}
            alt="login"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LoginForm onSubmit={handleLogin} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
