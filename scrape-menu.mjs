import fs from 'node:fs';

const html = fs.readFileSync('menu.html', 'utf8');
const re = /alt="([^"]+)"[^>]*src="(https:\/\/pos\.salool\.com[^"]+)"/g;
let m;
const marks = [];
while ((m = re.exec(html))) marks.push({ name: m[1], img: m[2], start: m.index });

const items = marks.map((mark, i) => {
  const next = marks[i + 1] ? marks[i + 1].start : mark.start + 3400;
  const text = html
    .slice(mark.start, next)
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<[^>]+>/g, '|')
    .replace(/\|+/g, '|')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'");
  const parts = text.split('|').map((p) => p.trim()).filter(Boolean);
  const idx = parts.lastIndexOf(mark.name);
  const category = idx > 0 ? parts[idx - 1] : '';
  const badge = parts[idx - 2] && /^(Bestseller|New|Popular)$/.test(parts[idx - 2]) ? parts[idx - 2] : '';
  const tail = parts.slice(idx + 1);
  const sizes = [];
  for (let k = 0; k < tail.length; k += 1) {
    if (/^(Small|Medium|Large)$/.test(tail[k])) {
      const price = tail.slice(k + 1, k + 4).find((t) => /^\d+\.\d{2}$/.test(t));
      if (price) sizes.push({ size: tail[k], price: Number(price) });
    }
  }
  const single = sizes.length
    ? null
    : (tail.map((t) => t.replace(/^\$/, '')).find((t) => /^\d+\.\d{2}$/.test(t)) || null);
  return {
    name: mark.name,
    category,
    badge,
    sizes,
    price: single ? Number(single) : null,
    img: mark.img,
  };
});

const byName = new Map();
for (const it of items) if (!byName.has(it.name)) byName.set(it.name, it);
const unique = [...byName.values()];

console.log('cards:', items.length, 'unique:', unique.length);
console.log('categories:', JSON.stringify([...new Set(unique.map((i) => i.category))]));
console.log('with sizes:', unique.filter((i) => i.sizes.length).length, 'single price:', unique.filter((i) => i.price).length);
fs.writeFileSync('menu-clean.json', JSON.stringify(unique, null, 1));
console.log(JSON.stringify(unique.slice(0, 4), null, 1));
