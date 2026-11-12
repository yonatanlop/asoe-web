// Genera el sitio estático en /dist a partir de /src.
//   npm run build               -> versión de producción
//   PREVIEW=1 npm run build     -> versión preliminar (noindex + aviso, sin sitemap)
const fs = require('fs');
const path = require('path');
const c = require('../src/data/content.js');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const PREVIEW = process.env.PREVIEW === '1';
const { site } = c;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const badge = (on) => (PREVIEW && on ? ' <span class="badge">Por confirmar</span>' : '');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- componentes ----------
const picture = (im, { sizes = '100vw', lazy = true, cls = '' } = {}) =>
  `<img src="${im.src}" alt="${esc(im.alt)}" width="${im.w}" height="${im.h}" ${lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'} sizes="${sizes}"${cls ? ` class="${cls}"` : ''}>`;

const header = (current) => `
<a class="skip" href="#contenido">Saltar al contenido</a>
${PREVIEW ? '<div class="preview-bar" role="note">Versión preliminar para revisión: el contenido puede cambiar antes de publicarse.</div>' : ''}
<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="index.html" aria-label="${esc(site.nombre)}, inicio">
      <img src="assets/img/brand/apple-touch-icon.png" alt="" width="48" height="48">
      <span class="brand-text"><strong>${site.sigla}</strong><small>Economistas de la UPTC</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="menu"><span class="sr">Menú</span><i aria-hidden="true"></i></button>
    <nav id="menu" class="nav" aria-label="Principal">
      <ul>
        ${c.nav.map((n) => `<li><a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.texto}</a></li>`).join('\n        ')}
      </ul>
    </nav>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="wrap foot-grid">
    <div>
      <img src="assets/img/brand/logo-blanco.png" alt="${esc(site.nombre)}" width="110" height="170" loading="lazy">
    </div>
    <div>
      <h2>${esc(site.nombre)}</h2>
      <p>Organización gremial sin ánimo de lucro, fundada en ${site.anioFundacion}.</p>
      <address>
        ${esc(site.direccion)}<br>
        <a href="tel:${site.telefonoLink}">${esc(site.telefono)}</a>
        ${site.email ? `<br><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}
      </address>
    </div>
    <nav aria-label="Pie de página">
      <h2>Explora</h2>
      <ul>${c.nav.map((n) => `<li><a href="${n.href}">${n.texto}</a></li>`).join('')}</ul>
    </nav>
  </div>
  <div class="wrap legal">© ${new Date().getFullYear()} ${esc(site.nombre)}. Todos los derechos reservados.</div>
</footer>`;

const pageHero = (titulo, lead) => `
<section class="page-hero">
  <div class="wrap">
    <h1>${titulo}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

const video = (e) => `
<div class="video" data-yt="${e.youtubeId}">
  <button type="button" class="video-play" aria-label="Reproducir el video: ${esc(e.titulo)}">
    <img src="https://i.ytimg.com/vi/${e.youtubeId}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy">
    <span class="play" aria-hidden="true"></span>
  </button>
  <noscript><a href="${e.youtubeUrl}">Ver el video en YouTube</a></noscript>
</div>`;

const eventCard = (ev) => `
<article class="card event">
  <div class="card-img"><a href="${ev.imagen.full || ev.imagen.src}" data-lightbox data-w="${ev.imagen.w}" data-h="${ev.imagen.h}" aria-label="Ampliar: ${esc(ev.imagen.alt)}">${picture(ev.imagen, { sizes: '(min-width: 800px) 33vw, 100vw' })}</a></div>
  <div class="card-body">
    <p class="meta">${esc(ev.fechaTexto)}${ev.lugar ? ` · ${esc(ev.lugar)}` : ''}</p>
    <h3>${esc(ev.titulo)}</h3>
    <p>${esc(ev.detalle)}</p>
  </div>
</article>`;

const galleryItem = (f) => `
<li>
  <a href="assets/img/eventos/${f.id}.webp" data-lightbox data-w="${f.w}" data-h="${f.h}" aria-label="Ampliar: ${esc(f.alt)}">
    <img src="assets/img/eventos/${f.id}-sm.webp" srcset="assets/img/eventos/${f.id}-sm.webp 640w, assets/img/eventos/${f.id}.webp 1600w" sizes="(min-width: 900px) 25vw, (min-width: 560px) 33vw, 50vw" alt="${esc(f.alt)}" width="640" height="${Math.round((640 * f.h) / f.w)}" loading="lazy" decoding="async">
  </a>
</li>`;

const ctaBand = () => `
<section class="cta">
  <div class="wrap cta-in">
    <h2>¿Eres economista egresado de la UPTC?</h2>
    <p>Escríbenos o llámanos para conocer cómo vincularte a la Asociación.</p>
    <a class="btn btn-light" href="contacto.html">Contáctanos</a>
  </div>
</section>`;

// ---------- páginas ----------
const e = c.eventos;
const h = c.historia;

const pages = [
  {
    file: 'index.html',
    title: `${site.nombre} (ASOE) · Tunja, Boyacá`,
    description: site.descripcion,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.nombre,
      alternateName: site.sigla,
      url: site.url,
      logo: `${site.url}/assets/img/brand/logo.png`,
      foundingDate: '1981-05-01',
      telephone: site.telefonoLink,
      address: { '@type': 'PostalAddress', streetAddress: 'Carrera 10 #19-21', addressLocality: 'Tunja', addressRegion: 'Boyacá', addressCountry: 'CO' },
    },
    body: () => `
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <p class="eyebrow">Desde ${site.anioFundacion} · Tunja, Boyacá</p>
      <h1>Asociación de Economistas de la UPTC</h1>
      <p class="lead">Organización gremial sin ánimo de lucro que reúne a los economistas egresados de la UPTC y promueve el debate económico a través de foros, conferencias y simposios.</p>
      <p class="actions"><a class="btn" href="nosotros.html">Conoce ASOE</a> <a class="btn btn-ghost" href="eventos.html">Ver eventos</a></p>
    </div>
    <div class="hero-logo"><img src="assets/img/brand/logo-blanco.png" alt="Logo de ASOE: águila con las letras ASOE" width="300" height="464" fetchpriority="high"></div>
  </div>
</section>

<section class="stats" aria-label="ASOE en cifras">
  <div class="wrap stats-in">
    <div><strong>${site.anioFundacion}</strong><span>Año de fundación</span></div>
    <div><strong>84</strong><span>Egresados en la asamblea de constitución</span></div>
    <div><strong>${site.aniosTrayectoria}</strong><span>Años de trayectoria gremial</span></div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>Quiénes somos</h2>
      <p>${esc(h.parrafos[0])}</p>
      <p>${esc(h.parrafos[2])}</p>
      <p><a class="link-arrow" href="nosotros.html">Leer nuestra historia</a></p>
    </div>
    <figure class="photo">${picture(h.imagenes.comunidad, { sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <p class="eyebrow">Evento reciente</p>
    <h2>${esc(e.destacado.titulo)}</h2>
    <div class="split">
      ${video(e.destacado)}
      <div>
        <p class="meta">${esc(e.destacado.fechaTexto)}</p>
        <p>${esc(e.destacado.resumen)}</p>
        <p class="actions"><a class="btn" href="galeria.html">Ver la galería</a> <a class="link-arrow" href="${e.destacado.youtubeUrl}" rel="noopener" target="_blank">Ver en YouTube</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Otros eventos</h2>
    <div class="cards">${e.pasados.slice(0, 2).map(eventCard).join('')}</div>
    <p class="center"><a class="link-arrow" href="eventos.html">Todos los eventos</a></p>
  </div>
</section>
${ctaBand()}`,
  },

  {
    file: 'nosotros.html',
    title: `Nosotros · ${site.sigla}`,
    description: 'Historia de la Asociación de Economistas de la UPTC: fundación en 1981, personería jurídica, trayectoria y distinciones.',
    body: () => `
${pageHero('Nuestra historia', `Más de ${site.aniosTrayectoria} años de trayectoria gremial al servicio de la economía y la sociedad.`)}
<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      ${h.parrafos.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <h2>Lo que hemos hecho</h2>
      <ul>${h.actividades.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
    </div>
    <figure class="photo">${picture(h.imagenes.comunidad, { sizes: '(min-width: 900px) 40vw, 100vw' })}<figcaption>Integrantes y asistentes de ASOE.</figcaption></figure>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2>Misión y visión${badge(c.identidad.provisional)}</h2>
    <div class="cards two">
      <article class="card"><div class="card-body"><h3>Misión</h3><p>${esc(c.identidad.mision)}</p></div></article>
      <article class="card"><div class="card-body"><h3>Visión</h3><p>${esc(c.identidad.vision)}</p></div></article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Hitos</h2>
    <ol class="timeline">
      ${h.hitos.map((x) => `<li><time>${esc(x.fecha)}</time><p>${esc(x.texto)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <figure class="photo"><a href="${h.imagenes.distincion.src}" data-lightbox data-w="${h.imagenes.distincion.w}" data-h="${h.imagenes.distincion.h}" aria-label="Ampliar la distinción">${picture(h.imagenes.distincion, { sizes: '(min-width: 900px) 45vw, 100vw' })}</a></figure>
    <div>
      <h2>Distinción de la Facultad</h2>
      <p>El 7 de noviembre de 2023, la Facultad de Ciencias Económicas y Administrativas de la UPTC concedió a ASOE una distinción especial por su compromiso con la disciplina de la Economía y su labor como agremiación.</p>
    </div>
  </div>
</section>
${ctaBand()}`,
  },

  {
    file: 'junta.html',
    title: `Junta directiva · ${site.sigla}`,
    description: 'Junta directiva de la Asociación de Economistas de la UPTC y presidentes en su historia.',
    body: () => `
${pageHero('Junta directiva', 'Las personas que dirigen la Asociación y quienes la han presidido.')}
<section class="section">
  <div class="wrap">
    <h2>Junta vigente</h2>
    ${
      c.junta.miembros.length
        ? `<ul class="people">${c.junta.miembros.map((m) => `<li class="person">${m.foto ? `<img src="${m.foto}" alt="Fotografía de ${esc(m.nombre)}" width="240" height="240" loading="lazy">` : '<img class="avatar" src="assets/img/brand/apple-touch-icon.png" alt="" width="120" height="120" loading="lazy">'}<h3>${esc(m.nombre)}${badge(m.provisional)}</h3><p>${esc(m.cargo)}</p></li>`).join('')}</ul>`
        : '<p class="notice">Publicaremos aquí la composición de la junta directiva vigente.</p>'
    }
  </div>
</section>
<section class="section alt">
  <div class="wrap">
    <h2>Presidentes en nuestra historia</h2>
    <ul class="people simple">${c.junta.presidentes.map((p) => `<li class="person"><h3>${esc(p.nombre)}</h3><p>${esc(p.periodo)}</p></li>`).join('')}</ul>
  </div>
</section>`,
  },

  {
    file: 'eventos.html',
    title: `Eventos · ${site.sigla}`,
    description: 'Conferencias, paneles y simposios de la Asociación de Economistas de la UPTC: tasas de interés e inflación, integración regional y economía andina.',
    body: () => `
${pageHero('Eventos', 'Conferencias, paneles y simposios sobre los temas económicos que importan a la región y al país.')}
<section class="section">
  <div class="wrap">
    <p class="eyebrow">Más reciente</p>
    <h2>${esc(e.destacado.titulo)}</h2>
    <p class="meta">${esc(e.destacado.fechaTexto)}</p>
    <div class="split">
      ${video(e.destacado)}
      <div>
        <p>${esc(e.destacado.resumen)}</p>
        <p class="actions"><a class="btn" href="galeria.html">Ver las fotos</a> <a class="link-arrow" href="${e.destacado.youtubeUrl}" rel="noopener" target="_blank">Ver en YouTube</a></p>
      </div>
    </div>
  </div>
</section>
<section class="section alt">
  <div class="wrap">
    <h2>Eventos anteriores</h2>
    <div class="cards">${e.pasados.map(eventCard).join('')}</div>
    ${e.pasados
      .filter((p) => p.extras)
      .map(
        (p) => `
    <h3 class="sub">${esc(p.extrasTitulo || 'Ponencias')}: ${esc(p.titulo)}</h3>
    <ul class="gallery small">
      ${p.extras.map((x) => `<li><figure><a href="${x.full || x.src}" data-lightbox data-w="${x.w}" data-h="${x.h}" aria-label="Ampliar: ${esc(x.alt)}">${picture(x, { sizes: '(min-width: 800px) 33vw, 100vw' })}</a>${x.texto ? `<figcaption>${esc(x.texto)}</figcaption>` : ''}</figure></li>`).join('')}
    </ul>${p.video ? `
    <video class="clip" controls preload="none" playsinline aria-label="${esc(p.video.titulo)}"><source src="${p.video.src}" type="video/mp4"></video>` : ''}`
      )
      .join('')}
  </div>
</section>`,
  },

  {
    file: 'galeria.html',
    title: `Galería · ${site.sigla}`,
    description: 'Fotografías de la conferencia Tasas de Interés e Inflación en Colombia, organizada por la Asociación de Economistas de la UPTC.',
    body: () => `
${pageHero('Galería', esc(c.galeria.titulo))}
<section class="section">
  <div class="wrap">
    <ul class="gallery">${c.galeria.fotos.map(galleryItem).join('')}</ul>
    <p class="center note">Haz clic en una foto para ampliarla.</p>
  </div>
</section>`,
  },

  {
    file: 'contacto.html',
    title: `Contacto · ${site.sigla}`,
    description: 'Contacta a la Asociación de Economistas de la UPTC en Tunja, Boyacá: dirección, teléfono y cómo vincularte.',
    body: () => {
      const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Carrera 10 #19-21, Tunja, Boyacá')}`;
      return `
${pageHero('Contacto', 'Estamos en Tunja. Escríbenos o llámanos.')}
<section class="section">
  <div class="wrap contact-grid">
    <div class="info">
      <h2>Datos de contacto</h2>
      <dl>
        <dt>Dirección</dt><dd>${esc(site.direccion)}<br><a href="${mapa}" rel="noopener" target="_blank">Ver en el mapa</a></dd>
        <dt>Teléfono</dt><dd><a href="tel:${site.telefonoLink}">${esc(site.telefono)}</a></dd>
        ${site.email ? `<dt>Correo</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>${badge(site.emailProvisional)}</dd>` : ''}
        ${site.redes.map((r) => `<dt>${esc(r.nombre)}</dt><dd><a href="${esc(r.url)}" rel="noopener" target="_blank">${esc(r.url)}</a></dd>`).join('')}
      </dl>
    </div>
    ${
      site.email
        ? `<form class="form" data-mailto="${esc(site.email)}" novalidate>
      <h2>Escríbenos</h2>
      <label>Nombre<input name="nombre" required autocomplete="name"></label>
      <label>Correo electrónico<input name="correo" type="email" required autocomplete="email"></label>
      <label>Mensaje<textarea name="mensaje" rows="5" required></textarea></label>
      <button class="btn" type="submit">Enviar mensaje</button>
      <p class="note" role="status" aria-live="polite"></p>
    </form>`
        : `<div class="info"><h2>¿Quieres vincularte?</h2><p>Si eres economista egresado de la UPTC y quieres hacer parte de la Asociación, llámanos o visítanos en nuestra sede. Pronto habilitaremos también un formulario de contacto.</p></div>`
    }
  </div>
</section>`;
    },
  },
];

// ---------- escritura ----------
const layout = (p) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${PREVIEW ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${site.url}/${p.file === 'index.html' ? '' : p.file}">`}
<meta name="theme-color" content="#be5209">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="${esc(site.nombre)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${site.url}/assets/img/brand/og-image.jpg">
<link rel="icon" type="image/png" href="assets/img/brand/favicon.png">
<link rel="apple-touch-icon" href="assets/img/brand/apple-touch-icon.png">
<link rel="stylesheet" href="assets/css/styles.css">
${p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld)}</script>` : ''}
</head>
<body>
${header(p.file)}
<main id="contenido">${p.body()}
</main>
${footer()}
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;

const notFound = {
  file: '404.html',
  title: `Página no encontrada · ${site.sigla}`,
  description: 'La página que buscas no existe.',
  body: () => `${pageHero('Página no encontrada', 'La dirección que abriste no existe o fue movida.')}<section class="section"><div class="wrap center"><a class="btn" href="/">Volver al inicio</a></div></section>`,
};

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
if (fs.existsSync(path.join(SRC, 'static'))) fs.cpSync(path.join(SRC, 'static'), DIST, { recursive: true });
// fotos.json es un artefacto de la optimización, no se publica
fs.rmSync(path.join(DIST, 'assets', 'img', 'eventos', 'fotos.json'), { force: true });
fs.rmSync(path.join(DIST, 'assets', 'img', 'brand', 'color.txt'), { force: true });

for (const p of [...pages, notFound]) fs.writeFileSync(path.join(DIST, p.file), layout(p));

if (PREVIEW) {
  fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
} else {
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  const urls = pages.map((p) => `  <url><loc>${site.url}/${p.file === 'index.html' ? '' : p.file}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
const pendientes = [site.emailProvisional && 'correo institucional', c.identidad.provisional && 'misión y visión', ...c.junta.miembros.filter((m) => m.provisional).map((m) => 'junta: ' + m.cargo)].filter(Boolean);
if (pendientes.length) console.warn('⚠ Datos provisionales por confirmar (' + pendientes.length + '): ' + pendientes.join(', '));
console.log(`Sitio generado en dist/ (${PREVIEW ? 'PRELIMINAR' : 'producción'}): ${pages.length} páginas + 404`);
