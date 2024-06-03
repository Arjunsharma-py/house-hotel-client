import { Outlet } from "react-router-dom";
import MainFooter from "../components/footer/MainFooter";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";

const HomePageLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
      <Footer />
    </>
  );
};

export default HomePageLayout;
