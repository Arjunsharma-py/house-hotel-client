import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import SearchBar from "../Homepage/SearchBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import APIClient from "../../services/apiClient";

const MainHeader = () => {
  const userContext = useContext(UserContext);
  console.log(userContext.user);
  const navigate = useNavigate();
  const toast = useToast();
  const apiClient = new APIClient("/auth/logout");
  const handleLogOut = async () => {
    try {
      const response = await apiClient.get({});
      if (response.success)
        toast({
          title: "Success",
          description: "You are Logout",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

      sessionStorage.removeItem("HouseHotelUser");
      userContext.setUser(null);
      navigate("/");
    } catch (err) {
      toast({
        title: "Failed",
        description: "An unexpected error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        boxShadow={"md"}
        position={"fixed"}
        width={"100%"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingY={4}
        zIndex={2}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"Center"}
          width={"90%"}
        >
          <Link to={"/"}>
            <HStack>
              <Image src={logo} alt="HouseHotel" />
              <Heading size="lg" color="red.400">
                HouseHotel
              </Heading>
            </HStack>
          </Link>

          <SearchBar width="70%" />

          <Menu>
            <MenuButton
              as={Button}
              variant={"outline"}
              rounded={"full"}
              leftIcon={<GiHamburgerMenu />}
            >
              <Avatar size={"sm"} name={userContext.user?.name} src="" />
            </MenuButton>
            {userContext.user ? (
              <MenuList>
                <MenuItem as={Link} to={"/account"}>
                  Account
                </MenuItem>
                <MenuItem as={Link} to={"/add-property"}>
                  Hotel your House
                </MenuItem>
                <MenuItem as={Link} to={"/booking"}>
                  Bookings
                </MenuItem>
                <MenuDivider />
                <Button
                  variant="ghost"
                  width="full"
                  justifyContent="flex-start"
                  rightIcon={<MdOutlineLogout />}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </MenuList>
            ) : (
              <MenuList>
                <MenuItem as={Link} to={"/discover"}>
                  Discover
                </MenuItem>
                <MenuDivider />
                <Button
                  variant="ghost"
                  width="full"
                  justifyContent="flex-start"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  variant="ghost"
                  width="full"
                  justifyContent="flex-start"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </MenuList>
            )}
          </Menu>
        </Flex>
      </Flex>
      <Box width={"100%"} height={"100px"} />
    </>
  );
};

export default MainHeader;
