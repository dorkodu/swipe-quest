import { Button, Flex, Image } from "@mantine/core"
import { itemData } from "@core/types/item"
import { assets } from "@/assets/assets"

function MonsterItems() {
  return (
    <>
      <Flex direction="column" align="center">
        <Button variant="default" h="auto" p="md">
          <Image src={assets.url(itemData["Axe"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} />
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="xl">
        <Button variant="default" h="auto" p="md" mr="xl">
          <Image src={assets.url(itemData["Banded Mail Armor"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} />
        </Button>

        <Button variant="default" h="auto" p="md" ml="xl">
          <Image src={assets.url(itemData["Cameo Blue Amulet"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} />
        </Button>
      </Flex>

      <Flex direction="row" justify="center" gap="md">
        <Button variant="default" h="auto" p="md">
          <Image src={assets.url(itemData["Generic Rune"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} />
        </Button>

        <Button variant="default" h="auto" p="md">
          <Image src={assets.url(itemData["Agate Ring"].path)} width={32} height={32} style={{ filter: "blur(1px) contrast(50%)" }} />
        </Button>
      </Flex>
    </>
  )
}

export default MonsterItems