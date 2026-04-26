import{t as e}from"./vendor-BDh6mtVu.js";import{n as t,s as n,t as r}from"./wii-By3LwGGz.js";function i(){return`
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app">${r}</span>
          <span class="foo_ver">v11</span>
        </div>
        <div class="foo_links">
          <a href="/terminos.html" class="foo_link" target="_blank"><i class="fas fa-file-contract"></i> Términos</a>
          <a href="/cookies.html" class="foo_link" target="_blank"><i class="fas fa-cookie-bite"></i> Cookies</a>
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${n}" target="_blank"><strong>${t}</strong></a> 2024 - ${new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
  `}e(`body`).append(i()),e(`head`).append(`<style>:root{--bgim:url("/notaswii/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);var a=()=>`${e(`.nv_right`).html()}`;e(`body`).append(`<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"><i class="fas fa-heart"></i> ${r}</div>
  <div class="movil_nav">${e(`.winav`).html()}${a()}</div>
</nav>`),new MutationObserver(()=>{let t=e(`.movil_nav .movil_divider`);t.nextAll().remove(),t.remove(),e(`.movil_nav`).append(a())}).observe(e(`.nv_right`)[0],{childList:!0,subtree:!0});var o=()=>e(`body`).removeClass(`movil_open`);e(`.wimenu`).on(`click`,()=>e(`body`).addClass(`movil_open`)),e(`.movil_close, .movil_overlay`).on(`click`,o),e(document).on(`click`,`.movil_nav .nv_item, .movil_nav .bt_auth, .movil_nav .bt_salir`,o);export{i as footer};