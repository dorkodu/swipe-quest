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
        pos="absolute" align="center" justify="center"
        maw={theme.breakpoints.sm} w="100%" h="100%"
        {...handlers}
      >
        <Card withBorder>{count}</Card>
      </Flex>
    </>
  )
}

export default Home