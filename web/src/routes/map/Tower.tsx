import { assets } from "@/assets/assets"
import ItemList from "@/components/_game/ItemList"
import MonsterStats from "@/components/_game/MonsterStats"
import { useAppStore } from "@/stores/appStore"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterFight } from "@core/actions/monster_fight"
import { game } from "@core/game"
import { IMonster, monsterData } from "@core/types/monster"
import { MonsterFightType } from "@core/types/monster_fight"
import { Button, Card, Divider, Flex, Image, Title } from "@mantine/core"
import { IconSword } from "@tabler/icons-react"

function Tower() {
  const data = useGameStore(state => state.data);
  const tower = game.util.getTowerLevel(data.tower.level);

  const fight = () => {
    useAppStore.setState(s => { s.modals.monsterFight.opened = true });
    useGameStore.setState(s => {
      const enemy: IMonster = { id: tower.monster.id, level: tower.monster.level };
      const ally = s.data.inventory.monsters[s.data.inventory.currentMonsterIndex];
      if (!ally) return;
      actionMonsterFight.act(s.data, { phase: "start", type: MonsterFightType.Tower, ally, enemy });
    })
  }

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" align="center" gap="md">

          <Title order={2} align="center">{`Tower Level ${data.tower.level}`}</Title>
          <Divider w="100%" />

          <Image src={assets.url(monsterData[tower.monster.id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
          <Title order={3} align="center">{tower.monster.id}</Title>
          <MonsterStats {...game.util.getMonsterStats(tower.monster)} />
          <Button fullWidth leftIcon={<IconSword />} onClick={fight}>Fight</Button>

          <Divider w="100%" />
          <Title order={3}>Rewards:</Title>
          <Flex direction="row" gap="md" wrap="wrap" w="100%">
            <ItemList
              xp={tower.rewards.xp}
              gold={tower.rewards.gold}
              diamond={tower.rewards.diamond}
              food={tower.rewards.food}
              items={tower.rewards.items}
            />
          </Flex>

        </Flex>
      </Card>
    </Flex>
  )
}

export default Tower