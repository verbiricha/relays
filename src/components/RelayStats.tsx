import Link from "next/link";

import {
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

import { useSub } from "../nostr";

export function RelayStats({ url }) {
  const gossip = useSub({
    filters: [
      {
        kinds: [10002],
      },
    ],
    relays: [url],
    options: {
      unsubscribeOnEose: true,
    },
  });
  const files = useSub({
    filters: [
      {
        kinds: [1063],
      },
    ],
    relays: [url],
    options: {
      unsubscribeOnEose: true,
    },
  });
  const markets = useSub({
    filters: [
      {
        kinds: [30017],
      },
    ],
    relays: [url],
    options: {
      unsubscribeOnEose: true,
    },
  });
  return (
    <>
      <Heading fontSize="xl" mb={2}>
        Stats
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Gossip</StatLabel>
          <StatNumber>{gossip.events.length}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/65">NIP-65</Link> profiles
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Markets</StatLabel>
          <StatNumber>{markets.events.length}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/15">NIP-15</Link> stalls
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Files</StatLabel>
          <StatNumber>{files.events.length}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/94">NIP-94</Link> files
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  );
}
