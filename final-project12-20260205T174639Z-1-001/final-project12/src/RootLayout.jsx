import Nav from "./nav.jsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default RootLayout;
