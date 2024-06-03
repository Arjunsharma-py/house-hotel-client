import { Box, Button } from "@chakra-ui/react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { Link as ReactRouterLink } from "react-router-dom";

const OtherLogin = () => {
  const handleGoogleLoginSuccess = () => {
    console.log("Google login successfull: ");
  };

  const handleGoogleLoginFailure = () => {
    console.log("Google login failed:");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

  const handleFacebookLoginSuccess = () => {
    console.log("Facebook login successfull: ");
  };

  const handleFacebookLoginFailure = () => {
    console.log("Facebook login failed:");
  };

  const handleFacebookProfileSuccess = () => {
    console.log("Facebook profile success!");
  };

  return (
    <Box>
      {/* <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        /> */}

      <Button
        onClick={() => googleLogin()}
        variant={"outline"}
        w={"100%"}
        paddingY={5}
        marginY={3}
        borderColor={"black"}
        // style={{
        //   backgroundColor: "#fff", // White background
        //   color: "#000", // Black text
        //   border: "1px solid #000", // Black border
        //   padding: "10px 20px",
        //   borderRadius: "5px",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   cursor: "pointer",
        //   fontSize: "16px",
        // }}
      >
        <FaGoogle size={20} style={{ marginRight: "10px" }} />{" "}
        {/* Custom Google icon */}
        Sign in with Google
      </Button>
      <FacebookLogin
        appId={import.meta.env.VITE_BASE_URL}
        onSuccess={handleFacebookLoginSuccess}
        onFail={handleFacebookLoginFailure}
        onProfileSuccess={handleFacebookProfileSuccess}
        render={({ onClick }) => (
          <Button
            onClick={onClick}
            variant={"outline"}
            w={"100%"}
            paddingY={5}
            marginY={3}
            borderColor={"black"}
            // style={{
            //   backgroundColor: "#fff",
            //   color: "#000",
            //   border: "1px solid #000",
            //   padding: "10px 0px",
            //   borderRadius: "5px",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   cursor: "pointer",
            //   fontSize: "16px",
            //   width: "100%",
            // }}
          >
            <FaFacebook size={20} style={{ marginRight: "10px" }} />
            Continue with Facebook
          </Button>
        )}
      />
      <Button
        leftIcon={<IoPhonePortraitOutline />}
        as={ReactRouterLink}
        variant={"outline"}
        paddingY={5}
        rounded={"md"}
        width={"100%"}
        borderColor={"black"}
        marginY={3}
        to={"/login"}
      >
        Login
      </Button>
    </Box>
  );
};

export default OtherLogin;
