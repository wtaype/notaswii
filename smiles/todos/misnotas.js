import './misnotas.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { wiAuth, Notificacion, wiTip, showi } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY    = 'misNotas';
const MAX_LOCAL = 20;
const uid       = () => 'min' + Date.now();

const tipos = {
  idea:  { icon: 'fa-lightbulb',    label: 'Idea',  color: '#0EBEFF' },
  nota:  { icon: 'fa-file-lines',   label: 'Nota',  color: '#29C72E' },
  tarea: { icon: 'fa-check-double', label: 'Tarea', color: '#7000FF' },
  link:  { icon: 'fa-link',         label: 'Link',  color: '#FFB800' },
};

const cargarLocal  = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]').map(n => ({ ...n, link: n.link || n.url || '', pin: n.pin ?? n.fijada ?? false, creado: n.creado || n.fecha || Date.now() })); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const autoTitulo   = (tipo, lista) => `${tipos[tipo]?.label || 'Nota'} ${lista.filter(n => n.tipo === tipo).length + 1}`;

// ── FIRESTORE (una sola lectura al init, no tiempo real) ────
let _db = null;
const getDb = async () => { if (_db) return _db; try { const { db } = await import('../firebase.js'); _db = db; return db; } catch { return null; } };

const guardarNube = async (n) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  const db = await getDb(); if (!db) return;
  try {
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    const isNew = !n.synced;
    if (isNew) n.synced = true;
    await setDoc(doc(db, 'misnotas', n.id), {
      usuario:   String(wi.usuario  || ''),
      email:     String(wi.email    || ''),
      titulo:    String(n.titulo    || ''),
      contenido: String(n.contenido || ''),
      link:      String(n.link      || ''),
      pin:       !!n.pin,
      tipo:      n.tipo || 'idea',
      ...(isNew ? { creado: serverTimestamp() } : { actualizado: serverTimestamp() })
    }, { merge: true });
  } catch(e) { console.error('[misnotas] guardarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  const db = await getDb(); if (!db) return;
  try { const { doc, deleteDoc } = await import('firebase/firestore'); await deleteDoc(doc(db, 'misnotas', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  const db = await getDb(); if (!db) return null;
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const snap = await getDocs(query(collection(db, 'misnotas'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return { id: d.id, tipo: x.tipo || 'idea', titulo: x.titulo || '', contenido: x.contenido || '', link: String(x.link || ''), pin: !!x.pin, creado: x.creado?.toMillis?.() || Date.now(), synced: true };
    });
  } catch { return null; }
};

// ── ESTADO ──────────────────────────────────────────────────
let notas = [], filtroTipo = 'todas', filtroBusq = '', modoEdicion = null, tipoActual = 'idea';

// ── TARJETA ──────────────────────────────────────────────────
const tplNota = (n) => {
  const t    = tipos[n.tipo] || tipos.idea;
  const fecha = new Date(n.creado).toLocaleDateString('es-PE', { day:'2-digit', month:'short', year:'numeric' });
  const prev = (n.contenido || '').slice(0, 120);
  return `
  <article class="mn_card" data-id="${n.id}" data-tipo="${n.tipo}" style="--bc:${t.color}" title="Clic para editar">
    <div class="mn_card_bar"></div>
    <div class="mn_card_top">
      <span class="mn_badge"><i class="fas ${t.icon}"></i> ${t.label}</span>
      <div class="mn_card_acts">
        <button class="mn_act mn_act_copy" data-id="${n.id}" ${wiTip('Copiar')}><i class="fas fa-copy"></i></button>
        <button class="mn_act mn_act_del"  data-id="${n.id}" ${wiTip('Eliminar','','error')}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <h3 class="mn_card_tit">${n.titulo || autoTitulo(n.tipo, notas)}</h3>
    ${n.link ? `<a class="mn_card_link" href="${n.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fas fa-arrow-up-right-from-square"></i> ${n.link}</a>` : ''}
    ${prev ? `<p class="mn_card_body">${prev}${(n.contenido||'').length > 120 ? '…' : ''}</p>` : ''}
    <div class="mn_card_foot">
      <span class="mn_fecha"><i class="fas fa-clock"></i> ${fecha}</span>
      <div class="mn_card_foot_right">
        ${n.pin ? '<span class="mn_pin"><i class="fas fa-thumbtack"></i></span>' : ''}
        <i class="fas fa-chevron-right mn_card_arr"></i>
      </div>
    </div>
  </article>`;
};

const tplVacia = () => `<div class="mn_empty"><div class="mn_empty_ico"><i class="fas fa-note-sticky"></i></div><h3>Sin notas aquí</h3><p>${filtroBusq ? `Sin resultados para "<strong>${filtroBusq}</strong>"` : 'Escribe algo y guárdalo'}</p></div>`;

// ── RENDER PRINCIPAL ────────────────────────────────────────
export const render = () => `
<div class="mn_wrap">
  <div class="mn_header">
    <div class="mn_header_left">
      <h1 class="mn_titulo"><i class="fas fa-note-sticky"></i> Mis Notas</h1>
      <span class="mn_count" id="mn_count">0 notas</span>
    </div>
    <div class="mn_header_right">
      <div class="mn_search_box">
        <i class="fas fa-search mn_search_ico"></i>
        <input type="text" class="mn_search" id="mn_search" placeholder="Buscar…" autocomplete="off" />
        <button class="mn_search_clear dpn" id="mn_search_clear"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="mn_filtros" id="mn_filtros">
        <button class="mn_filtro active" data-tipo="todas" ${wiTip('Todas')}><i class="fas fa-layer-group"></i></button>
        ${Object.entries(tipos).map(([k,v]) => `<button class="mn_filtro" data-tipo="${k}" style="--fc:${v.color}" ${wiTip(v.label)}><i class="fas ${v.icon}"></i></button>`).join('')}
      </div>
    </div>
  </div>

  <div class="mn_layout">
    <aside class="mn_panel" id="mn_panel">
      <div class="mn_panel_head">
        <h2 class="mn_panel_tit" id="mn_panel_tit">Nueva Nota</h2>
        <button class="mn_panel_new" id="mn_panel_new" ${wiTip('Nueva nota')}>Nuevo <i class="fas fa-plus"></i></button>
      </div>
      <div class="mn_form" id="mn_form">
        <div class="mn_tipo_sel" id="mn_tipo_sel">
          ${Object.entries(tipos).map(([k,v]) => `<button class="mn_tipo_btn ${k==='idea'?'active':''}" data-tipo="${k}" style="--tc:${v.color}" ${wiTip(v.label)}><i class="fas ${v.icon}"></i> ${v.label}</button>`).join('')}
        </div>
        <div class="mn_form_row">
          <input type="text" id="mn_inp_titulo" class="mn_inp" placeholder="Título (opcional)…" maxlength="80" />
        </div>
        <div class="mn_form_row mn_row_flex">
          <textarea id="mn_inp_cuerpo" class="mn_textarea" placeholder="Tu idea aquí…" rows="5"></textarea>
          <div class="mn_char_count" id="mn_char_count">0 / 1000</div>
        </div>
        <!-- Link siempre visible, se guarda como string -->
        <div class="mn_form_row">
          <input type="text" id="mn_inp_link" class="mn_inp mn_inp_link" placeholder="Link (opcional): https://…" autocomplete="off" />
        </div>
        <div class="mn_form_row mn_row_pin">
          <label class="mn_toggle_label">
            <input type="checkbox" id="mn_chk_pin" />
            <span class="mn_toggle"></span>
            <span>Fijar al inicio</span>
          </label>
        </div>
        <div class="mn_form_acts">
          <button class="mn_btn_save" id="mn_btn_save">
            <i class="fas fa-floppy-disk"></i>
            <span id="mn_save_lbl">Guardar</span>
            <span class="mn_shortcut">Ctrl+↵</span>
          </button>
        </div>
        ${!wiAuth.user ? `
        <div class="mn_auth_banner" id="mn_auth_banner">
          <i class="fas fa-cloud-arrow-up"></i>
          <p>Crea una cuenta para sincronizar en todos tus dispositivos</p>
          <button class="mn_btn_login bt_auth login"><i class="fas fa-user-plus"></i> Crear cuenta</button>
        </div>` : ''}
      </div>
    </aside>
    <div class="mn_grid" id="mn_grid">
      <div class="mn_skeleton"></div><div class="mn_skeleton"></div><div class="mn_skeleton"></div>
    </div>
  </div>
  <button class="mn_fab" id="mn_fab" ${wiTip('Nueva nota')}><i class="fas fa-plus"></i></button>
</div>`;

// ── RENDER LISTA ─────────────────────────────────────────────
const renderNotas = () => {
  let lista = [...notas].sort((a,b) => { if(a.pin&&!b.pin)return -1; if(!a.pin&&b.pin)return 1; return(b.creado||0)-(a.creado||0); });
  if (filtroTipo !== 'todas') lista = lista.filter(n => n.tipo === filtroTipo);
  if (filtroBusq) { const q = filtroBusq.toLowerCase(); lista = lista.filter(n => n.titulo?.toLowerCase().includes(q) || n.contenido?.toLowerCase().includes(q) || n.link?.toLowerCase().includes(q)); }
  $('#mn_grid').html(lista.length ? lista.map(tplNota).join('') : tplVacia());
  if (modoEdicion) $(`[data-id="${modoEdicion}"]`).addClass('mn_card_active');
  $('#mn_count').text(`${notas.length} nota${notas.length !== 1 ? 's' : ''}`);
  showi(['.mn_grid > *'], 80);
};

// ── FORM HELPERS ─────────────────────────────────────────────
const setTipo = (t) => {
  tipoActual = t;
  const ph = { idea:'Tu idea brillante aquí…', nota:'Escribe tu nota…', tarea:'Describe la tarea…', link:'Contenido del link…' };
  $('#mn_inp_cuerpo').attr('placeholder', ph[t] || 'Escribe…');
};

const limpiarForm = () => {
  modoEdicion = null; tipoActual = 'idea';
  $('#mn_panel_tit').text('Nueva Nota');
  $('#mn_save_lbl').text('Guardar');
  $('#mn_inp_titulo, #mn_inp_link').val('');
  $('#mn_inp_cuerpo').val('').trigger('input');
  $('#mn_chk_pin').prop('checked', false);
  $('#mn_tipo_sel .mn_tipo_btn').removeClass('active');
  $('#mn_tipo_sel [data-tipo="idea"]').addClass('active');
  setTipo('idea');
  $('#mn_grid .mn_card_active').removeClass('mn_card_active');
  $('#mn_inp_cuerpo').focus();
};

const cargarEnForm = (n) => {
  modoEdicion = n.id; tipoActual = n.tipo || 'idea';
  $('#mn_panel_tit').text('Editando');
  $('#mn_save_lbl').text('Actualizar');
  $('#mn_inp_titulo').val(n.titulo || '');
  $('#mn_inp_cuerpo').val(n.contenido || '').trigger('input');
  $('#mn_inp_link').val(n.link || '');
  $('#mn_chk_pin').prop('checked', !!n.pin);
  $('.mn_tipo_btn').removeClass('active');
  $(`.mn_tipo_btn[data-tipo="${n.tipo}"]`).addClass('active');
  setTipo(n.tipo);
  $('.mn_card').removeClass('mn_card_active');
  $(`[data-id="${n.id}"]`).addClass('mn_card_active');
};

// ── GUARDAR / ELIMINAR ───────────────────────────────────────
const guardar = async () => {
  const tipo     = tipoActual;
  const titulo   = $('#mn_inp_titulo').val().trim() || autoTitulo(tipo, modoEdicion ? notas.filter(n => n.id !== modoEdicion) : notas);
  const contenido = $('#mn_inp_cuerpo').val().trim();
  let   link     = String($('#mn_inp_link').val() || '').trim();
  if (link && !/^https?:\/\//i.test(link)) link = 'https://' + link;
  const pin = !!$('#mn_chk_pin').prop('checked');

  if (!contenido && !link) {
    Notificacion('Escribe algo antes de guardar', 'warning');
    $('#mn_inp_cuerpo').focus();
    return;
  }

  const esAuth = !!wiAuth.user;
  if (!esAuth && notas.length >= MAX_LOCAL && !modoEdicion) {
    Notificacion(`Límite de ${MAX_LOCAL} notas locales. ¡Crea una cuenta!`, 'warning', 5000);
    return;
  }

  let obj;
  if (modoEdicion) {
    const idx = notas.findIndex(n => n.id === modoEdicion);
    if (idx > -1) { notas[idx] = { ...notas[idx], tipo, titulo, contenido, link, pin, actualizado: Date.now() }; obj = notas[idx]; }
  } else {
    obj = { id: uid(), tipo, titulo, contenido, link, pin, creado: Date.now() };
    notas.unshift(obj);
  }

  guardarLocal(notas);
  if (esAuth && obj) guardarNube(obj);
  renderNotas();
  Notificacion(modoEdicion ? 'Nota actualizada ✓' : 'Nota guardada ✓', 'success');
  limpiarForm();
};

const eliminar = (id) => {
  if (!confirm('¿Eliminar esta nota?')) return;
  notas = notas.filter(n => n.id !== id);
  guardarLocal(notas);
  if (wiAuth.user) eliminarNube(id);
  if (modoEdicion === id) limpiarForm();
  renderNotas();
  Notificacion('Nota eliminada', 'info');
};

// ── INIT ─────────────────────────────────────────────────────
export const init = async () => {
  notas = cargarLocal();
  renderNotas();

  // Cargar de nube solo UNA VEZ al inicio (plan gratuito: sin tiempo real)
  if (wiAuth.user) {
    const remotas = await cargarNube();
    if (remotas?.length) {
      const idsRem = new Set(remotas.map(n => n.id));
      const locales = notas.filter(n => !idsRem.has(n.id));
      if (locales.length) locales.forEach(n => guardarNube(n));
      notas = [...remotas, ...locales];
      guardarLocal(notas);
      renderNotas();
    }
  }

  // Eventos
  $(document)
    .on('click', '.mn_card',      function(e) { if (!$(e.target).closest('.mn_act').length) { const n = notas.find(x => x.id === $(this).data('id')); if(n) cargarEnForm(n); } })
    .on('click', '.mn_act_copy',  function(e) { e.stopPropagation(); const n = notas.find(x => x.id === $(this).data('id')); if(n) navigator.clipboard?.writeText(n.contenido || n.link || ''); Notificacion('Copiado ✓','success'); })
    .on('click', '.mn_act_del',   function(e) { e.stopPropagation(); eliminar($(this).data('id')); })
    .on('click', '.mn_tipo_btn',  function() { $('.mn_tipo_btn').removeClass('active'); $(this).addClass('active'); setTipo($(this).data('tipo')); })
    .on('click', '#mn_panel_new, #mn_fab', limpiarForm)
    .on('click', '#mn_btn_save',  guardar)
    .on('keydown','#mn_inp_cuerpo, #mn_inp_titulo, #mn_inp_link', e => { if(e.ctrlKey && e.key==='Enter') guardar(); })
    .on('input',  '#mn_inp_cuerpo', function() { const n=$(this).val().length; $('#mn_char_count').text(`${n} / 1000`).toggleClass('mn_char_warn', n>900); })
    .on('click',  '.mn_filtro',   function() { $('.mn_filtro').removeClass('active'); $(this).addClass('active'); filtroTipo=$(this).data('tipo'); renderNotas(); });

  $('#mn_search').on('input', function() { filtroBusq=$(this).val().trim(); $('#mn_search_clear').toggleClass('dpn',!filtroBusq); renderNotas(); });
  $('#mn_search_clear').on('click', () => { $('#mn_search').val(''); filtroBusq=''; $('#mn_search_clear').addClass('dpn'); renderNotas(); });

  // Auth: solo eliminar/mostrar banner, NO recargar Firestore (evitar lecturas extra)
  wiAuth.on(wi => {
    if (wi) $('#mn_auth_banner').stop(true).fadeOut(150, function(){ $(this).remove(); });
    else if (!$('#mn_auth_banner').length) $('#mn_form').append(`<div class="mn_auth_banner" id="mn_auth_banner" style="display:none"><i class="fas fa-cloud-arrow-up"></i><p>Crea una cuenta para sincronizar</p><button class="mn_btn_login bt_auth login"><i class="fas fa-user-plus"></i> Crear cuenta</button></div>`), $('#mn_auth_banner').fadeIn(250);
  });

  $('#mn_inp_cuerpo').focus();
  console.log(`📋 ${app} ${version} · MisNotas OK`);
};

export const cleanup = () => { $(document).off('.mn'); console.log('🧹 MisNotas OK'); };
