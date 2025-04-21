import React from "react";

const RemoteButton = React.lazy(() => import("host/RemoteButton"));

const LoginButton = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RemoteButton text="Iniciar sesión" />
    </React.Suspense>
  );
};

export default LoginButton;
