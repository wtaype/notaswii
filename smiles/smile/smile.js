import './smile.css';
import $ from 'jquery';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getls, getNombre, fechaHoy, calcMeses, Saludar } from '../widev.js';
import { app } from '../wii.js';

const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

// Extraer items del localStorage crudo (array JSON)
const getRawLs = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const FRASES = [
  { ico: 'fa-dove',          txt: 'Confía plenamente, cada paso está guiado hacia un propósito mayor.' },
  { ico: 'fa-heart',         txt: 'La perseverancia no hace las cosas fáciles, pero sí las hace posibles.' },
  { ico: 'fa-seedling',      txt: 'Tu progreso es el testimonio más hermoso de tu esfuerzo diario.' },
  { ico: 'fa-hands-praying', txt: 'Agradece el hoy, es el cimiento de los logros del mañana.' },
  { ico: 'fa-star',          txt: 'Sigue brillando, tus ideas están destinadas a dejar huella.' },
  { ico: 'fa-sun',           txt: 'Cada nuevo amanecer es una página en blanco para reescribir tu historia.' },
  { ico: 'fa-bolt',          txt: 'Tienes el talento necesario para transformar cualquier obstáculo en una oportunidad.' }
];

export const render = () => `
  <div class="smw_page">
    
    <!-- ★ HERO ULTRA PRO -->
    <section class="smw_hero">
      <div class="smw_hero_text">
        <div class="smw_saludo_badge">
          <i class="fas fa-sparkles"></i>
          <span>${Saludar()}</span>
        </div>
        <h1>Bienvenido de vuelta,<br><span class="gradient" id="smwNombre">Usuario</span></h1>
        <p>Este es tu centro de operaciones personal. Todas tus ideas, documentos, tareas y enlaces están centralizados aquí, listos para tu próxima gran creación.</p>
        <div class="smw_hero_badges" id="smwBadges"></div>
      </div>
      <div class="smw_hero_visual">
        <div class="smw_avatar_ring"></div>
        <div class="smw_avatar" id="smwAvatar"></div>
      </div>
    </section>

    <div class="smw_wrapper">
      
      <!-- ★ ESTADÍSTICAS (MÓDULOS) -->
      <section>
        <h2 class="smw_section_title"><i class="fas fa-layer-group"></i> Tu Ecosistema Creativo</h2>
        <div class="smw_stats_grid" id="smwStats"></div>
      </section>

      <!-- ★ 2 COLUMNAS (TIMELINE Y WIDGET) -->
      <section class="smw_bento_grid">
        
        <!-- Actividad Reciente -->
        <div>
          <h2 class="smw_section_title"><i class="fas fa-clock-rotate-left"></i> Actividad Reciente</h2>
          <div class="smw_timeline" id="smwTimeline"></div>
        </div>

        <!-- Widget Pro -->
        <div>
          <h2 class="smw_section_title"><i class="fas fa-fire"></i> Inspiración</h2>
          <div class="smw_widget_card" id="smwWidget"></div>
        </div>

      </section>
    </div>

  </div>
`;

export const init = async () => {
  const user = await waitAuth();
  if (!user) return;

  const wi = getls('wiSmile');
  if (!wi) return;

  const nombre    = getNombre(wi.nombre || wi.usuario || '');
  const email     = wi.email || user.email;
  const rol       = wi.rol   || 'smile';
  const meses     = calcMeses(wi.creado?.seconds ? new Date(wi.creado.seconds * 1000) : wi.creado);
  const iniciales = `${(wi.nombre || '?')[0]}${(wi.apellidos || '')[0] || ''}`.toUpperCase();
  const frase     = FRASES[Math.floor(Math.random() * FRASES.length)];

  // 1. HERO 
  $('#smwNombre').text(nombre);
  $('#smwAvatar').text(iniciales);
  $('#smwBadges').html(`
    <div class="smw_badge_pro"><i class="fas fa-id-badge" style="color:var(--mco);"></i> <span>${rol.toUpperCase()}</span></div>
    <div class="smw_badge_pro"><i class="fas fa-envelope" style="color:#2B579A;"></i> <span>${email}</span></div>
    <div class="smw_badge_pro"><i class="fas fa-calendar-check" style="color:#0F9D58;"></i> <span>${meses <= 0 ? 'Miembro Nuevo' : `+${meses} meses`}</span></div>
  `);

  // 2. RECOLECTAR DATOS DE CACHÉ
  const data = {
    notas:   getRawLs('misNotas'),
    flash:   getRawLs('flash'),
    tareas:  getRawLs('tareas'),
    word:    getRawLs('word_docs'),
    links:   getRawLs('links'),
    tablero: getRawLs('tablero_items')
  };

  // 3. RENDERIZAR ESTADÍSTICAS
  const stats = [
    { n: 'Notas Flash',  c: data.flash.length,   i: 'fa-bolt',       col: '#FF9800', url: '/flash' },
    { n: 'Documentos',   c: data.word.length,    i: 'fa-file-word',  col: '#2B579A', url: '/word' },
    { n: 'Listas Tareas',c: data.tareas.length,  i: 'fa-list-check', col: '#FF5C69', url: '/tareas' },
    { n: 'Tablero Visual',c: data.tablero.length,i: 'fa-th-large',   col: '#FFB800', url: '/tablero' },
    { n: 'Enlaces Web',  c: data.links.length,   i: 'fa-link',       col: '#7c3aed', url: '/links' },
    { n: 'Borradores',   c: data.notas.length,   i: 'fa-book-open',  col: '#0F9D58', url: '/' }
  ];

  $('#smwStats').html(stats.map((s, i) => `
    <a href="${s.url}" class="smw_stat_card nv_item" data-page="${s.url.replace('/','')}" style="--c: ${s.col}; animation-delay: ${i * 0.08}s">
      <div class="smw_stat_info">
        <h3>${s.c}</h3>
        <span>${s.n}</span>
      </div>
      <div class="smw_stat_icon"><i class="fas ${s.i}"></i></div>
    </a>
  `).join(''));

  // 4. TIMELINE DE ACTIVIDAD (Mezcla y Ordenamiento)
  let tl = [];
  data.flash.forEach(x   => tl.push({ ...x, mod: 'Flash',   i: 'fa-bolt',       col: '#FF9800', url: '/flash' }));
  data.word.forEach(x    => tl.push({ ...x, mod: 'Word',    i: 'fa-file-word',  col: '#2B579A', url: '/word' }));
  data.tareas.forEach(x  => tl.push({ ...x, mod: 'Tareas',  i: 'fa-list-check', col: '#FF5C69', url: '/tareas' }));
  data.tablero.forEach(x => tl.push({ ...x, mod: 'Tablero', i: 'fa-th-large',   col: '#FFB800', url: '/tablero' }));
  data.links.forEach(x   => tl.push({ ...x, mod: 'Links',   i: 'fa-link',       col: '#7c3aed', url: '/links' }));
  data.notas.forEach(x   => tl.push({ ...x, mod: 'Notas',   i: 'fa-book-open',  col: '#0F9D58', url: '/' }));

  // Orden cronológico (Más reciente primero)
  tl.sort((a, b) => (b.actualizado || b.creado || 0) - (a.actualizado || a.creado || 0));
  
  const recent = tl.slice(0, 6);

  if (recent.length) {
    const timeAgo = (ts) => {
      const diff = Math.floor((Date.now() - ts) / 60000);
      if (diff < 1) return 'Justo ahora';
      if (diff < 60) return `Hace ${diff} min`;
      const hrs = Math.floor(diff / 60);
      if (hrs < 24) return `Hace ${hrs} h`;
      const d = Math.floor(hrs / 24);
      return `Hace ${d} día${d > 1 ? 's' : ''}`;
    };

    const stripHtml = (html) => {
      let tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    };

    $('#smwTimeline').html(recent.map((x) => {
      let tit = x.titulo || stripHtml(x.contenido).substring(0, 40) || 'Sin título';
      return `
      <a href="${x.url}" class="smw_tl_item nv_item" style="--c: ${x.col};" data-page="${x.url.replace('/','')}">
        <div class="smw_tl_icon"><i class="fas ${x.i}"></i></div>
        <div class="smw_tl_data">
          <h4>${tit}</h4>
          <p>Módulo <strong>${x.mod}</strong> · ${timeAgo(x.actualizado || x.creado)}</p>
        </div>
      </a>
      `;
    }).join(''));
  } else {
    $('#smwTimeline').html(`
      <div class="smw_empty">
        <i class="fas fa-ghost"></i>
        <p>Aún no has creado nada.</p>
        <span style="font-size:var(--fz_s3);">¡Anímate a usar alguno de los módulos!</span>
      </div>
    `);
  }

  // 5. WIDGET DE MOTIVACIÓN
  $('#smwWidget').html(`
    <div class="smw_widget_icon"><i class="fas ${frase.ico}"></i></div>
    <h3>Reflexión Diaria</h3>
    <p>"${frase.txt}"</p>
  `);

  console.log(`✅ Smile Home — ${app} (Premium Pro Dashboard)`);
};

export const cleanup = () => {};