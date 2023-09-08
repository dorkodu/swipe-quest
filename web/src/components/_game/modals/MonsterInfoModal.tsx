import { assets } from "@/assets/assets";
import { useAppStore } from "@/stores/appStore";
import { Flex, Image, Modal, Title } from "@mantine/core";
import { game } from "@core/game";
import MonsterStats from "../MonsterStats";
import { monsterData } from "@core/types/monster";

function MonsterInfoModal() {
  const monsterInfo = useAppStore(state => state.modals.monsterInfo);
  const close = () => {
    useAppStore.setState(s => {
      s.modals.monsterInfo.opened = false;
      s.modals.monsterInfo.monster = undefined;
    })
  }

  const monster = monsterInfo.monster;

  return (
    <Modal
      opened={monsterInfo.opened} onClose={close}
      title="Monster info" centered lockScroll={false} size={360}
    >
      {monster &&
        <Flex direction="column" align="center" gap="md">
          <Title order={3}>{monster.id}</Title>
          <Image src={assets.url(monsterData[monster.id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
          <MonsterStats {...game.util.getMonsterStats(monster)} />
        </Flex>
      }
    </Modal>
  )
}

export default MonsterInfoModal