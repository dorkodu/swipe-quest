import { assets } from "@/assets/assets";
import { util } from "@/lib/util";
import { useAppStore } from "@/stores/appStore";
import { useGameStore } from "@/stores/gameStore";
import { actionMonsterFight } from "@core/actions/monster_fight";
import { game } from "@core/game";
import { monsterData } from "@core/types/monster";
import { Flex, Image, Modal, Progress, Title } from "@mantine/core";
import { useEffect, useMemo } from "react";

function MonsterFightModal() {
  const monsterFight = useAppStore(state => state.modals.monsterFight);
  const close = () => { useAppStore.setState(s => { s.modals.monsterFight.opened = false }) }

  const fight = useGameStore(state => state.data.currentMonsterFight);
  const monsterStats = useMemo(() => {
    if (!fight) return undefined;
    if (!monsterFight.opened) return undefined;
    const ally = game.util.getMonsterStats(fight.ally.id, fight.ally.level);
    const enemy = game.util.getMonsterStats(fight.enemy.id, fight.enemy.level, fight.isEnemyBoss);
    return { ally, enemy };
  }, [fight, monsterFight.opened])

  useEffect(() => {
    if (!fight) return;
    if (!monsterFight.opened) return;
    const interval = setInterval(() => {
      let result: "ally" | "enemy" | undefined;
      useGameStore.setState(s => {
        result = actionMonsterFight.act(s.data, { type: "progress" })
      });
      if (!!result) close();
    }, 1000);
    return () => clearInterval(interval);
  }, [monsterFight.opened]);

  return (
    <Modal
      opened={monsterFight.opened} onClose={() => { }}
      withCloseButton={false} lockScroll={false} fullScreen
      styles={{ body: { height: "100%" } }}
    >
      <Flex h="100%" direction="column" align="center" justify="center">
        <Flex direction="row" justify="center" gap={100} wrap="wrap">
          {fight && monsterStats &&
            <>
              <Flex pos="absolute" top={0} bottom={0} align="center">
                <Title order={5} opacity={0.75}>{`Turn ${Math.floor(fight.turn)}`}</Title>
              </Flex>

              <Flex direction="column" gap="xs">
                <Image src={assets.url(monsterData[fight.ally.id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
                <Progress value={util.clampNumber((fight.allyStats.hp / monsterStats.ally.hp) * 100, 0, 100)} />
              </Flex>
              <Flex direction="column" gap="xs">
                <Image src={assets.url(monsterData[fight.enemy.id].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
                <Progress value={util.clampNumber((fight.enemyStats.hp / monsterStats.enemy.hp) * 100, 0, 100)} />
              </Flex>
            </>
          }
        </Flex>
      </Flex>
    </Modal>
  )
}

export default MonsterFightModal