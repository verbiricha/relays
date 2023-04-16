import Link from "next/link";

import { Text } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = ({ children }) => (
  <Container>
    <Header />
    <Main>{children}</Main>
    <Footer>
      <Text>
        Made with ❤️ by{" "}
        <Link href="https://snort.social/verbiricha">verbiricha</Link>
      </Text>
    </Footer>
  </Container>
);

export default Layout;
