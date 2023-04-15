import Link from "next/link";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { useInView } from "react-intersection-observer";

import { useRelayMetadata } from "../hooks/useRelayMetadata";
import { Profile } from "./Profile";

function RelaySummaryInfo({ url, info }) {
  const { pubkey, supported_nips, software, version, description } = info ?? {};
  return (
    <Flex flexDirection="column">
      <Flex my={2}>{description && <Text>{description}</Text>}</Flex>
      {pubkey && pubkey.length === 64 && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Operator
          </Heading>
          <Profile pubkey={pubkey} relays={[url]} />
        </Flex>
      )}
      {supported_nips && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            NIPs
          </Heading>
          <Flex>
            {supported_nips.map((n) => (
              <Box key={n} mr={2} mb={2}>
                <Link href={`https://nips.be/${n}`}>{n}</Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

function RelaySummaryFetch({ url }) {
  const info = useRelayMetadata(url);
  return info ? <RelaySummaryInfo info={info} url={url} /> : null;
}

export function RelaySummary({ url }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <>
      <div ref={ref}></div>
      {inView && <RelaySummaryFetch url={url} />}
    </>
  );
}
