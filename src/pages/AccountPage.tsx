import { Center, Flex, Heading } from "@chakra-ui/react";

import { LuUserCircle2 } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import { FaSwimmingPool } from "react-icons/fa";
import AccountButton from "../components/smallComponents/AccountButton";

const AccountPage = () => {
  return (
    <Center height={"550px"} flexDirection={"column"}>
      <Heading as={"h2"} size={"2xl"} marginY={5}>
        Account
      </Heading>
      {/* <Text>Explore places on Home page</Text>
      <Button
        as={ReactRouterLink}
        rounded={"full"}
        variant={"outline"}
        marginY={10}
        to={"/"}
      >
        Back to Home
      </Button> */}
      <Flex
        justifyContent={"space-between"}
        height={"400px"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <AccountButton
          title="Profile"
          icon={LuUserCircle2}
          endpoint="profile"
        />
        <AccountButton
          title="Bookings"
          icon={TbBrandBooking}
          endpoint="account/booking"
        />
        <AccountButton title="Profile" icon={FaSwimmingPool} endpoint="" />
      </Flex>
    </Center>
  );
};

export default AccountPage;
