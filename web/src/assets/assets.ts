const _assets = import.meta.glob('@/assets/**/*.png', { eager: true, as: 'url' });

function url(path: string | null | undefined) {
  if (!path) return undefined;
  if (import.meta.env.DEV) return path;
  return _assets[path];
}

export const assets = {
  url,
}