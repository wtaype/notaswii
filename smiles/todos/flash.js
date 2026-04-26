import './flash.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import { showi, Notificacion, wiAuth } from '../widev.js';

// ════════════════════════════════════════════════════════════
// ⚡ MODO FLASH: Captura a la velocidad del pensamiento
// ════════════════════════════════════════════════════════════

const LS_KEY = 'flash';
const cargarLocal = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const guardarLocal = (ns) => localStorage.setItem(LS_KEY, JSON.stringify(ns));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Formatear tiempo estilo "Hace 5 min"
const tiempoAtras = (ts) => {
  const segs = Math.floor((Date.now() - ts) / 1000);
  if (segs < 60) return 'Justo ahora';
  const mins = Math.floor(segs / 60);
  if (mins < 60) return `Hace ${mins} min`;
  const horas = Math.floor(mins / 60);
  if (horas < 24) return `Hace ${horas}h`;
  return new Date(ts).toLocaleDateString();
};

const tplFlash = (f) => `
  <div class="fl_card" data-id="${f.id}">
    <div class="fl_card_time"><i class="fas fa-bolt"></i> ${tiempoAtras(f.creado)}</div>
    <div class="fl_card_body">${f.contenido?.replace(/\n/g, '<br>') || ''}</div>
  </div>
`;

// ── RENDERIZADO PRINCIPAL ──────────────────────────────────────
export const render = () => `
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">Captura al instante</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Escribe una idea brillante..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" title="Guardar (Enter)"><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift + Enter</strong> para nueva línea</div>
  </div>

  <div class="fl_timeline">
    <div class="fl_timeline_tit"><i class="fas fa-clock-rotate-left"></i> Tus últimos flashes</div>
    <div id="fl_grid" class="fl_grid"></div>
  </div>
</div>
`;

// ── LÓGICA DE INTERACCIÓN ──────────────────────────────────────
export const init = () => {
  const $inp = $('#fl_input');
  
  // Auto-resize y Glow effect
  $inp.on('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    if (this.value.trim().length > 0) {
      $('.fl_input_box').addClass('active');
    } else {
      $('.fl_input_box').removeClass('active');
    }
  });

  // Renderizar la línea de tiempo
  const renderFlashes = () => {
    const flashes = cargarLocal().sort((a,b) => b.creado - a.creado).slice(0, 50);
    $('#fl_grid').html(flashes.length ? flashes.map(tplFlash).join('') : '<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>');
    // Animamos los nuevos flashes usando el súper motor showi
    if (flashes.length) showi(['.fl_grid > *'], 50);
  };

  const guardarFlash = async () => {
    const val = $inp.val().trim();
    if (!val) return;
    
    const flashes = cargarLocal();
    const n = {
      id: uid(),
      tipo: 'flash', 
      contenido: val,
      creado: Date.now(),
      actualizado: Date.now()
    };
    flashes.unshift(n);
    guardarLocal(flashes);
    
    // Resetear UI
    $inp.val('').css('height', 'auto');
    $('.fl_input_box').removeClass('active');
    
    // Notificación y Refresco
    Notificacion('¡Flash capturado! ⚡', 'success');
    renderFlashes();
    
    // Sincronización en la nube (silenciosa)
    if (wiAuth.logged) {
      try {
        const { db } = await import('../firebase.js');
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'usuarios', wiAuth.user.usuario, 'flash', n.id), n);
      } catch (e) {
        console.error('Error guardando flash en nube', e);
      }
    }
  };

  // Eventos de teclado y clic
  $('#fl_btn_send').on('click', guardarFlash);

  $inp.on('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      guardarFlash();
    }
  });

  // Animación inicial del hero completo
  showi(['.fl_hero > *', '.fl_timeline_tit'], 60);
  
  renderFlashes();
  
  // Auto-focus para escritura instantánea real
  setTimeout(() => $inp.focus(), 300);
  
  console.log('⚡ Modo Flash Activado');
};

export const cleanup = () => {
  $('#fl_input').off('input keydown');
  $('#fl_btn_send').off('click');
};
