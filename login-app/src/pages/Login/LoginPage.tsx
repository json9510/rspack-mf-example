import React, { lazy, useEffect } from "react";
import LoginForm from "../../features/auth/ui/organisms/Loginform";
import { loginUser } from "../../features/auth/application/LoginUser";
import { Box, Grid } from "@mui/material";
import { useAuthStore } from "../../features/auth/model/auth-store";
import { useNavigate } from "react-router";
import { AuthRepositoryImpl } from "../../features/auth/infraestructure/AuthRepositoryImpl";

type Props = {
  currentClient: string;
};

const LoginPage = ({ currentClient }: Props) => {
  const { setRequestingLogin, setSession } = useAuthStore();

  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    try {
      setRequestingLogin(true);
      const repo = new AuthRepositoryImpl();
      const session = await loginUser(repo, email, password);

      setSession(session);
      navigate("/home", { replace: true });
    } catch (error) {
      setRequestingLogin(false);
    } finally {
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
