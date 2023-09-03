import { Button, Image, Title } from "@mantine/core";
import Emoji from "../Emoji";
import { textShadow } from "@/styles/css";

interface Props {
  src?: string;
  emoji?: string;
  count: number;
  onClick?: () => void;
  selected?: boolean;
}

function InventoryItem({ src, emoji, count, onClick, selected }: Props) {
  return (
    <Button variant={selected ? "filled" : "default"} h="auto" p="md" onClick={onClick}>
      {src && <Image src={src} width={48} height={48} style={{ imageRendering: "pixelated" }} />}
      {emoji && <Emoji emoji={emoji} style={{ width: 48, height: 48 }} />}
      <Title order={4} pos="absolute" right={8} bottom={8} color="white" style={textShadow}>{count}</Title>
    </Button>
  )
}

export default InventoryItem