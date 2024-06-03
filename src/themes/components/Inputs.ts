// // import { inputAnatomy } from "@chakra-ui/anatomy";
// // import {
// //   createMultiStyleConfigHelpers,
// //   SystemStyleObject,
// // } from "@chakra-ui/react";

// // const { definePartsStyle, defineMultiStyleConfig } =
// //   createMultiStyleConfigHelpers(inputAnatomy.keys);

// // const baseStyle: SystemStyleObject = definePartsStyle({
// //   field: {
// //     paddingY: "27px",
// //     _focus: {
// //       borderColor: "black",
// //     },
// //   },
// // });

// // const defaultProps = {
// //   size: "md",
// //   focusBorderColor: "black",
// // };

// // export const Inputs = defineMultiStyleConfig({
// //   baseStyle,
// // defaultProps,
// // });

// import { inputAnatomy } from "@chakra-ui/anatomy";
// import {
//   createMultiStyleConfigHelpers,
//   PartsStyleFunction,
// } from "@chakra-ui/react";

// const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
//   inputAnatomy.keys
// );

// import { ComponentStyleConfig } from "@chakra-ui/theme";

// const baseStyle: PartsStyleFunction<typeof inputAnatomy> = () => ({
//   field: {
//     // paddingY: "27px",
//     _focus: {
//       // borderColor: "black",
//     },
//   },
// });

// const defaultProps = {
//   focusBorderColor: "red.100",
// };

// const variants: ComponentStyleConfig = {
//   variants: {
//     form: {
//       field: {
//         paddingY: "27px",
//       },
//     },
//   },
// };

// export const Inputs = defineMultiStyleConfig({
//   baseStyle,
//   variants,
//   defaultProps,
// });

import { ComponentStyleConfig } from "@chakra-ui/react";

const InputStyle: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    searchBar: {
      field: {
        fontSize: "md",
        border: "1px",
        borderColor: "gray.100",
        _hover: {
          boxShadow: "0 0 2px 2px #efdfde",
        },
        _focus: {
          boxShadow: "0 0 2px 2px #efdfde",
        },
      },
    },
  },
  defaultProps: {},
};

export const Inputs = InputStyle;
