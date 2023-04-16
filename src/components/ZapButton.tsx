import { useState, useEffect } from "react";

import {
  IconButton,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  Code,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function ZapModal({ lnurl, ...rest }) {
  return (
    <Modal {...rest}>
      <ModalContent>
        <ModalHeader>Support the Nostrrr development</ModalHeader>
        <ModalBody>
          <Code>{JSON.stringify(lnurl, null, 2)}</Code>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function ZapButton() {
  const [lnurl, setLnurl] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://snort.social/.well-known/lnurlp/verbiricha`)
      .then((r) => r.json())
      .then(setLnurl);
  }, []);

  function showZapModal() {
    setShowModal(true);
  }

  return (
    <>
      <IconButton
        isDisabled={!lnurl}
        variant="unstyled"
        icon={<StarIcon />}
        aria-label="Donate"
        onClick={showZapModal}
      />
    </>
  );
}
