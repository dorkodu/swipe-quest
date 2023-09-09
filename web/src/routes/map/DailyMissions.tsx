import { assets } from "@/assets/assets";
import { InventoryItem } from "@/components/_game/InventoryItem";
import ItemList from "@/components/_game/ItemList";
import { useGameStore } from "@/stores/gameStore"
import { actionClaimDailyMission } from "@core/actions/claim_daily_mission";
import { DailyMissionKey, dailyMissions } from "@core/types/daily_missions";
import { monsterData } from "@core/types/monster";
import { Button, Card, Flex, Progress, Title } from "@mantine/core"
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";

function DailyMissions() {
  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      <DailyMission mission="completeAllDailyMissions" />
      <DailyMission mission="progressCampaign" />
      <DailyMission mission="progressTower" />
      <DailyMission mission="killMonster" />
      <DailyMission mission="unlockMonster" />
      <DailyMission mission="evolveMonster" />
      <DailyMission mission="unlockItem" />
      <DailyMission mission="upgradeItem" />
      <DailyMission mission="swipeGameEvents" />
    </Flex>
  )
}

export default DailyMissions

function DailyMission({ mission }: { mission: DailyMissionKey }) {
  const data = useGameStore(state => state.data);

  const claimed = data.dailyMissions[mission].claimed;
  const claimable = actionClaimDailyMission.actable(data, { mission });
  const claim = () => {
    if (!claimable) return;
    useGameStore.setState(s => { actionClaimDailyMission.act(s.data, { mission }) });
  }

  const getMissionName = () => {
    switch (mission) {
      case "completeAllDailyMissions": return "Complete All Daily Missions";
      case "progressCampaign": return "Progress Campaign";
      case "progressTower": return "Progress Tower";
      case "killMonster": return "Kill Monsters";
      case "unlockMonster": return "Unlock Monster";
      case "unlockItem": return "Unlock Item";
      case "evolveMonster": return "Evolve Monster";
      case "upgradeItem": return "Upgrade Item";
      case "swipeGameEvents": return "Swipe";
    }
  }

  const monster = dailyMissions[mission].rewards?.monsters?.[0];
  const current = data.dailyMissions[mission].count;
  const target = dailyMissions[mission].count;

  return (
    <Card withBorder w="100%">
      <Flex direction="row" gap="md">

        <Flex direction="column" align="center" gap="md">
          <Flex direction="row">
            {!monster ?
              <ItemList
                diamond={dailyMissions[mission].rewards.diamond}
                gold={dailyMissions[mission].rewards.gold}
                food={dailyMissions[mission].rewards.food}
                xp={dailyMissions[mission].rewards.xp}
                items={dailyMissions[mission].rewards.items}
              />
              :
              <InventoryItem
                src={assets.url(monsterData[monster.id].path)}
                count={monster.level}
              />
            }
          </Flex>

          <Button
            onClick={claim} disabled={!claimable}
            leftIcon={!claimed ? <IconCircle /> : <IconCircleCheckFilled />}
          >
            Claim
          </Button>
        </Flex>

        <Flex direction="column" gap="md" style={{ flex: 1 }}>
          <Title order={5}>
            {`${getMissionName()} (${current}/${target})`}
          </Title>

          <Progress value={current / target * 100} />
        </Flex>

      </Flex>
    </Card>
  )
}