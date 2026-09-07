import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = path.resolve(process.argv[2] ?? path.join(project, '../HispaniaMMO'));
const data = JSON.parse(await fs.readFile(path.join(project, 'app/data/gamedata.json'), 'utf8'));
const directory = path.join(project, 'public/images/game-icons');
const manifest = { skills: {}, items: {}, weapons: {} };
await fs.mkdir(directory, { recursive: true });

// Source of truth: Skill_*.asset / AbilitiesAtlas.png.meta and
// Client/Runtime/UI/HispaniaSkillsPanelView.cs (ResolveIcon, IconUv).
const abilityAtlas = await sharp(path.join(game, 'Assets/HispaniaMMO/GameData/Resources/HispaniaMMO/HudArt/AbilitiesAtlas.png'))
  .resize(384, 256, { fit: 'fill' }).png().toBuffer();

// Source of truth: Client/Runtime/World/HispaniaInventoryPresenter.cs
// (IconFor, AtlasRect). Current item/weapon definitions have no individual icon.
// Resize the entire 1254px atlas before extracting: its 4×4 cells have half-pixel
// boundaries, so this preserves the game's normalized UV coordinates.
const inventoryAtlas = await sharp(path.join(game, 'Assets/HispaniaMMO/Client/Art/UI/Inventory/InventoryIconAtlas.png'))
  .resize(512, 512, { fit: 'fill' }).png().toBuffer();

const exported = new Set();
async function exportCell(atlas, columns, index, filename) {
  if (!exported.has(filename)) {
    await sharp(atlas).extract({ left: (index % columns) * 128, top: Math.floor(index / columns) * 128, width: 128, height: 128 })
      .webp({ lossless: true }).toFile(path.join(directory, filename));
    exported.add(filename);
  }
  return `/images/game-icons/${filename}`;
}

for (const skill of data.skills) {
  if (skill.id < 2001 || skill.id > 2005) throw new Error(`Review the game icon for skill ${skill.id} before exporting.`);
  manifest.skills[skill.slug] = await exportCell(abilityAtlas, 3, skill.id - 2001, `ability-${skill.id}.webp`);
}

// Explicit IDs retain current runtime assignments without guessing the icon for
// newly exported content. Add new entries only after checking their game source.
const inventoryCells = {
  1001: 5, 1002: 5, 1003: 5, 1004: 5, 1005: 5,
  1101: 13, 1102: 13, 1103: 13, 1104: 13,
  1201: 10, 1301: 14, 1302: 14, 1303: 14,
};
for (const kind of ['items', 'weapons']) {
  for (const entry of data[kind]) {
    const index = inventoryCells[entry.id];
    if (index === undefined) throw new Error(`Review the game icon for item ${entry.id} before exporting.`);
    manifest[kind][entry.slug] = await exportCell(inventoryAtlas, 4, index, `inventory-${index}.webp`);
  }
}
await fs.writeFile(path.join(project, 'app/data/game-icons.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Exported ${exported.size} original game icons for ${Object.values(manifest).reduce((n, group) => n + Object.keys(group).length, 0)} catalog records.`);
