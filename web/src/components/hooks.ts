import { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

export function useDelay() {
  const [state, setState] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setState(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  return state;
}

export function useSettings() {
  const [fightSpeed, setFightSpeed] = useLocalStorage({
    key: "fight-speed",
    defaultValue: 1,
    getInitialValueInEffect: false,
  });

  return {
    fightSpeed, setFightSpeed,
  }
}