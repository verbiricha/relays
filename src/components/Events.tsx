import { Text, Code, Card, CardHeader, CardBody } from "@chakra-ui/react";

import { File } from "./File";
import { Note } from "./Note";
import { Stall } from "./Stall";
import { Product } from "./Product";

export function Event({ event, relays }) {
  if ([1, 30023].includes(event.kind)) {
    return <Note event={event} relays={relays} />;
  }

  if (event.kind === 1063) {
    return <File event={event} relays={relays} />;
  }

  if (event.kind === 30017) {
    return <Stall event={event} relays={relays} />;
  }

  if (event.kind === 30018) {
    return <Product event={event} relays={relays} />;
  }

  return (
    <Card>
      <CardHeader>
        <Text>Unknown event kind: {event.kind}</Text>
      </CardHeader>
      <CardBody>
        <Code>{JSON.stringify(event, null, 2)}</Code>
      </CardBody>
    </Card>
  );
}
