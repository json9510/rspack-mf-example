import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import type { Results } from "../../../domain/results";
import React from "react";

export const estatesResultSchema: Results = {
  icon: {
    icon: <MapsHomeWorkIcon sx={{ color: "#FFF" }} />,
    bgcolor: "--var(--enerbit-primary)",
  },
  name: "Dirección",
  mainColor: "--var(--enerbit-primary)",
  labels: [
    { name: "Dirección", key: "address", isMain: true },

    {
      name: "Departamento",
      key: "state",
      icon: <PlaceOutlinedIcon />,
    },
    {
      name: "Ciudad",
      key: "city",
      icon: <PlaceOutlinedIcon />,
    },
  ],
  url: {
    base: "/states",
    pathParams: ["id"],
  },
};
