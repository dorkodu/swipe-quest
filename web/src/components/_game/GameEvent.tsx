import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { IconSword } from "@tabler/icons-react";
import { assets } from "@/assets/assets";
import Emoji from "../Emoji";
import { IGameEvent } from "@core/types/game_event";
import { foodData } from "@core/types/item";
import { monsterData } from "@core/types/monster";
import MonsterStats from "./MonsterStats";

function GameEvent({ event }: { event: IGameEvent | undefined }) {
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

function ItemEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "item") return null;

  return (
    <Card withBorder w="100%" maw={360}>item</Card>
  )
}

function GoldEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "gold") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="🪙" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
        <Button fullWidth>Collect</Button>
      </Flex>
    </Card>
  )
}

function DiamondEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "diamond") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="💎" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
        <Button fullWidth>Collect</Button>
      </Flex>
    </Card>
  )
}

function MonsterFightEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "monster_fight") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <MonsterStats level={event.level} hp={123} dmg={123} spd={123} />
        <Button fullWidth leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

function MonsterUnlockEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "monster_unlock") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <Button fullWidth>Unlock</Button>
      </Flex>
    </Card>
  )
}

function MysteryBoxEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "mystery_box") return null;

  return (
    <Card withBorder w="100%" maw={360}>mystery_box</Card>
  )
}

function ScratchCardEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "scratch_card") return null;

  return (
    <Card withBorder w="100%" maw={360}>scratch_card</Card>
  )
}

function ExperienceEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "experience") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Emoji emoji="⭐" style={{ width: 48, height: 48 }} />
        <Title order={3}>{event.count}</Title>
        <Button fullWidth>Collect</Button>
      </Flex>
    </Card>
  )
}

function FoodEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "food") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(foodData[event.foodId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.foodId}</Title>
        <Button fullWidth>Collect</Button>
      </Flex>
    </Card>
  )
}

function BossFightEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "boss_fight") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center" gap="md">
        <Image src={assets.url(monsterData[event.monsterId].path)} width={64} height={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3} color="red">{event.monsterId}</Title>
        <MonsterStats level={event.level} hp={123} dmg={123} spd={123} />
        <Button fullWidth leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

export default GameEvent