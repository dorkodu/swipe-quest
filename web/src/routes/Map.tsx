import { Button, Flex } from "@mantine/core"
import { IconBat, IconBuildingStore, IconCalendarEvent, IconChevronRight, IconHammer, IconLicense, IconMail, IconSword, IconTarget, IconTower } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

function Map() {
  const navigate = useNavigate();

  const buttons = [
    { icon: <IconSword />, name: "Campaign", onClick: () => { navigate("campaign") } },
    { icon: <IconTower />, name: "Tower", onClick: () => { navigate("tower") } },
    { icon: <IconBat />, name: "Altar", onClick: () => { navigate("altar") } },
    { icon: <IconHammer />, name: "Blacksmith", onClick: () => { navigate("blacksmith") } },
    { icon: <IconBuildingStore />, name: "Store", onClick: () => { navigate("store") } },
    { icon: <IconLicense />, name: "Daily Missions", onClick: () => { navigate("daily-missions") } },
    { icon: <IconTarget />, name: "Achievements", onClick: () => { navigate("achievements") } },
    { icon: <IconCalendarEvent />, name: "Events", onClick: () => { navigate("events") } },
    { icon: <IconMail />, name: "Mails", onClick: () => { navigate("mails") } },
  ]

  return (
    <Flex direction="column" gap="md" mx="md" my={80}>
      {
        buttons.map(b =>
          <Button key={b.name}
            fullWidth variant="default" onClick={b.onClick}
            leftIcon={b.icon} rightIcon={<IconChevronRight />}
            styles={{ label: { display: "flex", flexGrow: 1 } }}
          >
            {b.name}
          </Button>
        )
      }
    </Flex>
  )
}

export default Map