import React from "react";
import LoginForm from "../../features/auth/ui/organisms/Loginform";
import { loginUser } from "../../features/auth/application/LoginUser";

const LoginPage = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      alert(`Bienvenido ${user.email}`);
    } catch (error) {
      alert("Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
