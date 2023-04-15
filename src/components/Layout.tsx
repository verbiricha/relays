import Link from "next/link";

import { Text } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";

export const Layout = ({ children }) => (
  <Container>
    <Main>{children}</Main>
    <DarkModeSwitch />
    <Footer>
      <Text>
        Made with ❤️ by <Link href=""></Link>
      </Text>
    </Footer>
  </Container>
);

export default Layout;
