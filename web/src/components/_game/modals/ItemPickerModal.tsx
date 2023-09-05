import { useAppStore } from "@/stores/appStore";
import { itemData } from "@core/types/item";
import { Button, Card, Flex, Modal, Title } from "@mantine/core";
import { assets } from "@/assets/assets";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { InventoryItem } from "../InventoryItem";

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
          <React.Fragment key={i}>
            {item ?
              <InventoryItem
                src={item && assets.url(itemData[item.id].path)}
                stars={item && itemData[item.id].stars}
                count={item?.count}
                onClick={() => itemPicker.callback?.(item)}
              />
              :
              <Button variant="default" h="auto" p="md" onClick={() => itemPicker.callback?.(undefined)}>
                <IconX width={32} height={32} />
              </Button>
            }
          </React.Fragment>
        )}

        {/* If the equipped item can be un-equipped, "No items to pick!" is not visible */}
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