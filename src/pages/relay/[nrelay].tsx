import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Text, Heading } from "@chakra-ui/react";

import { nip19 } from "nostr-tools";

import { Layout } from "../../components/Layout";
import { RelayMetadata } from "../../components/RelayMetadata";

const Feed = dynamic(
  () => import("../../components/Feed").then((mod) => mod.Feed),
  { ssr: false }
);

const Relay = ({}) => {
  const router = useRouter();
  const { nrelay } = router.query;
  const url = useMemo(() => {
    try {
      if (nrelay) {
        const decoded = nip19.decode(nrelay);
        if (decoded.type === "nrelay") {
          return decoded.data;
        }
      }
    } catch (error) {
      console.error("Couldn't decode nrelay");
    }
  }, [nrelay]);

  // todo: error page

  return (
    <>
      <Head>
        <title>{url}</title>
        <meta name="og:title" content={url} />
      </Head>
      <Layout>
        {url ? (
          <>
            <RelayMetadata url={url} />
            <Heading fontSize="2xl">Feed</Heading>
            <Feed kinds={[1, 30023]} relay={url} />
          </>
        ) : (
          <Text>TODO</Text>
        )}
      </Layout>
    </>
  );
};

export default Relay;
