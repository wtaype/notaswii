import './word.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { showi, Notificacion, wiAuth } from '../widev.js';

// ════════════════════════════════════════════════════════════
// 📝 WORD: El Procesador de Textos Definitivo (Estilo MS Word)
// ════════════════════════════════════════════════════════════

const LS_KEY = 'word_docs';
const cargarLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ── RENDER PRINCIPAL ──────────────────────────────────────────
export const render = () => `
<div class="wd_wrap">
  <!-- RIBBON (Solo Herramientas) -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" title="Explorador de Documentos"><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" title="Fuente">
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
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" title="Tamaño de fuente (Enter para aplicar)" autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" title="Negrita"><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" title="Cursiva"><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" title="Subrayado"><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" title="Tachado"><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" title="Alinear Izquierda"><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" title="Centrar"><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" title="Alinear Derecha"><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" title="Justificar"><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" title="Viñetas"><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" title="Lista Numerada"><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width: 60px;" title="Interlineado">
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div title="Color de Texto" style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div title="Color de Resaltado" style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
      </div>
    </div>
  </header>

  <!-- WORKSPACE -->
  <div class="wd_workspace">
    <aside id="wd_sidebar" class="wd_sidebar">
      <div class="wd_sb_actions_panel">
        <input type="text" id="wd_in_tit" class="wd_doc_title_sb" placeholder="Título del documento..." autocomplete="off">
        <div style="display:flex; gap:1vh; margin-top:1.5vh;">
          <button id="wd_btn_save" class="wd_btn_main" style="flex:1; justify-content:center;"><i class="fas fa-save"></i> Guardar</button>
          <button id="wd_btn_del" class="wd_btn_sec" style="color:#FF5C69; border-color:transparent; background:color-mix(in srgb, #FF5C69 10%, transparent); padding: 1.2vh;" title="Eliminar"><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      
      <div class="wd_sb_head">
        <h3>Tus Archivos</h3>
        <button id="wd_btn_new" class="wd_sb_add" title="Nuevo Documento"><i class="fas fa-plus"></i></button>
      </div>
      <div id="wd_sb_list" class="wd_sb_list"></div>
    </aside>
    
    <main class="wd_canvas">
      <div class="wd_page">
        <div id="wd_editor" class="wd_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false"></div>
      </div>
    </main>
  </div>
</div>
`;

// ── LÓGICA DE ESTADO ──────────────────────────────────────────
let docs = [];
let act = null; // Documento activo
let guardando = false;
let savedRange = null;

const extraerTextoPlano = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return tmp.textContent || tmp.innerText || '';
};

const tplListItem = (d) => {
  const txt = extraerTextoPlano(d.contenido);
  const snippet = txt.length > 50 ? txt.substring(0, 50) + '...' : (txt || 'Sin contenido...');
  const activo = act && act.id === d.id ? 'active' : '';
  const titulo = d.titulo || 'Documento sin título';
  
  return `
    <div class="wd_doc_item ${activo}" data-id="${d.id}">
      <h4>${titulo}</h4>
      <p>${snippet}</p>
    </div>
  `;
};

const renderLista = () => {
  if (!docs.length) {
    $('#wd_sb_list').html('<div style="padding:2vh; color:var(--tx3); text-align:center;">No tienes documentos.</div>');
  } else {
    $('#wd_sb_list').html(docs.map(tplListItem).join(''));
  }
};

const cargarDocUI = (d) => {
  act = d;
  $('#wd_in_tit').val(d.titulo);
  $('#wd_editor').html(d.contenido);
  renderLista();
};

const crearNuevo = () => {
  const n = { id: uid(), titulo: '', contenido: '', creado: Date.now() };
  docs.unshift(n);
  cargarDocUI(n);
  guardarLocal(docs);
  sincronizarNube();
  // Set default font to Segoe UI for new documents
  setTimeout(() => {
    $('#wd_editor').focus();
    document.execCommand('fontName', false, "'Segoe UI', system-ui");
  }, 50);
};

const guardarActual = () => {
  if (!act) return;
  act.titulo = $('#wd_in_tit').val().trim();
  act.contenido = $('#wd_editor').html();
  act.actualizado = Date.now();
  
  guardarLocal(docs);
  sincronizarNube();
  renderLista(); // Actualiza los snippets y titulos en la lista
};

const sincronizarNube = async () => {
  if (!wiAuth.logged || guardando) return;
  guardando = true;
  try {
    const { db } = await import('../firebase.js');
    const { doc, setDoc } = await import('firebase/firestore');
    // Para no saturar, en un entorno real se haría debounce.
    // Aquí hacemos setDoc del activo.
    if (act) {
      await setDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'word', act.id), act);
    }
  } catch (e) {
    console.error('Error sincronizando word', e);
  } finally {
    guardando = false;
  }
};

// Revisa el estado de los botones de la barra de herramientas al hacer click/teclear en el editor
const revisarTools = () => {
  $('.wd_btn_tool[data-cmd]').each(function() {
    const cmd = $(this).data('cmd');
    try { 
      if (document.queryCommandState(cmd)) $(this).addClass('active'); 
      else $(this).removeClass('active'); 
    } catch(e) {}
  });
  
  try {
    const selNode = window.getSelection().anchorNode;
    if (selNode) {
      const el = selNode.nodeType === 3 ? selNode.parentNode : selNode;
      if ($(el).closest('.wd_editor').length) {
        const css = window.getComputedStyle(el);
        if (css.fontSize) $('#wd_f_sz').val(parseInt(css.fontSize));
        if (css.fontFamily) {
          const fam = css.fontFamily.split(',')[0].replace(/['"]/g, '');
          $('#wd_f_fam option').each(function() {
             if ($(this).text() === fam || $(this).val().includes(fam)) $('#wd_f_fam').val($(this).val());
          });
        }
        const block = $(el).closest('p, div, h1, h2, h3, h4, h5, h6, li');
        if (block.length) {
          if (block[0].style.lineHeight) $('#wd_l_ht').val(block[0].style.lineHeight);
        }
      }
    }
  } catch(e) {}
};

// ── EVENTOS Y CICLO DE VIDA ────────────────────────────────────
export const init = () => {
  docs = cargarLocal().sort((a,b) => b.actualizado - a.actualizado);
  
  if (docs.length) {
    cargarDocUI(docs[0]); // Carga el último editado
  } else {
    crearNuevo();
  }

  // Animaciones iniciales
  showi(['.wd_ribbon', '.wd_sidebar', '.wd_page'], 50);

  const evNamespace = '.wd';
  $(document).off(evNamespace);

  $(document)
    // Interfaz Sidebar
    .on(`click${evNamespace}`, '#wd_btn_menu', () => {
      $('#wd_sidebar').toggleClass('closed');
    })
    
    // Cambiar Documento
    .on(`click${evNamespace}`, '.wd_doc_item', function() {
      guardarActual(); // Guardar el anterior
      const id = $(this).data('id');
      const d = docs.find(x => x.id === id);
      if (d) cargarDocUI(d);
    })
    
    // Nuevo Documento
    .on(`click${evNamespace}`, '#wd_btn_new', () => {
      guardarActual();
      crearNuevo();
    })
    
    // Eliminar Documento
    .on(`click${evNamespace}`, '#wd_btn_del', async () => {
      if (!act) return;
      if (!confirm('¿Seguro que deseas eliminar permanentemente este documento?')) return;
      
      const id = act.id;
      docs = docs.filter(x => x.id !== id);
      guardarLocal(docs);
      
      // Borrar de la nube si existe
      if (wiAuth.logged) {
        try {
          const { db } = await import('../firebase.js');
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'word', id));
        } catch(e) {}
      }
      
      Notificacion('Documento eliminado', 'success');
      
      if (docs.length) {
        cargarDocUI(docs[0]);
      } else {
        crearNuevo();
      }
    })
    
    // Guardado manual
    .on(`click${evNamespace}`, '#wd_btn_save', () => {
      guardarActual();
      Notificacion('Documento guardado', 'success');
    })
    
    // Guardar selección
    .on(`keyup${evNamespace} mouseup${evNamespace} click${evNamespace}`, '.wd_editor', function() {
      revisarTools();
      const s = window.getSelection();
      if (s.rangeCount > 0) savedRange = s.getRangeAt(0);
    })
    
    // Auto-Guardado y revisión de herramientas
    .on(`input${evNamespace}`, '#wd_editor', () => {
      revisarTools();
      // Auto guardado ligero en local
      if (act) {
        act.contenido = $('#wd_editor').html();
        guardarLocal(docs);
      }
    })
    .on(`input${evNamespace}`, '#wd_in_tit', () => {
      if (act) {
        act.titulo = $('#wd_in_tit').val().trim();
        guardarLocal(docs);
        renderLista();
      }
    })
    .on(`mouseup${evNamespace} keyup${evNamespace}`, '#wd_editor', revisarTools)
    
    // HERRAMIENTAS DE FORMATO (Ribbon)
    .on(`click${evNamespace}`, '.wd_btn_tool', function(e) {
      e.preventDefault();
      const cmd = $(this).data('cmd');
      document.execCommand(cmd, false, null);
      revisarTools();
      $('#wd_editor').focus();
    })
    .on(`change${evNamespace}`, '#wd_f_fam', function() {
      if (savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontName', false, $(this).val());
      $('#wd_editor').focus().trigger(`input${evNamespace}`);
    })
    .on(`keydown${evNamespace}`, '#wd_f_sz', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const v = Math.max(8, Math.min(100, parseInt($(this).val()) || 16));
        $(this).val(v);
        
        if (savedRange) {
          const s = window.getSelection();
          s.removeAllRanges();
          s.addRange(savedRange);
        }
        
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('fontSize', false, '7');
        $('.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]').removeAttr('size').css('font-size', v + 'px');
        $('#wd_editor').focus().trigger(`input${evNamespace}`);
      }
    })
    .on(`change${evNamespace}`, '#wd_l_ht', function() {
      if (savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
      const s = window.getSelection();
      if (s.rangeCount) {
        const r = s.getRangeAt(0);
        const common = r.commonAncestorContainer;
        const node = common.nodeType === 3 ? common.parentNode : common;
        let blocks = $(node).hasClass('wd_editor') 
            ? $(node).children().filter(function() { return s.containsNode(this, true); })
            : $(node).closest('p, div, h1, h2, h3, h4, h5, h6, li');
        if (!blocks.length && $(node).hasClass('wd_editor')) blocks = $(node);
        blocks.css('line-height', $(this).val());
      }
      $('#wd_editor').focus().trigger(`input${evNamespace}`);
    })
    .on(`input${evNamespace}`, '#wd_c_txt', function() {
      document.execCommand('foreColor', false, $(this).val());
      $('#wd_editor').focus();
    })
    .on(`input${evNamespace}`, '#wd_c_bg', function() {
      document.execCommand('hiliteColor', false, $(this).val());
      $('#wd_editor').focus();
    });
};

export const cleanup = () => {
  guardarActual(); // Asegurar guardar antes de irse
  $(document).off('.wd');
};
