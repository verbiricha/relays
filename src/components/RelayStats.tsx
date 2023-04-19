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
  const [notes, setNotes] = useState();
  const [zaps, setZaps] = useState();
  const [profiles, setProfiles] = useState();
  const [articles, setArticles] = useState(0);
  const [shops, setShops] = useState(0);
  const [products, setProducts] = useState(0);
  const [files, setFiles] = useState(0);

  const relay = useMemo(() => {
    return relayInit(url);
  }, [url]);

  function count(filter, cb) {
    return relay.count([filter], { countTimeout: 30000 }).then((result) => {
      if (result?.count) {
        cb(result.count);
      }
    });
  }

  useEffect(() => {
    try {
      relay.on("connect", () => {
        count({ kinds: [1] }, setNotes);
        count({ kinds: [0] }, setProfiles);
        count({ kinds: [9735] }, setZaps);
        count({ kinds: [30023] }, setArticles);
        count({ kinds: [1063] }, setFiles);
        count({ kinds: [30017] }, setShops);
        count({ kinds: [30018] }, setProducts);
      });
      relay.connect();
    } catch (error) {
      console.error();
    }
  }, [url]);

  return (
    <>
      <Heading fontSize="xl" my={2}>
        Stats
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Notes</StatLabel>
          <StatNumber>
            {typeof notes === "undefined" ? "N/A" : notes}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Profiles</StatLabel>
          <StatNumber>
            {typeof profiles === "undefined" ? "N/A" : profiles}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Zaps</StatLabel>
          <StatNumber>{typeof zaps === "undefined" ? "N/A" : zaps}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/57">NIP-57</Link>
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Articles</StatLabel>
          <StatNumber>{articles}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/33">NIP-33</Link>
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Files</StatLabel>
          <StatNumber>{files}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/94">NIP-94</Link>
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Shops</StatLabel>
          <StatNumber>{shops}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/15">NIP-15</Link>
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Products</StatLabel>
          <StatNumber>{products}</StatNumber>
          <StatHelpText>
            <Link href="https://nips.be/15">NIP-15</Link>
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  );
}
