import dynamic from "next/dynamic";
import Link from "next/link";

import {
  Flex,
  Box,
  Tag,
  Heading,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import { useRelayMetadata } from "../hooks/useRelayMetadata";

const Profile = dynamic(() => import("./Profile").then((mod) => mod.Profile), {
  ssr: false,
});

function Description({ info }) {
  const { description } = info;
  return <Flex my={2}>{description && <Text>{description}</Text>}</Flex>;
}

function Nips({ info }) {
  const { supported_nips } = info;
  return (
    <>
      {supported_nips && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            NIPs
          </Heading>
          <Flex flexWrap="wrap">
            {supported_nips.map((n) => (
              <Box key={n} mr={2} mb={2}>
                <Link href={`https://nips.be/${n}`}>{n}</Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
}

function Software({ info }) {
  const { software, version } = info;
  return (
    <>
      {software && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Software
          </Heading>
          <Text>
            {software}
            {version ? ` ${version}` : ""}
          </Text>
        </Flex>
      )}
    </>
  );
}

function Countries({ info }) {
  const { relay_countries } = info;
  return (
    <>
      {relay_countries && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Countries
          </Heading>
          <Flex flexWrap="wrap">
            {relay_countries.map((n) => (
              <Box key={n} mr={2} mb={2}>
                {n}
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
}

function Operator({ info, relays }) {
  const { pubkey, contact } = info;
  return (
    <>
      {pubkey && pubkey.length === 64 && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Operator
          </Heading>
          <Profile pubkey={pubkey} relays={relays} />
        </Flex>
      )}
      {contact && contact !== "unset" && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Contact
          </Heading>
          <Text>{contact}</Text>
        </Flex>
      )}
    </>
  );
}

function getLanguageName(languageTag) {
  const displayNames = new Intl.DisplayNames([], { type: "language" });
  return displayNames.of(languageTag);
}

function CommunityPreferences({ info }) {
  const { language_tags, tags, posting_policy } = info;
  return (
    <>
      {language_tags && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Languages
          </Heading>
          <List>
            {languageTag.map((l) => (
              <ListItem>{getLanguageName(l)}</ListItem>
            ))}
          </List>
        </Flex>
      )}
      {tags && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Tags
          </Heading>
          <Flex flexWrap="wrap">
            {tags.map((t) => (
              <Box key={t} mr={2} mb={2}>
                <Tag>{t}</Tag>
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
      {posting_policy && (
        <Flex flexDirection="column" my={2}>
          <Heading fontSize="xl" mb={2}>
            Posting Policy
          </Heading>
          <Link href={posting_policy}>{posting_policy}</Link>
        </Flex>
      )}
    </>
  );
}

export function RelaySummaryInfo({ url, info = {} }) {
  return (
    <>
      <Flex flexDirection="column">
        <Description info={info} />
        <Operator info={info} relays={[url]} />
        <Nips info={info} />
        <Software info={info} />
        <Countries info={info} />
        <CommunityPreferences info={info} />
      </Flex>
    </>
  );
}

function RelaySummaryFetch({ url }) {
  const info = useRelayMetadata(url);
  return info ? <RelaySummaryInfo key={url} info={info} url={url} /> : null;
}

export function RelaySummary({ url }) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <div key={url} ref={ref}>
      {inView && <RelaySummaryFetch key={url} url={url} />}
    </div>
  );
}
