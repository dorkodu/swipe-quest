import { useGameStore } from "@/stores/gameStore";
import { Flex, ScrollArea, useMantineTheme } from "@mantine/core";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { actionGenerateGameEvent } from "@core/actions/generate_game_event";
import GameEvent from "@/components/_game/GameEvent";

function Home() {
  const theme = useMantineTheme();
  const handlers = useSwipeable({
    onSwipedUp: (_ev) => { setCount(count + 1) },
    trackMouse: true,
    swipeDuration: 100,
  });

  const data = useGameStore(state => state.data);
  const [count, setCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGameStore.setState(s => {
      actionGenerateGameEvent.act(s.data, {})
    })
  }, [count]);

  useLayoutEffect(() => {
    if (!scrollAreaRef.current) return;
    (scrollAreaRef.current.firstChild as HTMLDivElement).style.height = "100%";
  }, [scrollAreaRef])

  return (
    <>
      <Flex
        pos="absolute" top={64} bottom={64}
        maw={theme.breakpoints.sm} w="100%"
        {...handlers}
      >
        <Flex w="100%" h="100%" mx="md">
          <ScrollArea w="100%" h="100%" viewportRef={scrollAreaRef}>
            <Flex w="100%" h="100%" py="md" align="center" justify="center">
              <GameEvent event={data.currentGameEvent} />
            </Flex>
          </ScrollArea>
        </Flex>
      </Flex>
    </>
  )
}

export default Home