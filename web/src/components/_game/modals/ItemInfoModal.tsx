import { assets } from "@/assets/assets";
import Emoji from "@/components/Emoji";
import { util } from "@/lib/util";
import { AppStoreState, useAppStore } from "@/stores/appStore";
import { itemData } from "@core/types/item";
import { Flex, Image, Modal, Title } from "@mantine/core";

function ItemInfoModal() {
  const itemInfo = useAppStore(state => state.modals.itemInfo);
  const close = () => {
    useAppStore.setState(s => {
      s.modals.itemInfo.opened = false;
      s.modals.itemInfo.item = undefined;
      s.modals.itemInfo.other = undefined;
    })
  }

  return (
    <Modal
      opened={itemInfo.opened} onClose={close}
      title="Item info" centered lockScroll={false} size={360}
    >
      <Flex direction="column" align="center" gap="md">
        {itemInfo.item && <ItemInfo {...itemInfo.item} />}
        {itemInfo.other && <OtherInfo {...itemInfo.other} />}
      </Flex>
    </Modal>
  )
}

function ItemInfo({ id, count }: Required<AppStoreState["modals"]["itemInfo"]>["item"]) {
  return (
    <>
      <Title order={3}>{id}</Title>
      <Image src={assets.url(itemData[id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
      <Title order={3}>{util.formatNumber(count)}</Title>
    </>
  )
}

function OtherInfo({ name, text }: Required<AppStoreState["modals"]["itemInfo"]>["other"]) {
  const nameToEmoji = () => {
    switch (name) {
      case "level": return "⭐";
      case "gold": return "🪙";
      case "diamond": return "💎";
      case "food": return "🍏";
      default: return "";
    }
  }

  return (
    <>
      <Emoji emoji={nameToEmoji()} style={{ width: 48, height: 48 }} />
      <Title order={3}>{text}</Title>
    </>
  )
}

export default ItemInfoModal