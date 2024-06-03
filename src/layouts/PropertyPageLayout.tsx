import { Outlet } from "react-router-dom";
import MainFooter from "../components/footer/MainFooter";
import Footer from "../components/footer/Footer";
import AddPropertyHeader from "../components/header/AddPropertyHeader";

const PropertyPageLayout = () => {
  return (
    <>
      <AddPropertyHeader />
      <Outlet />
      <MainFooter />
      <Footer />
    </>
  );
};

export default PropertyPageLayout;
