import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { useSub } from "../nostr";

import { Note } from "./Note";
import { LazyFeed } from "./LazyFeed";

const PAGE = 20;

function FeedPage({ until, relay }) {
  const [next, setNext] = useState();
  const { events } = useSub({
    filters: [
      {
        kinds: [1, 30023],
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
          <Note key={ev.id} event={ev} relays={[relay]} />
          {idx === events.length - 1 && !next && <div ref={ref}></div>}
        </>
      ))}
      {next && <FeedPage until={next} relay={relay} />}
    </>
  );
}

export function Feed({ relay }) {
  const [now] = useState(Math.floor(Date.now() / 1000));
  const [until, setUntil] = useState();
  const { events } = useSub({
    filters: [
      {
        kinds: [1, 30023],
        since: now,
      },
      {
        kinds: [1, 30023],
        limit: PAGE,
        until: now,
      },
    ],
    relays: [relay],
  });
  const oldest = events[events.length - 1];
  const { ref, inView, entry } = useInView({
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

  return (
    <>
      {events.map((ev, idx) => (
        <>
          <Note key={ev.id} event={ev} relays={[relay]} />
          {idx === events.length - 1 && !until && <div ref={ref}></div>}
        </>
      ))}
      {until && <FeedPage until={until} relay={relay} />}
    </>
  );
}
