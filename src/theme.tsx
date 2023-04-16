import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseCardStyle = definePartsStyle({
  header: {
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  body: {
    paddingTop: 2,
    paddingLeft: 16,
    paddingRight: 16,
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  footer: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

const cardSizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0px",
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({
  baseStyle: baseCardStyle,
  sizes: cardSizes,
});

const components = {
  Card: cardTheme,
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  components,
});

export default theme;
