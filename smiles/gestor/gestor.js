/* =========================================================================
   GESTOR.JS — NotasWii · Dashboard Business Pro (Vercel Style)
   Jesús es mi Señor 🙏
========================================================================= */

import './gestor.css';
import $ from 'jquery';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { savels, getls, Saludar, getNombre, avatar } from '../widev.js';
import { app } from '../wii.js';

// ── CONFIG & CACHE ───────────────────────────────────────────────────────────
const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

const getRawLs = (key) => {
  try {
    const r = JSON.parse(localStorage.getItem(key));
    return Array.isArray(r) ? r : (r?.value && Array.isArray(r.value) ? r.value : []);
  } catch { return []; }
};

const FRASES = [
  "Liderazgo es inspirar a otros a alcanzar su máximo potencial.",
  "La educación es el arma más poderosa para cambiar el mundo.",
  "El éxito empresarial se construye con constancia y visión.",
  "Gestiona con propósito, lidera con el corazón.",
  "La organización es la clave para la productividad empresarial."
];

// ── RENDER ────────────────────────────────────────────────────────────────────
export const render = () => `
  <div class="gs_dash">
    
    <!-- ★ HEADER COMPACTO (Estilo Vercel) -->
    <header class="gs_dhead">
      <div class="gs_duser">
        <div class="gs_davatar" id="gsAvatar"></div>
        <div class="gs_dinfo">
          <h1 id="gsSaludo">Hola, Gestor</h1>
          <p id="gsEmail">cargando...</p>
        </div>
      </div>
      <div class="gs_dquote" id="gsQuote"></div>
    </header>

    <!-- ★ CONTENIDO PRINCIPAL -->
    <main class="gs_dmain">
      
      <!-- COLUMNA IZQUIERDA: MÉTRICAS & HERRAMIENTAS -->
      <div class="gs_dleft">
        
        <!-- GRID DE ESTADÍSTICAS (KPIs - Estilo Bento) -->
        <section class="gs_dstats" id="gsStats"></section>

        <!-- HERRAMIENTAS (GRID DE ACCESOS) -->
        <section class="gs_dtools">
          <div class="gs_dtitle">
            <h2><i class="fas fa-grip-horizontal"></i> Herramientas de Gestión</h2>
          </div>
          <div class="gs_tgrid">
            ${[
              { page:'misnotas',       ico:'fa-book-open',  col:'var(--Futuro)', tit:'Notas Rápidas', sub:'Mis anotaciones' },
              { page:'flash',          ico:'fa-bolt',       col:'var(--Oro)',    tit:'Flash Cards',   sub:'Repaso rápido' },
              { page:'tareas',         ico:'fa-list-check', col:'var(--Dulce)',  tit:'Tareas',        sub:'Lista de pendientes' },
              { page:'word',           ico:'fa-file-word',  col:'var(--Cielo)',  tit:'Documentos',    sub:'Editor pro' },
              { page:'links',          ico:'fa-link',       col:'var(--Mora)',   tit:'Enlaces Web',   sub:'Marcadores' },
              { page:'tablero',        ico:'fa-th-large',   col:'var(--Paz)',    tit:'Tableros',      sub:'Kanban & Visual' }
            ].map((a, i) => `
              <a href="/${a.page}" class="gs_tcard nv_item" data-page="${a.page}" style="animation-delay: ${i * 0.05}s">
                <div class="gs_tcard_ico" style="color: ${a.col}; background: color-mix(in srgb, ${a.col} 12%, transparent);"><i class="fas ${a.ico}"></i></div>
                <div class="gs_tcard_txt">
                  <h4>${a.tit}</h4>
                  <span>${a.sub}</span>
                </div>
              </a>
            `).join('')}
          </div>
        </section>

      </div>

      <!-- COLUMNA DERECHA: ACTIVIDAD RECIENTE -->
      <div class="gs_dright">
        <section class="gs_drecent">
          <div class="gs_dtitle">
            <h2><i class="fas fa-history"></i> Actividad Reciente</h2>
            <div class="gs_dcontrols">
               <button class="gs_btn_sync" id="gs_refresh"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="gs_dlist" id="gsFeed">
            <div class="gs_rempty"><i class="fas fa-circle-notch fa-spin"></i><p>Actualizando...</p></div>
          </div>
        </section>
      </div>

    </main>

  </div>
`;

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  const user = await waitAuth();
  if (!user) return;

  const u = getls('wiSmile');
  if (!u) return;

  $(document).off('.gs');

  // 1. POBLAR HEADER
  const nombre    = getNombre(u.nombre || u.usuario || 'Gestor');
  const email     = u.email || user.email;
  const iniciales = `${(u.nombre || '?')[0]}${(u.apellidos || '')[0] || ''}`.toUpperCase();
  const frase     = FRASES[Math.floor(Math.random() * FRASES.length)];

  $('#gsAvatar').text(iniciales);
  $('#gsSaludo').html(`${Saludar()} <strong>${nombre}</strong>`);
  $('#gsEmail').html(`<i class="fas fa-building"></i> ${u.empresa || app} &nbsp;&nbsp;·&nbsp;&nbsp; <i class="fas fa-envelope"></i> ${email}`);
  $('#gsQuote').html(`<i class="fas fa-quote-left"></i> <span>${frase}</span>`);

  // 2. CARGAR KPIs E INICIAR FEED
  _renderTodo();

  // 3. EVENTOS
  $(document)
    .on('click.gs', '#gs_refresh', async function () {
      const $i = $(this).find('i').addClass('fa-spin');
      _renderTodo();
      setTimeout(() => $i.removeClass('fa-spin'), 500);
    })
    .on('click.gs', '.nv_item', function (e) {
      e.preventDefault();
      const page = $(this).data('page');
      import('../rutas.js').then(({ rutas }) => rutas.navigate(`/${page || ''}`));
    });

  console.log(`✅ Gestor Home — ${app} (NotasWii Pro)`);
};

export const cleanup = () => {
  $(document).off('.gs');
};

// ── LÓGICA DE DATOS ───────────────────────────────────────────────────────────
function _renderTodo() {
  const data = {
    notas:   getRawLs('misNotas'),
    flash:   getRawLs('flash'),
    tareas:  getRawLs('tareas'),
    word:    getRawLs('word_docs'),
    links:   getRawLs('links'),
    tablero: getRawLs('tablero_items')
  };

  // KPIs
  const stats = [
    { n: 'Notas Totales',   c: data.notas.length,   i: 'fa-book-open',  col: 'var(--Futuro)' },
    { n: 'Flash Cards',     c: data.flash.length,   i: 'fa-bolt',       col: 'var(--Oro)' },
    { n: 'Tareas Pend.',    c: data.tareas.length,  i: 'fa-list-check', col: 'var(--Dulce)' },
    { n: 'Documentos',      c: data.word.length,    i: 'fa-file-word',  col: 'var(--Cielo)' }
  ];

  $('#gsStats').html(stats.map((s, i) => `
    <div class="gs_scard" style="animation-delay: ${i * 0.05}s">
      <div class="gs_scard_ico" style="color: ${s.col}; background: color-mix(in srgb, ${s.col} 15%, transparent);"><i class="fas ${s.i}"></i></div>
      <div class="gs_scard_info">
        <h3>${s.n}</h3>
        <strong>${s.c}</strong>
      </div>
    </div>
  `).join(''));

  // FEED (Igual que Smile pero adaptado al layout Gestor)
  let tl = [];
  data.flash.forEach(x   => tl.push({ ...x, mod: 'Flash',   i: 'fa-bolt',       col: 'var(--Oro)', url: 'flash' }));
  data.word.forEach(x    => tl.push({ ...x, mod: 'Word',    i: 'fa-file-word',  col: 'var(--Cielo)', url: 'word' }));
  data.tareas.forEach(x  => tl.push({ ...x, mod: 'Tareas',  i: 'fa-list-check', col: 'var(--Dulce)', url: 'tareas' }));
  data.tablero.forEach(x => tl.push({ ...x, mod: 'Tablero', i: 'fa-th-large',   col: 'var(--Paz)', url: 'tablero' }));
  data.links.forEach(x   => tl.push({ ...x, mod: 'Links',   i: 'fa-link',       col: 'var(--Mora)', url: 'links' }));
  data.notas.forEach(x   => tl.push({ ...x, mod: 'Notas',   i: 'fa-book-open',  col: 'var(--Futuro)', url: 'misnotas' }));

  tl.sort((a, b) => (b.actualizado || b.creado || 0) - (a.actualizado || a.creado || 0));
  const recent = tl.slice(0, 8);

  if (recent.length) {
    const timeAgo = (ts) => {
      const diff = Math.floor((Date.now() - ts) / 60000);
      if (diff < 1) return 'Ahora';
      if (diff < 60) return `${diff} min`;
      const hrs = Math.floor(diff / 60);
      if (hrs < 24) return `${hrs} h`;
      return `${Math.floor(hrs / 24)} d`;
    };

    const stripHtml = (html) => {
      let tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    };

    $('#gsFeed').html(recent.map((x, i) => {
      let tit = x.titulo || stripHtml(x.contenido).substring(0, 40) || 'Sin título';
      return `
        <div class="gs_ritem" style="animation-delay: ${i * 0.05}s">
          <div class="gs_ritem_ico" style="color: ${x.col}; background: color-mix(in srgb, ${x.col} 12%, transparent);"><i class="fas ${x.i}"></i></div>
          <div class="gs_ritem_txt">
            <h4>${tit}</h4>
            <span>${x.mod}</span>
          </div>
          <div class="gs_ritem_time">${timeAgo(x.actualizado || x.creado)}</div>
          <a href="/${x.url}" class="gs_fi_btn nv_item" data-page="${x.url}"><i class="fas fa-arrow-right"></i></a>
        </div>
      `;
    }).join(''));
  } else {
    $('#gsFeed').html(`<div class="gs_rempty"><i class="fas fa-inbox"></i><p>Sin actividad reciente</p></div>`);
  }
}
