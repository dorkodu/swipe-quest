import { assets } from "@/assets/assets";
import Emoji from "@/components/Emoji";
import { InventoryItem } from "@/components/_game/InventoryItem";
import ItemList from "@/components/_game/ItemList";
import { useGameStore } from "@/stores/gameStore"
import { actionClaimDailyMission } from "@core/actions/claim_daily_mission";
import { actionResetDailyMissions } from "@core/actions/reset_daily_missions";
import { game } from "@core/game";
import { DailyMissionKey, dailyMissions } from "@core/types/daily_missions";
import { monsterData } from "@core/types/monster";
import { Button, Card, Flex, Progress, Title } from "@mantine/core"
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import { useTimer } from 'react-timer-hook';

function DailyMissions() {
  const data = useGameStore(state => state.data);

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date(game.util.getDailyMissionResetDate(data)),
    onExpire: () => {
      useGameStore.setState(s => { actionResetDailyMissions.act(s.data, {}) });
    },
  });

  const h = (hours < 10 ? "0" : "") + hours;
  const m = (minutes < 10 ? "0" : "") + minutes;
  const s = (seconds < 10 ? "0" : "") + seconds;

  return (
    <Flex direction="column" align="center" gap="md" mx="md" my={80}>
      <Card withBorder w="100%" maw={360}>
        <Flex direction="column" gap="md">
          <Card withBorder>
            <Title order={4} align="center">
              <Emoji emoji="⏰" />
              {` Resets in ${h}:${m}:${s}`}
            </Title>
          </Card>

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
      </Card>
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