import { useState, useMemo, useEffect } from "react";
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

import { relayInit } from "nostr-tools";

export function RelayStats({ url }) {
  const [stats, setStats] = useState({});

  const relay = useMemo(() => {
    return relayInit(url);
  }, [url]);

  useEffect(() => {
    try {
      relay.on("connect", () => {
        relay.count([{ kinds: [1] }]).then(setStats);
        // todo: run query
      });
      relay.connect();
    } catch (error) {
      console.error();
    }
  }, [url]);

  return (
    <>
      <Heading fontSize="xl" mb={2}>
        Stats
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Shops</StatLabel>
          <StatNumber>0</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/15">NIP-15</Link> stalls
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  );
}
