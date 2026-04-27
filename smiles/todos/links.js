import './links.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth, wiTip, wicopy, getls, savels, Saludar, wiFade } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY = 'links';
const uid    = () => 'lk' + Date.now();
const DEMO = [
  { id: 'ej1', titulo: 'Wilder Taype', contenido: 'https://wtaype.github.io/', pin: true, creado: Date.now(), synced: false },
  { id: 'ej2', titulo: 'NotasWii', contenido: 'https://notaswii.web.app/', pin: false, creado: Date.now() - 1000, synced: false }
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

const extractDomain = (url) => {
  try {
    let hostname = new URL(url).hostname;
    hostname = hostname.replace('www.', '');
    return hostname.split('.')[0] || 'Enlace';
  } catch { return 'Enlace Web'; }
};

// ── TEMPLATES ────────────────────────────────────────────────
const tplCard = (l) => {
  const init = l.titulo ? l.titulo.charAt(0).toUpperCase() : 'L';
  const displayUrl = l.contenido || l.url || '';
  return `
  <article class="lk_card${l.pin ? ' lk_pinned' : ''}" id="lk_${l.id}" data-id="${l.id}">
    <div class="lk_icon">${init}</div>
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${l.titulo || ''}" placeholder="Título del enlace...">
      <a href="${displayUrl}" target="_blank" rel="noopener" class="lk_url" title="${displayUrl}">${displayUrl}</a>
    </div>
    
    <div class="lk_acts">
      <button class="lk_act lk_act_copy" data-id="${l.id}" ${wiTip('Copiar URL', undefined, 'top')}><i class="far fa-copy"></i></button>
      <button class="lk_act lk_act_pin${l.pin ? ' active' : ''}" data-id="${l.id}" ${wiTip(l.pin ? 'Quitar pin' : 'Fijar', undefined, 'top')}><i class="fas fa-thumbtack"></i></button>
      <a href="${displayUrl}" target="_blank" rel="noopener" class="lk_act" ${wiTip('Abrir', undefined, 'top')}><i class="fas fa-external-link-alt"></i></a>
      <button class="lk_act lk_act_del" data-id="${l.id}" ${wiTip('Eliminar', undefined, 'error')}><i class="fas fa-trash-can"></i></button>
    </div>
    <i class="lk_act_cloud fas ${l.synced ? 'fa-cloud lk_cloud_ok' : 'fa-cloud-arrow-up lk_cloud_pen'}" ${wiTip(l.synced ? 'En nube' : 'Local', undefined, 'left')}></i>
  </article>`;
};

// ── FIRESTORE ────────────────────────────────────────────────
const getFS = async () => {
  const { db } = await import('../firebase.js');
  return { db, ...await import('firebase/firestore') };
};

const guardarNube = async (l) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'links', l.id), {
      id: l.id, usuario: wi.usuario, email: wi.email,
      titulo: String(l.titulo || ''), contenido: String(l.contenido || l.url || ''),
      pin: !!l.pin, creado: serverTimestamp(), actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[links] guardarNube:', e); }
};

const actualizarNube = async (l) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, updateDoc, serverTimestamp } = await getFS();
    await updateDoc(doc(db, 'links', l.id), {
      titulo: String(l.titulo || ''), contenido: String(l.contenido || l.url || ''),
      pin: !!l.pin, actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[links] actualizarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try { const { db, doc, deleteDoc } = await getFS(); await deleteDoc(doc(db, 'links', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  try {
    const { db, collection, getDocs, query, where } = await getFS();
    const snap = await getDocs(query(collection(db, 'links'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return {
        id: d.id, titulo: x.titulo || '', contenido: x.contenido || x.url || '',
        pin: !!x.pin, creado: x.creado?.toMillis?.() || Date.now(), synced: true
      };
    });
  } catch { return null; }
};

// ── RENDER HTML ──────────────────────────────────────────────
export const render = () => {
  const saludo = wiAuth.user ? `${Saludar()}${wiAuth.user.nombre || wiAuth.user.usuario}` : 'Tus Enlaces Rápidos';
  return `
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> ${saludo}</h1>
      <span id="lk_count" class="lk_count">0 guardados</span>
    </div>
    <div class="lk_hero_right">
      <button class="lk_btn_refresh" id="lk_btn_refresh" style="display:none" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
    </div>
  </div>
  
  <div class="lk_add_box">
    <i class="fas fa-globe"></i>
    <input type="url" id="lk_in_url" class="lk_input" placeholder="Pega una URL y presiona Enter..." autocomplete="off">
    <button id="lk_btn_add" class="lk_btn_add"><i class="fas fa-plus"></i> Guardar</button>
  </div>

  <div id="lk_grid" class="lk_grid">
    <div class="lk_skeleton"></div><div class="lk_skeleton"></div><div class="lk_skeleton"></div>
  </div>
</div>`;
};

// ── INIT ─────────────────────────────────────────────────────
let unsub = null;

export const init = async () => {
  let links = ls.get();

  const skeleton = () => $('#lk_grid').html('<div class="lk_skeleton"></div>'.repeat(3));
  const cloudSync = (id) => $(`[data-id="${id}"] .lk_act_cloud`)
    .removeClass('fa-cloud-arrow-up lk_cloud_pen').addClass('fa-cloud lk_cloud_ok')
    .attr('data-witip', 'En nube');

  const resumen = () => $('#lk_count').text(`${links.length} guardado${links.length !== 1 ? 's' : ''}`);

  const sorted = () => [...links].sort((a,b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return (b.creado||0) - (a.creado||0);
  });

  const render$ = async () => {
    const lista = sorted();
    await wiFade('#lk_grid', lista.length
      ? lista.map(tplCard).join('')
      : `<div class="lk_empty"><i class="fas fa-satellite-dish"></i><span>No tienes enlaces guardados. Pega uno arriba para empezar.</span></div>`,
      80);
    if (lista.length) showi(['.lk_grid > *'], 60);
    resumen();
  };

  // SyncNube eliminada: Lógica pura de descarga en Auth.

  const findLink = (id) => links.find(l => l.id === id);

  const agregarLink = () => {
    links = links.filter(n => !n.id.startsWith('ej')); // Limpiar DEMO
    const $in = $('#lk_in_url');
    let url = $in.val().trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    
    const domainName = extractDomain(url);
    const titulo = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    const n = { id: uid(), titulo, contenido: url, pin: false, creado: Date.now(), synced: false };
    
    links.unshift(n);
    ls.set(links);
    $in.val('');
    
    $('.lk_empty').remove();
    const $card = $(tplCard(n)).css('opacity', 0);
    $('#lk_grid').prepend($card);
    showi([`#lk_${n.id}`], 0);
    resumen();
    
    Notificacion('Enlace guardado', 'success');
    if (wiAuth.logged) guardarNube(n).then(() => { n.synced = true; ls.set(links); cloudSync(n.id); });
  };

  // ── EVENTOS ─────────────────────────────────────────────
  $(document)
    .on('click', '#lk_btn_add', agregarLink)
    .on('keydown', '#lk_in_url', function(e) { if (e.key === 'Enter') { e.preventDefault(); agregarLink(); } })
    .on('click', '#lk_btn_refresh', async function() {
      const $i = $(this).find('i'); if ($i.hasClass('lk_spin')) return;
      $i.addClass('lk_spin');
      const remotos = await cargarNube();
      if (remotos) {
        if (JSON.stringify(remotos) !== JSON.stringify(links)) {
          links = remotos;
          ls.set(links); render$();
        }
        Notificacion('Sincronizado ✓', 'success');
      }
      $i.removeClass('lk_spin');
    })
    
    // Edición de título In-place
    .on('change', '.lk_tit', function() {
      const id = $(this).closest('.lk_card').data('id');
      const l  = findLink(id); if (!l) return;
      l.titulo = $(this).val();
      const init = l.titulo ? l.titulo.charAt(0).toUpperCase() : 'L';
      $(this).closest('.lk_card').find('.lk_icon').text(init);
      
      ls.set(links);
      if (wiAuth.logged) actualizarNube(l).then(() => cloudSync(id));
    })
    
    // Pin / Despin
    .on('click', '.lk_act_pin', function() {
      const id = $(this).data('id');
      const l  = findLink(id); if (!l) return;
      l.pin = !l.pin;
      ls.set(links); render$();
      Notificacion(l.pin ? 'Enlace fijado ✓' : 'Desanclado', 'success');
      if (wiAuth.logged) actualizarNube(l).then(() => cloudSync(id));
    })
    
    // Eliminar
    .on('click', '.lk_act_del', function() {
      const id = $(this).data('id');
      if (!confirm('¿Seguro que deseas eliminar este enlace?')) return;
      links = links.filter(l => l.id !== id);
      ls.set(links);
      $(`#lk_${id}`).css('overflow', 'hidden').slideUp(280, function() { $(this).remove(); if (!links.length) render$(); });
      resumen();
      Notificacion('Enlace eliminado', 'success');
      if (wiAuth.logged) eliminarNube(id);
    })
    
    // Copiar
    .on('click', '.lk_act_copy', function() {
      const l = findLink($(this).data('id'));
      if (l) wicopy(l.contenido || l.url, this, '¡URL copiada!');
    });

  showi(['.lk_hero_left', '.lk_add_box'], 50);
  setTimeout(() => $('#lk_in_url').focus(), 150);
  render$();

  // Auth: wiAuth v3.0 reactivo
  unsub = wiAuth.on(async wi => {
    $('#lk_btn_refresh').toggle(!!wi);
    if (wi) {
      if (links.length === 0) skeleton();
      const remotos = await cargarNube();
      if (remotos) {
        if (JSON.stringify(remotos) !== JSON.stringify(links)) {
          links = remotos;
          ls.set(links); render$();
        }
      }
    } else {
      localStorage.removeItem(LS_KEY); links = ls.get(); render$();
    }
  });

  console.log(`✅ ${app} ${version} · Links OK`);
};

export const cleanup = () => { $(document).off('click keydown change', '#lk_btn_add, #lk_in_url, #lk_btn_refresh, .lk_tit, .lk_act_pin, .lk_act_del, .lk_act_copy'); unsub?.(); };
