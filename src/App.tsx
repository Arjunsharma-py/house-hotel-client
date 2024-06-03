import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserProvider";

function App() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    const user = sessionStorage.getItem("HouseHotelUser");
    userContext.setUser(user ? JSON.parse(user) : null);
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
