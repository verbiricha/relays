import Link from "next/link";

import { Avatar, Flex } from "@chakra-ui/react";

import { nip19 } from "nostr-tools";

import { useProfile } from "../nostr";
import { Username } from "./Username";

export function Profile({ pubkey, relays }) {
  const profile = useProfile(pubkey);
  const nprofile = nip19.nprofileEncode({
    pubkey,
    relays,
  });
  return (
    <Link href={`https://snort.social/p/${nprofile}`}>
      <Flex alignItems="center">
        {profile?.picture?.length > 0 && (
          <Avatar
            size="sm"
            mr={2}
            src={profile.picture}
            name={profile.display_name || profile.name}
          />
        )}
        <Username pubkey={pubkey} relays={relays} />
      </Flex>
    </Link>
  );
}
