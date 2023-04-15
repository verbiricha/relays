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

const RelaySummary = dynamic(
  () => import("./RelaySummary").then((m) => m.RelaySummary),
  { ssr: false }
);

export function RelayLink({ url }) {
  return (
    <Link key={url} href={`/relay/${nip19.nrelayEncode(url)}`}>
      <Card>
        <CardHeader>
          <HStack spacing={2}>
            <RelayFavicon url={url} />
            <Text>{url}</Text>
          </HStack>
        </CardHeader>
        <CardBody>
          <RelaySummary url={url} />
        </CardBody>
      </Card>
    </Link>
  );
}
