// Optimiza las imágenes originales (pesadas) para la web.
// Uso: node tools/optimize.js <logo-original.png> <carpeta-fotos-evento>
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const [logoSrc, photosDir] = process.argv.slice(2);
const OUT = path.join(__dirname, '..', 'src', 'assets', 'img');
fs.mkdirSync(path.join(OUT, 'brand'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'eventos'), { recursive: true });

async function logo() {
  const { data, info } = await sharp(logoSrc).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // color de marca: píxel del cuerpo del águila
  const px = (Math.round(width * 0.5) + Math.round(height * 0.31) * width) * 3;
  const brand = [data[px], data[px + 1], data[px + 2]];
  console.log('color de marca detectado: #' + brand.map(v => v.toString(16).padStart(2, '0')).join(''));
  const lumBrand = 0.299 * brand[0] + 0.587 * brand[1] + 0.114 * brand[2];

  const make = (rgb) => {
    const out = Buffer.alloc(width * height * 4);
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const a = Math.max(0, Math.min(255, ((255 - lum) / (255 - lumBrand)) * 255));
      out[j] = rgb[0]; out[j + 1] = rgb[1]; out[j + 2] = rgb[2]; out[j + 3] = Math.round(a);
    }
    return sharp(out, { raw: { width, height, channels: 4 } });
  };

  const trimmed = await make(brand).png().toBuffer();
  const box = await sharp(trimmed).trim({ threshold: 5 }).toBuffer({ resolveWithObject: true });
  const pad = Math.round(box.info.width * 0.02);
  const logoColor = await sharp(box.data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 720 }).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(path.join(OUT, 'brand', 'logo.png'), logoColor);

  const whiteRaw = await make([255, 255, 255]).png().toBuffer();
  const wbox = await sharp(whiteRaw).trim({ threshold: 5 }).toBuffer();
  await sharp(wbox).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } }).resize({ width: 720 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'brand', 'logo-blanco.png'));

  // solo el águila (sin el texto inferior) para favicon: recorte superior ~78 %
  const meta = await sharp(logoColor).metadata();
  const eagle = await sharp(logoColor).extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.78) }).toBuffer();
  const sq = 512;
  const eagleSq = await sharp(eagle).resize({ width: sq - 40, height: sq - 40, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp(eagleSq).resize(180, 180).png().toFile(path.join(OUT, 'brand', 'apple-touch-icon.png'));
  await sharp(eagleSq).resize(64, 64).png().toFile(path.join(OUT, 'brand', 'favicon.png'));

  // imagen para compartir en redes (1200x630)
  const lg = await sharp(logoColor).resize({ height: 520 }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#faf5ee' } })
    .composite([{ input: lg, gravity: 'center' }]).jpeg({ quality: 85 }).toFile(path.join(OUT, 'brand', 'og-image.jpg'));
  fs.writeFileSync(path.join(OUT, 'brand', 'color.txt'), '#' + brand.map(v => v.toString(16).padStart(2, '0')).join(''));
}

async function photos() {
  const files = fs.readdirSync(photosDir).filter(f => /\.jpe?g$/i.test(f)).sort();
  const thumbs = [];
  let n = 1;
  for (const f of files) {
    const id = 'conferencia-' + String(n).padStart(2, '0');
    const src = path.join(photosDir, f);
    const img = sharp(src, { failOn: 'none' }).rotate();
    await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, 'eventos', id + '.webp'));
    await img.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(OUT, 'eventos', id + '-sm.webp'));
    const meta = await sharp(path.join(OUT, 'eventos', id + '.webp')).metadata();
    thumbs.push({ id, file: f, w: meta.width, h: meta.height });
    console.log(id, '<-', f, meta.width + 'x' + meta.height);
    n++;
  }
  fs.writeFileSync(path.join(OUT, 'eventos', 'fotos.json'), JSON.stringify(thumbs, null, 2));
}

(async () => { await logo(); if (photosDir) await photos(); })().catch(e => { console.error(e); process.exit(1); });
