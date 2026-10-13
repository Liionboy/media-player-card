const CARD_TYPE = "media-player-card";

const FEATURE = Object.freeze({
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  REPEAT_SET: 262144,
});

const SCHEMA = [
  { name: "entity", required: true, selector: { entity: { domain: ["media_player"] } } },
  { name: "title", selector: { text: {} } },
  { name: "show_artwork", selector: { boolean: {} } },
];
const LABELS = { entity: "Media player", title: "Card title", show_artwork: "Show artwork" };

const STYLE = `
  :host{display:block;color:var(--primary-text-color)}
  ha-card{overflow:hidden;border:1px solid color-mix(in srgb,var(--divider-color) 55%,transparent);border-radius:26px;background:var(--ha-card-background,var(--card-background-color,#fff));box-shadow:var(--ha-card-box-shadow,0 14px 38px rgba(21,28,54,.13))}
  .shell{--accent:#8368ef;position:relative;isolation:isolate;overflow:hidden;padding:clamp(17px,3.6vw,25px);background:radial-gradient(ellipse at 0% 0%,rgba(127,106,255,.15),transparent 43%),radial-gradient(ellipse at 100% 100%,rgba(47,194,192,.13),transparent 48%),var(--ha-card-background,var(--card-background-color,#fff))}
  .shell:before{position:absolute;z-index:-1;inset:0;background:linear-gradient(125deg,rgba(129,105,239,.045),transparent 42%,rgba(51,190,188,.05));content:"";pointer-events:none}
  .topline{display:flex;align-items:center;justify-content:space-between;gap:12px}.brand{display:flex;align-items:center;gap:11px;min-width:0}.brand-icon{display:grid;place-items:center;width:42px;height:42px;flex:none;border:1px solid rgba(255,255,255,.65);border-radius:15px;background:linear-gradient(145deg,#8e7aff,#626be5 58%,#40b9ba);box-shadow:0 8px 20px rgba(101,104,218,.22);color:#fff}.brand-icon ha-icon{--mdc-icon-size:22px}.brand-copy{min-width:0}.eyebrow{color:var(--accent);font-size:9px;font-weight:850;letter-spacing:.17em;text-transform:uppercase}.player-name{margin:4px 0 0;overflow:hidden;font-size:clamp(17px,2.8vw,21px);font-weight:790;letter-spacing:-.035em;text-overflow:ellipsis;white-space:nowrap}
  .state-pill{display:flex;align-items:center;gap:7px;flex:none;padding:7px 10px;border:1px solid rgba(112,104,183,.15);border-radius:999px;background:rgba(129,117,209,.08);color:var(--secondary-text-color);font-size:9px;font-weight:820;letter-spacing:.08em;text-transform:uppercase}.state-dot{width:7px;height:7px;border-radius:50%;background:#9aa1b2}.playing .state-pill{border-color:rgba(34,174,151,.2);background:rgba(34,174,151,.09);color:#168b7b}.playing .state-dot{background:#1cb69c;box-shadow:0 0 0 4px rgba(28,182,156,.13)}.paused .state-dot{background:#e5a84c}.off .state-dot{background:#a4aab6}.unavailable .state-pill{color:var(--error-color,#b94b55)}.unavailable .state-dot{background:var(--error-color,#c84f58)}
  .now-playing{display:grid;grid-template-columns:clamp(76px,18vw,104px) minmax(0,1fr);align-items:center;gap:16px;margin-top:22px}.now-playing.no-artwork{grid-template-columns:minmax(0,1fr)}.artwork{position:relative;display:grid;place-items:center;aspect-ratio:1;overflow:hidden;border:1px solid rgba(255,255,255,.72);border-radius:21px;background:linear-gradient(145deg,rgba(138,119,245,.18),rgba(56,192,188,.18));box-shadow:0 8px 24px rgba(46,54,103,.12)}.artwork img{width:100%;height:100%;object-fit:cover}.artwork ha-icon{color:var(--accent);--mdc-icon-size:38px}.track-copy{min-width:0}.track-kicker{margin-bottom:5px;color:var(--accent);font-size:9px;font-weight:850;letter-spacing:.14em;text-transform:uppercase}.track-title{overflow:hidden;font-size:clamp(18px,3.6vw,25px);font-weight:810;letter-spacing:-.045em;line-height:1.12;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.track-subtitle{margin-top:7px;overflow:hidden;color:var(--secondary-text-color);font-size:13px;font-weight:570;text-overflow:ellipsis;white-space:nowrap}.album{margin-top:4px;overflow:hidden;color:var(--secondary-text-color);font-size:11px;opacity:.76;text-overflow:ellipsis;white-space:nowrap}
  .progress-wrap{margin-top:19px}.progress-line{display:flex;align-items:center;gap:9px;color:var(--secondary-text-color);font-size:9px;font-variant-numeric:tabular-nums}.progress-line input{flex:1;min-width:0}.range{height:5px;margin:0;appearance:none;border:0;border-radius:999px;background:linear-gradient(90deg,var(--accent) var(--range-progress,0%),color-mix(in srgb,var(--secondary-text-color) 18%,transparent) var(--range-progress,0%));cursor:pointer}.range::-webkit-slider-thumb{width:13px;height:13px;appearance:none;border:2px solid #fff;border-radius:50%;background:var(--accent);box-shadow:0 1px 5px rgba(30,34,65,.26)}.range::-moz-range-thumb{width:10px;height:10px;border:2px solid #fff;border-radius:50%;background:var(--accent);box-shadow:0 1px 5px rgba(30,34,65,.26)}
  .controls{display:flex;align-items:center;justify-content:center;gap:clamp(9px,3vw,17px);margin-top:17px}.control{display:grid;place-items:center;width:39px;height:39px;flex:none;border:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent);border-radius:14px;background:color-mix(in srgb,var(--card-background-color,#fff) 86%,var(--accent));color:var(--primary-text-color);cursor:pointer;transition:transform .16s ease,box-shadow .16s ease,background .16s ease}.control ha-icon{--mdc-icon-size:20px}.control:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 15px rgba(70,69,130,.15)}.control:focus-visible,select:focus-visible,input:focus-visible,.more:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.control:disabled{opacity:.42;cursor:not-allowed}.control.primary{width:49px;height:49px;border:0;border-radius:17px;background:linear-gradient(145deg,#8d78f5,#6c6fe5 62%,#48b8bc);box-shadow:0 8px 18px rgba(111,103,222,.25);color:white}.control.primary ha-icon{--mdc-icon-size:24px}.control.power{margin-left:auto;color:var(--accent)}.volume-row{display:flex;align-items:center;gap:11px;margin-top:17px;padding:11px 12px;border:1px solid color-mix(in srgb,var(--divider-color) 52%,transparent);border-radius:15px;background:color-mix(in srgb,var(--card-background-color,#fff) 87%,var(--accent));}.volume-row ha-icon{flex:none;color:var(--secondary-text-color);--mdc-icon-size:18px}.volume-row input{flex:1;min-width:0}.volume-value{width:34px;color:var(--secondary-text-color);font-size:10px;font-variant-numeric:tabular-nums;text-align:right}.volume-row .control{width:31px;height:31px;border-radius:11px}.volume-row .control ha-icon{color:inherit;--mdc-icon-size:17px}
  .more-row{display:flex;justify-content:center;margin-top:11px}.more{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border:0;border-radius:9px;background:transparent;color:var(--secondary-text-color);font:inherit;font-size:10px;font-weight:700;cursor:pointer}.more ha-icon{--mdc-icon-size:15px}.advanced{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:12px}.field{display:flex;flex-direction:column;gap:6px;min-width:0;color:var(--secondary-text-color);font-size:9px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.field select{width:100%;min-width:0;padding:9px 10px;border:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent);border-radius:12px;background:var(--card-background-color,#fff);color:var(--primary-text-color);font:inherit;font-size:12px;font-weight:600}.toggle-control{display:flex;align-items:center;gap:8px;min-height:37px;padding:0 11px;border:1px solid color-mix(in srgb,var(--divider-color) 65%,transparent);border-radius:12px;background:color-mix(in srgb,var(--card-background-color,#fff) 88%,var(--accent));color:var(--primary-text-color);font:inherit;font-size:11px;font-weight:700;cursor:pointer}.toggle-control[aria-pressed="true"]{border-color:color-mix(in srgb,var(--accent) 44%,transparent);background:color-mix(in srgb,var(--accent) 12%,var(--card-background-color,#fff));color:var(--accent)}.toggle-control ha-icon{--mdc-icon-size:17px}
  .off-state,.empty-state{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:15px;border:1px solid color-mix(in srgb,var(--divider-color) 55%,transparent);border-radius:18px;background:color-mix(in srgb,var(--card-background-color,#fff) 88%,var(--accent))}.off-copy{min-width:0}.off-title{font-size:14px;font-weight:760}.off-hint{margin-top:4px;color:var(--secondary-text-color);font-size:11px}.turn-on{display:flex;align-items:center;gap:7px;padding:10px 13px;border:0;border-radius:13px;background:linear-gradient(145deg,#8d78f5,#626fe3 70%,#42b5b9);box-shadow:0 5px 13px rgba(102,100,211,.22);color:#fff;font:inherit;font-size:11px;font-weight:800;white-space:nowrap;cursor:pointer}.turn-on ha-icon{--mdc-icon-size:17px}.error{margin-top:10px;color:var(--error-color,#bd4e4e);font-size:11px}.setup{padding:20px;color:var(--secondary-text-color);font:inherit;font-size:13px;font-weight:500}
  @media(max-width:390px){.shell{padding:15px}.now-playing{grid-template-columns:72px minmax(0,1fr);gap:12px;margin-top:18px}.artwork{border-radius:17px}.controls{gap:9px}.control{width:36px;height:36px}.control.primary{width:46px;height:46px}.volume-row{gap:8px;padding:9px}.advanced{grid-template-columns:1fr 1fr}}
  @media(hover:hover){.turn-on:hover{filter:brightness(1.06);transform:translateY(-1px)}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;scroll-behavior:auto!important}}
`;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function featureSupported(entity, flag) {
  return (Number(entity?.attributes?.supported_features) & flag) === flag;
}

function numberOrNull(value) {
  const number = Number(value);
  return value !== null && value !== undefined && Number.isFinite(number) ? number : null;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const remainder = String(whole % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}` : `${minutes}:${remainder}`;
}

function safeImageUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  const url = value.trim();
  return url.startsWith("/") || /^https?:\/\//i.test(url) ? url : "";
}

class MediaPlayerCard extends HTMLElement {
  static getConfigForm() {
    return { schema: SCHEMA, computeLabel: (field) => LABELS[field.name] || field.name };
  }

  static getStubConfig() { return { entity: "media_player.example", show_artwork: true }; }

  setConfig(config) {
    if (!config || typeof config !== "object") throw new Error("Provide a valid Media Player Card configuration.");
    this._config = { show_artwork: true, ...config };
    this._entitySignature = null;
    this._root ??= this.attachShadow({ mode: "open" });
    if (!this._listenersAttached) {
      this._root.addEventListener("click", (event) => this._handleClick(event));
      this._root.addEventListener("change", (event) => this._handleChange(event));
      this._root.addEventListener("input", (event) => this._handleInput(event));
      this._listenersAttached = true;
    }
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    const signature = JSON.stringify(this.entity || null);
    if (signature !== this._entitySignature) {
      this._entitySignature = signature;
      this.render();
    }
  }

  getCardSize() { return 4; }
  getGridOptions() { return { rows: 4, columns: 6, min_rows: 3, max_rows: 7 }; }

  get entity() { return this._hass?.states?.[this._config?.entity]; }

  async _call(service, data = {}) {
    const entityId = this._config?.entity;
    if (!entityId || !this._hass || this.entity?.state === "unavailable") return;
    this._actionError = null;
    try {
      await this._hass.callService("media_player", service, { entity_id: entityId, ...data });
    } catch {
      this._actionError = "Could not send the command. Check Home Assistant and this player.";
      this.render();
    }
  }

  _handleClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const entity = this.entity;
    if (action === "expand") {
      this._expanded = !this._expanded;
      this.render();
      return;
    }
    if (!entity) return;
    const attrs = entity.attributes || {};
    const actions = {
      power: () => this._call(entity.state === "off" ? "turn_on" : "turn_off"),
      play: () => this._call("media_play"),
      pause: () => this._call("media_pause"),
      previous: () => this._call("media_previous_track"),
      next: () => this._call("media_next_track"),
      stop: () => this._call("media_stop"),
      stop: () => this._call("media_stop"),
      mute: () => this._call("volume_mute", { is_volume_muted: !attrs.is_volume_muted }),
      shuffle: () => this._call("shuffle_set", { shuffle: !attrs.shuffle }),
      repeat: () => {
        const modes = ["off", "all", "one"];
        const index = modes.indexOf(attrs.repeat);
        return this._call("repeat_set", { repeat: modes[(index + 1) % modes.length] });
      },
    };
    actions[action]?.();
  }

  _handleChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    if (target.dataset.action === "volume") {
      this._call("volume_set", { volume_level: Number(target.value) / 100 });
    } else if (target.dataset.action === "seek") {
      this._call("media_seek", { seek_position: Number(target.value) });
    } else if (target.dataset.action === "source") {
      this._call("select_source", { source: target.value });
    }
  }

  _handleInput(event) {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === "range") {
      const min = Number(target.min || 0);
      const max = Number(target.max || 100);
      const percent = max > min ? ((Number(target.value) - min) / (max - min)) * 100 : 0;
      target.style.setProperty("--range-progress", `${percent}%`);
      if (target.dataset.action === "volume") {
        const value = this._root.querySelector("[data-volume-value]");
        if (value) value.textContent = `${Math.round(Number(target.value))}%`;
      }
    }
  }

  _button(action, icon, label, { primary = false, pressed = null, disabled = false } = {}) {
    const classes = `control${primary ? " primary" : ""}${action === "power" ? " power" : ""}`;
    const pressedAttr = pressed === null ? "" : ` aria-pressed="${pressed}"`;
    return `<button class="${classes}" type="button" data-action="${action}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}"${pressedAttr}${disabled ? " disabled" : ""}><ha-icon icon="${escapeHtml(icon)}"></ha-icon></button>`;
  }

  _timePosition(entity) {
    const attrs = entity.attributes || {};
    let position = numberOrNull(attrs.media_position) ?? 0;
    const duration = numberOrNull(attrs.media_duration);
    const updated = attrs.media_position_updated_at ? Date.parse(attrs.media_position_updated_at) : NaN;
    if (entity.state === "playing" && Number.isFinite(updated)) position += Math.max(0, (Date.now() - updated) / 1000);
    return { position: duration ? Math.min(position, duration) : position, duration };
  }

  _renderAdvanced(entity, disabled) {
    const attrs = entity.attributes || {};
    const supportsSource = featureSupported(entity, FEATURE.SELECT_SOURCE) && Array.isArray(attrs.source_list) && attrs.source_list.length > 0;
    const supportsShuffle = featureSupported(entity, FEATURE.SHUFFLE_SET);
    const supportsRepeat = featureSupported(entity, FEATURE.REPEAT_SET);
    if (!supportsSource && !supportsShuffle && !supportsRepeat) return "";
    const expandButton = `<div class="more-row"><button class="more" type="button" data-action="expand" aria-expanded="${Boolean(this._expanded)}"><ha-icon icon="${this._expanded ? "mdi:chevron-up" : "mdi:tune-variant"}"></ha-icon>${this._expanded ? "Fewer controls" : "More controls"}</button></div>`;
    if (!this._expanded) return expandButton;
    const source = supportsSource ? `<label class="field">Input source<select data-action="source"${disabled ? " disabled" : ""}>${attrs.source_list.map((item) => `<option value="${escapeHtml(item)}"${item === attrs.source ? " selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select></label>` : "";
    const shuffle = supportsShuffle ? `<button class="toggle-control" type="button" data-action="shuffle" aria-pressed="${Boolean(attrs.shuffle)}"${disabled ? " disabled" : ""}><ha-icon icon="mdi:shuffle"></ha-icon>Shuffle ${attrs.shuffle ? "On" : "Off"}</button>` : "";
    const repeatLabel = { off: "Off", all: "All", one: "One" }[attrs.repeat] || "Off";
    const repeat = supportsRepeat ? `<button class="toggle-control" type="button" data-action="repeat" aria-label="Repeat ${repeatLabel}. Activate to change mode" title="Change repeat mode"><ha-icon icon="${attrs.repeat === "one" ? "mdi:repeat-once" : "mdi:repeat"}"></ha-icon>Repeat ${repeatLabel}</button>` : "";
    return `${expandButton}<div class="advanced">${source}${shuffle}${repeat}</div>`;
  }

  render() {
    if (!this._root || !this._config) return;
    const entityId = this._config.entity;
    if (!entityId) {
      this._root.innerHTML = `<style>${STYLE}</style><ha-card><div class="setup">Choose a media player in the card editor to get started.</div></ha-card>`;
      return;
    }
    const entity = this.entity;
    if (!entity) {
      this._root.innerHTML = `<style>${STYLE}</style><ha-card><div class="setup">Waiting for <strong>${escapeHtml(entityId)}</strong> to become available in Home Assistant.</div></ha-card>`;
      return;
    }
    const attrs = entity.attributes || {};
    const state = String(entity.state || "unknown").toLowerCase();
    const unavailable = ["unavailable", "unknown"].includes(state);
    const off = state === "off";
    const isPlaying = state === "playing";
    const stateText = { playing: "Playing", paused: "Paused", buffering: "Buffering", idle: "Ready", on: "On", off: "Off", unavailable: "Unavailable", unknown: "Unknown" }[state] || state.replaceAll("_", " ");
    const cardTitle = this._config.title || attrs.friendly_name || entityId;
    const deviceClass = attrs.device_class || "media player";
    const showArtwork = this._config.show_artwork !== false;
    const image = showArtwork ? safeImageUrl(attrs.entity_picture_local || attrs.entity_picture) : "";
    const mediaTitle = attrs.media_title || attrs.media_channel || attrs.app_name || attrs.app_id || (state === "idle" ? "Ready to play" : "No media details");
    const subtitle = [attrs.media_artist, attrs.media_series_title, attrs.media_album_artist].find((item) => typeof item === "string" && item.trim()) || attrs.media_episode || attrs.app_name || "";
    const album = [attrs.media_album_name, attrs.media_playlist, attrs.source].find((item) => typeof item === "string" && item.trim()) || "";
    const playerClass = `shell ${isPlaying ? "playing" : ""} ${state === "paused" ? "paused" : ""} ${off ? "off" : ""} ${unavailable ? "unavailable" : ""}`;
    const statusClass = state === "playing" ? "On air" : stateText;
    const art = image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : `<ha-icon icon="${deviceClass === "tv" ? "mdi:television" : deviceClass === "speaker" ? "mdi:speaker" : "mdi:play-circle-outline"}"></ha-icon>`;
    let body;
    if (unavailable) {
      body = `<div class="empty-state"><div class="off-copy"><div class="off-title">Player unavailable</div><div class="off-hint">Home Assistant cannot currently reach this device.</div></div></div>`;
    } else if (off) {
      const power = featureSupported(entity, FEATURE.TURN_ON) ? `<button class="turn-on" type="button" data-action="power"><ha-icon icon="mdi:power"></ha-icon>Turn on</button>` : "";
      body = `<div class="off-state"><div class="off-copy"><div class="off-title">${deviceClass === "tv" ? "Ready when you are" : "Player is off"}</div><div class="off-hint">${deviceClass === "tv" ? "Turn it on to see playback controls." : ""}</div></div>${power}</div>`;
    } else {
      const times = this._timePosition(entity);
      const showProgress = featureSupported(entity, FEATURE.SEEK) && times.duration > 0;
      const progress = showProgress ? Math.max(0, Math.min(100, (times.position / times.duration) * 100)) : 0;
      const progressMarkup = showProgress ? `<div class="progress-wrap"><div class="progress-line"><span data-position>${formatTime(times.position)}</span><input class="range" type="range" min="0" max="${times.duration}" step="1" value="${times.position}" style="--range-progress:${progress}%" data-action="seek" aria-label="Playback position"><span>${formatTime(times.duration)}</span></div></div>` : "";
      const controls = [];
      if (featureSupported(entity, FEATURE.PREVIOUS_TRACK)) controls.push(this._button("previous", "mdi:skip-previous", "Previous track", { disabled: unavailable }));
      if (state === "playing" && featureSupported(entity, FEATURE.PAUSE)) controls.push(this._button("pause", "mdi:pause", "Pause", { primary: true }));
      else if (state !== "playing" && featureSupported(entity, FEATURE.PLAY)) controls.push(this._button("play", "mdi:play", "Play", { primary: true }));
      if (featureSupported(entity, FEATURE.NEXT_TRACK)) controls.push(this._button("next", "mdi:skip-next", "Next track", { disabled: unavailable }));
      if (featureSupported(entity, FEATURE.TURN_OFF)) controls.push(this._button("power", "mdi:power", "Turn off"));
      const transport = controls.length ? `<div class="controls">${controls.join("")}</div>` : "";
      const volumeLevel = numberOrNull(attrs.volume_level);
      const volumePercent = volumeLevel === null ? 0 : Math.round(Math.max(0, Math.min(1, volumeLevel)) * 100);
      const hasVolume = featureSupported(entity, FEATURE.VOLUME_SET) && volumeLevel !== null;
      const hasMute = featureSupported(entity, FEATURE.VOLUME_MUTE);
      const volume = hasVolume || hasMute ? `<div class="volume-row"><ha-icon icon="${attrs.is_volume_muted ? "mdi:volume-mute" : "mdi:volume-high"}"></ha-icon>${hasVolume ? `<input class="range" type="range" min="0" max="100" step="1" value="${volumePercent}" style="--range-progress:${volumePercent}%" data-action="volume" aria-label="Volume"><span class="volume-value" data-volume-value>${volumePercent}%</span>` : ""}${hasMute ? this._button("mute", attrs.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high", attrs.is_volume_muted ? "Unmute" : "Mute", { pressed: Boolean(attrs.is_volume_muted) }) : ""}</div>` : "";
      const stop = featureSupported(entity, FEATURE.STOP) && ["playing", "paused", "buffering"].includes(state) ? `<div class="more-row"><button class="more" type="button" data-action="stop"><ha-icon icon="mdi:stop"></ha-icon>Stop playback</button></div>` : "";
      body = `<div class="now-playing${showArtwork ? "" : " no-artwork"}">${showArtwork ? `<div class="artwork">${art}</div>` : ""}<div class="track-copy"><div class="track-kicker">${escapeHtml(deviceClass)} · ${escapeHtml(stateText)}</div><div class="track-title">${escapeHtml(mediaTitle)}</div>${subtitle ? `<div class="track-subtitle">${escapeHtml(subtitle)}</div>` : ""}${album ? `<div class="album">${escapeHtml(album)}</div>` : ""}</div></div>${progressMarkup}${transport}${volume}${this._renderAdvanced(entity, unavailable)}${stop}`;
    }
    const stateToken = state === "playing" ? "playing" : state === "paused" ? "paused" : off ? "off" : unavailable ? "unavailable" : "";
    this._root.innerHTML = `<style>${STYLE}</style><ha-card><div class="${playerClass}"><header class="topline"><div class="brand"><span class="brand-icon"><ha-icon icon="${deviceClass === "tv" ? "mdi:television-play" : "mdi:music-note-eighth"}"></ha-icon></span><div class="brand-copy"><div class="eyebrow">${isPlaying ? "Now playing" : "Media player"}</div><h2 class="player-name">${escapeHtml(cardTitle)}</h2></div></div><span class="state-pill ${stateToken}"><span class="state-dot"></span>${escapeHtml(statusClass)}</span></header>${body}${this._actionError ? `<div class="error" role="alert">${escapeHtml(this._actionError)}</div>` : ""}</div></ha-card>`;
  }
}

if (!customElements.get(CARD_TYPE)) customElements.define(CARD_TYPE, MediaPlayerCard);

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({ type: CARD_TYPE, name: "Media Player Card", description: "A colorful, capability-aware Home Assistant media player card.", preview: true, documentationURL: "https://github.com/Liionboy/media-player-card" });
}

console.info("%c MEDIA-PLAYER-CARD %c v1.0.0 ", "color:#fff;background:#756ce5;font-weight:bold", "color:#756ce5;background:#eef0ff;font-weight:bold");
