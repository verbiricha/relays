import {
  Flex,
  Text,
  Heading,
  Image,
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

export function Product({ event, relays }) {
  const { name, description, images, currency, price, quantity, specs } =
    safeParseJson(event.content);
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <Profile pubkey={event.pubkey} relays={relays} />
          <Text color="gray.400">
            {price} {currency}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
        {images?.map((src) => (
          <Image
            sx={{ borderRadius: "12px" }}
            objectFit="cover"
            src={src}
            alt={description}
          />
        ))}
      </CardBody>
    </Card>
  );
}
