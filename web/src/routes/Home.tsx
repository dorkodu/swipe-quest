import { Card, Flex, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useSwipeable } from "react-swipeable"

function Home() {
  const theme = useMantineTheme();
  const handlers = useSwipeable({
    onSwipedUp: (ev) => { console.log(ev); setCount(count + 1) },
    trackMouse: true,
  });

  const [count, setCount] = useState(0);

  return (
    <>
      <Flex
        pos="absolute" top={80} bottom={80}
        maw={theme.breakpoints.sm} w="100%"
        {...handlers}
      >
        <Card withBorder w="100%" h="100%" mx="md">{count}</Card>
      </Flex>
    </>
  )
}

export default Home