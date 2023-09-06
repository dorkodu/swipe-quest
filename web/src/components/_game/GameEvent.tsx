import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { IconArrowBigUpFilled, IconHandMove, IconSword } from "@tabler/icons-react";
import { assets } from "@/assets/assets";
import Emoji from "../Emoji";
import { GameEventId, IGameEvent } from "@core/types/game_event";
import { game } from "@core/game";
import { monsterData } from "@core/types/monster";
import MonsterStats from "./MonsterStats";
import { useMemo } from "react";
import { itemData } from "@core/types/item";
import { util } from "@/lib/util";
import { useGameStore } from "@/stores/gameStore";
import { useAppStore } from "@/stores/appStore";
import { actionMonsterFight } from "@core/actions/monster_fight";
import { MonsterFightType } from "@core/types/monster_fight";
import { random } from "@core/lib/random";

function GameEvent({ event }: { event: IGameEvent[GameEventId] | undefined }) {
  switch (event?.id) {
    case "item": return <ItemEvent event={event} />;
    case "gold": return <GoldEvent event={event} />;
    case "diamond": return <DiamondEvent event={event} />;
    case "monster_fight": return <MonsterFightEvent event={event} />;
    case "monster_unlock": return <MonsterUnlockEvent event={event} />;
    case "mystery_box": return <MysteryBoxEvent event={event} />;
    case "scratch_card": return <ScratchCardEvent event={event} />;
    case "experience": return <ExperienceEvent event={event} />;
    case "food": return <FoodEvent event={event} />;
    case "boss_fight": return <BossFightEvent event={event} />;
    default: return <NoEvent />;
  }
}

function ItemEvent({ event }: { event: IGameEvent["item"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(itemData[event.itemId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} align="center">Found: <br /> {event.itemId}</Title>
      </Flex>
    </Card>
  )
}

function GoldEvent({ event }: { event: IGameEvent["gold"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="🪙" style={{ width: 48, height: 48 }} />
        <Title order={3} align="center">
          Received: <br />
          {`${util.formatNumber(event.count)} Gold`}
        </Title>
      </Flex>
    </Card>
  )
}

function DiamondEvent({ event }: { event: IGameEvent["diamond"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="💎" style={{ width: 48, height: 48 }} />
        <Title order={3} align="center">
          Received: <br />
          {`${util.formatNumber(event.count)} Diamond`}
        </Title>
      </Flex>
    </Card>
  )
}

function MonsterFightEvent({ event }: { event: IGameEvent["monster_fight"] }) {
  const stats = useMemo(
    () => game.util.getMonsterStats({ id: event.monsterId, level: event.level }, false),
    [event]
  );

  const fight = () => {
    useAppStore.setState(s => { s.modals.monsterFight.opened = true });
    useGameStore.setState(s => {
      const enemy = { id: event.monsterId, level: event.level, xp: 0 };
      const ally = s.data.inventory.monsters[s.data.inventory.currentMonsterIndex];
      if (!ally) return;
      actionMonsterFight.act(
        s.data,
        {
          phase: "start",
          type: MonsterFightType.GameEvent,
          rewards: {
            food: random.number(s.data, s.data.player.level * 5, s.data.player.level * 50),
            gold: random.number(s.data, s.data.player.level * 5, s.data.player.level * 50),
            xp: random.number(s.data, s.data.player.level * 5, s.data.player.level * 50),
          },
          ally,
          enemy
        }
      );
    });
  }

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} align="center">{event.monsterId}</Title>
        <MonsterStats {...stats} />
        <Button fullWidth leftIcon={<IconSword />} onClick={fight}>Fight</Button>
      </Flex>
    </Card>
  )
}

function MonsterUnlockEvent({ event }: { event: IGameEvent["monster_unlock"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} align="center">
          Found: <br />
          {event.monsterId}</Title>
      </Flex>
    </Card>
  )
}

function MysteryBoxEvent({ }: { event: IGameEvent["mystery_box"] }) {
  return (
    <Card withBorder w="100%" maw={360}>mystery_box</Card>
  )
}

function ScratchCardEvent({ }: { event: IGameEvent["scratch_card"] }) {
  return (
    <Card withBorder w="100%" maw={360}>scratch_card</Card>
  )
}

function ExperienceEvent({ event }: { event: IGameEvent["experience"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="⭐" style={{ width: 48, height: 48 }} />
        <Title order={3} align="center">
          Received: <br />
          {`${util.formatNumber(event.count)} Experience`}
        </Title>
      </Flex>
    </Card>
  )
}

function FoodEvent({ event }: { event: IGameEvent["food"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="🍏" style={{ width: 48, height: 48 }} />
        <Title order={3} align="center">
          Received: <br />
          {`${util.formatNumber(event.count)} Food`}
        </Title>
      </Flex>
    </Card>
  )
}

function BossFightEvent({ event }: { event: IGameEvent["boss_fight"] }) {
  const stats = useMemo(
    () => game.util.getMonsterStats({ id: event.monsterId, level: event.level }, true),
    [event]
  );

  const fight = () => {
    useAppStore.setState(s => { s.modals.monsterFight.opened = true });
    useGameStore.setState(s => {
      const enemy = { id: event.monsterId, level: event.level, xp: 0 };
      const ally = s.data.inventory.monsters[s.data.inventory.currentMonsterIndex];
      if (!ally) return;
      actionMonsterFight.act(
        s.data,
        {
          phase: "start",
          type: MonsterFightType.GameEvent,
          rewards: {
            food: random.number(s.data, s.data.player.level * 10, s.data.player.level * 100),
            gold: random.number(s.data, s.data.player.level * 10, s.data.player.level * 100),
            xp: random.number(s.data, s.data.player.level * 10, s.data.player.level * 100),
          },
          ally,
          enemy,
          isEnemyBoss: true
        }
      );
    });
  }

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} color="red">{event.monsterId}</Title>
        <MonsterStats {...stats} />
        <Button fullWidth leftIcon={<IconSword />} onClick={fight}>Fight</Button>
      </Flex>
    </Card>
  )
}

function NoEvent() {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Title order={3} align="center">{"Start swiping up!"}</Title>
        <Flex>
          <IconArrowBigUpFilled size={32} />
          <IconHandMove size={32} />
        </Flex>
      </Flex>
    </Card>
  )
}

export default GameEvent