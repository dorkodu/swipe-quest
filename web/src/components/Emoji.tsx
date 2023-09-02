import { emoji as emojiCSS } from "../styles/css";
import twemoji from "twemoji";

function Emoji({ emoji, ...props }: React.ComponentPropsWithoutRef<"img"> & { emoji: string }) {
  const element = document.createElement("div");
  element.innerHTML = twemoji.parse(
    emoji,
    { ext: ".svg", folder: "svg", base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/" }
  );
  const src = (element.firstChild as HTMLImageElement).src;

  return (
    <img
      src={src}
      style={emojiCSS}
      alt={emoji}
      draggable={false}
      {...props}
    />
  )
}

export default Emoji