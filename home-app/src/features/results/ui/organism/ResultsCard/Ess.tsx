import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import React from "react";
import type { Results } from "../../../domain/results";

export const essResultSchema: Results = {
  icon: {
    icon: <OfflineBoltOutlinedIcon sx={{ color: "#FFF" }} />,
    bgcolor: "#00BE91",
  },
  name: "Servicio de electricidad",
  mainColor: "#00BE91",
  labels: [
    { name: "Id", key: "id", isMain: true },
    {
      name: "Punto de medida",
      key: "measurement_point_id",
      icon: <PlaceOutlinedIcon />,
    },
  ],

  url: {
    base: "/electricity-supply-service/attention",
    pathParams: ["id"],
  },
};
