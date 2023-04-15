import Link from "next/link";
import dynamic from "next/dynamic";

import {
  Text,
  Card,
  CardHeader,
  CardBody,
  HStack,
  Box,
} from "@chakra-ui/react";
import { nip19 } from "nostr-tools";

import { RelayFavicon } from "./RelayFavicon";
import { RelaySummaryInfo } from "./RelaySummary";

export function RelayLink({ url, info }) {
  return (
    <Card>
      <CardHeader>
        <Link key={url} href={`/relay/${nip19.nrelayEncode(url)}`}>
          <HStack spacing={2}>
            <RelayFavicon url={url} />
            <Text fontSize="lg">{url}</Text>
          </HStack>
        </Link>
      </CardHeader>
      <CardBody>
        <RelaySummaryInfo info={info} url={url} />
      </CardBody>
    </Card>
  );
}
