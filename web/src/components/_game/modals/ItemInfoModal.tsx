import { assets } from "@/assets/assets";
import { util } from "@/lib/util";
import { useAppStore } from "@/stores/appStore";
import { itemData } from "@core/types/item";
import { Flex, Image, Modal, Title } from "@mantine/core";

function ItemInfoModal() {
  const itemInfo = useAppStore(state => state.modals.itemInfo);
  const close = () => { useAppStore.setState(s => { s.modals.itemInfo.opened = false }) }

  const src = itemInfo.item && assets.url(itemData[itemInfo.item.id].path);

  return (
    <Modal
      opened={itemInfo.opened} onClose={close}
      title="Item info" centered lockScroll={false} size={360}
    >
      <Flex direction="column" align="center" gap="md">
        <Title order={3}>{itemInfo.item?.id}</Title>
        <Image src={src} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{itemInfo.item && util.formatNumber(itemInfo.item?.count)}</Title>
      </Flex>
    </Modal>
  )
}

export default ItemInfoModal