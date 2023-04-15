import { useState } from "react";

import { Button } from "@chakra-ui/react";
import { useSub } from "../nostr";

import { Note } from "./Note";

const PAGE = 2;

function Feed({ until, relay }) {
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
  const last = events[0];
  return (
    <>
      {events.map((ev) => (
        <Note key={ev.id} event={ev} relays={[relay]} />
      ))}
      {last && <LazyFeed until={last.created_at * 1000} relay={relay} />}
    </>
  );
}

export function LazyFeed({ until, relay }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      {collapsed && (
        <Button onClick={() => setCollapsed(false)}>
          Load more posts {until}
        </Button>
      )}
      {!collapsed && <Feed until={until} relay={relay} />}
    </>
  );
}
