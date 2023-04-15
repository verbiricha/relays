import Link from "next/link";

import { Flex, Heading, Text, HStack } from "@chakra-ui/react";

import { useInView } from "react-intersection-observer";

import { useRelayMetadata } from "../hooks/useRelayMetadata";
import { Profile } from "./Profile";

export function RelaySummaryInfo({ url, info }) {
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
          <HStack spacing={2}>
            {supported_nips.map((n) => (
              <Link key={n} href={`https://nips.be/${n}`}>
                {n}
              </Link>
            ))}
          </HStack>
        </Flex>
      )}
    </Flex>
  );
}

export function RelaySummary({ url }) {
  const info = useRelayMetadata(url);
  return info ? <RelaySummaryInfo info={info} url={url} /> : null;
}
