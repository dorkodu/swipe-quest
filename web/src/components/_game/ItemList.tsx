import { IItem, itemData } from "@core/types/item"
import { InventoryItem } from "./InventoryItem"
import { assets } from "@/assets/assets"
import { util } from "@/lib/util";
import { useGameStore } from "@/stores/gameStore";
import { game } from "@core/game";

interface Props {
  level?: number;
  levelOnClick?: () => void;

  xp?: number;
  xpOnClick?: () => void;

  gold?: number;
  goldOnClick?: () => void;

  diamond?: number;
  diamondOnClick?: () => void;

  food?: number;
  foodOnClick?: () => void;

  items?: IItem[];
  itemsOnClick?: (item: IItem) => void;
}

function ItemList(
  {
    level, levelOnClick,
    xp, xpOnClick,
    gold, goldOnClick,
    diamond, diamondOnClick,
    food, foodOnClick,
    items, itemsOnClick
  }: Props
) {
  const player = useGameStore(state => state.data.player);

  const goldText = gold !== undefined ? `${util.formatNumber(gold, true)} Gold` : "";
  const diamondText = diamond !== undefined ? `${util.formatNumber(diamond, true)} Diamond` : "";
  const foodText = food !== undefined ? `${util.formatNumber(food, true)} Food` : "";
  const xpText = xp !== undefined ? `${util.formatNumber(xp, true)} Experience` : "";
  const levelText =
    util.formatNumber(player.xp, true) +
    " / " +
    util.formatNumber(game.util.getLevelUpXp(player.level), true) +
    " Experience";

  return (
    <>
      {level !== undefined &&
        <InventoryItem
          emoji="⭐" count={level}
          onClick={levelOnClick || (() => util.showOtherInfo("level", levelText))}
        />
      }
      {xp !== undefined &&
        <InventoryItem
          emoji="⭐" count={xp}
          onClick={xpOnClick || (() => util.showOtherInfo("level", xpText))}
        />
      }
      {gold !== undefined &&
        <InventoryItem
          emoji="🪙" count={gold}
          onClick={goldOnClick || (() => util.showOtherInfo("gold", goldText))}
        />
      }
      {diamond !== undefined &&
        <InventoryItem
          emoji="💎" count={diamond}
          onClick={diamondOnClick || (() => util.showOtherInfo("diamond", diamondText))}
        />
      }
      {food !== undefined &&
        <InventoryItem
          emoji="🍏" count={food}
          onClick={foodOnClick || (() => util.showOtherInfo("food", foodText))}
        />
      }

      {items?.map((item, i) =>
        <InventoryItem
          key={i}
          src={assets.url(itemData[item.id].path)}
          stars={item && itemData[item.id].stars}
          count={item.count}
          onClick={itemsOnClick ? (() => itemsOnClick(item)) : (() => util.showItemInfo(item))}
        />
      )}
    </>
  )
}

export default ItemList