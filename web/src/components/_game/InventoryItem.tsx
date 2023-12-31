import { Button, Image, Title } from "@mantine/core";
import Emoji from "../Emoji";
import { util } from "@/lib/util";
import { textShadow } from "@/styles/css";

type InventoryItemProps = InventoryItemImageProps & { selected?: boolean, onClick?: () => void }

export function InventoryItem({ selected, onClick, ...props }: InventoryItemProps) {
  return (
    <Button variant={selected ? "filled" : "default"} h="auto" p="md" onClick={onClick}>
      <InventoryItemImage {...props} />
    </Button>
  )
}

interface InventoryItemImageProps {
  src?: string;
  emoji?: string;
  stars?: number;
  count?: number;
  blur?: boolean;
}

export function InventoryItemImage({ src, emoji, stars, count, blur }: InventoryItemImageProps) {
  return (
    <>
      {src &&
        <Image
          src={src} width={32} height={32}
          style={{ imageRendering: "pixelated", filter: blur ? "blur(1px) contrast(50%)" : "" }}
        />
      }

      {emoji && <Emoji emoji={emoji} style={{ width: 32, height: 32 }} />}

      {stars !== undefined &&
        [...Array(stars).keys()].map(s =>
          <Emoji key={s} emoji="⭐"
            style={{ width: 10, height: 10, left: 4, bottom: 4 + (s * 10), position: "absolute" }}
          />
        )
      }

      {count !== undefined &&
        <Title order={5} pos="absolute" right={4} bottom={0} color="white" style={textShadow}>
          {util.formatNumber(count)}
        </Title>
      }
    </>
  )
}