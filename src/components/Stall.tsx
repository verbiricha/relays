import {
  Flex,
  Text,
  Heading,
  Select,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

import { Profile } from "./Profile";

function safeParseJson(s) {
  try {
    return JSON.parse(s);
  } catch (error) {
    return {};
  }
}

export function Stall({ event, relays }) {
  const { name, description, currency, shipping } = safeParseJson(
    event.content
  );
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <Profile pubkey={event.pubkey} relays={relays} />
          <Text color="gray.400">{name}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
        <Flex alignItems="flex-start">
          <Flex flexDirection="column" mt={2} mr={4}>
            <Heading fontSize="xl">Currency</Heading>
            <Text>{currency}</Text>
          </Flex>
          <Flex flexDirection="column" mt={2}>
            <Heading fontSize="xl">Shipping</Heading>
            {shipping.length === 1 ? (
              <Text>
                {shipping[0].name} ({shipping[0].cost} {shipping[0].currency})
              </Text>
            ) : (
              <Select placeholder="Select option">
                {shipping.map(({ id, name, cost, currency, countries }) => (
                  <option value={id}>
                    {name} ({cost} {currency})
                  </option>
                ))}
              </Select>
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
