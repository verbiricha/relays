import { useQuery } from "@tanstack/react-query";

import { getRelayMetadata } from "../nostr";

export function useRelayMetadata(url) {
  return useQuery({
    queryKey: ["relay-metadata", url],
    queryFn: () => getRelayMetadata(url),
    retry: false,
    retryOnMount: false,
    cacheTime: Infinity,
  });
}
