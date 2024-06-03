import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";

const LandingPageLayout = () => {
  return (
    <>
      <Grid
        templateAreas={`"header header"
        "main main"
        "footer footer"`}
      >
        <GridItem area="header">
          <Header />
        </GridItem>
        <GridItem area="main">
          <Outlet />
        </GridItem>
        <GridItem area="footer">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export default LandingPageLayout;
