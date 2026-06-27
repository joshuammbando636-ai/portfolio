// Live screenshot of a project's own URL via WordPress's free mShots
// service — a real "blueprint" of the work instead of a stock placeholder.
// First request per URL+size can return a still-rendering frame; it
// self-refreshes on reload once the snapshot finishes (cached ~12h after).
export function mshot(url: string, width = 1200, height = 750) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;
}
