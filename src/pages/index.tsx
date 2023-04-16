import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { nip19 } from "nostr-tools";

import { getRelays } from "../nostr";
import { Layout } from "../components/Layout";
import { RelayLink } from "../components/RelayLink";

const Index = ({ relays }) => {
  // todo: sort relays by similarity to URL
  const router = useRouter();
  const [relay, setRelay] = useState("");

  function goToRelay(url) {
    router.push(`/relay/${nip19.nrelayEncode(url)}`);
  }

  function randomRelay() {
    const randomIndex = Math.floor(Math.random() * relays.length);
    goToRelay(relays[randomIndex]);
  }

  return (
    <>
      <Head>
        <title>Nostrrr</title>
        <meta name="og:title" content="A nostr Relay explorer" />
        <meta name="og:description" content="Browse nostr relays" />
      </Head>
      <Layout>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<PhoneIcon color="purple.500" />}
          />
          <Input
            type="text"
            placeholder="Relay URL"
            value={relay}
            onChange={(e) => setRelay(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => goToRelay(relay)}>
              Go
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button isDisabled={relays.length === 0} onClick={randomRelay}>
          Random Relay
        </Button>
        {relays.map((url) => (
          <RelayLink key={url} url={url} />
        ))}
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  const relays = await getRelays();
  return {
    props: {
      relays,
    },
  };
}

export default Index;
