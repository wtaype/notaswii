import './flash.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth, wiTip, wicopy, getls, savels, Saludar, wiFade } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY = 'flash';
const uid    = () => 'fl' + Date.now();
const DEMO   = [
  { id: 'ej1', pin: true, contenido: '⚡ ¡Bienvenido a Flash!\nEscribe aquí cualquier idea suelta y dale a Enter.', creado: Date.now() },
  { id: 'ej2', pin: false, contenido: '☁️ Crea una cuenta para sincronizar todos tus flashes en la nube.', creado: Date.now() - 1000 }
];
const ls     = {
  get: ()  => {
    try {
      const val = localStorage.getItem(LS_KEY);
      if (val === null && !wiAuth.user) return [...DEMO];
      return JSON.parse(val || '[]');
    } catch { return wiAuth.user ? [] : [...DEMO]; }
  },
  set: (d) => localStorage.setItem(LS_KEY, JSON.stringify(d))
};

// ── TIEMPO RELATIVO ──────────────────────────────────────────
const tiempoAtras = (ts) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)  return 'Justo ahora';
  const m = Math.floor(s / 60); if (m < 60) return `Hace ${m} min`;
  const h = Math.floor(m / 60); if (h < 24) return `Hace ${h}h`;
  return new Date(ts).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
};

// ── TARJETA ──────────────────────────────────────────────────
const tplFlash = ({ id, pin, synced, creado, contenido }) => `
  <div class="fl_card${pin ? ' fl_card_pinned' : ''}" data-id="${id}">
    <div class="fl_card_head">
      <div class="fl_card_time"><i class="fas fa-bolt"></i> ${tiempoAtras(creado)}</div>
      <div class="fl_card_acts">
        <button class="fl_act fl_act_copy"  data-id="${id}" ${wiTip('Copiar contenido')}><i class="fas fa-copy"></i></button>
        <button class="fl_act fl_act_pin${pin ? ' active' : ''}" data-id="${id}" ${wiTip(pin ? 'Quitar pin' : 'Fijar')}><i class="fas fa-thumbtack"></i></button>
        <button class="fl_act fl_act_cloud${synced ? ' synced' : ''}" data-id="${id}" ${wiTip(synced ? 'Guardado en nube' : 'Pendiente de subir')}><i class="fas ${synced ? 'fa-cloud' : 'fa-cloud-arrow-up'}"></i></button>
        <button class="fl_act fl_act_edit"  data-id="${id}" ${wiTip('Editar')}><i class="fas fa-pen"></i></button>
        <button class="fl_act fl_act_del"   data-id="${id}" ${wiTip('Eliminar', undefined, 'error')}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="fl_card_body">${(contenido || '').replace(/\n/g, '<br>')}</div>
  </div>`;

// ── FIRESTORE ────────────────────────────────────────────────
const getFS = async () => {
  const { db } = await import('../firebase.js');
  return { db, ...await import('firebase/firestore') };
};

const guardarNube = async (f) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'flash', f.id), {
      id: f.id, usuario: wi.usuario, email: wi.email,
      contenido: String(f.contenido || ''), pin: !!f.pin,
      creado: serverTimestamp(), actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[flash] guardarNube:', e); }
};

const actualizarNube = async (f) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, updateDoc, serverTimestamp } = await getFS();
    await updateDoc(doc(db, 'flash', f.id), { contenido: String(f.contenido || ''), pin: !!f.pin, actualizado: serverTimestamp() });
  } catch(e) { console.error('[flash] actualizarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try { const { db, doc, deleteDoc } = await getFS(); await deleteDoc(doc(db, 'flash', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  try {
    const { db, collection, getDocs, query, where } = await getFS();
    const snap = await getDocs(query(collection(db, 'flash'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return { id: d.id, contenido: x.contenido || '', pin: !!x.pin, creado: x.creado?.toMillis?.() || Date.now(), synced: true };
    });
  } catch { return null; }
};

// ── RENDER HTML ──────────────────────────────────────────────
export const render = () => {
  const saludo = wiAuth.user ? `${Saludar()}${wiAuth.user.nombre} ⚡` : 'Captura al instante';
  return `
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">${saludo}</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Tu próxima gran idea..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" ${wiTip('Guardar (Enter)')}><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift+Enter</strong> para nueva línea</div>
  </div>
  <div class="fl_timeline">
    <div class="fl_timeline_tit">
      <button id="fl_btn_refresh" class="fl_refresh_btn" style="display:none" ${wiTip('Actualizar desde la nube')}>
        <i class="fas fa-clock-rotate-left"></i>
      </button>
      Tus últimos flashes
    </div>
    <div id="fl_grid" class="fl_grid">
      <div class="fl_skeleton"></div><div class="fl_skeleton"></div><div class="fl_skeleton"></div>
    </div>
  </div>
</div>`;
};

// ── INIT ─────────────────────────────────────────────────────
let unsub = null;

export const init = async () => {
  const $inp = $('#fl_input');
  let flashes = ls.get();

  // ── Helpers UI ─────────────────────────────────────────
  const skeleton  = () => $('#fl_grid').html('<div class="fl_skeleton"></div>'.repeat(3));
  const cloudSync = (id) => $(`[data-id="${id}"] .fl_act_cloud`)
    .removeClass('fl_act fl_act_cloud').addClass('fl_act fl_act_cloud synced')
    .attr('title', 'Guardado en nube').html('<i class="fas fa-cloud"></i>');

  const sorted    = () => [...flashes].sort((a,b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return (b.creado||0) - (a.creado||0);
  }).slice(0, 50);

  // wiFade: transición suave al actualizar la lista
  const render$ = async () => {
    const lista = sorted();
    await wiFade('#fl_grid', lista.length
      ? lista.map(tplFlash).join('')
      : '<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>', 80);
    if (lista.length) showi(['.fl_grid > *'], 50);
  };

  const syncNube = async (useSkeleton = false) => {
    if (!wiAuth.user) return;
    if (useSkeleton) skeleton();
    const $ico = $('#fl_btn_refresh i').addClass('fl_spin');
    try {
      const remotos = await cargarNube();
      if (remotos) {
        flashes = remotos;
        ls.set(flashes);
      }
    } finally { $ico.removeClass('fl_spin'); render$(); }
  };

  // ── Guardar nuevo flash ─────────────────────────────────
  const guardarFlash = () => {
    const val = $inp.val().trim(); if (!val) return;
    flashes = flashes.filter(f => !f.id.startsWith('ej'));
    const f = { id: uid(), contenido: val, pin: false, creado: Date.now() };
    flashes.unshift(f);
    ls.set(flashes);
    $inp.val('').css('height', 'auto');
    $('.fl_input_box').removeClass('active');
    Notificacion('¡Flash capturado! ⚡', 'success');
    render$();
    if (wiAuth.user) guardarNube(f).then(() => { f.synced = true; ls.set(flashes); cloudSync(f.id); });
  };

  // ── Eventos ─────────────────────────────────────────────
  const findFlash = (id) => flashes.find(f => f.id === id);

  $inp.on('input', function() {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
    $('.fl_input_box').toggleClass('active', !!this.value.trim());
  });

  $(document)
    .on('click', '#fl_btn_send',    guardarFlash)
    .on('click', '#fl_btn_refresh', () => syncNube(true))
    .on('keydown', '#fl_input',     (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); guardarFlash(); } })
    .on('click', '.fl_act_copy', function() {
      const f = findFlash($(this).data('id')); if (!f) return;
      wicopy(f.contenido, this, '¡Copiado!');
    })
    .on('click', '.fl_act_del', function() {
      const id = $(this).data('id');
      if (!confirm('¿Eliminar este flash?')) return;
      flashes = flashes.filter(f => f.id !== id);
      ls.set(flashes);
      $(this).closest('.fl_card').slideUp(200, function() { $(this).remove(); });
      Notificacion('Flash eliminado', 'info');
      if (wiAuth.user) eliminarNube(id);
    })
    .on('click', '.fl_act_pin', function() {
      const id = $(this).data('id');
      const f  = findFlash(id); if (!f) return;
      f.pin = !f.pin;
      ls.set(flashes); render$();
      Notificacion(f.pin ? 'Fijado ✓' : 'Desanclado', 'success');
      if (wiAuth.user) actualizarNube(f).then(() => cloudSync(f.id));
    })
    .on('click', '.fl_act_edit', function() {
      const id = $(this).data('id');
      const f  = findFlash(id); if (!f) return;
      const $body = $(this).closest('.fl_card').find('.fl_card_body');
      $body.html(`<textarea class="fl_edit_ta">${f.contenido}</textarea>
        <div class="fl_edit_acts">
          <button class="fl_edit_ok"><i class="fas fa-check"></i> Guardar</button>
          <button class="fl_edit_cancel"><i class="fas fa-xmark"></i></button>
        </div>`);
      const $ta = $body.find('.fl_edit_ta').focus();
      $ta.on('input', function() { this.style.height = 'auto'; this.style.height = `${this.scrollHeight}px`; });
      $body.find('.fl_edit_cancel').on('click', render$);
      $body.find('.fl_edit_ok').on('click', () => {
        const nuevo = $ta.val().trim(); if (!nuevo) return;
        Object.assign(f, { contenido: nuevo, actualizado: Date.now() });
        ls.set(flashes); render$();
        Notificacion('Flash actualizado ✓', 'success');
        if (wiAuth.user) actualizarNube(f).then(() => cloudSync(f.id));
      });
    });

  showi(['.fl_hero > *', '.fl_timeline_tit'], 60);
  render$(); // Carga los DEMO locales al instante

  // Auth: wiAuth v3.0 reacciona de inmediato si hay sesión
  unsub = wiAuth.on(async wi => {
    $('#fl_btn_refresh').toggle(!!wi);
    if (wi) {
      await syncNube(true);
    } else {
      localStorage.removeItem(LS_KEY); flashes = ls.get(); render$();
    }
  });

  setTimeout(() => $inp.focus(), 300);
  console.log(`⚡ ${app} ${version} · Flash OK`);
};

export const cleanup = () => {
  unsub?.();
  $(document).off('click keydown', '#fl_input, #fl_btn_send, #fl_btn_refresh, .fl_act_del, .fl_act_pin, .fl_act_edit, .fl_act_copy');
};
