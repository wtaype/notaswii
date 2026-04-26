import './tablero.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { showi, Notificacion, wiAuth } from '../widev.js';

// ════════════════════════════════════════════════════════════
// 🎨 TABLERO: Masonry Visual Board (Tipo Google Keep/Pinterest)
// ════════════════════════════════════════════════════════════

const LS_KEY = 'tablero_items';
const cargarLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ── RENDER PRINCIPAL ──────────────────────────────────────────
export const render = () => `
<div class="tb_wrap">
  <div class="tb_hero">
    <div class="tb_hero_left">
      <h1><i class="fas fa-th-large"></i> Tablero Visual</h1>
      <p id="tb_count">0 ideas guardadas</p>
    </div>
    <div class="tb_hero_right">
      <button class="tb_btn_new" id="tb_btn_add"><i class="fas fa-plus"></i> Nueva Nota</button>
    </div>
  </div>

  <div id="tb_grid" class="tb_masonry"></div>

  <!-- MODAL EDITOR -->
  <div id="tb_modal_wrap" class="tb_modal_overlay">
    <div class="tb_modal" id="tb_modal_box">
      <input type="text" id="tb_in_tit" class="tb_modal_in_tit" placeholder="Título de la idea..." autocomplete="off">
      <textarea id="tb_in_cnt" class="tb_modal_in_cnt" placeholder="Escribe algo increíble..."></textarea>
      
      <div class="tb_modal_foot">
        <div class="tb_theme_picker">
          <div class="tb_theme_dot active" data-t="0" title="Blanco (Predeterminado)"></div>
          <div class="tb_theme_dot" data-t="1" title="Cielo"></div>
          <div class="tb_theme_dot" data-t="2" title="Dulce"></div>
          <div class="tb_theme_dot" data-t="3" title="Paz"></div>
          <div class="tb_theme_dot" data-t="4" title="Oro"></div>
          <div class="tb_theme_dot" data-t="5" title="Mora"></div>
        </div>
        <div>
           <button class="tb_btn_save" id="tb_btn_close" style="background:var(--bg); color:var(--tx2); margin-right:1vh;">Cancelar</button>
           <button class="tb_btn_save" id="tb_btn_save_item">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ── LÓGICA DE ESTADO ──────────────────────────────────────────
let items = [];
let editingId = null;
let currentTheme = 0;

const tplCard = (d) => `
  <article class="tb_card theme-${d.theme || 0}" id="tb_${d.id}" data-id="${d.id}">
    ${d.titulo ? `<h3 class="tb_card_title">${d.titulo}</h3>` : ''}
    ${d.contenido ? `<p class="tb_card_content">${d.contenido}</p>` : ''}
    
    <div class="tb_card_actions">
      <button class="tb_btn_act edit" title="Editar"><i class="fas fa-pen"></i></button>
      <button class="tb_btn_act del" title="Eliminar"><i class="fas fa-trash-can"></i></button>
    </div>
  </article>
`;

const renderTodo = () => {
  $('#tb_count').text(`${items.length} idea${items.length !== 1 ? 's' : ''} guardada${items.length !== 1 ? 's' : ''}`);
  
  if (!items.length) {
    $('#tb_grid').html(`
      <div style="grid-column: 1 / -1; text-align:center; padding: 10vh 2vw; color:var(--tx3);">
        <i class="fas fa-magic" style="font-size:3rem; margin-bottom:2vh; opacity:0.5; color:var(--tx2);"></i>
        <h2 style="color:var(--tx);">Tu tablero está vacío</h2>
        <p>Añade tu primera nota visual colorida para comenzar a organizar tus ideas.</p>
      </div>
    `);
  } else {
    $('#tb_grid').html(items.map(tplCard).join(''));
  }
};

const sincronizarNube = async () => {
  if (!wiAuth.logged) return;
  try {
    const { db } = await import('../firebase.js');
    const { doc, setDoc } = await import('firebase/firestore');
    // Para entornos reales con muchos datos, se actualizarían solo los modificados.
    // Aquí hacemos batch de los recientes.
    const ops = items.slice(0, 10).map(l => setDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'tablero', l.id), l));
    await Promise.all(ops);
  } catch (e) {}
};

// Autoajustar altura del textarea en el modal
const autoResize = (el) => {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
};

const abrirModal = (id = null) => {
  editingId = id;
  const $m = $('#tb_modal_box');
  
  // Limpiar clases de temas anteriores
  $m.removeClass('theme-0 theme-1 theme-2 theme-3 theme-4 theme-5');
  
  if (id) {
    const it = items.find(x => x.id === id);
    if(it) {
      $('#tb_in_tit').val(it.titulo);
      $('#tb_in_cnt').val(it.contenido);
      currentTheme = it.theme || 0;
    }
  } else {
    $('#tb_in_tit').val('');
    $('#tb_in_cnt').val('');
    currentTheme = 0;
  }
  
  // Aplicar tema
  $m.addClass(`theme-${currentTheme}`);
  $('.tb_theme_dot').removeClass('active');
  $(`.tb_theme_dot[data-t="${currentTheme}"]`).addClass('active');
  
  $('#tb_modal_wrap').addClass('active');
  
  setTimeout(() => {
    autoResize(document.getElementById('tb_in_cnt'));
    $('#tb_in_cnt').focus();
  }, 100);
};

const cerrarModal = () => {
  $('#tb_modal_wrap').removeClass('active');
  editingId = null;
};

// ── EVENTOS Y CICLO DE VIDA ────────────────────────────────────
export const init = () => {
  items = cargarLocal().sort((a,b) => b.creado - a.creado);
  renderTodo();
  
  // Animación inicial masonry
  showi(['.tb_hero_left', '.tb_btn_new', '.tb_card'], 60);

  const evNamespace = '.tb';
  $(document).off(evNamespace); // Limpiar

  $(document)
    // Modal Actions
    .on(`click${evNamespace}`, '#tb_btn_add', () => abrirModal())
    .on(`click${evNamespace}`, '#tb_btn_close', cerrarModal)
    .on(`click${evNamespace}`, '#tb_modal_wrap', function(e) {
      // Cerrar si se clickea fuera del modal (overlay)
      if (e.target === this) cerrarModal();
    })
    
    // AutoResize Textarea
    .on(`input${evNamespace}`, '#tb_in_cnt', function() { autoResize(this); })
    
    // Selección de Tema en Modal
    .on(`click${evNamespace}`, '.tb_theme_dot', function() {
      const t = $(this).data('t');
      currentTheme = t;
      $('.tb_theme_dot').removeClass('active');
      $(this).addClass('active');
      
      const $m = $('#tb_modal_box');
      $m.removeClass('theme-0 theme-1 theme-2 theme-3 theme-4 theme-5').addClass(`theme-${t}`);
    })
    
    // Guardar Nota (Crear / Actualizar)
    .on(`click${evNamespace}`, '#tb_btn_save_item', () => {
      const tit = $('#tb_in_tit').val().trim();
      const cnt = $('#tb_in_cnt').val().trim();
      
      if (!tit && !cnt) { Notificacion('La nota está vacía', 'warning'); return; }
      
      if (editingId) {
        // Actualizar existente
        const it = items.find(x => x.id === editingId);
        if (it) {
          it.titulo = tit;
          it.contenido = cnt;
          it.theme = currentTheme;
          it.creado = Date.now(); // Mover al principio
        }
        // Reordenar
        items = items.filter(x => x.id !== editingId);
        items.unshift(items.find(x => x.id === editingId) || { id: editingId, titulo: tit, contenido: cnt, theme: currentTheme, creado: Date.now() });
        Notificacion('Nota actualizada', 'success');
      } else {
        // Nueva
        const ni = { id: uid(), titulo: tit, contenido: cnt, theme: currentTheme, creado: Date.now() };
        items.unshift(ni);
        Notificacion('Nota creada', 'success');
      }
      
      guardarLocal(items);
      sincronizarNube();
      renderTodo();
      cerrarModal();
      
      // Animar solo la editada/creada si no recargamos todo el grid.
      // Aquí estamos llamando renderTodo() para el masonry completo,
      // podríamos optimizar animando solo la primera tarjeta que siempre será la recién creada/modificada.
      showi(['.tb_card:first-child'], 0);
    })
    
    // Interacciones de Tarjeta
    .on(`click${evNamespace}`, '.tb_card', function(e) {
      // Prevenir si se clickean los botones de accion
      if ($(e.target).closest('.tb_btn_act').length) return;
      abrirModal($(this).data('id'));
    })
    
    // Editar
    .on(`click${evNamespace}`, '.tb_btn_act.edit', function(e) {
      e.stopPropagation();
      const id = $(this).closest('.tb_card').data('id');
      abrirModal(id);
    })
    
    // Eliminar
    .on(`click${evNamespace}`, '.tb_btn_act.del', function(e) {
      e.stopPropagation();
      if (!confirm('¿Eliminar esta nota del tablero?')) return;
      
      const $card = $(this).closest('.tb_card');
      const id = $card.data('id');
      
      items = items.filter(x => x.id !== id);
      guardarLocal(items);
      sincronizarNube();
      
      $card.css({ transform: 'scale(0.8)', opacity: 0 });
      setTimeout(() => {
        $card.remove();
        $('#tb_count').text(`${items.length} idea${items.length !== 1 ? 's' : ''} guardada${items.length !== 1 ? 's' : ''}`);
        if(!items.length) renderTodo();
      }, 300);
      
      Notificacion('Nota eliminada', 'success');
    });
};

export const cleanup = () => {
  $(document).off('.tb');
};
