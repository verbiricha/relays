import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { useSub } from "../nostr";

import { Event } from "./Events";

const PAGE = 20;

function FeedPage({ kinds, until, relay }) {
  const [next, setNext] = useState();
  const { events } = useSub({
    filters: [
      {
        kinds,
        until,
        limit: PAGE,
      },
    ],
    relays: [relay],
    options: {
      unsubscribeOnEose: true,
    },
  });
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const oldest = events[events.length - 1];
  useEffect(() => {
    if (!oldest || next) {
      return;
    }
    const timestamp = oldest.created_at;
    if (inView) {
      setNext(timestamp);
    }
  }, [next, oldest, inView]);

  return (
    <>
      {events.map((ev, idx) => (
        <>
          <Event key={ev.id} event={ev} relays={[relay]} />
          {idx === events.length - 1 && !next && <div ref={ref}></div>}
        </>
      ))}
      {next && <FeedPage until={next} relay={relay} kinds={kinds} />}
    </>
  );
}

export function Feed({ kinds, relay }) {
  const [now] = useState(Math.floor(Date.now() / 1000));
  const [lastSeen, setLastSeen] = useState(now);
  const [until, setUntil] = useState();
  const { events } = useSub({
    filters: [
      {
        kinds,
        since: now,
      },
      {
        kinds,
        limit: PAGE,
        until: now,
      },
    ],
    relays: [relay],
  });
  const oldest = events[events.length - 1];
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!oldest || until) {
      return;
    }
    const timestamp = oldest.created_at;
    if (inView) {
      setUntil(timestamp);
    }
  }, [until, oldest, inView]);

  const newEvents = events.filter((e) => e.created_at > lastSeen);
  const feedEvents = events.filter((e) => e.created_at <= lastSeen);

  return (
    <>
      <Button
        isDisabled={newEvents.length === 0}
        isLoading={newEvents.length === 0}
        onClick={() => setLastSeen(newEvents[0].created_at)}
      >
        {newEvents.length > 0 && `Show ${newEvents.length} more`}
      </Button>
      {feedEvents.map((ev, idx) => (
        <Box key={ev.id} mb={4}>
          <Event event={ev} relays={[relay]} />
          {idx === feedEvents.length - 1 && !until && <div ref={ref}></div>}
        </Box>
      ))}
      {until && <FeedPage until={until} relay={relay} kinds={kinds} />}
    </>
  );
}
