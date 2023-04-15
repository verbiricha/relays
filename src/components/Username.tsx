import { useState, useEffect } from "react";
import Link from "next/link";

import { Flex, Text } from "@chakra-ui/react";
import { nip19, nip05 } from "nostr-tools";

import { useProfile } from "../nostr";

function useNostrAddress({ address }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (address) {
      nip05.queryProfile(address).then(setProfile);
    }
  }, [address]);

  return profile;
}

function formatAddress(s: string) {
  if (s.startsWith("_@")) {
    return s.slice(2);
  }
  return s;
}

export function Username({ pubkey, relays = [] }) {
  const profile = useProfile(pubkey);
  const nipProfile = useNostrAddress({ address: profile?.nip05 });
  const isAddressValid = profile?.nip05 && pubkey === nipProfile?.pubkey;
  const name = profile?.display_name || profile?.name || pubkey.slice(0, 16);
  const nprofile = nip19.nprofileEncode({
    pubkey,
    relays,
  });
  return (
    <Link href={`https://snort.social/p/${nprofile}`}>
      <Text as="span">
        {name}
        {isAddressValid && (
          <Text color="gray.500">{formatAddress(profile.nip05)}</Text>
        )}
      </Text>
    </Link>
  );
}
