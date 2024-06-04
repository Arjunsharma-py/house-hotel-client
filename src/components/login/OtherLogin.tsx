import { Box, Button } from "@chakra-ui/react";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import { useGoogleLogin } from "@react-oauth/google";
// import { FaFacebook, FaGoogle } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  text: string;
  endpoint: string;
}

const OtherLogin = ({ text, endpoint }: Props) => {
  // const handleGoogleLoginSuccess = () => {
  //   console.log("Google login successfull: ");
  // };

  // const handleGoogleLoginFailure = () => {
  //   console.log("Google login failed:");
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: handleGoogleLoginFailure,
  // });

  // const handleFacebookLoginSuccess = () => {
  //   console.log("Facebook login successfull: ");
  // };

  // const handleFacebookLoginFailure = () => {
  //   console.log("Facebook login failed:");
  // };

  // const handleFacebookProfileSuccess = () => {
  //   console.log("Facebook profile success!");
  // };

  return (
    <Box>
      {/* <Button
        onClick={() => googleLogin()}
        variant={"outline"}
        w={"100%"}
        paddingY={5}
        marginY={3}
        borderColor={"black"}
      >
        <FaGoogle size={20} style={{ marginRight: "10px" }} /> Sign in with
        Google
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
          >
            <FaFacebook size={20} style={{ marginRight: "10px" }} />
            Continue with Facebook
          </Button>
        )}
      /> */}
      <Button
        leftIcon={<IoPhonePortraitOutline />}
        as={ReactRouterLink}
        variant={"outline"}
        paddingY={5}
        rounded={"md"}
        width={"100%"}
        borderColor={"black"}
        marginY={3}
        to={`/${endpoint}`}
      >
        {text}
      </Button>
    </Box>
  );
};

export default OtherLogin;
