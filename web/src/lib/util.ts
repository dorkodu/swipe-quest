export function wait<T>(
  start: () => Promise<T>,
  before: number = 100,
  after: number = 500
): () => Promise<T> {
  let out: T;

  return () => new Promise(async (resolve) => {
    let didBefore = false;
    let didAfter = false;
    let loaded = false;

    setTimeout(() => {
      if (loaded) resolve(out);
      didBefore = true;
    }, before);

    setTimeout(() => {
      if (loaded) resolve(out);
      didAfter = true;
    }, after);

    out = await start();

    if (!didBefore || didAfter) resolve(out);
    loaded = true;
  })
}

function formatNumber(number: number, long?: boolean) {
  number = Math.floor(number);
  if (long) return Intl.NumberFormat("en").format(number);
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
}

export const util = {
  formatNumber,
}