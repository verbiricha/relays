import { useQuery } from "@tanstack/react-query";

import { getRelayMetadata } from "../nostr";

const VERIFICATION_CACHE_TIME = 24 * 60 * 60 * 1000;
const VERIFICATION_STALE_TIMEOUT = 10 * 60 * 1000;

export function useRelayMetadata(url) {
  const { data } = useQuery({
    queryKey: ["relay-metadata", url],
    queryFn: () => getRelayMetadata(url),
    retry: false,
    retryOnMount: false,
    cacheTime: Infinity,
  });

  return data;
}
