import { assets } from "@/assets/assets"
import { InventoryItem } from "@/components/_game/InventoryItem"
import { useGameStore } from "@/stores/gameStore"
import { actionMonsterEvolve } from "@core/actions/monster_evolve"
import { game } from "@core/game"
import { monsterData } from "@core/types/monster"
import { Button, Card, Flex } from "@mantine/core"
import { IconArrowBigDownFilled, IconTransform } from "@tabler/icons-react"
import { useState } from "react"

function Altar() {
  const data = useGameStore(state => state.data);

  const [monsters, setMonsters] = useState<(number | undefined)[]>([undefined, undefined, undefined]);
  const evolvedMonster = game.util.getMonsterEvolve(data, monsters);

  const evolveable = actionMonsterEvolve.actable(data, { monsters });
  const evolve = () => {
    if (!evolveable) return;
    useGameStore.setState(s => { actionMonsterEvolve.act(s.data, { monsters }) });
    setMonsters([undefined, undefined, undefined]);
  }

  const toggleMonster = (monster: number) => {
    const selected = monsters.filter(m => m === monster).length > 0;

    if (!selected) {
      for (let i = 0; i < monsters.length; ++i) {
        if (monsters[i] === undefined) {
          const _monsters = [...monsters];
          _monsters[i] = monster;
          setMonsters(_monsters);
          break;
        }
      }
    }
    else {
      for (let i = 0; i < monsters.length; ++i) {
        if (monsters[i] === monster) {
          const _monsters = [...monsters];
          _monsters[i] = undefined;
          setMonsters(_monsters);
          break;
        }
      }
    }
  }

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" gap="md">

          <Card withBorder>
            <Flex direction="column" gap="md">

              <Flex direction="column" align="center" gap="md">
                <Flex gap="md">
                  {monsters.map((m, i) => {
                    const monster = m !== undefined && data.inventory.monsters[m];
                    if (!monster) return <InventoryItem key={i} src={assets.url(monsterData["Angel"].path)} blur />
                    return (
                      <InventoryItem
                        key={i}
                        src={assets.url(monsterData[monster.id].path)}
                        count={monster.level}
                        onClick={() => toggleMonster(m)}
                      />
                    )
                  })}
                </Flex>

                <IconArrowBigDownFilled />

                {!evolvedMonster ?
                  <InventoryItem src={assets.url(monsterData["Death Knight"].path)} blur /> :
                  <InventoryItem
                    src={assets.url(monsterData[evolvedMonster.id].path)}
                    count={evolvedMonster.level}
                    onClick={() => { }}
                  />
                }
              </Flex>

              <Button
                leftIcon={<IconTransform />}
                onClick={evolve}
                disabled={!evolveable}
              >
                Evolve
              </Button>

            </Flex>
          </Card>

          <Flex direction="row" gap="md" wrap="wrap">
            {data.inventory.monsters.map((m, i) =>
              <InventoryItem
                key={i}
                src={assets.url(monsterData[m.id].path)}
                count={m.level}
                onClick={() => toggleMonster(i)}
                selected={monsters.includes(i)}
              />
            )}
          </Flex>

        </Flex>
      </Card>
    </Flex>
  )
}

export default Altar