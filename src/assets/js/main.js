/* ASOE – comportamiento del sitio. Sin dependencias. */
(function () {
  'use strict';

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Video de YouTube: se carga solo al hacer clic (más rápido y con menos rastreo)
  document.querySelectorAll('.video[data-yt]').forEach(function (box) {
    var btn = box.querySelector('.video-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.yt + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('aria-label') || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      box.replaceChildren(f);
      f.focus();
    });
  });

  // Ampliador de fotos
  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lightbox]'));
  if (links.length && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Foto ampliada');
    dlg.innerHTML =
      '<div class="lb-in"><img alt=""></div>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Cerrar">&times;</button>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Foto anterior">&#8249;</button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Foto siguiente">&#8250;</button>';
    document.body.appendChild(dlg);
    var big = dlg.querySelector('img');
    var idx = 0;
    var lastFocus = null;

    function show(i) {
      idx = (i + links.length) % links.length;
      var a = links[idx];
      var thumb = a.querySelector('img');
      big.src = a.getAttribute('href');
      big.alt = thumb ? thumb.alt : '';
    }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        lastFocus = a;
        show(i);
        dlg.showModal();
      });
    });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg || ev.target.classList.contains('lb-in')) dlg.close(); });
    dlg.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });
    dlg.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') show(idx - 1);
      if (ev.key === 'ArrowRight') show(idx + 1);
    });
  }

  // Formulario de contacto: abre el correo del visitante con el mensaje preparado
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var status = form.querySelector('[role="status"]');
      var d = new FormData(form);
      var nombre = (d.get('nombre') || '').toString().trim();
      var correo = (d.get('correo') || '').toString().trim();
      var mensaje = (d.get('mensaje') || '').toString().trim();
      if (!nombre || !/^\S+@\S+\.\S+$/.test(correo) || !mensaje) {
        status.textContent = 'Completa tu nombre, un correo válido y el mensaje.';
        return;
      }
      var cuerpo = mensaje + '\n\n— ' + nombre + ' (' + correo + ')';
      window.location.href = 'mailto:' + form.dataset.mailto + '?subject=' + encodeURIComponent('Contacto desde el sitio web') + '&body=' + encodeURIComponent(cuerpo);
      status.textContent = 'Se abrió tu programa de correo con el mensaje listo para enviar.';
    });
  }
})();
