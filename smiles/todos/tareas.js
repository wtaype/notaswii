import './tareas.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { showi, Notificacion, wiAuth } from '../widev.js';

// ════════════════════════════════════════════════════════════
// ✅ TAREAS: Listas de checklists rápidos
// ════════════════════════════════════════════════════════════

const LS_KEY = 'tareas';
const cargarLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ── RENDER PRINCIPAL ──────────────────────────────────────────
export const render = () => `
<div class="tr_wrap">
  <div class="tr_hero">
    <div class="tr_hero_left">
      <h1><i class="fas fa-tasks"></i> Checklists</h1>
      <p id="tr_resumen" class="tr_count">0/0 completadas</p>
    </div>
    <button class="tr_btn_new" id="tr_btn_new"><i class="fas fa-plus"></i> Nueva Lista</button>
  </div>
  <div id="tr_grid" class="tr_grid"></div>
</div>
`;

// ── TEMPLATES ──────────────────────────────────────────────────
const tplItem = (it) => `
  <div class="tr_item ${it.done ? 'done' : ''}" data-iid="${it.id}">
    <button class="tr_check" title="Marcar completado"><i class="fas fa-check"></i></button>
    <input type="text" class="tr_item_txt" value="${it.text}" placeholder="Elemento vacío...">
    <button class="tr_btn_del_item" title="Eliminar ítem"><i class="fas fa-times"></i></button>
  </div>
`;

const tplCard = (t) => {
  const total = t.items.length;
  const done = t.items.filter(i => i.done).length;
  const prog = total ? (done / total) * 100 : 0;
  
  // Ordenar visualmente en la carga: primero incompletos
  const itemsHTML = [...t.items]
    .sort((a,b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
    .map(tplItem).join('');

  return `
  <article class="tr_card" id="tr_${t.id}" data-id="${t.id}">
    <div class="tr_progress"><div class="tr_progress_bar" style="width:${prog}%"></div></div>
    
    <div class="tr_card_tit">
      <input type="text" class="tr_in_tit" value="${t.titulo}" placeholder="Título de la lista...">
      <button class="tr_btn_del" title="Eliminar Lista completa"><i class="fas fa-trash-can"></i></button>
    </div>
    
    <div class="tr_items">
      ${itemsHTML}
    </div>
    
    <div class="tr_add">
      <i class="fas fa-plus"></i>
      <input type="text" class="tr_in_add" placeholder="Añadir ítem y presionar Enter...">
    </div>
  </article>
  `;
};

// ── LÓGICA DE ESTADO ──────────────────────────────────────────
let listas = [];

const actualizarResumen = () => {
  let totalI = 0, doneI = 0;
  listas.forEach(l => { 
    totalI += l.items.length; 
    doneI += l.items.filter(i => i.done).length; 
  });
  
  if (!listas.length) {
    $('#tr_resumen').text('0/0');
  } else {
    $('#tr_resumen').text(`${doneI}/${totalI} completadas`);
  }
};

const renderTodo = () => {
  if (!listas.length) {
    $('#tr_grid').html(`
      <div class="tr_empty">
        <i class="fas fa-tasks"></i>
        <span>No tienes listas. Crea una para organizar tus tareas.</span>
      </div>
    `);
  } else {
    $('#tr_grid').html(listas.map(tplCard).join(''));
  }
  actualizarResumen();
};

const sincronizarNube = async () => {
  if (!wiAuth.logged) return;
  try {
    const { db } = await import('../firebase.js');
    const { doc, setDoc } = await import('firebase/firestore');
    // Guardar todo como batch o en operaciones separadas
    const ops = listas.map(l => setDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'tareas', l.id), l));
    await Promise.all(ops);
  } catch (e) {
    console.error('Error sincronizando tareas', e);
  }
};

// ── EVENTOS Y CICLO DE VIDA ────────────────────────────────────
export const init = () => {
  listas = cargarLocal();
  renderTodo();
  
  // Animación inicial con el motor premium
  showi(['.tr_hero_left', '.tr_btn_new', '.tr_card'], 60);

  const evNamespace = '.tr';
  $(document).off(evNamespace); // Limpiar por si acaso

  $(document)
    // 1. Crear Lista
    .on(`click${evNamespace}`, '#tr_btn_new', () => {
      const newList = { id: uid(), titulo: '', items: [], creado: Date.now() };
      listas.unshift(newList);
      guardarLocal(listas);
      sincronizarNube();

      $('.tr_empty').remove();
      const $newCard = $(tplCard(newList));
      $('#tr_grid').prepend($newCard);
      
      // Animamos solo la nueva tarjeta
      showi([`#tr_${newList.id}`], 0); 
      actualizarResumen();
      setTimeout(() => $newCard.find('.tr_in_tit').focus(), 100);
    })
    
    // 2. Cambiar título de lista
    .on(`change${evNamespace}`, '.tr_in_tit', function() {
      const id = $(this).closest('.tr_card').data('id');
      const l = listas.find(x => x.id === id);
      if(l) { 
        l.titulo = $(this).val(); 
        guardarLocal(listas); 
        sincronizarNube();
      }
    })
    
    // 3. Eliminar Lista (Animación de salida suave)
    .on(`click${evNamespace}`, '.tr_btn_del', function() {
      const $card = $(this).closest('.tr_card');
      const id = $card.data('id');
      listas = listas.filter(x => x.id !== id);
      guardarLocal(listas);
      sincronizarNube();
      
      $card.css('overflow', 'hidden').slideUp(300, function() { 
        $(this).remove(); 
        if(!listas.length) renderTodo(); 
      });
      actualizarResumen();
      Notificacion('Lista eliminada', 'success');
    })
    
    // 4. Añadir Ítem (Granular + Animación)
    .on(`keydown${evNamespace}`, '.tr_in_add', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = $(this).val().trim();
        if (!val) return;
        
        const $card = $(this).closest('.tr_card');
        const id = $card.data('id');
        const l = listas.find(x => x.id === id);
        
        if(l) { 
          const newItem = { id: uid(), text: val, done: false };
          l.items.push(newItem); // Añadimos al final
          guardarLocal(listas);
          sincronizarNube();
          
          const $newItem = $(tplItem(newItem)).hide();
          $card.find('.tr_items').append($newItem);
          $newItem.slideDown(250);
          $(this).val('');
          
          // Actualizar barra de progreso dinámicamente
          const total = l.items.length;
          const done = l.items.filter(x => x.done).length;
          $card.find('.tr_progress_bar').css('width', total ? `${(done/total)*100}%` : '0%');
          actualizarResumen();
        }
      }
    })
    
    // 5. Toggle Check Ítem (Granular con CSS transition)
    .on(`click${evNamespace}`, '.tr_check', function() {
      const $item = $(this).closest('.tr_item');
      const $card = $(this).closest('.tr_card');
      const idL = $card.data('id');
      const idI = $item.data('iid');
      
      const l = listas.find(x => x.id === idL);
      if(l) {
        const i = l.items.find(x => x.id === idI);
        if(i) {
          i.done = !i.done;
          guardarLocal(listas);
          sincronizarNube();
          
          $item.toggleClass('done', i.done);
          
          // Actualizar progreso
          const total = l.items.length;
          const done = l.items.filter(x => x.done).length;
          $card.find('.tr_progress_bar').css('width', `${(done/total)*100}%`);
          actualizarResumen();
        }
      }
    })
    
    // 6. Editar texto de un ítem
    .on(`change${evNamespace}`, '.tr_item_txt', function() {
      const idL = $(this).closest('.tr_card').data('id');
      const idI = $(this).closest('.tr_item').data('iid');
      const l = listas.find(x => x.id === idL);
      if(l) {
        const i = l.items.find(x => x.id === idI);
        if(i) {
          i.text = $(this).val();
          guardarLocal(listas);
          sincronizarNube();
        }
      }
    })
    
    // 7. Eliminar Ítem individual (Animación granular)
    .on(`click${evNamespace}`, '.tr_btn_del_item', function() {
      const $item = $(this).closest('.tr_item');
      const $card = $(this).closest('.tr_card');
      const idL = $card.data('id');
      const idI = $item.data('iid');
      
      const l = listas.find(x => x.id === idL);
      if(l) {
        l.items = l.items.filter(x => x.id !== idI);
        guardarLocal(listas);
        sincronizarNube();
        
        $item.slideUp(250, function() { $(this).remove(); });
        
        // Actualizar progreso
        const total = l.items.length;
        const done = l.items.filter(x => x.done).length;
        $card.find('.tr_progress_bar').css('width', total ? `${(done/total)*100}%` : '0%');
        actualizarResumen();
      }
    });
};

export const cleanup = () => {
  $(document).off('.tr');
};
