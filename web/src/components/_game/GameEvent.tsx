import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { IconSword } from "@tabler/icons-react";
import { assets } from "@/assets/assets";
import Emoji from "../Emoji";
import { GameEventId, IGameEvent } from "@core/types/game_event";
import { game } from "@core/game";
import { foodData } from "@core/types/item";
import { monsterData } from "@core/types/monster";
import MonsterStats from "./MonsterStats";
import { useMemo } from "react";

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
    default: return null;
  }
}

function ItemEvent({ event }: { event: IGameEvent["item"] }) {
  return (
    <Card withBorder w="100%" maw={360}>item</Card>
  )
}

function GoldEvent({ event }: { event: IGameEvent["gold"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="🪙" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
      </Flex>
    </Card>
  )
}

function DiamondEvent({ event }: { event: IGameEvent["diamond"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="💎" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
      </Flex>
    </Card>
  )
}

function MonsterFightEvent({ event }: { event: IGameEvent["monster_fight"] }) {
  const stats = useMemo(
    () => game.util.getMonsterStats(event.monsterId, event.level, false),
    [event]
  );

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <MonsterStats {...stats} />
        <Button fullWidth leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

function MonsterUnlockEvent({ event }: { event: IGameEvent["monster_unlock"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
      </Flex>
    </Card>
  )
}

function MysteryBoxEvent({ event }: { event: IGameEvent["mystery_box"] }) {
  return (
    <Card withBorder w="100%" maw={360}>mystery_box</Card>
  )
}

function ScratchCardEvent({ event }: { event: IGameEvent["scratch_card"] }) {
  return (
    <Card withBorder w="100%" maw={360}>scratch_card</Card>
  )
}

function ExperienceEvent({ event }: { event: IGameEvent["experience"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="⭐" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
      </Flex>
    </Card>
  )
}

function FoodEvent({ event }: { event: IGameEvent["food"] }) {
  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(foodData[event.foodId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.foodId}</Title>
      </Flex>
    </Card>
  )
}

function BossFightEvent({ event }: { event: IGameEvent["boss_fight"] }) {
  const stats = useMemo(
    () => game.util.getMonsterStats(event.monsterId, event.level, true),
    [event]
  );

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} color="red">{event.monsterId}</Title>
        <MonsterStats {...stats} />
        <Button fullWidth leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

export default GameEvent