import Head from "next/head";
import dynamic from "next/dynamic";
import { Heading } from "@chakra-ui/react";

import { nip19 } from "nostr-tools";

import { Layout } from "../../components/Layout";
import { RelayMetadata } from "../../components/RelayMetadata";

const Feed = dynamic(
  () => import("../../components/Feed").then((mod) => mod.Feed),
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
        <RelayMetadata url={url} />
        <Heading fontSize="2xl">Feed</Heading>
        <Feed relay={url} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { url } = context.query;
  const decoded = nip19.decode(url);
  if (decoded.type === "nrelay") {
    const relay = decoded.data;
    return {
      props: {
        url: relay,
        nrelay: url,
      },
    };
  } else {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
}

export default Relay;
