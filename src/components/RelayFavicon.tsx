import { Avatar, Tooltip } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

export function RelayFavicon({ url, children, ...rest }) {
  const domain = url
    .replace("wss://relay.", "https://")
    .replace("wss://", "https://")
    .replace("ws://", "http://")
    .replace(/\/$/, "");
  return (
    <Tooltip label={url}>
      <Avatar
        size="xs"
        src={`${domain}/favicon.ico`}
        icon={<PhoneIcon />}
        {...rest}
      >
        {children}
      </Avatar>
    </Tooltip>
  );
}
