import { forwardRef, useRef, useImperativeHandle } from "react";
import CustomModal from "./CustomModal";
import { Box, Button } from "@mui/material";
import { clearSessionStorage } from "../../lib/utils/localStorage";
import { useNavigate } from "react-router-dom";

const ModalLogout = forwardRef((props, ref) => {
  //@ts-ignore
  const createClient = useRef<CustomModal>(null);

  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    changeModal() {
      //@ts-ignore
      createClient.current.changeModal();
    },
  }));

  return (
    <CustomModal
      maxWidth="xs"
      //@ts-ignore
      ref={createClient}
      onClose={() => null}
      dialogContent={
        <Box
          //@ts-ignore
          sx={{ fontWeight: "400", mb: "0.5rem" }}
          className="Modal-title"
        >
          ¿Desear cerrar sesión?
        </Box>
      }
      dialogActions={
        <>
          <Box className="Modal-button-container">
            <Button
              color="warning"
              size="small"
              className="Modal-button-logout-cancel"
              id="logout-cancel"
              onClick={() => {
                //@ts-ignore
                createClient.current.changeModal();
              }}
              sx={{ width: "40%" }}
            >
              <Box style={{ fontWeight: "bold", margin: 0 }}>Cancelar</Box>
            </Button>

            <Button
              color="warning"
              size="small"
              className="Loading-button Modal-button-logout"
              id="logout-accept"
              onClick={() => {
                clearSessionStorage();
                navigate("/");
              }}
              sx={{ width: "40%" }}
            >
              <Box style={{ fontWeight: "bold", margin: 0 }}>Salir</Box>
            </Button>
          </Box>
        </>
      }
    />
  );
});

export default ModalLogout;
