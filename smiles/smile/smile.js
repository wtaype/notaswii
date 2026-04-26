import './smile.css';
import $ from 'jquery';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getls, getNombre, Saludar } from '../widev.js';
import { app } from '../wii.js';

const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

const getRawLs = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const FRASES = [
  "Confía plenamente, cada paso está guiado.",
  "Tu progreso es el testimonio más hermoso.",
  "Cada nuevo amanecer es una página en blanco.",
  "Transforma obstáculos en oportunidades.",
  "Sigue brillando, tus ideas dejarán huella."
];

export const render = () => `
  <div class="smw_dash">
    
    <!-- ★ HEADER COMPACTO -->
    <header class="smw_dhead">
      <div class="smw_duser">
        <div class="smw_davatar" id="smwAvatar"></div>
        <div class="smw_dinfo">
          <h1 id="smwSaludo">Hola, Usuario</h1>
          <p id="smwEmail">correo@ejemplo.com</p>
        </div>
      </div>
      <div class="smw_dquote" id="smwQuote"></div>
    </header>

    <!-- ★ CONTENIDO PRINCIPAL -->
    <main class="smw_dmain">
      
      <!-- GRID DE ESTADÍSTICAS -->
      <section class="smw_dstats" id="smwStats"></section>

      <!-- ACTIVIDAD RECIENTE (TABLA/LISTA LIMPIA) -->
      <section class="smw_drecent">
        <div class="smw_dtitle">
          <h2><i class="fas fa-history"></i> Actividad Reciente</h2>
          <a href="#" class="smw_dlink">Ver todo</a>
        </div>
        <div class="smw_dlist" id="smwTimeline"></div>
      </section>

    </main>

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
  const iniciales = `${(wi.nombre || '?')[0]}${(wi.apellidos || '')[0] || ''}`.toUpperCase();
  const frase     = FRASES[Math.floor(Math.random() * FRASES.length)];

  // 1. HEADER COMPACTO
  $('#smwAvatar').text(iniciales);
  $('#smwSaludo').html(`${Saludar()} <strong>${nombre}</strong>`);
  $('#smwEmail').html(`<i class="fas fa-shield-halved"></i> Rol: ${rol} &nbsp;&nbsp;·&nbsp;&nbsp; <i class="fas fa-envelope"></i> ${email}`);
  $('#smwQuote').html(`<i class="fas fa-quote-left"></i> <span>${frase}</span>`);

  // 2. DATOS DE CACHÉ
  const data = {
    notas:   getRawLs('misNotas'),
    flash:   getRawLs('flash'),
    tareas:  getRawLs('tareas'),
    word:    getRawLs('word_docs'),
    links:   getRawLs('links'),
    tablero: getRawLs('tablero_items')
  };

  // 3. TARJETAS COMPACTAS (BENTO STYLE)
  const stats = [
    { n: 'Notas Rápidas', c: data.notas.length,   i: 'fa-book-open',  col: 'var(--Futuro)', bg: 'var(--bg6)', url: '/' },
    { n: 'Flash Cards',   c: data.flash.length,   i: 'fa-bolt',       col: 'var(--Oro)',    bg: 'var(--bg6)', url: '/flash' },
    { n: 'Listas Tareas', c: data.tareas.length,  i: 'fa-list-check', col: 'var(--Dulce)',  bg: 'var(--bg6)', url: '/tareas' },
    { n: 'Documentos',    c: data.word.length,    i: 'fa-file-word',  col: 'var(--Cielo)',  bg: 'var(--bg6)', url: '/word' },
    { n: 'Enlaces Web',   c: data.links.length,   i: 'fa-link',       col: 'var(--Mora)',   bg: 'var(--bg6)', url: '/links' },
    { n: 'Tableros',      c: data.tablero.length, i: 'fa-th-large',   col: 'var(--Paz)',    bg: 'var(--bg6)', url: '/tablero' }
  ];

  $('#smwStats').html(stats.map((s, i) => `
    <a href="${s.url}" class="smw_scard nv_item" data-page="${s.url.replace('/','')}" style="animation-delay: ${i * 0.05}s">
      <div class="smw_scard_ico" style="color: ${s.col}; background: color-mix(in srgb, ${s.col} 15%, transparent);"><i class="fas ${s.i}"></i></div>
      <div class="smw_scard_info">
        <h3>${s.n}</h3>
        <strong>${s.c}</strong>
      </div>
    </a>
  `).join(''));

  // 4. ACTIVIDAD RECIENTE (LISTA COMPACTA)
  let tl = [];
  data.flash.forEach(x   => tl.push({ ...x, mod: 'Flash',   i: 'fa-bolt',       col: 'var(--Oro)', url: '/flash' }));
  data.word.forEach(x    => tl.push({ ...x, mod: 'Word',    i: 'fa-file-word',  col: 'var(--Cielo)', url: '/word' }));
  data.tareas.forEach(x  => tl.push({ ...x, mod: 'Tareas',  i: 'fa-list-check', col: 'var(--Dulce)', url: '/tareas' }));
  data.tablero.forEach(x => tl.push({ ...x, mod: 'Tablero', i: 'fa-th-large',   col: 'var(--Paz)', url: '/tablero' }));
  data.links.forEach(x   => tl.push({ ...x, mod: 'Links',   i: 'fa-link',       col: 'var(--Mora)', url: '/links' }));
  data.notas.forEach(x   => tl.push({ ...x, mod: 'Notas',   i: 'fa-book-open',  col: 'var(--Futuro)', url: '/' }));

  tl.sort((a, b) => (b.actualizado || b.creado || 0) - (a.actualizado || a.creado || 0));
  const recent = tl.slice(0, 8); // Top 8 para llenar el espacio limpiamente

  if (recent.length) {
    const timeAgo = (ts) => {
      const diff = Math.floor((Date.now() - ts) / 60000);
      if (diff < 1) return 'Ahora';
      if (diff < 60) return `${diff} min`;
      const hrs = Math.floor(diff / 60);
      if (hrs < 24) return `${hrs} h`;
      const d = Math.floor(hrs / 24);
      return `${d} d`;
    };

    const stripHtml = (html) => {
      let tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    };

    $('#smwTimeline').html(recent.map((x, i) => {
      let tit = x.titulo || stripHtml(x.contenido).substring(0, 50) || 'Sin título';
      return `
      <a href="${x.url}" class="smw_ritem nv_item" data-page="${x.url.replace('/','')}" style="animation-delay: ${i * 0.05}s">
        <div class="smw_ritem_ico" style="color: ${x.col}; background: color-mix(in srgb, ${x.col} 12%, transparent);"><i class="fas ${x.i}"></i></div>
        <div class="smw_ritem_txt">
          <h4>${tit}</h4>
          <span>${x.mod}</span>
        </div>
        <div class="smw_ritem_time">${timeAgo(x.actualizado || x.creado)}</div>
      </a>
      `;
    }).join(''));
  } else {
    $('#smwTimeline').html(`
      <div class="smw_rempty">
        <i class="fas fa-inbox"></i>
        <p>No hay actividad reciente</p>
      </div>
    `);
  }

  console.log(`✅ Smile Home — ${app} (Vercel Style)`);
};

export const cleanup = () => {};