# Media Player Card

A polished, responsive Lovelace card for Home Assistant `media_player` entities. It adapts its controls to each entity's advertised capabilities, so the same card can be used with TVs, speakers, streaming players, Music Assistant, Spotify, and grouped players.

## Features

- Colorful now-playing layout with artwork, track/channel, artist, album, app, and player state when those attributes are available.
- Capability-aware transport controls: play/pause, previous/next, stop, and power.
- Volume slider and mute, shown only when supported by the selected player.
- Seek bar when the player exposes a duration and seek support.
- Optional advanced controls for source selection, shuffle, and repeat.
- Responsive styling, keyboard-accessible controls, reduced-motion support, and a configurable artwork toggle.
- No device IDs or entity names are hard-coded; configure any `media_player` entity in the card editor or YAML.

## Install with HACS

1. In Home Assistant, open **HACS → ⋮ → Custom repositories**.
2. Add `https://github.com/Liionboy/media-player-card` and choose **Dashboard** as the category.
3. Find **Media Player Card** in HACS and install it.
4. If HACS does not add the resource automatically, add `/hacsfiles/media-player-card/media-player-card.js` as a **JavaScript module** under **Settings → Dashboards → Resources**.
5. Refresh the browser and add the card to a dashboard.

## Configuration

The card editor lets you choose a `media_player`, set an optional title, and show or hide the artwork. YAML example:

```yaml
type: custom:media-player-card
entity: media_player.living_room_player
# title: Living Room
# show_artwork: true
```

Replace the example entity with any of your own `media_player` entities. Controls are shown only when the entity advertises the corresponding feature. In particular, source selection requires both `source_list` and the `SELECT_SOURCE` feature; seeking requires `SEEK` and a positive `media_duration`.

## Development

```sh
npm run check
```

The HACS asset is `dist/media-player-card.js`.

## License

MIT
