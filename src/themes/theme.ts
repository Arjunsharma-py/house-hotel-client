import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { colors } from "./foundations/colors";
import { shadows } from "./foundations/shadows";
import { Buttons } from "./components/Buttons";
import { Inputs } from "./components/Inputs";
import { fonts } from "./foundations/fonts";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme(
  // withDefaultProps({
  //   defaultProps: {
  //     size: "md",
  //     color: "red",
  //   },
  //   components: ["Input"],
  // }),
  {
    config,
    colors,
    shadows,
    fonts,
    components: {
      Button: Buttons,
      Input: Inputs,
    },
  }
);

export default theme;
