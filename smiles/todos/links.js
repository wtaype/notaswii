import './links.css';
import $ from 'jquery';
import { app } from '../wii.js';
import { showi, Notificacion, wiAuth, wicopy } from '../widev.js';

// ════════════════════════════════════════════════════════════
// 🔗 LINKS: Guardado Rápido de Enlaces
// ════════════════════════════════════════════════════════════

const LS_KEY = 'links';
const cargarLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Extraer un dominio limpio para el título automático
const extractDomain = (url) => {
  try {
    let hostname = new URL(url).hostname;
    hostname = hostname.replace('www.', '');
    return hostname.split('.')[0] || 'Enlace';
  } catch {
    return 'Enlace Web';
  }
};

// ── RENDER PRINCIPAL ──────────────────────────────────────────
export const render = () => `
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> Enlaces Rápidos</h1>
      <p id="lk_count" class="lk_count">0 guardados</p>
    </div>
  </div>
  
  <div class="lk_add_box">
    <i class="fas fa-globe"></i>
    <input type="url" id="lk_in_url" class="lk_input" placeholder="Pega una URL y presiona Enter..." autocomplete="off">
    <button id="lk_btn_add" class="lk_btn_add"><i class="fas fa-plus"></i> Guardar</button>
  </div>

  <div id="lk_grid" class="lk_grid"></div>
</div>
`;

// ── TEMPLATES ──────────────────────────────────────────────────
const tplCard = (l) => {
  // Generar letra inicial para el ícono si no se sabe
  const init = l.titulo ? l.titulo.charAt(0).toUpperCase() : 'L';
  
  return `
  <article class="lk_card" id="lk_${l.id}" data-id="${l.id}">
    <div class="lk_icon">
      ${init}
    </div>
    
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${l.titulo}" placeholder="Título del enlace...">
      <a href="${l.url}" target="_blank" rel="noopener" class="lk_url" title="${l.url}">${l.url}</a>
    </div>
    
    <div class="lk_actions">
      <button class="lk_btn_act copy" title="Copiar URL"><i class="far fa-copy"></i></button>
      <button class="lk_btn_act del" title="Eliminar"><i class="fas fa-trash-can"></i></button>
      <a href="${l.url}" target="_blank" rel="noopener" class="lk_btn_act" title="Abrir enlace"><i class="fas fa-external-link-alt"></i></a>
    </div>
  </article>
  `;
};

// ── LÓGICA DE ESTADO ──────────────────────────────────────────
let links = [];

const renderTodo = () => {
  $('#lk_count').text(`${links.length} guardado${links.length !== 1 ? 's' : ''}`);
  
  if (!links.length) {
    $('#lk_grid').html(`
      <div class="lk_empty">
        <i class="fas fa-satellite-dish"></i>
        <span>No tienes enlaces guardados. Pega uno arriba para empezar.</span>
      </div>
    `);
  } else {
    $('#lk_grid').html(links.map(tplCard).join(''));
  }
};

const sincronizarNube = async () => {
  if (!wiAuth.logged) return;
  try {
    const { db } = await import('../firebase.js');
    const { doc, setDoc } = await import('firebase/firestore');
    // En una app real de miles de links, preferirías setDoc individual al agregar
    // Aquí actualizamos en batch para mantener sincronía total
    const ops = links.map(l => setDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'links', l.id), l));
    await Promise.all(ops);
  } catch (e) {
    console.error('Error sincronizando links', e);
  }
};

// ── EVENTOS Y CICLO DE VIDA ────────────────────────────────────
export const init = () => {
  links = cargarLocal().sort((a, b) => b.creado - a.creado);
  renderTodo();
  
  // Animación inicial
  showi(['.lk_hero_left', '.lk_add_box', '.lk_card'], 60);

  const evNamespace = '.lk';
  $(document).off(evNamespace); // Limpiar previo

  const agregarLink = () => {
    const $in = $('#lk_in_url');
    let url = $in.val().trim();
    if (!url) return;
    
    // Auto-completar esquema HTTP si el usuario escribe "google.com"
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    
    // Extraer nombre del dominio para el título automático
    const domainName = extractDomain(url);
    const titulo = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    
    const newLink = { id: uid(), url, titulo, creado: Date.now() };
    
    links.unshift(newLink);
    guardarLocal(links);
    sincronizarNube();
    
    $in.val(''); // Limpiar input
    
    // Insertar en la UI sin recargar todo el grid
    $('.lk_empty').remove();
    const $newCard = $(tplCard(newLink));
    $('#lk_grid').prepend($newCard);
    
    // Animamos solo la nueva tarjeta
    showi([`#lk_${newLink.id}`], 0);
    $('#lk_count').text(`${links.length} guardado${links.length !== 1 ? 's' : ''}`);
    
    Notificacion('Enlace guardado', 'success');
  };

  $(document)
    // Guardar nuevo link
    .on(`click${evNamespace}`, '#lk_btn_add', agregarLink)
    .on(`keydown${evNamespace}`, '#lk_in_url', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); agregarLink(); }
    })
    
    // Cambiar título (Edición in-place)
    .on(`change${evNamespace}`, '.lk_tit', function() {
      const id = $(this).closest('.lk_card').data('id');
      const l = links.find(x => x.id === id);
      if(l) { 
        l.titulo = $(this).val(); 
        
        // Actualizar la letra inicial del icono
        const init = l.titulo ? l.titulo.charAt(0).toUpperCase() : 'L';
        $(this).closest('.lk_card').find('.lk_icon').text(init);
        
        guardarLocal(links); 
        sincronizarNube();
      }
    })
    
    // Eliminar enlace (Animación SlideUp)
    .on(`click${evNamespace}`, '.lk_btn_act.del', function(e) {
      e.stopPropagation();
      if (!confirm('¿Seguro que deseas eliminar este enlace?')) return;
      
      const $card = $(this).closest('.lk_card');
      const id = $card.data('id');
      links = links.filter(x => x.id !== id);
      guardarLocal(links);
      sincronizarNube();
      
      $card.css('overflow', 'hidden').slideUp(300, function() { 
        $(this).remove(); 
        $('#lk_count').text(`${links.length} guardado${links.length !== 1 ? 's' : ''}`);
        if(!links.length) renderTodo(); 
      });
      Notificacion('Enlace eliminado', 'success');
    })
    
    // Copiar URL al portapapeles
    .on(`click${evNamespace}`, '.lk_btn_act.copy', function(e) {
      e.stopPropagation(); // Evitar que el clic llegue a la tarjeta
      const id = $(this).closest('.lk_card').data('id');
      const l = links.find(x => x.id === id);
      if(l) {
        wicopy(l.url, this, 'URL copiada');
      }
    })
    
    // Abrir enlace haciendo clic en cualquier parte de la tarjeta
    .on(`click${evNamespace}`, '.lk_card', function(e) {
      // Excluir clics en inputs, botones o links directos
      if ($(e.target).closest('input, button, a').length) return;
      
      const id = $(this).data('id');
      const l = links.find(x => x.id === id);
      if(l) {
        window.open(l.url, '_blank', 'noopener,noreferrer');
      }
    });
    
  setTimeout(() => $('#lk_in_url').focus(), 100);
};

export const cleanup = () => {
  $(document).off('.lk');
};
