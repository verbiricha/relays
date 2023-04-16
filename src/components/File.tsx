import { useMemo } from "react";
import Link from "next/link";

import {
  Avatar,
  Flex,
  Code,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { nip19 } from "nostr-tools";

import { Profile } from "./Profile";

export function File({ event, relays }) {
  const url =
    event.tags.find((t) => t[0] === "url")?.at(1) ||
    event.tags.find((t) => t[0] === "u")?.at(1);
  const mime =
    event.tags.find((t) => t[0] === "m")?.at(1) ||
    event.tags.find((t) => t[0] === "type")?.at(1);
  const nevent = useMemo(
    () =>
      nip19.neventEncode({
        id: event.id,
        author: event.pubkey,
        relays,
      }),
    [event, relays]
  );
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <Profile pubkey={event.pubkey} relays={relays} />
          <Text display={["none", "block"]} color="gray.400">
            {event.content}
          </Text>
        </Flex>
      </CardHeader>
      <Link href={`https://snort.social/e/${nevent}`}>
        <CardBody>
          <Flex alignItems="center" justifyContent="center">
            {mime.startsWith("video") && <video controls src={url} />}
            {mime.startsWith("audio") && <audio controls src={url} />}
            {mime.startsWith("image") && (
              <Image
                sx={{ borderRadius: "12px" }}
                objectFit="cover"
                src={url}
                alt={event.content}
              />
            )}
          </Flex>
        </CardBody>
      </Link>
    </Card>
  );
}
