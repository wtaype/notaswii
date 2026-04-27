import './tablero.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth, wiTip, getls, savels, Saludar, wiFade } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY = 'tablero_items';
const uid    = () => 'tb' + Date.now();
const DEMO = [
  { id: 'ej1', titulo: '¡Bienvenido al Tablero!', contenido: 'Aquí puedes organizar tus ideas de forma visual.', color: '#87CEEB', pin: true, creado: Date.now(), synced: false },
  { id: 'ej2', titulo: 'Tip visual', contenido: 'Usa colores pasteles suaves para categorizar.', color: '#FFB6C1', pin: false, creado: Date.now() - 1000, synced: false }
];

const ls = {
  get: () => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw === null && !wiAuth.user) return [...DEMO];
    const d = getls(LS_KEY) || (raw?.startsWith('[') ? JSON.parse(raw) : []);
    return d;
  },
  set: (ns) => savels(LS_KEY, ns, 8760) // 1 año
};

// Default pastel palette for dots
const PALETTE = [
  { c: '', hex: '' }, // Default white/dark
  { c: 'var(--Cielo)', hex: '#87CEEB' },
  { c: 'var(--Dulce)', hex: '#FFB6C1' },
  { c: 'var(--Paz)', hex: '#98FB98' },
  { c: 'var(--Oro)', hex: '#FFD700' },
  { c: 'var(--Mora)', hex: '#DDA0DD' }
];

// ── FIRESTORE ────────────────────────────────────────────────
const getFS = async () => {
  const { db } = await import('../firebase.js');
  return { db, ...await import('firebase/firestore') };
};

const guardarNube = async (d) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'tableroNotas', d.id), {
      id: d.id, usuario: wi.usuario, email: wi.email,
      titulo: String(d.titulo || ''), contenido: String(d.contenido || ''),
      color: String(d.color || ''), pin: !!d.pin, 
      creado: serverTimestamp(), actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[tablero] guardarNube:', e); }
};

const actualizarNube = async (d) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, updateDoc, serverTimestamp } = await getFS();
    await updateDoc(doc(db, 'tableroNotas', d.id), {
      titulo: String(d.titulo || ''), contenido: String(d.contenido || ''),
      color: String(d.color || ''), pin: !!d.pin, actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[tablero] actualizarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try { const { db, doc, deleteDoc } = await getFS(); await deleteDoc(doc(db, 'tableroNotas', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  try {
    const { db, collection, getDocs, query, where } = await getFS();
    const snap = await getDocs(query(collection(db, 'tableroNotas'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return {
        id: d.id, titulo: x.titulo || '', contenido: x.contenido || '',
        color: x.color || '', pin: !!x.pin, 
        creado: x.creado?.toMillis?.() || Date.now(), synced: true
      };
    });
  } catch { return null; }
};

// ── RENDER PRINCIPAL ──────────────────────────────────────────
export const render = () => {
  const saludo = wiAuth.user ? `${Saludar()}${wiAuth.user.nombre || wiAuth.user.usuario}` : 'Tu Tablero Visual';
  return `
<div class="tb_wrap">
  <div class="tb_hero">
    <div class="tb_hero_left">
      <h1><i class="fas fa-th-large"></i> ${saludo}</h1>
      <p id="tb_count">0 ideas guardadas</p>
    </div>
    <div class="tb_hero_right">
      <button class="tb_btn_refresh" id="tb_btn_refresh" style="display:none" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
      <button class="tb_btn_new" id="tb_btn_add"><i class="fas fa-plus"></i> Nueva Nota</button>
    </div>
  </div>

  <div id="tb_grid" class="tb_masonry">
    <div class="tb_skeleton"></div><div class="tb_skeleton"></div><div class="tb_skeleton"></div>
  </div>

  <!-- MODAL EDITOR -->
  <div id="tb_modal_wrap" class="tb_modal_overlay">
    <div class="tb_modal" id="tb_modal_box">
      <input type="text" id="tb_in_tit" class="tb_modal_in_tit" placeholder="Título de la idea..." autocomplete="off">
      <textarea id="tb_in_cnt" class="tb_modal_in_cnt" placeholder="Escribe algo increíble..."></textarea>
      
      <div class="tb_modal_foot">
        <div class="tb_theme_picker">
          <div class="tb_theme_dot active" data-hex="" title="Predeterminado" style="background:var(--bg); border: 1px solid var(--brd);"></div>
          <div class="tb_theme_dot" data-hex="#87CEEB" title="Cielo" style="background:var(--Cielo);"></div>
          <div class="tb_theme_dot" data-hex="#FFB6C1" title="Dulce" style="background:var(--Dulce);"></div>
          <div class="tb_theme_dot" data-hex="#98FB98" title="Paz" style="background:var(--Paz);"></div>
          <div class="tb_theme_dot" data-hex="#FFD700" title="Oro" style="background:var(--Oro);"></div>
          <div class="tb_theme_dot" data-hex="#DDA0DD" title="Mora" style="background:var(--Mora);"></div>
          <input type="color" id="tb_in_color" class="tb_theme_custom" ${wiTip('Color personalizado', undefined, 'top')} value="#cccccc">
        </div>
        <div style="display:flex; gap:1vh; align-items:center;">
           <button class="tb_btn_save" id="tb_btn_close" style="background:var(--bg); color:var(--tx2);">Cancelar</button>
           <button class="tb_btn_save" id="tb_btn_save_item">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// ── LÓGICA DE ESTADO ──────────────────────────────────────────
let unsub = null;

export const init = async () => {
  let items = ls.get();
  let editingId = null;
  let currentColor = ''; // color actual del modal en hexadecimal

  const skeleton = () => $('#tb_grid').html('<div class="tb_skeleton"></div>'.repeat(3));
  const cloudSync = (id) => $(`[data-id="${id}"] .tb_act_cloud`)
    .removeClass('fa-cloud-arrow-up tb_cloud_pen').addClass('fa-cloud tb_cloud_ok')
    .attr('data-witip', 'En nube');

  const resumen = () => $('#tb_count').text(`${items.length} idea${items.length !== 1 ? 's' : ''} guardada${items.length !== 1 ? 's' : ''}`);

  const sorted = () => [...items].sort((a,b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return (b.creado||0) - (a.creado||0);
  });

  const tplCard = (d) => `
    <article class="tb_card${!d.color ? ' default-color' : ''}${d.pin ? ' tb_pinned' : ''}" id="tb_${d.id}" data-id="${d.id}" ${d.color ? `style="--card-color: ${d.color};"` : ''}>
      ${d.titulo ? `<h3 class="tb_card_title">${d.titulo}</h3>` : ''}
      ${d.contenido ? `<p class="tb_card_content">${d.contenido}</p>` : ''}
      
      <div class="tb_card_acts">
        <button class="tb_btn_act tb_act_pin${d.pin ? ' active' : ''}" data-id="${d.id}" ${wiTip(d.pin ? 'Quitar pin' : 'Fijar', undefined, 'top')}><i class="fas fa-thumbtack"></i></button>
        <button class="tb_btn_act edit" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="tb_btn_act del" ${wiTip('Eliminar', undefined, 'top')}><i class="fas fa-trash-can"></i></button>
        <i class="tb_btn_act tb_act_cloud fas ${d.synced ? 'fa-cloud tb_cloud_ok' : 'fa-cloud-arrow-up tb_cloud_pen'}" ${wiTip(d.synced ? 'En nube' : 'Local', undefined, 'top')}></i>
      </div>
    </article>
  `;

  const render$ = async () => {
    const lista = sorted();
    await wiFade('#tb_grid', lista.length 
      ? lista.map(tplCard).join('') 
      : `<div class="tb_empty"><i class="fas fa-magic"></i><h2>Tu tablero está vacío</h2><p>Añade tu primera nota visual colorida para comenzar a organizar tus ideas.</p></div>`, 
    80);
    if (lista.length) showi(['.tb_grid > *'], 60);
    resumen();
  };

  // Lógica syncNube eliminada: usamos la descarga reactiva pura en wiAuth.on

  // ── MODAL ──
  const applyModalColor = (hex) => {
    currentColor = hex;
    const $m = $('#tb_modal_box');
    $('.tb_theme_dot').removeClass('active');
    
    if (!hex) {
      $m.addClass('default-color').removeAttr('style');
      $('.tb_theme_dot[data-hex=""]').addClass('active');
      $('#tb_in_color').val('#cccccc');
    } else {
      $m.removeClass('default-color').attr('style', `--card-color: ${hex};`);
      const $dot = $(`.tb_theme_dot[data-hex="${hex.toUpperCase()}"]`);
      if ($dot.length) {
        $dot.addClass('active');
        $('#tb_in_color').val(hex);
      } else {
        $('#tb_in_color').val(hex); // Personalizado
      }
    }
  };

  const abrirModal = (id = null) => {
    editingId = id;
    if (id) {
      const it = items.find(x => x.id === id);
      if(it) {
        $('#tb_in_tit').val(it.titulo);
        $('#tb_in_cnt').val(it.contenido);
        applyModalColor(it.color || '');
      }
    } else {
      $('#tb_in_tit').val('');
      $('#tb_in_cnt').val('');
      applyModalColor('');
    }
    
    $('#tb_modal_wrap').addClass('active');
    setTimeout(() => $('#tb_in_cnt').focus(), 100);
  };

  const cerrarModal = () => { $('#tb_modal_wrap').removeClass('active'); editingId = null; };

  // ── EVENTOS ─────────────────────────────────────────────
  $(document)
    .on('click', '#tb_btn_add', () => abrirModal())
    .on('click', '#tb_btn_close', cerrarModal)
    .on('click', '#tb_modal_wrap', function(e) { if (e.target === this) cerrarModal(); })
    .on('click', '#tb_btn_refresh', async function() {
      const $i = $(this).find('i'); if ($i.hasClass('tb_spin')) return;
      $i.addClass('tb_spin');
      const remotos = await cargarNube();
      if (remotos) {
        items = remotos;
        ls.set(items); render$();
        Notificacion('Sincronizado ✓', 'success');
      }
      $i.removeClass('tb_spin');
    })
    
    // Paleta de colores
    .on('click', '.tb_theme_dot', function() { applyModalColor($(this).data('hex')); })
    .on('input', '#tb_in_color', function() { applyModalColor($(this).val()); })
    
    // Guardar
    .on('click', '#tb_btn_save_item', () => {
      const tit = $('#tb_in_tit').val().trim();
      const cnt = $('#tb_in_cnt').val().trim();
      
      if (!tit && !cnt) { Notificacion('La nota está vacía', 'warning'); return; }
      
      if (editingId) {
        const it = items.find(x => x.id === editingId);
        if (it) {
          it.titulo = tit; it.contenido = cnt; it.color = currentColor;
          it.creado = Date.now(); // bump to top
          it.synced = false;
        }
        items = items.filter(x => x.id !== editingId);
        items.unshift(it);
        ls.set(items);
        Notificacion('Nota actualizada', 'success');
        if (wiAuth.logged) actualizarNube(it).then(() => { it.synced = true; ls.set(items); cloudSync(it.id); });
      } else {
        items = items.filter(n => !n.id.startsWith('ej')); // Limpiar DEMO
        const ni = { id: uid(), titulo: tit, contenido: cnt, color: currentColor, pin: false, creado: Date.now(), synced: false };
        items.unshift(ni);
        ls.set(items);
        Notificacion('Nota creada', 'success');
        if (wiAuth.logged) guardarNube(ni).then(() => { ni.synced = true; ls.set(items); cloudSync(ni.id); });
      }
      
      render$();
      cerrarModal();
      showi(['.tb_card:first-child'], 0); // re-animar la primera tarjeta
    })
    
    // Pin / Despin
    .on('click', '.tb_act_pin', function(e) {
      e.stopPropagation();
      const id = $(this).data('id');
      const l = items.find(x => x.id === id); if (!l) return;
      l.pin = !l.pin;
      ls.set(items); render$();
      Notificacion(l.pin ? 'Nota fijada ✓' : 'Desanclada', 'success');
      if (wiAuth.logged) actualizarNube(l).then(() => cloudSync(id));
    })
    
    // Editar
    .on('click', '.tb_btn_act.edit, .tb_card', function(e) {
      if ($(e.target).closest('.tb_btn_act').length && !$(this).hasClass('edit')) return;
      e.stopPropagation();
      abrirModal($(this).closest('.tb_card').data('id'));
    })
    
    // Eliminar
    .on('click', '.tb_btn_act.del', function(e) {
      e.stopPropagation();
      if (!confirm('¿Eliminar esta nota del tablero?')) return;
      const $card = $(this).closest('.tb_card');
      const id = $card.data('id');
      
      items = items.filter(x => x.id !== id);
      ls.set(items);
      $card.css({ transform: 'scale(0.8)', opacity: 0 });
      setTimeout(() => { $card.remove(); resumen(); if(!items.length) render$(); }, 300);
      Notificacion('Nota eliminada', 'success');
      if (wiAuth.logged) eliminarNube(id);
    });

  showi(['.tb_hero_left', '.tb_btn_new'], 50);
  render$();

  // Auth: wiAuth v3.0 reactivo
  unsub = wiAuth.on(async wi => {
    $('#tb_btn_refresh').toggle(!!wi);
    if (wi) {
      if (items.length === 0) skeleton();
      const remotos = await cargarNube();
      items = remotos || [];
      ls.set(items); render$();
    } else {
      localStorage.removeItem(LS_KEY); items = ls.get(); render$();
    }
  });

  console.log(`✅ ${app} ${version} · Tablero OK`);
};

export const cleanup = () => {
  $(document).off('click input', '#tb_btn_add, #tb_btn_close, #tb_modal_wrap, #tb_btn_refresh, .tb_theme_dot, #tb_in_color, #tb_btn_save_item, .tb_act_pin, .tb_btn_act.edit, .tb_card, .tb_btn_act.del');
  unsub?.();
};
