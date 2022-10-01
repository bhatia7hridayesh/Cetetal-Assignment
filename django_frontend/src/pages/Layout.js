import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return <>
    <CssBaseline />
    <Outlet />
  </>;
};

export default Layout;
