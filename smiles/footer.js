import $ from 'jquery';
import {app, lanzamiento, by, linkme, version} from './wii.js';

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
          <a href="/terminos.html" class="foo_link" target="_blank"><i class="fas fa-file-contract"></i> Términos</a>
          <a href="/cookies.html" class="foo_link" target="_blank"><i class="fas fa-cookie-bite"></i> Cookies</a>
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${linkme}" target="_blank"><strong>${by}</strong></a> 2024 - ${ahora.getFullYear()}</span>
      </div>
    </div>
  </footer>
  `;
}; $('body').append(footer());  //Actualizar 

$("head").append(`<style>:root{--bgim:url("${import.meta.env.BASE_URL}wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`)

// MOBILE DRAWER v3.0
const authHtml = () => `${$('.nv_right').html()}`;
$('body').append(`<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"><i class="fas fa-heart"></i> ${app}</div>
  <div class="movil_nav">${$('.winav').html()}${authHtml()}</div>
</nav>`);
const sync = () => { const $d = $('.movil_nav .movil_divider'); $d.nextAll().remove(); $d.remove(); $('.movil_nav').append(authHtml()); };
new MutationObserver(sync).observe($('.nv_right')[0], { childList: true, subtree: true });
const cerrar = () => $('body').removeClass('movil_open');
$('.wimenu').on('click', () => $('body').addClass('movil_open'));
$('.movil_close, .movil_overlay').on('click', cerrar);
$(document).on('click', '.movil_nav .nv_item, .movil_nav .bt_auth, .movil_nav .bt_salir', cerrar);