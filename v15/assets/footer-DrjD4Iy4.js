import{t as e}from"./vendor-BDh6mtVu.js";import{h as t}from"./widev-Dein9EMx.js";import{c as n,n as r,s as i,t as a}from"./wii-BL3abZT3.js";function o(){return`
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app">${a}</span>
          <span class="foo_ver">v15</span>
        </div>
        <div class="foo_links">
          <a href="/terminos.html" class="foo_link" target="_blank"><i class="fas fa-file-contract"></i> Términos y condiciones</a>
          <a href="/cookies.html" class="foo_link" target="_blank"><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/feedback.html" class="foo_link" target="_blank"><i class="fas fa-comment-dots"></i> Feedback</a>
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${n}" target="_blank"><strong>${r}</strong></a> ${i} - ${new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
  `}e(`body`).append(o()),e(`head`).append(`<style>:root{--bgim:url("/notaswii/v15/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`),e(`body`).append(`
<div class="movil_overlay"></div>
<nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
  <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
  <div class="movil_logo"></div>
  <div class="movil_nav"></div>
</nav>`);var s=()=>setTimeout(()=>{e(`.movil_logo`).html(e(`.wilogo`).html()||`<i class="fa-solid fa-book-open"></i> NotasWii`),e(`.movil_nav`).html(`${e(`.winav`).html()||``}${e(`.nv_right`).html()||``}`)},50);t.on(s),e(s),e(document).on(`click`,`.wimenu`,()=>e(`body`).addClass(`movil_open`)),e(document).on(`click`,`.movil_close, .movil_overlay, .movil_nav .nv_item, .movil_nav button`,()=>e(`body`).removeClass(`movil_open`));export{o as footer};