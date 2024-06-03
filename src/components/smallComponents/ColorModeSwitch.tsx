import { Button, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Button onClick={toggleColorMode} variant="ghost">
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
    </>
  );
};

export default ColorModeSwitch;
