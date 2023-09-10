import { util } from "@/lib/util";
import { useGameStore } from "@/stores/gameStore"
import { actionRebirthPerform } from "@core/actions/rebirth_perform";
import { actionRebirthMultiplierIncrease } from "@core/actions/rebirth_multiplier_increase";
import { game } from "@core/game";
import { constants } from "@core/types/constants";
import { IRebirth } from "@core/types/rebirth";
import { Button, Card, Flex, Image, Title } from "@mantine/core"
import { IconRefresh } from "@tabler/icons-react";
import Emoji from "@/components/Emoji";
import { assets } from "@/assets/assets";
import { monsterData } from "@core/types/monster";
import { InventoryItem } from "@/components/_game/InventoryItem";
import { itemData } from "@core/types/item";

function Rebirth() {
  const data = useGameStore(state => state.data);

  const rebirthable = actionRebirthPerform.actable(data, {});
  const rebirth = () => {
    if (!rebirthable) return;
    useGameStore.setState(s => { actionRebirthPerform.act(s.data, {}) });
  }

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" gap="md">

          <Card withBorder>
            <Flex direction="column" align="center">
              <Title order={3}>Reset:</Title>
              <Title order={5}>Level</Title>
              <Title order={5}>Experience</Title>
              <Title order={5}>Gold</Title>
              <Title order={5}>Food</Title>
              <Title order={5}>Monsters</Title>
              <Title order={5}>Items</Title>
              <Title order={5}>Campaign</Title>
              <Title order={5}>Tower</Title>

              <Title order={3} mt="md">Receive:</Title>
              <Title order={4}>
                <Emoji emoji="🧪" />
                {` ${util.formatNumber(game.util.getRebirthPoints(data), true)} Rebirth Points`}
              </Title>

              <Button
                fullWidth leftIcon={<IconRefresh />} mt="md"
                onClick={rebirth} disabled={!rebirthable}
              >
                Rebirth
              </Button>

              {!rebirthable &&
                <Title order={5} mt="md" color="red">
                  {`Minimum `}
                  <Emoji emoji="🧪" />
                  {` 100 RP required`}
                </Title>
              }

            </Flex>
          </Card>

          <Card withBorder>
            <Title order={3} align="center">You have:</Title>
            <Title order={4} align="center">
              <Emoji emoji="🧪" />
              {` ${util.formatNumber(data.rebirth.points)} Rebirth Points`}
            </Title>
          </Card>

          <RebirthMultiplier multiplier="xp" />
          <RebirthMultiplier multiplier="gold" />
          <RebirthMultiplier multiplier="diamond" />
          <RebirthMultiplier multiplier="food" />
          <RebirthMultiplier multiplier="monster" />
          <RebirthMultiplier multiplier="item" />

        </Flex>
      </Card>
    </Flex>
  )
}

export default Rebirth

function RebirthMultiplier({ multiplier }: { multiplier: keyof IRebirth["multipliers"] }) {
  const data = useGameStore(state => state.data);

  const increaseable = actionRebirthMultiplierIncrease.actable(data, { multiplier });
  const increase = () => {
    if (!increaseable) return;
    useGameStore.setState(s => { actionRebirthMultiplierIncrease.act(s.data, { multiplier }) });
  }

  const name = () => {
    switch (multiplier) {
      case "xp": return "Experience Multiplier";
      case "gold": return "Gold Multiplier";
      case "diamond": return "Diamond Multiplier";
      case "food": return "Food Multiplier";
      case "monster": return "Monster Multiplier";
      case "item": return "Item Multiplier";
    }
  }

  const image = () => {
    switch (multiplier) {
      case "xp": return { emoji: "⭐" }
      case "gold": return { emoji: "🪙" }
      case "diamond": return { emoji: "💎" }
      case "food": return { emoji: "🍏" }
      case "monster": return { src: assets.url(monsterData["Angel"].path) }
      case "item": return { src: assets.url(itemData["Common Ancient Sword"].path) }
    }
  }

  const percent = util.formatNumber(data.rebirth.multipliers[multiplier] * 100, true);
  const cost = util.formatNumber(game.util.getRebirthMultiplierCost(data, multiplier), true);
  const increasePercent = util.formatNumber(constants.REBIRTH_MULTIPLIER_INCREASE * 100)

  return (
    <Card withBorder>
      <Flex direction="row" gap="md">
        <Flex direction="column">
          <InventoryItem {...image()} />
        </Flex>

        <Flex direction="column" align="start" gap="xs">
          <Title order={4}>{`${name()}: %${percent}`}</Title>
          <Button onClick={increase} disabled={!increaseable}>{`Increase +${increasePercent}%`}</Button>
          <Title order={4}>
            {`Cost: `}
            <Emoji emoji="🧪" />
            {` ${cost} RP`}
          </Title>
        </Flex>
      </Flex>
    </Card>
  )
}