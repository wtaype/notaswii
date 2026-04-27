import $ from 'jquery';
import { app, lanzamiento, by, linkme, version, icon } from './wii.js';
import { wiAuth } from './widev.js';

export { footer };
function footer(){
  const ahora = new Date();
  return `
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app">${app}</span>
          <span class="foo_ver">${version}</span>
        </div>
        <div class="foo_links">
          <a href="/terminos.html" class="foo_link" target="_blank"><i class="fas fa-file-contract"></i> Términos y condiciones</a>
          <a href="/cookies.html" class="foo_link" target="_blank"><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/feedback.html" class="foo_link" target="_blank"><i class="fas fa-comment-dots"></i> Feedback</a>
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${linkme}" target="_blank"><strong>${by}</strong></a> ${lanzamiento} - ${ahora.getFullYear()}</span>
      </div>
    </div>
  </footer>
  `;
}; $('body').append(footer());  //Actualizar 

$("head").append(`<style>:root{--bgim:url("${import.meta.env.BASE_URL}wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);

// MOBILE DRAWER v4.0
$('body').append(`
<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"></div>
  <div class="movil_nav"></div>
</nav>`);

const syncDrawer = () => setTimeout(() => {
  $('.movil_logo').html($('.wilogo').html() || `<i class="fa-solid ${icon}"></i> ${app}`);
  $('.movil_nav').html(`${$('.winav').html() || ''}${$('.nv_right').html() || ''}`);
}, 50);

wiAuth.on(syncDrawer);
$(syncDrawer); // Carga inicial

const cerrar = () => $('body').removeClass('movil_open');
$(document).on('click', '.wimenu', () => $('body').addClass('movil_open'));
$(document).on('click', '.movil_close, .movil_overlay, .movil_nav .nv_item, .movil_nav button', cerrar);