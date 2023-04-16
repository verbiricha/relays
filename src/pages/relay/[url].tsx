import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { nip19 } from "nostr-tools";

import { Layout } from "../../components/Layout";
import { RelayMetadata } from "../../components/RelayMetadata";

const Feed = dynamic(
  () => import("../../components/Feed").then((mod) => mod.Feed),
  { ssr: false }
);

const RelayStats = dynamic(
  () => import("../../components/RelayStats").then((mod) => mod.RelayStats),
  { ssr: false }
);

const Relay = ({ url, nrelay }) => {
  return (
    <>
      <Head>
        <title>{url}</title>
        <meta name="og:title" content={url} />
      </Head>
      <Layout>
        <Link href="/">
          <Flex alignItems="center">
            <ArrowBackIcon />
            <Text ml={2}>Back</Text>
          </Flex>
        </Link>
        <RelayMetadata url={url} />
        <RelayStats url={url} />
        <Heading fontSize="2xl">Feed</Heading>
        <Feed kinds={[1, 30023, 1063]} relay={url} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { url } = context.query;
  try {
    const decoded = nip19.decode(url);
    if (decoded.type === "nrelay") {
      const relay = decoded.data;
      return {
        props: {
          url: relay,
          nrelay: url,
        },
      };
    }
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
}

export default Relay;
