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

function formatShortNumber(n: number) {
  const intl = new Intl.NumberFormat("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (n < 2e3) {
    return n;
  } else if (n < 1e6) {
    return `${intl.format(n / 1e3)}K`;
  } else if (n < 1e9) {
    return `${intl.format(n / 1e6)}M`;
  } else {
    return `${intl.format(n / 1e9)}G`;
  }
}

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
        // todo: these are currently very expensive (not optimized) and close the sub on me
        count({ kinds: [1] }, setNotes);
        count({ kinds: [0] }, setProfiles);
        count({ kinds: [9735] }, setZaps);
        count({ kinds: [30023] }, setArticles);
        //count({ kinds: [1063] }, setFiles);
        //count({ kinds: [30017] }, setShops);
        //count({ kinds: [30018] }, setProducts);
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
          <StatLabel>People</StatLabel>
          <StatNumber>{formatShortNumber(profiles)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Zaps</StatLabel>
          <StatNumber>{formatShortNumber(zaps)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Notes</StatLabel>
          <StatNumber>{formatShortNumber(notes)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Articles</StatLabel>
          <StatNumber>{formatShortNumber(articles)}</StatNumber>
        </Stat>
      </StatGroup>
    </>
  );
}
