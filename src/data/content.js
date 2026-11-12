// Contenido del sitio. Para agregar un evento, una foto o un miembro de la junta,
// se edita este archivo y se vuelve a generar el sitio (npm run build). No se toca el diseño.

const anioFundacion = 1981;

// Foto de evento: miniatura (640 px) en la página y versión grande al ampliar.
const foto = (id, w, h, alt) => ({ src: 'assets/img/eventos/' + id + '-sm.webp', full: 'assets/img/eventos/' + id + '.webp', w: 640, h: Math.round((640 * h) / w), alt });

module.exports = {
  site: {
    nombre: 'Asociación de Economistas de la UPTC',
    sigla: 'ASOE',
    url: 'https://asoeconomistasuptc.org',
    descripcion:
      'ASOE agrupa a los economistas egresados de la UPTC. Organización gremial sin ánimo de lucro fundada en 1981, con sede en Tunja, Boyacá.',
    direccion: 'Carrera 10 #19-21, Tunja, Boyacá',
    telefono: '(311) 844-8782',
    telefonoLink: '+573118448782',
    // El sitio muestra el formulario de contacto cuando hay un correo configurado.
    email: 'contacto@asoeconomistasuptc.org',
    emailProvisional: true, // PENDIENTE: ASOE debe confirmar el correo institucional real
    redes: [], // { nombre: 'Facebook', url: 'https://...' }
    anioFundacion,
    aniosTrayectoria: new Date().getFullYear() - anioFundacion,
  },

  nav: [
    { href: 'index.html', texto: 'Inicio' },
    { href: 'nosotros.html', texto: 'Nosotros' },
    { href: 'junta.html', texto: 'Junta directiva' },
    { href: 'eventos.html', texto: 'Eventos' },
    { href: 'galeria.html', texto: 'Galería' },
    { href: 'contacto.html', texto: 'Contacto' },
  ],

  historia: {
    parrafos: [
      'Nuestra organización gremial se constituyó el 1.º de mayo de 1981 como Asociación de Exalumnos de la Escuela de Economía de la Universidad Pedagógica y Tecnológica de Colombia. En su asamblea de constitución participaron 84 egresados y asistieron el presidente del Consejo Superior de la UPTC, Dr. Rafael Castelblanco; el rector, Dr. Carlos Sandoval Fonseca; y el decano de la Facultad de Ciencias Económicas y Administrativas, Dr. José García Jiménez. Su primer presidente fue el economista Rafael Romero Suárez.',
      'Mediante la Resolución 107 del 14 de julio de 1981, la Gobernación de Boyacá le otorgó personería jurídica y la reconoció como entidad sin ánimo de lucro. Posteriormente, la Resolución 00009 de 1984 aprobó su nueva razón social: Asociación de Economistas de la Universidad Pedagógica y Tecnológica de Colombia – ASOE.',
      'Durante sus primeros años, ASOE mantuvo una dinámica permanente que la posicionó como una de las organizaciones representativas de la sociedad civil en el departamento. Participó en foros y reuniones institucionales y organizó con regularidad eventos académicos y cívicos de alcance local y regional.',
    ],
    actividades: [
      'Un Congreso de Economía anual sobre temas de coyuntura, con docentes e investigadores de universidades de todo el país y funcionarios de entidades públicas nacionales, departamentales y locales como conferencistas invitados.',
      'Participación en conversatorios y foros convocados por entidades cívicas sobre servicios públicos, empleo, planes de desarrollo y planes de ordenamiento territorial.',
    ],
    hitos: [
      { fecha: '1 de mayo de 1981', texto: 'Se constituye la Asociación de Exalumnos de la Escuela de Economía de la UPTC, con 84 egresados en la asamblea.' },
      { fecha: '14 de julio de 1981', texto: 'La Gobernación de Boyacá otorga la personería jurídica (Resolución 107).' },
      { fecha: '1984', texto: 'Nueva razón social: Asociación de Economistas de la UPTC – ASOE (Resolución 00009).' },
      { fecha: '7 de noviembre de 2023', texto: 'La Facultad de Ciencias Económicas y Administrativas de la UPTC le concede una distinción especial por su compromiso con la disciplina y su labor como agremiación.' },
    ],
    imagenes: {
      comunidad: { src: 'assets/img/historia/comunidad-asoe.webp', alt: 'Integrantes de ASOE y asistentes posando juntos en un auditorio, con las banderas de Colombia y de Boyacá al fondo', w: 1024, h: 768 },
      distincion: { src: 'assets/img/historia/distincion-fcea-2023.webp', alt: 'Distinción especial concedida a ASOE por la Facultad de Ciencias Económicas y Administrativas de la UPTC, el 7 de noviembre de 2023', w: 1000, h: 789 },
    },
  },

  // PENDIENTE: textos provisionales redactados a partir de la historia de ASOE; ASOE debe validarlos o reemplazarlos.
  identidad: {
    provisional: true,
    mision: 'Agrupar y representar a los economistas egresados de la UPTC, promoviendo su desarrollo profesional y el análisis y debate de los temas económicos de la región y del país.',
    vision: 'Ser reconocida como una organización gremial referente en el análisis económico de Boyacá y de Colombia, y un espacio de encuentro entre la academia, las entidades y los empresarios.',
  },

  // Presidentes de los que se tiene registro. La junta vigente se agrega en `miembros` cuando ASOE la entregue.
  junta: {
    // PENDIENTE: nombres de la junta vigente. Al recibirlos, se reemplaza cada 'Nombre por confirmar' y se quita provisional.
    miembros: [
      { nombre: 'Nombre por confirmar', cargo: 'Presidente(a)', provisional: true },
      { nombre: 'Nombre por confirmar', cargo: 'Vicepresidente(a)', provisional: true },
      { nombre: 'Nombre por confirmar', cargo: 'Secretario(a)', provisional: true },
      { nombre: 'Nombre por confirmar', cargo: 'Tesorero(a)', provisional: true },
      { nombre: 'Nombre por confirmar', cargo: 'Fiscal', provisional: true },
    ], // { nombre, cargo, foto: 'assets/img/junta/nombre.webp', provisional }
    presidentes: [
      { nombre: 'Rafael Romero Suárez', periodo: 'Primer presidente, 1981' },
      { nombre: 'Efraín Rodríguez Rodríguez', periodo: 'Expresidente, 1992 – 1993' },
    ],
  },

  eventos: {
    destacado: {
      titulo: 'Conferencia: Tasas de Interés e Inflación en Colombia',
      fecha: '2026-10-01',
      fechaTexto: '1 de octubre de 2026',
      resumen:
        'Conferencia abierta sobre el comportamiento de las tasas de interés y la inflación en Colombia, con intervenciones de los conferencistas y espacio de preguntas del público.',
      youtubeId: 'XO2CCsw7VAo',
      youtubeUrl: 'https://www.youtube.com/live/XO2CCsw7VAo',
      portada: { src: 'assets/img/eventos/conferencia-07.webp', alt: 'Conferencistas junto al atril durante la conferencia sobre tasas de interés e inflación', w: 1600, h: 1067 },
    },
    pasados: [
      {
        titulo: 'Foro: Propuestas programáticas de los candidatos a la Rectoría UPTC 2027-2030',
        fechaTexto: '28 de octubre de 2026, 2:00 p. m. a 6:00 p. m.',
        lugar: 'Auditorio Hunzahua, Edificio de Ingeniería',
        detalle: 'Un espacio para el diálogo, la propuesta y la democracia universitaria, organizado por la Asociación de Economistas de la UPTC.',
        imagen: { src: 'assets/img/eventos/afiche-foro-rectoria.webp', alt: 'Afiche del Foro de propuestas programáticas de los candidatos a la Rectoría UPTC 2027-2030, 28 de octubre de 2026', w: 1200, h: 1600 },
      },
      {
        titulo: 'Seminario: ¿Economía política o política económica? De Smith a Keynes',
        fechaTexto: '20 de octubre de 2026, 8:30 a. m. a 5:30 p. m.',
        lugar: 'Paraninfo, UPTC Tunja',
        detalle: 'Encuentro de egresados de la Escuela de Economía UPTC, con participación de ASOE. Conferencistas: Jorge Iván González, Danilo Torres, Álvaro Moreno y Adriana Francisca Salinas.',
        imagen: { src: 'assets/img/eventos/afiche-seminario-smith-keynes.webp', alt: 'Afiche del Seminario ¿Economía política o política económica? De Smith a Keynes, 20 de octubre', w: 640, h: 1280 },
        extrasTitulo: 'Fotos',
        extras: [
          foto('seminario-egresados-1', 1600, 748, 'Egresados de la Escuela de Economía posando juntos durante el seminario'),
          foto('seminario-egresados-2', 1600, 748, 'Grupo de egresados durante el encuentro de la Escuela de Economía'),
        ],
      },
      {
        titulo: 'Exaltación honorífica a nuestro colega Raúl Cañón, miembro del Consejo Directivo',
        fechaTexto: 'Fecha por confirmar',
        fechaProvisional: true,
        lugar: 'Ceremonia «Edificando Futuro»',
        detalle: 'Reconocimiento a nuestro colega y miembro del Consejo Directivo en la ceremonia «Edificando Futuro».',
        imagen: foto('exaltacion-1', 1600, 748, 'Escenario de la ceremonia Edificando Futuro con el atril y los invitados'),
        extrasTitulo: 'Fotos y video',
        extras: [
          foto('exaltacion-2', 1600, 748, 'Homenajeados en el escenario de la ceremonia Edificando Futuro'),
          foto('exaltacion-3', 1600, 748, 'Homenajeados recibiendo sus reconocimientos'),
          foto('exaltacion-4', 1600, 748, 'Participantes de la ceremonia Edificando Futuro en el escenario'),
          foto('exaltacion-5', 748, 1600, 'Intervención desde el atril durante la ceremonia'),
        ],
        video: { src: 'assets/img/eventos/exaltacion-video.mp4', titulo: 'Video de la exaltación honorífica' },
      },
      {
        titulo: 'Panel 1: Balance y perspectiva económica de Colombia y Boyacá frente a los desafíos',
        fechaTexto: '26 de agosto de 2026',
        fechaProvisional: true, // PENDIENTE: ASOE debe confirmar la fecha exacta
        lugar: '',
        detalle: 'Panel de análisis sobre la situación económica de Colombia y Boyacá y los desafíos que enfrentan.',
        imagen: foto('panel1-2', 1600, 748, 'Panelistas y moderador en la mesa del Panel 1, con la pancarta de bienvenida de ASOE'),
        extrasTitulo: 'Fotos',
        extras: [
          foto('panel1-1', 1600, 748, 'Participante del público tomando la palabra durante el panel'),
          foto('panel1-3', 1600, 748, 'Panelista presentando ante la mesa y el público'),
        ],
      },
      {
        titulo: 'Panel 2: Prospectiva económica y empresarial, qué viene para Colombia y Boyacá',
        fechaTexto: '27 de agosto de 2026',
        fechaProvisional: true, // PENDIENTE: ASOE debe confirmar la fecha exacta
        lugar: '',
        detalle: 'Panel sobre las perspectivas económicas y empresariales para Colombia y Boyacá.',
        imagen: foto('panel2-1', 1600, 748, 'Panelistas en la mesa del Panel 2, con la pancarta de ASOE'),
        extrasTitulo: 'Fotos',
        extras: [foto('panel2-2', 1600, 748, 'Panelistas conversando durante el Panel 2')],
      },
      {
        titulo: 'Panel de Integración Regional: explorando oportunidades de negocio',
        fechaTexto: '22 de julio de 2024, 2:00 p. m.',
        lugar: 'Auditorio Eduardo Caballero Calderón, Tunja',
        detalle: 'Panelistas: ex ministro Germán Umaña, Ricardo Agudelo, Alejandro Merentes y Jorge Pedraza.',
        imagen: { src: 'assets/img/eventos/afiche-panel-integracion-regional.webp', alt: 'Afiche del Panel de Integración Regional del 22 de julio de 2024 con los panelistas invitados', w: 900, h: 1274 },
      },
      {
        titulo: 'Rueda de Contactos Comerciales',
        fechaTexto: '22 de julio de 2024, 4:00 p. m.',
        lugar: 'Auditorio Eduardo Caballero Calderón, Tunja',
        detalle: 'Coordinador: Dr. Jesús Martínez. Participan entidades, academia y empresarios.',
        imagen: { src: 'assets/img/eventos/afiche-rueda-contactos-comerciales.webp', alt: 'Afiche de la Rueda de Contactos Comerciales del 22 de julio de 2024', w: 900, h: 1273 },
      },
      {
        titulo: 'II Simposio de Economía: Economía de la Región Andina',
        fechaTexto: 'Fecha por confirmar',
        lugar: '',
        detalle: 'Integración andina con Venezuela, con Bolivia y de nuevo con Venezuela, a cargo de los economistas Francisco Ramírez, Tatiana Remolina y Amauri Álvarez.',
        imagen: { src: 'assets/img/eventos/simposio-grupo.webp', alt: 'Ponentes y organizadores del II Simposio de Economía posando frente a las banderas de Colombia y Boyacá', w: 1400, h: 1050 },
        extras: [
          { src: 'assets/img/eventos/simposio-venezuela-1.webp', alt: 'Ponencia sobre integración andina con Venezuela', texto: 'Integración andina con Venezuela: economista Francisco Ramírez', w: 1200, h: 900 },
          { src: 'assets/img/eventos/simposio-bolivia.webp', alt: 'Ponencia sobre integración andina con Bolivia', texto: 'Integración andina con Bolivia: economista Tatiana Remolina', w: 1200, h: 900 },
          { src: 'assets/img/eventos/simposio-venezuela-2.webp', alt: 'Segunda ponencia sobre integración andina con Venezuela', texto: 'Integración andina con Venezuela: economista Amauri Álvarez', w: 1200, h: 900 },
        ],
      },
    ],
  },

  galeria: {
    titulo: 'Conferencia: Tasas de Interés e Inflación en Colombia',
    fotos: [
      { id: 'conferencia-07', w: 1600, h: 1067, alt: 'Vista del auditorio con los conferencistas junto al atril' },
      { id: 'conferencia-06', w: 1600, h: 1200, alt: 'Conferencista y moderadora junto al atril, con la bandera de Colombia al fondo' },
      { id: 'conferencia-01', w: 1600, h: 2400, alt: 'Conferencista y moderadora junto al atril' },
      { id: 'conferencia-08', w: 1600, h: 2400, alt: 'Conferencista durante su intervención' },
      { id: 'conferencia-09', w: 1600, h: 2400, alt: 'Conferencista explicando con un gesto de la mano' },
      { id: 'conferencia-10', w: 1600, h: 1200, alt: 'Dos conferencistas sentados en el escenario' },
      { id: 'conferencia-04', w: 1600, h: 1067, alt: 'Asistentes escuchando la conferencia' },
      { id: 'conferencia-11', w: 1600, h: 2400, alt: 'Asistente haciendo una pregunta con el micrófono' },
      { id: 'conferencia-12', w: 1600, h: 2400, alt: 'Asistente formulando una pregunta a los conferencistas' },
      { id: 'conferencia-13', w: 1600, h: 2400, alt: 'Participante del público tomando la palabra' },
      { id: 'conferencia-14', w: 1600, h: 718, alt: 'Conferencistas y organizadores posando juntos al finalizar la conferencia' },
      { id: 'conferencia-15', w: 1600, h: 718, alt: 'Grupo de conferencistas y organizadores en el auditorio' },
    ],
  },
};
