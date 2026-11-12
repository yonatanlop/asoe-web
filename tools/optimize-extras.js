// Imágenes extraídas de la presentación de ASOE (afiches, simposio, distinción).
// Uso: node tools/optimize-extras.js <carpeta ppt/media>
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const media = process.argv[2];
const out = path.join(__dirname, '..', 'src', 'assets', 'img');
fs.mkdirSync(path.join(out, 'historia'), { recursive: true });
fs.mkdirSync(path.join(out, 'eventos'), { recursive: true });

const jobs = [
  ['image12.jpg',  'eventos/afiche-panel-integracion-regional.webp', 900],
  ['image15.jpg',  'eventos/afiche-rueda-contactos-comerciales.webp', 900],
  ['image7.jpg',   'eventos/simposio-grupo.webp', 1400],
  ['image8.jpg',   'eventos/simposio-venezuela-1.webp', 1200],
  ['image9.jpg',   'eventos/simposio-bolivia.webp', 1200],
  ['image10.jpg',  'eventos/simposio-venezuela-2.webp', 1200],
  ['image5.jpeg',  'historia/comunidad-asoe.webp', 1400],
  ['image6.png',   'historia/distincion-fcea-2023.webp', 1000],
];
(async () => {
  for (const [src, dst, w] of jobs) {
    await sharp(path.join(media, src)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, dst));
    console.log('ok', dst);
  }
  // fotos de la conferencia donde aparecen estudiantes en primer plano: no se publican
  for (const n of ['02', '03', '05']) for (const s of ['', '-sm']) {
    const f = path.join(out, 'eventos', `conferencia-${n}${s}.webp`);
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }
})();
