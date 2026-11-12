// Contenido del sitio. Para agregar un evento, una foto o un miembro de la junta,
// se edita este archivo y se vuelve a generar el sitio (npm run build). No se toca el diseño.

const anioFundacion = 1981;

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
    // Cuando exista un correo institucional, se escribe aquí y el sitio muestra el formulario de contacto.
    email: '',
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

  // Presidentes de los que se tiene registro. La junta vigente se agrega en `miembros` cuando ASOE la entregue.
  junta: {
    miembros: [], // { nombre: '', cargo: '', foto: 'assets/img/junta/nombre.webp' }
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
    ],
  },
};
