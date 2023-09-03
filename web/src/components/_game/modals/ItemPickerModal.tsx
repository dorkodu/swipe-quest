import { useAppStore } from "@/stores/appStore";
import { itemData } from "@core/types/item";
import { Card, Flex, Modal, Title } from "@mantine/core";
import InventoryItem from "../InventoryItem";
import { assets } from "@/assets/assets";

function ItemPickerModal() {
  const itemPicker = useAppStore(state => state.modals.itemPicker);
  const close = () => { useAppStore.setState(s => { s.modals.itemPicker.opened = false }) }

  return (
    <Modal
      opened={itemPicker.opened} onClose={close}
      title="Pick an item!" centered lockScroll={false}
    >
      <Flex direction="row" gap="md" wrap="wrap">
        {itemPicker.items.map((item, i) =>
          <InventoryItem
            key={i}
            src={assets.url(itemData[item.id].path)}
            count={item.count}
            onClick={() => itemPicker.callback?.(item)}
          />
        )}

        {itemPicker.items.length === 0 &&
          <Card withBorder w="100%">
            <Flex direction="column" align="center" gap="md">
              <Title order={3}>{"No items to pick!"}</Title>
            </Flex>
          </Card>
        }
      </Flex>
    </Modal>
  )
}

export default ItemPickerModal