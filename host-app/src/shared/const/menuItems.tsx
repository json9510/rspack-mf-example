import SearchIcon from "@mui/icons-material/Search";
import type { ICustomSidebar } from "../model/ICustomSidebar";

export const menuItems: ICustomSidebar[] = [
  {
    url: "/home",
    icon: <SearchIcon />,
    title: "Buscar",
  },
];
