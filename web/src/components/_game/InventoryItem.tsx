import { Button, Image, Title } from "@mantine/core";
import Emoji from "../Emoji";
import { textShadow } from "@/styles/css";
import { util } from "@/lib/util";

interface Props {
  src?: string;
  emoji?: string;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
}

function InventoryItem({ src, emoji, count, onClick, selected }: Props) {
  return (
    <Button variant={selected ? "filled" : "default"} h="auto" p="md" onClick={onClick}>
      {src && <Image src={src} width={48} height={48} />}
      {emoji && <Emoji emoji={emoji} style={{ width: 48, height: 48 }} />}
      {count !== undefined &&
        <Title order={4} pos="absolute" right={8} bottom={8} color="white" style={textShadow}>
          {util.formatNumber(count)}
        </Title>
      }
    </Button>
  )
}

export default InventoryItem