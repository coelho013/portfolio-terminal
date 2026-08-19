const IS_SMALL = window.innerWidth <= 768;

const BOX_W = IS_SMALL ? 30 : 50;
const TITLE_PAD = IS_SMALL ? 2 : 10;

function boxTop() {
  return "╔" + "═".repeat(BOX_W) + "╗";
}

function boxBottom() {
  return "╚" + "═".repeat(BOX_W) + "╝";
}

function boxDivider() {
  return "╠" + "═".repeat(BOX_W) + "╣";
}

function boxLine(text, pad) {
  const indent = pad === undefined ? TITLE_PAD : pad;
  const clipped = text.length > BOX_W - indent ? text.slice(0, BOX_W - indent) : text;
  const right = BOX_W - indent - clipped.length;
  return "║" + " ".repeat(indent) + clipped + " ".repeat(right) + "║";
}

function boxEmpty() {
  return "║" + " ".repeat(BOX_W) + "║";
}

function header(...titles) {
  return [boxTop(), ...titles.map((t) => boxLine(t)), boxBottom()];
}

function sep(len) {
  return "─".repeat(IS_SMALL ? BOX_W + 2 : len);
}

function link(label, url) {
  return IS_SMALL ? [`  - ${label}`, `    ${url}`] : [`  - ${label} → ${url}`];
}

function contact(label, value, width) {
  const padded = label + " ".repeat(Math.max(1, width - label.length));
  return IS_SMALL ? [`${label}`, `  ${value}`] : [`${padded}→ ${value}`];
}

function para(...lines) {
  return IS_SMALL ? [lines.join(" ")] : lines;
}

const FIT_W = BOX_W + 2;

function wrapLine(line, width) {
  if (line.length <= width) return [line];

  const lead = line.match(/^\s*/)[0];
  const isItem = /^[•\-→]/.test(line.trim());
  const cont = isItem ? lead + "  " : lead;
  const words = line.slice(lead.length).split(" ");
  const out = [];
  let cur = lead;

  for (const word of words) {
    const candidate = cur.trim().length === 0 ? cur + word : cur + " " + word;
    if (candidate.length > width && cur.trim().length > 0) {
      out.push(cur);
      cur = cont + word;
    } else {
      cur = candidate;
    }
  }

  if (cur.trim().length > 0) out.push(cur);
  return out;
}

function fitContent(text) {
  if (!IS_SMALL) return text;
  return text
    .split("\n")
    .reduce((acc, line) => acc.concat(wrapLine(line, FIT_W)), [])
    .join("\n");
}

function helpEntry(cmd, desc) {
  return IS_SMALL ? [`  ${cmd}`, `    ${desc}`] : [`  ${cmd.padEnd(20)}${desc}`];
}

function loadPref(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.indexOf(value) !== -1 ? value : fallback;
  } catch (e) {
    return fallback;
  }
}

function savePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return;
  }
}
