import { assets } from "@/assets/assets";
import { util } from "@/lib/util";
import { useAppStore } from "@/stores/appStore";
import { useGameStore } from "@/stores/gameStore";
import { actionGenerateGameEvent } from "@core/actions/generate_game_event";
import { actionMonsterFight } from "@core/actions/monster_fight";
import { game } from "@core/game";
import { monsterData } from "@core/types/monster";
import { Flex, Image, Modal, Progress, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

function MonsterFightModal() {
  const monsterFight = useAppStore(state => state.modals.monsterFight);
  const close = () => {
    useGameStore.setState(s => { actionGenerateGameEvent.act(s.data, {}) })
    useAppStore.setState(s => { s.modals.monsterFight.opened = false })
    setWinner(undefined);
  }

  const [winner, setWinner] = useState<"ally" | "enemy" | undefined>(undefined);

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
      useGameStore.setState(s => {
        const result = actionMonsterFight.act(s.data, { type: "progress" });
        setWinner(result);
      });
    }, 500);
    return () => clearInterval(interval);
  }, [monsterFight.opened]);

  useEffect(() => {
    if (!winner) return;
    const timeout = setTimeout(() => { close() }, 1000);
    return () => clearTimeout(timeout);
  }, [winner]);

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
                <Image
                  src={assets.url(monsterData[fight.ally.id].path)} width={64} height={64}
                  style={{
                    imageRendering: "pixelated",
                    filter: winner === "enemy" ? "blur(2px)" : undefined
                  }}
                />
                <Progress value={util.clampNumber((fight.allyStats.hp / monsterStats.ally.hp) * 100, 0, 100)} />
              </Flex>
              <Flex direction="column" gap="xs">
                <Image
                  src={assets.url(monsterData[fight.enemy.id].path)}
                  width={fight.isEnemyBoss ? 80 : 64} height={fight.isEnemyBoss ? 80 : 64}
                  style={{
                    imageRendering: "pixelated",
                    filter: winner === "ally" ? "blur(2px)" : undefined
                  }}
                />
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