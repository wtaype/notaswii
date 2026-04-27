import './tareas.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth, wiTip, wicopy, getls, savels, Saludar, wiFade } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY = 'tareas';
const uid    = () => 'tr' + Date.now();

// Normaliza datos viejos (items → tareas, done → estado) para retrocompatibilidad
const normalizar = (t) => ({
  ...t,
  tareas: (t.tareas || t.items || []).map(i => ({
    id:       i.id || uid(),
    contenido: i.contenido || i.text || '',
    estado:   i.estado || (i.done ? 'completado' : 'pendiente')
  }))
});

const DEMO = [
  { id: 'ej1', titulo: 'Mis Tareas de Hoy', tareas: [
      { id: 'ej1_1', contenido: 'Revisar pendientes', estado: 'completado' },
      { id: 'ej1_2', contenido: 'Probar crear una nueva lista', estado: 'pendiente' },
      { id: 'ej1_3', contenido: 'Sincronizar en la nube ☁️', estado: 'pendiente' }
    ], pin: true, creado: Date.now() }
];

const ls = {
  get: () => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw === null && !wiAuth.user) return [...DEMO];
    const d = getls(LS_KEY) || (raw?.startsWith('[') ? JSON.parse(raw) : []);
    return d.map(normalizar);
  },
  set: (ns) => savels(LS_KEY, ns, 8760) // 1 año
};

// ── TEMPLATES ────────────────────────────────────────────────
const tplItem = ({ id, contenido, estado }) => `
  <div class="tr_item${estado === 'completado' ? ' done' : ''}" data-iid="${id}">
    <button class="tr_check" ${wiTip(estado === 'completado' ? 'Marcar pendiente' : 'Completar')}>
      <i class="fas fa-check"></i>
    </button>
    <textarea class="tr_item_txt" rows="1" placeholder="Nueva tarea...">${contenido}</textarea>
    <button class="tr_btn_del_item" ${wiTip('Eliminar tarea', undefined, 'error')}><i class="fas fa-times"></i></button>
  </div>`;

const tplCard = (t) => {
  const items = Array.isArray(t.tareas) ? t.tareas : [];
  const total = items.length;
  const done  = items.filter(i => i.estado === 'completado').length;
  const prog  = total ? (done / total) * 100 : 0;
  const html  = [...items].sort((a,b) => a.estado === b.estado ? 0 : a.estado === 'completado' ? 1 : -1).map(tplItem).join('');
  return `
  <article class="tr_card${t.pin ? ' tr_pinned' : ''}${!items.length ? ' tr_card_empty' : ''}" id="tr_${t.id}" data-id="${t.id}">
    <div class="tr_progress"><div class="tr_progress_bar" style="width:${prog}%"></div></div>
    <div class="tr_card_head">
      <input type="text" class="tr_in_tit" value="${t.titulo || ''}" placeholder="Título de la lista...">
      <div class="tr_card_acts">
        <button class="tr_act tr_act_copy"  data-id="${t.id}" ${wiTip('Copiar tareas')}><i class="fas fa-copy"></i></button>
        <button class="tr_act tr_act_pin${t.pin ? ' active' : ''}" data-id="${t.id}" ${wiTip(t.pin ? 'Quitar pin' : 'Fijar')}><i class="fas fa-thumbtack"></i></button>
        <button class="tr_act tr_act_cloud${t.synced ? ' synced' : ''}" data-id="${t.id}" ${wiTip(t.synced ? 'Guardado en nube' : 'Pendiente')}><i class="fas ${t.synced ? 'fa-cloud' : 'fa-cloud-arrow-up'}"></i></button>
        <button class="tr_act tr_act_del"   data-id="${t.id}" ${wiTip('Eliminar lista', undefined, 'error')}><i class="fas fa-trash-can"></i></button>
      </div>
    </div>
    <div class="tr_stat">
      <span class="tr_prog_txt">${done}/${total} completadas</span>
      ${prog === 100 && total > 0 ? '<span class="tr_done_badge"><i class="fas fa-star"></i> ¡Listo!</span>' : ''}
    </div>
    <div class="tr_items">${html}</div>
    <div class="tr_add">
      <i class="fas fa-plus"></i>
      <textarea class="tr_in_add" rows="1" placeholder="Añadir tarea y presionar Enter..."></textarea>
    </div>
  </article>`;
};

// ── FIRESTORE ────────────────────────────────────────────────
const getFS = async () => {
  const { db } = await import('../firebase.js');
  return { db, ...await import('firebase/firestore') };
};

// Upsert universal: usa setDoc+merge para nunca fallar si el doc no existe aún
const guardarNube = async (t) => {
  const wi = wiAuth.user;
  if (!wi?.email) return; // solo necesita email, no usuario
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'tareas', t.id), {
      id:          t.id,
      usuario:     wi.usuario || wi.email,
      email:       wi.email,
      titulo:      String(t.titulo || ''),
      tareas:      (t.tareas || []).map(({ id, contenido, estado }) => ({ id, contenido: String(contenido || ''), estado: estado || 'pendiente' })),
      pin:         !!t.pin,
      creado:      serverTimestamp(),
      actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[tareas] guardarNube:', e); }
};

// actualizarNube ahora también usa setDoc+merge → nunca falla si el doc no existe
const actualizarNube = async (t) => {
  const wi = wiAuth.user;
  if (!wi?.email) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'tareas', t.id), {
      id:          t.id,
      usuario:     wi.usuario || wi.email,
      email:       wi.email,
      titulo:      String(t.titulo || ''),
      tareas:      (t.tareas || []).map(({ id, contenido, estado }) => ({ id, contenido: String(contenido || ''), estado: estado || 'pendiente' })),
      pin:         !!t.pin,
      actualizado: serverTimestamp()
    }, { merge: true });
  } catch(e) { console.error('[tareas] actualizarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try { const { db, doc, deleteDoc } = await getFS(); await deleteDoc(doc(db, 'tareas', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  try {
    const { db, collection, getDocs, query, where } = await getFS();
    const snap = await getDocs(query(collection(db, 'tareas'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return {
        id:      d.id,
        titulo:  x.titulo || '',
        tareas:  (x.tareas || []).map(i => ({ id: i.id || uid(), contenido: i.contenido || '', estado: i.estado || 'pendiente' })),
        pin:     !!x.pin,
        creado:  x.creado?.toMillis?.() || Date.now(),
        synced:  true
      };
    });
  } catch { return null; }
};

// ── RENDER HTML ──────────────────────────────────────────────
export const render = () => {
  const saludo = wiAuth.user ? `${Saludar()}${wiAuth.user.nombre || wiAuth.user.usuario}` : 'Mis Tareas';
  return `
<div class="tr_wrap">
  <div class="tr_hero">
    <div class="tr_hero_left">
      <h1><i class="fas fa-check-double"></i> ${saludo}</h1>
      <span id="tr_resumen" class="tr_count">0/0 completadas</span>
    </div>
    <div class="tr_hero_right">
      <button class="tr_btn_refresh" id="tr_btn_refresh" style="display:none" ${wiTip('Actualizar desde la nube')}><i class="fas fa-rotate-right"></i></button>
      <button class="tr_btn_new" id="tr_btn_new" ${wiTip('Nueva lista')}><i class="fas fa-plus"></i> Nueva lista</button>
    </div>
  </div>
  <div id="tr_grid" class="tr_grid">
    <div class="tr_skeleton"></div><div class="tr_skeleton"></div><div class="tr_skeleton"></div>
  </div>
</div>`;
};

let unsub = null;

export const init = async () => {
  let listas = ls.get();

  // ── Helpers UI ─────────────────────────────────────────
  const skeleton   = () => $('#tr_grid').html('<div class="tr_skeleton"></div>'.repeat(3));
  const cloudSync  = (id) => $(`[data-id="${id}"] .tr_act_cloud`)
    .removeClass('tr_act tr_act_cloud').addClass('tr_act tr_act_cloud synced')
    .attr('title', 'Guardado en nube').html('<i class="fas fa-cloud"></i>');

  const resumen = () => {
    let total = 0, done = 0;
    listas.forEach(l => { total += l.tareas.length; done += l.tareas.filter(i => i.estado === 'completado').length; });
    $('#tr_resumen').text(listas.length ? `${done}/${total} completadas` : '0/0');
  };

  const sorted = () => [...listas].sort((a,b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return (b.creado||0) - (a.creado||0);
  });

  const render$ = () => {
    const lista = sorted();
    $('#tr_grid').html(lista.length
      ? lista.map(tplCard).join('')
      : `<div class="tr_empty"><i class="fas fa-check-double"></i><span>Sin listas. Crea una para organizar tus tareas.</span></div>`);
    if (lista.length) showi(['.tr_grid > *'], 60);
    resumen();
    // Auto-ajustar altura de tareas existentes tras renderizar
    $('.tr_item_txt').each(function() { 
      this.style.height = 'auto'; 
      this.style.height = `${this.scrollHeight}px`; 
    });
  };

  // Carga eliminada, sync pura implementada en Auth.

  // ── Actualizar barra de progreso en vivo ────────────────
  const updateProg = ($card, lista) => {
    const items = Array.isArray(lista.tareas) ? lista.tareas : [];
    const total = items.length;
    const done  = items.filter(i => i.estado === 'completado').length;
    $card.find('.tr_progress_bar').css('width', total ? `${(done/total)*100}%` : '0%');
    $card.find('.tr_prog_txt').text(`${done}/${total} completadas`);
    // Badge "¡Listo!": insertar dinámicamente si no existe, remover si ya no aplica
    const $stat = $card.find('.tr_stat');
    const allDone = done === total && total > 0;
    if (allDone && !$stat.find('.tr_done_badge').length) {
      $stat.append('<span class="tr_done_badge"><i class="fas fa-star"></i> ¡Listo!</span>');
    } else if (!allDone) {
      $stat.find('.tr_done_badge').remove();
    }
    resumen();
  };

  const findLista = (id) => listas.find(l => l.id === id);

  // ── Eventos ─────────────────────────────────────────────
  $(document)
    // Auto-resize para textareas
    .on('input', '.tr_item_txt, .tr_in_add', function() {
      this.style.height = 'auto';
      this.style.height = `${this.scrollHeight}px`;
    })
    
    // Nueva lista
    .on('click', '#tr_btn_new', () => {
      listas = listas.filter(n => !n.id.startsWith('ej')); // Limpiar DEMO
      const t = { id: uid(), titulo: '', tareas: [], pin: false, creado: Date.now() };
      listas.unshift(t);
      ls.set(listas);
      const $card = $(tplCard(t)).css('opacity', 0);
      if ($('.tr_empty').length) render$();
      else { $('#tr_grid').prepend($card); showi([`#tr_${t.id}`], 0); }
      resumen();
      setTimeout(() => $(`#tr_${t.id} .tr_in_tit`).focus(), 150);
      // NO guardar en nube todavía — esperamos a que tenga al menos 1 tarea
    })

    // Refresh manual puro
    .on('click', '#tr_btn_refresh', async function() {
      const $i = $(this).find('i'); if ($i.hasClass('fa-spin')) return;
      $i.addClass('fa-spin');
      const remotas = await cargarNube();
      if (remotas) {
        if (JSON.stringify(remotas) !== JSON.stringify(listas)) {
          listas = remotas;
          ls.set(listas); render$();
        }
        Notificacion('Sincronizado ✓', 'success');
      }
      $i.removeClass('fa-spin');
    })

    // Cambiar título
    .on('change', '.tr_in_tit', function() {
      const id = $(this).closest('.tr_card').data('id');
      const t  = findLista(id); if (!t) return;
      t.titulo = $(this).val();
      ls.set(listas);
      // Solo sincronizar si ya tiene tareas (evitar writes en listas vacías)
      if (wiAuth.user && t.tareas.length) actualizarNube(t).then(() => cloudSync(id));
    })

    // Eliminar lista
    .on('click', '.tr_act_del', function() {
      const id = $(this).data('id');
      if (!confirm('¿Eliminar esta lista?')) return;
      listas = listas.filter(t => t.id !== id);
      ls.set(listas);
      $(`#tr_${id}`).slideUp(280, function() { $(this).remove(); if (!listas.length) render$(); });
      resumen();
      Notificacion('Lista eliminada', 'info');
      if (wiAuth.user) eliminarNube(id);
    })

    // Pin / Despin lista
    .on('click', '.tr_act_pin', function() {
      const id = $(this).data('id');
      const t  = findLista(id); if (!t) return;
      t.pin = !t.pin;
      ls.set(listas); render$();
      Notificacion(t.pin ? 'Lista fijada ✓' : 'Desanclada', 'success');
      if (wiAuth.user) actualizarNube(t).then(() => cloudSync(id));
    })

    // Copiar tareas
    .on('click', '.tr_act_copy', function() {
      const id = $(this).data('id');
      const t  = findLista(id); if (!t) return;
      const txt = `${t.titulo}\n` + t.tareas.map(i => `${i.estado === 'completado' ? '✅' : '☐'} ${i.contenido}`).join('\n');
      wicopy(txt, this, '¡Lista copiada!');
    })

    // Añadir tarea (Enter)
    .on('keydown', '.tr_in_add', function(e) {
      if (e.key !== 'Enter' || e.shiftKey) return;
      e.preventDefault();
      const val = $(this).val().trim(); if (!val) return;
      const $card = $(this).closest('.tr_card');
      const id    = $card.data('id');
      const t     = findLista(id); if (!t) return;
      const item  = { id: uid(), contenido: val, estado: 'pendiente' };
      const isFirst = t.tareas.length === 0; // primera tarea = primer write en nube
      t.tareas.push(item);
      ls.set(listas);
      const $item = $(tplItem(item)).hide();
      $card.find('.tr_items').append($item);
      $item.slideDown(220);
      $(this).val('').css('height', 'auto');
      updateProg($card, t);
      // Al añadir la primera tarea: quitar clase vacía y revelar acciones
      if (isFirst) $card.removeClass('tr_card_empty');
      if (wiAuth.user) {
        // Primera tarea: setDoc (crear doc), resto: setDoc+merge
        const op = isFirst ? guardarNube(t) : actualizarNube(t);
        op.then(() => cloudSync(id));
      }
    })

    // Toggle completado / pendiente
    .on('click', '.tr_check', function() {
      const $item = $(this).closest('.tr_item');
      const $card = $(this).closest('.tr_card');
      const idL   = $card.data('id');
      const idI   = $item.data('iid');
      const t     = findLista(idL); if (!t) return;
      const item  = t.tareas.find(i => i.id === idI); if (!item) return;
      item.estado = item.estado === 'completado' ? 'pendiente' : 'completado';
      ls.set(listas);
      $item.toggleClass('done', item.estado === 'completado');
      updateProg($card, t);
      if (wiAuth.user) actualizarNube(t);
    })

    // Editar texto de tarea
    .on('change', '.tr_item_txt', function() {
      const idL  = $(this).closest('.tr_card').data('id');
      const idI  = $(this).closest('.tr_item').data('iid');
      const t    = findLista(idL); if (!t) return;
      const item = t.tareas.find(i => i.id === idI); if (!item) return;
      item.contenido = $(this).val();
      ls.set(listas);
      if (wiAuth.user) actualizarNube(t);
    })

    // Eliminar tarea individual
    .on('click', '.tr_btn_del_item', function() {
      const $item = $(this).closest('.tr_item');
      const $card = $(this).closest('.tr_card');
      const idL   = $card.data('id');
      const idI   = $item.data('iid');
      const t     = findLista(idL); if (!t) return;
      t.tareas = t.tareas.filter(i => i.id !== idI);
      ls.set(listas);
      $item.slideUp(220, function() { $(this).remove(); });
      updateProg($card, t);
      if (wiAuth.user) actualizarNube(t);
    });

  showi(['.tr_hero_left', '.tr_hero_right'], 50);
  render$();

  // Auth: wiAuth v3.0 reactivo
  unsub = wiAuth.on(async wi => {
    $('#tr_btn_refresh').toggle(!!wi);
    if (wi) {
      if (listas.length === 0) skeleton();
      const remotas = await cargarNube();
      if (remotas) {
        if (JSON.stringify(remotas) !== JSON.stringify(listas)) {
          listas = remotas;
          ls.set(listas); render$();
        }
      }
    } else {
      localStorage.removeItem(LS_KEY); listas = ls.get(); render$();
    }
  });

  console.log(`✅ ${app} ${version} · Tareas OK`);
};

export const cleanup = () => { $(document).off('click change keydown', '#tr_btn_new, #tr_btn_refresh, .tr_act_del, .tr_act_pin, .tr_act_copy, .tr_in_tit, .tr_in_add, .tr_check, .tr_item_txt, .tr_btn_del_item'); unsub?.(); };
