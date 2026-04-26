import './chatwil.css';
import $ from 'jquery';
import { version } from './wii.js';
import { Saludar } from '../../widev.js';
import * as memoria from './memoria.js';
import * as orar from './head/orar.js';

// ── RENDER ─────────────────────────────────────────────────────────────────────
export const render = () => {
  const sugs = orar.SUGERENCIAS.general;

  const saludoStr = Saludar().replace(/, $/, '').toLowerCase();
  const saludoCap = saludoStr.charAt(0).toUpperCase() + saludoStr.slice(1);

  return `
<div class="miia">
  <div class="miia_messages" id="miiaMessages">
    <div class="miia_empty">
      <div class="miia_welcome_icon">
        <img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img">
      </div>
      <h2 class="miia_welcome_title">ChatWil 🙏💚</h2>
      <p class="miia_welcome_text">
        ${saludoCap} herman@, vamos a orar juntos.
      </p>
      <div class="miia_suggestions">
        ${sugs.map(s => `
          <div class="suggestion_card" data-prompt="${s.prompt}">
            <i class="fas ${s.ico}"></i><span>${s.txt}</span>
          </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="miia_input_area">
    <div class="miia_input_wrapper">
      <textarea class="miia_input" id="miiaInput" placeholder="Escribe aquí tu petición..." rows="1"></textarea>
      <button class="miia_send active" id="miiaSend">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <div class="miia_input_info">
      <span><i class="fas fa-hands-praying"></i> Presiona <kbd>Enter</kbd> para enviar · ChatWil ${version} · <a href="https://chatwiil.web.app/terminos.html" target="_blank">Términos</a></span>
    </div>
  </div>
</div>`;
};

// ── ESTADO ─────────────────────────────────────────────────────────────────────
let escribiendo = false, contador = 0;
let _brain = null;

const obtenerEl  = () => ({ $msg: $('#miiaMessages'), $inp: $('#miiaInput'), $btn: $('#miiaSend') });
const desplazar  = (suave = false) => {
  const c = $('#miiaMessages')[0]; if (!c) return;
  suave ? c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' }) : (c.scrollTop = c.scrollHeight);
};

// Lazy load del brain completo solo cuando el usuario envía por primera vez
const getBrain = async () => _brain ??= await import('./brain.js');

// ── MENSAJES ───────────────────────────────────────────────────────────────────
const agregarMsg = (texto, tipo) => {
  const { $msg } = obtenerEl();
  const hora = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  const avatar = tipo === 'user'
    ? '<i class="fas fa-user-circle"></i>'
    : '<img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img">';

  const $m = $(`
    <div class="miia_message ${tipo}" data-time="${hora}">
      <div class="message_avatar">${avatar}</div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">${tipo === 'user' ? 'Tú' : 'ChatWil'}</span>
          <span class="message_time">${hora}</span>
        </div>
        <div class="message_text"></div>
      </div>
    </div>`);

  $m.find('.message_text').text(texto);
  $msg.append($m);
  desplazar();
};

const mostrarEscribiendo = (mostrar) => {
  $('.miia_message.typing').remove();
  if (!mostrar) return;
  $('#miiaMessages').append(`
    <div class="miia_message ai typing">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div>
      </div>
    </div>`);
  desplazar();
};

const escribirTexto = (contenido, callback) => {
  const { $msg } = obtenerEl();
  const hora = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  const id = `tw_${Date.now()}_${++contador}`;

  $msg.append(`
    <div class="miia_message ai" data-time="${hora}">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">ChatWil</span>
          <span class="message_time">${hora}</span>
        </div>
        <div class="message_text" id="${id}"></div>
      </div>
    </div>`);

  desplazar();
  const $el = $(`#${id}`);
  const texto = contenido;
  let idx = 0, ultimoScroll = 0;

  const escribir = () => {
    if (idx < texto.length) {
      $el.text(texto.substring(0, idx + 1));
      idx++;
      if (Date.now() - ultimoScroll > 100) { desplazar(); ultimoScroll = Date.now(); }
      setTimeout(escribir, 15);
    } else {
      $el.removeAttr('id');
      desplazar(true);
      callback?.();
    }
  };
  escribir();
};

// ── SUGERENCIAS CONTEXTUALES ───────────────────────────────────────────────────
const mostrarSugerencias = (tema) => {
  $('.miia_contextual_suggestions').remove();
  const sugs = orar.getSugerencias(tema);
  if (!sugs?.length) return;

  const html = `
    <div class="miia_contextual_suggestions">
      <p class="suggestions_title"><i class="fas fa-hands-praying"></i> ¿Quieres continuar orando?</p>
      <div class="suggestions_grid">
        ${sugs.map(s => `
          <div class="suggestion_card_small" data-prompt="${s.prompt}">
            <i class="fas ${s.ico}"></i><span>${s.txt}</span>
          </div>`).join('')}
      </div>
    </div>`;

  $('#miiaMessages').append(html);
  desplazar(true);
};

// ── ENVIAR MENSAJE ─────────────────────────────────────────────────────────────
const enviarMsg = async () => {
  const { $inp } = obtenerEl();
  const msg = $inp.val().trim();
  if (!msg || escribiendo) return;

  $('.miia_empty').fadeOut(200, function () { $(this).remove(); });
  agregarMsg(msg, 'user');
  $inp.val('').css('height', 'auto').trigger('input');

  escribiendo = true;
  mostrarEscribiendo(true);

  try {
    // Registrar el mensaje del usuario en la memoria
    memoria.add('user', msg);

    // ⏳ Simular tiempo de pensamiento/procesamiento (800ms - 1.5s)
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    // 1. Primero intenta orar.js (oraciones y versículos)
    let res = orar.generate(msg);

    // 2. Si no hay match de oración, usa el brain general
    if (!res) {
      const brain = await getBrain();
      res = await brain.procesar(msg);
    }

    mostrarEscribiendo(false);
    if (!res || typeof res !== 'string') throw new Error('Respuesta inválida');

    // Registrar la respuesta en la memoria
    memoria.add('assistant', res);

    escribirTexto(res, () => {
      escribiendo = false;
      const tema = orar.detectarTema(msg);
      mostrarSugerencias(tema);
    });
  } catch (err) {
    console.error('❌ Error:', err);
    mostrarEscribiendo(false);
    agregarMsg('😔 Disculpa, tuve un problema. Por favor, intenta de nuevo. 💚', 'ai');
    escribiendo = false;
  }
};

// ── INIT ───────────────────────────────────────────────────────────────────────
export const init = () => {
  const { $inp, $btn } = obtenerEl();

  // Pre-llenar input con saludo inicial por defecto (salud)
  const saludoStr = Saludar().replace(/, $/, '').toLowerCase();
  const saludoCap = saludoStr.charAt(0).toUpperCase() + saludoStr.slice(1);
  const textoInicial = `${saludoCap}, me gustaría que oremos por mi salud.`;
  $inp.val(textoInicial);

  // Auto-resize textarea
  $inp.on('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    const tieneTxt = $(this).val().trim().length > 0;
    $btn.prop('disabled', !tieneTxt).toggleClass('active', tieneTxt);
  });

  $inp.on('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMsg(); } });
  $btn.on('click', enviarMsg);

  // Click en cualquier suggestion (inicial y contextual)
  $(document).on('click', '.suggestion_card, .suggestion_card_small', function () {
    $inp.val($(this).data('prompt')).css('height', 'auto').trigger('input').focus();
    // Auto-enviar en las cards contextuales
    if ($(this).hasClass('suggestion_card_small')) setTimeout(enviarMsg, 120);
  });

  memoria.loadHistory();
  console.log(`✅ ChatWil ${version} iniciado`);
};

export const cleanup = () => {
  $('#miiaInput, #miiaSend').off();
  $(document).off('click', '.suggestion_card, .suggestion_card_small');
  memoria.clear();
};