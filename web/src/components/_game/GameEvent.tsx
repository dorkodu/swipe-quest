import { assets } from "@/assets/assets";
import { IGameEvent } from "@core/types/game_event";
import { Button, Card, Flex, Image, Title } from "@mantine/core";
import { IconSword } from "@tabler/icons-react";
import Emoji from "../Emoji";

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
        <Emoji emoji="🪙" style={{ width: 48 }} />
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
        <Emoji emoji="💎" style={{ width: 48 }} />
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
      <Flex direction="column" align="center">
        <Image src={assets.monsterIdToSrc(event.monsterId)} width={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <Button fullWidth mt="md" leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

function MonsterUnlockEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "monster_unlock") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center">
        <Image src={assets.monsterIdToSrc(event.monsterId)} width={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <Button fullWidth mt="md">Unlock</Button>
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
        <Emoji emoji="⭐" style={{ width: 48 }} />
        <Title order={3}>{event.count}</Title>
        <Button fullWidth>Collect</Button>
      </Flex>
    </Card>
  )
}

function FoodEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "food") return null;

  return (
    <Card withBorder w="100%" maw={360}>food</Card>
  )
}

function BossFightEvent({ event }: { event: IGameEvent }) {
  if (event.id !== "boss_fight") return null;

  return (
    <Card withBorder w="100%" maw={360}>
      <Flex direction="column" align="center">
        <Image src={assets.monsterIdToSrc(event.monsterId)} width={64} style={{ imageRendering: "pixelated" }} />
        <Title order={3}>{event.monsterId}</Title>
        <Button fullWidth mt="md" leftIcon={<IconSword />}>Fight</Button>
      </Flex>
    </Card>
  )
}

export default GameEvent