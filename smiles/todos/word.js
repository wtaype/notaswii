import './word.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth, wiTip, wicopy, getls, savels, Saludar, wiFade } from '../widev.js';

// ── CONFIG ──────────────────────────────────────────────────
const LS_KEY = 'word_docs';
const uid    = () => 'wd' + Date.now();
const ls     = {
  get: ()  => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } },
  set: (d) => localStorage.setItem(LS_KEY, JSON.stringify(d))
};
const cacheOk  = ()  => !!getls('wd_sync');
const marcarOk = ()  => savels('wd_sync', 1, 168);

// ── RENDER HTML ──────────────────────────────────────────────
export const render = () => `
<div class="wd_wrap">
  <!-- RIBBON -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" ${wiTip('Archivos')}><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" ${wiTip('Fuente', undefined, 'bottom')}>
          <option value="'Segoe UI', system-ui" selected>Segoe UI</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Outfit', sans-serif">Outfit</option>
          <option value="'Rubik', sans-serif">Rubik</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
        <div class="wd_tool_sep"></div>
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" ${wiTip('Tamaño (Enter para aplicar)', undefined, 'bottom')} autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" ${wiTip('Negrita', undefined, 'bottom')}><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" ${wiTip('Cursiva', undefined, 'bottom')}><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" ${wiTip('Subrayado', undefined, 'bottom')}><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" ${wiTip('Tachado', undefined, 'bottom')}><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" ${wiTip('Alinear Izquierda', undefined, 'bottom')}><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" ${wiTip('Centrar', undefined, 'bottom')}><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" ${wiTip('Alinear Derecha', undefined, 'bottom')}><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" ${wiTip('Justificar', undefined, 'bottom')}><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" ${wiTip('Viñetas', undefined, 'bottom')}><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" ${wiTip('Numeración', undefined, 'bottom')}><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width:60px;" ${wiTip('Interlineado', undefined, 'bottom')}>
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div ${wiTip('Color Texto', undefined, 'bottom')} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div ${wiTip('Color Resaltado', undefined, 'bottom')} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
      </div>
    </div>
  </header>

  <!-- WORKSPACE -->
  <div class="wd_workspace">
    <!-- SIDEBAR -->
    <aside id="wd_sidebar" class="wd_sidebar">
      <div class="wd_sb_actions_panel">
        <input type="text" id="wd_in_tit" class="wd_doc_title_sb" placeholder="Título del documento..." autocomplete="off">
        <div style="display:flex; gap:1vh; margin-top:1.5vh;">
          <button id="wd_btn_save" class="wd_btn_main" style="flex:1; justify-content:center;"><i class="fas fa-save"></i> Guardar</button>
          <button id="wd_btn_del" class="wd_btn_sec wd_btn_del_doc" ${wiTip('Eliminar', undefined, 'error')}><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      <div class="wd_sb_head">
        <h3 id="wd_saludo">Archivos</h3>
        <div style="display:flex; gap: 5px;">
          <button id="wd_btn_refresh" class="wd_sb_btn" ${wiTip('Actualizar')}><i class="fas fa-rotate-right"></i></button>
          <button id="wd_btn_new" class="wd_sb_btn" ${wiTip('Nuevo Documento')}><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div id="wd_sb_list" class="wd_sb_list">
        <div class="wd_skeleton"></div><div class="wd_skeleton"></div>
      </div>
    </aside>
    
    <!-- CANVAS -->
    <main class="wd_canvas">
      <div class="wd_page">
        <div id="wd_editor" class="wd_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false"></div>
      </div>
    </main>
  </div>
</div>`;

// ── FIRESTORE ────────────────────────────────────────────────
const getFS = async () => {
  const { db } = await import('../firebase.js');
  return { db, ...await import('firebase/firestore') };
};

const guardarNube = async (d) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFS();
    await setDoc(doc(db, 'word', d.id), {
      id: d.id, usuario: wi.usuario, email: wi.email,
      titulo: String(d.titulo || ''), contenido: String(d.contenido || ''),
      pin: !!d.pin, creado: serverTimestamp(), actualizado: serverTimestamp()
    });
  } catch(e) { console.error('[word] guardarNube:', e); }
};

const actualizarNube = async (d) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try {
    const { db, doc, updateDoc, serverTimestamp } = await getFS();
    await updateDoc(doc(db, 'word', d.id), { 
      titulo: String(d.titulo || ''), contenido: String(d.contenido || ''), 
      pin: !!d.pin, actualizado: serverTimestamp() 
    });
  } catch(e) { console.error('[word] actualizarNube:', e); }
};

const eliminarNube = async (id) => {
  const wi = wiAuth.user; if (!wi?.usuario) return;
  try { const { db, doc, deleteDoc } = await getFS(); await deleteDoc(doc(db, 'word', id)); } catch {}
};

const cargarNube = async () => {
  const wi = wiAuth.user; if (!wi?.email) return null;
  try {
    const { db, collection, getDocs, query, where } = await getFS();
    const snap = await getDocs(query(collection(db, 'word'), where('email', '==', wi.email)));
    return snap.docs.map(d => {
      const x = d.data();
      return {
        id: d.id, titulo: x.titulo || '', contenido: x.contenido || '',
        pin: !!x.pin, creado: x.creado?.toMillis?.() || Date.now(),
        actualizado: x.actualizado?.toMillis?.() || Date.now(), synced: true
      };
    });
  } catch { return null; }
};

// ── HELPERS & RENDER ─────────────────────────────────────────
const extraerTextoPlano = (html) => {
  const t = document.createElement('div');
  t.innerHTML = html || '';
  return t.textContent || t.innerText || '';
};

const tplListItem = (d, actId) => {
  const txt = extraerTextoPlano(d.contenido);
  const snippet = txt.length > 50 ? txt.substring(0, 50) + '...' : (txt || 'Sin contenido...');
  const activo = d.id === actId ? 'active' : '';
  const titulo = d.titulo || 'Documento sin título';
  return `
    <div class="wd_doc_item ${activo}${d.pin ? ' wd_pinned' : ''}" data-id="${d.id}">
      <div class="wd_doc_head">
        <h4>${titulo}</h4>
        <div class="wd_doc_acts">
          <button class="wd_act_pin${d.pin ? ' active' : ''}" data-id="${d.id}" ${wiTip(d.pin ? 'Desanclar' : 'Fijar', undefined, 'right')}><i class="fas fa-thumbtack"></i></button>
          <i class="fas ${d.synced ? 'fa-cloud wd_cloud_ok' : 'fa-cloud-arrow-up wd_cloud_pen'}" ${wiTip(d.synced ? 'En nube' : 'Local', undefined, 'right')}></i>
        </div>
      </div>
      <p>${snippet}</p>
    </div>`;
};

// ── INIT ─────────────────────────────────────────────────────
export const init = async () => {
  let docs = ls.get();
  let act  = null;
  let savedRange = null;

  if (wiAuth.logged) $('#wd_saludo').text(`${Saludar()}${wiAuth.user.nombre || wiAuth.user.usuario}`);

  const skeleton = () => $('#wd_sb_list').html('<div class="wd_skeleton"></div>'.repeat(3));

  const sorted = () => [...docs].sort((a,b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return (b.actualizado||0) - (a.actualizado||0);
  });

  const renderLista = async () => {
    const lista = sorted();
    await wiFade('#wd_sb_list', lista.length 
      ? lista.map(d => tplListItem(d, act?.id)).join('') 
      : '<div class="wd_empty">No tienes documentos. Crea uno nuevo.</div>', 80);
  };

  const cargarDocUI = (d) => {
    act = d;
    $('#wd_in_tit').val(d.titulo || '');
    $('#wd_editor').html(d.contenido || '');
    renderLista();
  };

  const crearNuevo = () => {
    const n = { id: uid(), titulo: '', contenido: '', pin: false, creado: Date.now(), actualizado: Date.now(), synced: false };
    docs.unshift(n);
    ls.set(docs);
    cargarDocUI(n);
    setTimeout(() => { $('#wd_editor').focus(); document.execCommand('fontName', false, "'Segoe UI', system-ui"); }, 50);
  };

  const syncNube = async (useSkeleton = false) => {
    if (!wiAuth.logged) return;
    if (useSkeleton) skeleton();
    const $ico = $('#wd_btn_refresh i').addClass('wd_spin');
    try {
      const remotos = await cargarNube();
      if (remotos?.length) {
        const idsRem = new Set(remotos.map(d => d.id));
        const locales = docs.filter(d => !idsRem.has(d.id));
        locales.forEach(d => { if (d.contenido || d.titulo) guardarNube(d); });
        docs = [...remotos, ...locales];
        ls.set(docs);
        marcarOk();
      }
    } finally { 
      $ico.removeClass('wd_spin');
      if (docs.length && !act) cargarDocUI(sorted()[0]);
      else if (!docs.length) crearNuevo();
      else renderLista();
    }
  };

  // Autoguardado local (sin re-renders ni writes a Firestore)
  const triggerSave = () => {
    if (!act) return;
    act.titulo = $('#wd_in_tit').val().trim();
    act.contenido = $('#wd_editor').html();
    act.actualizado = Date.now();
    ls.set(docs);
    
    // Actualización directa del DOM sin parpadeos
    const $item = $(`#wd_sb_list .wd_doc_item[data-id="${act.id}"]`);
    if ($item.length) {
      $item.find('h4').text(act.titulo || 'Documento sin título');
      const txt = extraerTextoPlano(act.contenido);
      $item.find('p').text(txt.length > 50 ? txt.substring(0, 50) + '...' : (txt || 'Sin contenido...'));
      
      // Pasa el icono a 'pendiente' visualmente al detectar cambios
      $item.find('.fa-cloud.wd_cloud_ok')
        .removeClass('fa-cloud wd_cloud_ok')
        .addClass('fa-cloud-arrow-up wd_cloud_pen')
        .attr('data-witip', 'Local (Cambios sin guardar)');
    }
  };

  // Revisa el estado de herramientas
  const revisarTools = () => {
    $('.wd_btn_tool[data-cmd]').each(function() {
      try { $(this).toggleClass('active', document.queryCommandState($(this).data('cmd'))); } catch {}
    });
    try {
      const s = window.getSelection(); if (!s.anchorNode) return;
      const el = s.anchorNode.nodeType === 3 ? s.anchorNode.parentNode : s.anchorNode;
      if ($(el).closest('.wd_editor').length) {
        const css = window.getComputedStyle(el);
        if (css.fontSize) $('#wd_f_sz').val(parseInt(css.fontSize));
        if (css.fontFamily) {
          const fam = css.fontFamily.split(',')[0].replace(/['"]/g, '');
          $('#wd_f_fam option').filter(function(){ return $(this).text() === fam || $(this).val().includes(fam); }).prop('selected', true);
        }
        const block = $(el).closest('p, div, h1, h2, h3, h4, h5, h6, li');
        if (block.length && block[0].style.lineHeight) $('#wd_l_ht').val(block[0].style.lineHeight);
      }
    } catch {}
  };

  // ── EVENTOS DELEGADOS ────────────────────────────────────
  $(document)
    .on('click', '#wd_btn_menu',    () => $('#wd_sidebar').toggleClass('closed'))
    .on('click', '#wd_btn_new',     crearNuevo)
    .on('click', '#wd_btn_refresh', () => syncNube(true))
    .on('click', '.wd_doc_item', function(e) {
      if ($(e.target).closest('.wd_doc_acts').length) return;
      const d = docs.find(x => x.id === $(this).data('id'));
      if (d && d.id !== act?.id) cargarDocUI(d);
    })
    .on('click', '.wd_btn_del_doc', function() {
      if (!act || !confirm('¿Eliminar este documento permanentemente?')) return;
      docs = docs.filter(x => x.id !== act.id);
      ls.set(docs);
      if (wiAuth.logged && act.synced) eliminarNube(act.id);
      Notificacion('Documento eliminado', 'success');
      docs.length ? cargarDocUI(sorted()[0]) : crearNuevo();
    })
    .on('click', '#wd_btn_save', function() {
      if (!act) return;
      triggerSave(); // Asegura el guardado local
      
      const hasData = act.titulo || extraerTextoPlano(act.contenido).trim().length > 0;
      if (wiAuth.logged && hasData) {
        const $btn = $(this).find('i').removeClass('fa-save').addClass('fa-spinner wd_spin');
        const op = act.synced ? actualizarNube(act) : guardarNube(act);
        
        op.then(() => {
          act.synced = true;
          ls.set(docs);
          
          // Actualización visual instantánea de la nube
          $(`#wd_sb_list .wd_doc_item[data-id="${act.id}"] .fa-cloud-arrow-up`)
            .removeClass('fa-cloud-arrow-up wd_cloud_pen')
            .addClass('fa-cloud wd_cloud_ok')
            .attr('data-witip', 'En nube');
            
          $btn.removeClass('fa-spinner wd_spin').addClass('fa-save');
          Notificacion('Guardado en la nube', 'success');
        });
      } else {
        Notificacion('Guardado localmente', 'success');
      }
    })
    .on('click', '.wd_act_pin', function(e) {
      e.stopPropagation();
      const id = $(this).data('id');
      const d = docs.find(x => x.id === id); if (!d) return;
      d.pin = !d.pin;
      ls.set(docs); renderLista();
      if (wiAuth.logged && d.synced) actualizarNube(d);
    })
    // Editor inputs
    .on('input', '#wd_editor', () => { revisarTools(); triggerSave(); })
    .on('input', '#wd_in_tit', triggerSave)
    .on('mouseup keyup', '#wd_editor', function() {
      revisarTools();
      const s = window.getSelection();
      if (s.rangeCount > 0) savedRange = s.getRangeAt(0);
    })
    // Ribbon Tools
    .on('click', '.wd_btn_tool[data-cmd]', function(e) {
      e.preventDefault();
      document.execCommand($(this).data('cmd'), false, null);
      revisarTools(); $('#wd_editor').focus();
    })
    .on('change', '#wd_f_fam', function() {
      if (savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontName', false, $(this).val());
      $('#wd_editor').focus().trigger('input');
    })
    .on('keydown', '#wd_f_sz', function(e) {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const v = Math.max(8, Math.min(100, parseInt($(this).val()) || 16));
      $(this).val(v);
      if (savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontSize', false, '7');
      $('.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]').removeAttr('size').css('font-size', v + 'px');
      $('#wd_editor').focus().trigger('input');
    })
    .on('change', '#wd_l_ht', function() {
      if (savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
      const s = window.getSelection();
      if (s.rangeCount) {
        const r = s.getRangeAt(0); const c = r.commonAncestorContainer; const n = c.nodeType === 3 ? c.parentNode : c;
        let b = $(n).hasClass('wd_editor') ? $(n).children().filter(function() { return s.containsNode(this, true); }) : $(n).closest('p, div, h1, h2, h3, h4, h5, h6, li');
        if (!b.length && $(n).hasClass('wd_editor')) b = $(n);
        b.css('line-height', $(this).val());
      }
      $('#wd_editor').focus().trigger('input');
    })
    .on('input', '#wd_c_txt', function() { document.execCommand('foreColor', false, $(this).val()); $('#wd_editor').focus(); })
    .on('input', '#wd_c_bg',  function() { document.execCommand('hiliteColor', false, $(this).val()); $('#wd_editor').focus(); });

  showi(['.wd_ribbon', '.wd_sidebar', '.wd_page'], 50);

  // Inicialización (Cache-first)
  if (docs.length) {
    cargarDocUI(sorted()[0]);
    if (wiAuth.logged && !cacheOk()) syncNube(false);
  } else if (wiAuth.logged) {
    await syncNube(true);
  } else {
    crearNuevo();
  }

  console.log(`📝 ${app} ${version} · Word OK`);
};

export const cleanup = () => {
  $(document).off('click input mouseup keyup change keydown', '#wd_btn_menu, #wd_btn_new, #wd_btn_refresh, .wd_doc_item, .wd_btn_del_doc, #wd_btn_save, .wd_act_pin, #wd_editor, #wd_in_tit, .wd_btn_tool, #wd_f_fam, #wd_f_sz, #wd_l_ht, #wd_c_txt, #wd_c_bg');
};
