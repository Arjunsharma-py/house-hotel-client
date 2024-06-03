import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddProperty from "./pages/AddProperty";
import HomePage from "./pages/HomePage";
import HomePageLayout from "./layouts/HomePageLayout";
import Placepage from "./pages/Placepage";
import PropertyPageLayout from "./layouts/PropertyPageLayout";
import ErrorPage from "./pages/ErrorPage";
import BookingsPage from "./pages/BookingsPage";
import AccountPage from "./pages/AccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/place", element: <HomePage /> },
      { path: "/place/:id", element: <Placepage /> },
      { path: "/booking", element: <BookingsPage /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
  {
    path: "/add-property",
    element: <PropertyPageLayout />,
    children: [{ index: true, element: <AddProperty /> }],
  },
  {
    path: "/discover",
    element: <LandingPageLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/login",
    element: <LandingPageLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/signup",
    element: <LandingPageLayout />,
    children: [{ index: true, element: <SignupPage /> }],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
