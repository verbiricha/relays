import { useMemo } from "react";

import { Flex, Box, Button, Text, IconButton } from "@chakra-ui/react";
import { Emoji } from "emoji-picker-react";

import { useSub } from "../nostr";

function findTag(tags, tag) {
  return tags.find((t) => t[0] === tag)?.at(1);
}

export function getZapRequest(zap) {
  let zapRequest = findTag(zap.tags, "description");
  if (zapRequest) {
    try {
      if (zapRequest.startsWith("%")) {
        zapRequest = decodeURIComponent(zapRequest);
      }
      return JSON.parse(zapRequest);
    } catch (e) {
      console.warn("Invalid zap", zapRequest);
    }
  }
}

export function getZapAmount(zap) {
  try {
    const invoice = findTag(zap.tags, "bolt11");
    if (invoice) {
      const decoded = decode(invoice);
      const amount = decoded.sections.find(({ name }) => name === "amount");
      return Number(amount.value) / 1000;
    }
    return 0;
  } catch (error) {
    return 0;
  }
}

export function NoteReactions({ event, relays }) {
  const identifier = findTag(event.tags, "d");
  const filter =
    event.kind === 1
      ? {
          kinds: [7, 9735],
          "#e": [event.id],
        }
      : {
          kinds: [7, 9735],
          "#a": [`${event.kind}:${event.pubkey}:${identifier}`],
        };
  const { events } = useSub({
    filters: [filter],
    relays,
    options: {
      unsubscribeOnEose: false,
    },
  });
  const likes = useMemo(
    () => events.filter((e) => e.kind === 7 && e.content === "+"),
    [events]
  );

  const emojis = useMemo(() => {
    const emo = events
      .filter(
        (e) =>
          e.kind === 7 &&
          e.content !== "+" &&
          e.content !== "-" &&
          e.pubkey !== event.pubkey
      )
      .reduce((acc, ev) => {
        const count = acc[ev.content] ?? 0;
        return { ...acc, [ev.content]: count + 1 };
      }, {});
    const entries = Object.entries(emo);
    entries.sort((a, b) => a.count - b.count);
    return entries;
  }, [events]);

  const zaps = events.filter((e) => e.kind === 9735);
  const zappers = useMemo(() => {
    return zaps
      .map((z) => {
        return { ...getZapRequest(z), amount: getZapAmount(z) };
      })
      .filter((z) => z.pubkey !== event.pubkey);
  }, [zaps, event]);
  const zapsTotal = useMemo(() => {
    return zappers.reduce((acc, { amount }) => {
      return acc + amount;
    }, 0);
  }, [zappers]);

  return (
    <>
      <Flex alignItems="center" flexDirection="row" mr={4}>
        <Box
          mr={2}
          style={{ filter: zapsTotal > 0 ? "none" : "grayscale(100%)" }}
        >
          <Emoji unified="26a1" size="16" />
        </Box>
        <Text as="span" fontSize="md">
          {zapsTotal}
        </Text>
      </Flex>
      <Flex alignItems="center" flexDirection="row" mr={4}>
        <Box
          mr={2}
          style={{ filter: likes.length > 0 ? "none" : "grayscale(100%)" }}
        >
          <Emoji unified="1f49c" size="16" />
        </Box>
        <Text as="span" fontSize="md">
          {likes.length}
        </Text>
      </Flex>
      {emojis.map(([e, count]) => {
        return (
          <Flex alignItems="center" flexDirection="row" key={e} mr={4}>
            <Text fontSize="md" mr={2}>
              {e}
            </Text>
            <Text fontSize="md">{count}</Text>
          </Flex>
        );
      })}
    </>
  );
}
