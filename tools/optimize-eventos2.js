// Fotos y afiches de eventos adicionales (carpeta aventosasoe, no versionada).
// Uso: node tools/optimize-eventos2.js <carpeta-aventosasoe>
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = process.argv[2];
const OUT = path.join(__dirname, '..', 'src', 'assets', 'img', 'eventos');
const dir = (prefix) => fs.readdirSync(root).find((d) => d.startsWith(prefix));
const D = {
  exal: dir('Exaltaci'), p1: dir('Panel 1'), p2: dir('Panel 2'), sem: dir('Participacion'), vid: dir('Video'),
};
const P = (k, f) => path.join(root, D[k], 'WhatsApp Image 2026-11-12 at ' + f + '.jpeg');

// [carpeta, archivo, salida, ancho, miniatura(640)?]
const jobs = [
  ['sem', '1.27.17 PM', 'afiche-seminario-smith-keynes', 1000, false],
  ['sem', '1.27.36 PM', 'afiche-foro-rectoria', 1200, false],
  ['sem', '1.31.10 PM', 'seminario-egresados-1', 1600, true],
  ['sem', '1.31.10 PM (1)', 'seminario-egresados-2', 1600, true],
  ['exal', '1.31.31 PM', 'exaltacion-1', 1600, true],
  ['exal', '1.31.32 PM', 'exaltacion-2', 1600, true],
  ['exal', '1.31.32 PM (1)', 'exaltacion-3', 1600, true],
  ['exal', '1.31.49 PM', 'exaltacion-4', 1600, true],
  ['exal', '1.31.31 PM (1)', 'exaltacion-5', 1200, true],
  ['p1', '1.31.50 PM (3)', 'panel1-1', 1600, true],
  ['p1', '1.31.50 PM (4)', 'panel1-2', 1600, true],
  ['p1', '1.31.50 PM (5)', 'panel1-3', 1600, true],
  ['p2', '1.31.49 PM (1)', 'panel2-1', 1600, true],
  ['p2', '1.31.49 PM (3)', 'panel2-2', 1600, true],
  ['vid', '1.42.01 PM', 'conferencia-14', 1600, true],
  ['vid', '1.42.01 PM (2)', 'conferencia-15', 1600, true],
];
(async () => {
  const res = {};
  for (const [k, f, name, w, sm] of jobs) {
    const src = P(k, f);
    if (!fs.existsSync(src)) { console.error('FALTA', src); continue; }
    const img = sharp(src, { failOn: 'none' }).rotate();
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, name + '.webp'));
    if (sm) await img.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(OUT, name + '-sm.webp'));
    const m = await sharp(path.join(OUT, name + '.webp')).metadata();
    console.log(name, m.width + 'x' + m.height);
  }
  // video corto de la exaltación (se copia tal cual)
  const vf = fs.readdirSync(path.join(root, D.exal)).find((x) => /\.mp4$/i.test(x));
  if (vf) fs.copyFileSync(path.join(root, D.exal, vf), path.join(OUT, 'exaltacion-video.mp4'));
})();
