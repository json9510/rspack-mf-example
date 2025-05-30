import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { ObjectKeyValue, Results } from "../../../domain/results";
import React from "react";

const formatUserName = (metaData: ObjectKeyValue) => {
  return `${metaData.names} ${metaData.last_names}`;
};

export const appUserResultSchema: Results = {
  icon: {
    icon: <PersonOutlineOutlinedIcon sx={{ color: "#FFF" }} />,
    bgcolor: "#3B82F6",
  },
  name: "Cliente",
  mainColor: "#3B82F6",
  labels: [
    {
      name: "Nombre",
      key: "names",
      isMain: true,
      formatFn: formatUserName,
    },
    { name: "Correo", key: "email", icon: <EmailOutlinedIcon /> },
    { name: "Teléfono", key: "phone", icon: <LocalPhoneOutlinedIcon /> },
  ],
  url: {
    base: "/services-account",
    queryParams: [{ name: "q", key: "id" }],
  },
};
