import { useAppStore } from "@/stores/appStore";
import { Flex, Image, Loader, Modal, Title } from "@mantine/core";
import { useEffect } from "react";
import { useRegisterSW } from 'virtual:pwa-register/react';
import Emoji from "../Emoji";
import { assets } from "@/assets/assets";
import { monsterData } from "@core/types/monster";

function UpdateSWModal() {
  const updateSW = useAppStore(state => state.modals.updateSW);

  const {
    offlineReady: [_offlineReady, _setOfflineReady],
    needRefresh: [needRefresh, _setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    if (!needRefresh) return;
    useAppStore.setState(s => { s.modals.updateSW.opened = true });
    setTimeout(() => updateServiceWorker(true), 500)
  }, [needRefresh]);

  return (
    <Modal
      opened={updateSW.opened}
      onClose={() => { }}
      lockScroll={false}
      withCloseButton={false}
      centered
      size={360}
    >
      <Flex direction="column" gap="md" align="center">
        <Image src={assets.url(monsterData["Raven"].path)} width={100} height={100} style={{ imageRendering: "pixelated" }} />

        <Title order={4} align="center">
          Updating the Game!
          &nbsp;
          <Emoji emoji="🔥" />
        </Title>

        <Loader />
      </Flex>
    </Modal>
  )
}

export default UpdateSWModal