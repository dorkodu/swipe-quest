import { Button, Flex } from "@mantine/core"
import { IconBuildingStore, IconCalendarEvent, IconChevronRight, IconHammer, IconLicense, IconMail, IconSword, IconTarget, IconTower } from "@tabler/icons-react"

function Map() {
  const buttons = [
    { icon: <IconSword />, name: "Campaign", onClick: () => { } },
    { icon: <IconTower />, name: "Tower", onClick: () => { } },
    { icon: <IconHammer />, name: "Blacksmith", onClick: () => { } },
    { icon: <IconBuildingStore />, name: "Store", onClick: () => { } },
    { icon: <IconLicense />, name: "Daily Missions", onClick: () => { } },
    { icon: <IconTarget />, name: "Achievements", onClick: () => { } },
    { icon: <IconCalendarEvent />, name: "Events", onClick: () => { } },
    { icon: <IconMail />, name: "Mails", onClick: () => { } },
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