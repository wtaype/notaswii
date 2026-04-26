import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,h as n,i as r}from"./widev-vc3w_AsM.js";import{t as i}from"./preload-helper-TQeha_t2.js";var a=`tablero_items`,o=()=>{try{return JSON.parse(localStorage.getItem(a)||`[]`)}catch{return[]}},s=e=>localStorage.setItem(a,JSON.stringify(e)),c=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),l=()=>`
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
`,u=[],d=null,f=0,p=e=>`
  <article class="tb_card theme-${e.theme||0}" id="tb_${e.id}" data-id="${e.id}">
    ${e.titulo?`<h3 class="tb_card_title">${e.titulo}</h3>`:``}
    ${e.contenido?`<p class="tb_card_content">${e.contenido}</p>`:``}
    
    <div class="tb_card_actions">
      <button class="tb_btn_act edit" title="Editar"><i class="fas fa-pen"></i></button>
      <button class="tb_btn_act del" title="Eliminar"><i class="fas fa-trash-can"></i></button>
    </div>
  </article>
`,m=()=>{e(`#tb_count`).text(`${u.length} idea${u.length===1?``:`s`} guardada${u.length===1?``:`s`}`),u.length?e(`#tb_grid`).html(u.map(p).join(``)):e(`#tb_grid`).html(`
      <div style="grid-column: 1 / -1; text-align:center; padding: 10vh 2vw; color:var(--tx3);">
        <i class="fas fa-magic" style="font-size:3rem; margin-bottom:2vh; opacity:0.5; color:var(--tx2);"></i>
        <h2 style="color:var(--tx);">Tu tablero está vacío</h2>
        <p>Añade tu primera nota visual colorida para comenzar a organizar tus ideas.</p>
      </div>
    `)},h=async()=>{if(t.logged)try{let{db:e}=await i(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:n,setDoc:r}=await i(async()=>{let{doc:e,setDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,setDoc:t}},[]),a=u.slice(0,10).map(i=>r(n(e,`usuarios`,t.user.usuario,`tablero`,i.id),i));await Promise.all(a)}catch{}},g=e=>{e.style.height=`auto`,e.style.height=e.scrollHeight+`px`},_=(t=null)=>{d=t;let n=e(`#tb_modal_box`);if(n.removeClass(`theme-0 theme-1 theme-2 theme-3 theme-4 theme-5`),t){let n=u.find(e=>e.id===t);n&&(e(`#tb_in_tit`).val(n.titulo),e(`#tb_in_cnt`).val(n.contenido),f=n.theme||0)}else e(`#tb_in_tit`).val(``),e(`#tb_in_cnt`).val(``),f=0;n.addClass(`theme-${f}`),e(`.tb_theme_dot`).removeClass(`active`),e(`.tb_theme_dot[data-t="${f}"]`).addClass(`active`),e(`#tb_modal_wrap`).addClass(`active`),setTimeout(()=>{g(document.getElementById(`tb_in_cnt`)),e(`#tb_in_cnt`).focus()},100)},v=()=>{e(`#tb_modal_wrap`).removeClass(`active`),d=null},y=()=>{u=o().sort((e,t)=>t.creado-e.creado),m(),n([`.tb_hero_left`,`.tb_btn_new`,`.tb_card`],60),e(document).off(`.tb`),e(document).on(`click.tb`,`#tb_btn_add`,()=>_()).on(`click.tb`,`#tb_btn_close`,v).on(`click.tb`,`#tb_modal_wrap`,function(e){e.target===this&&v()}).on(`input.tb`,`#tb_in_cnt`,function(){g(this)}).on(`click.tb`,`.tb_theme_dot`,function(){let t=e(this).data(`t`);f=t,e(`.tb_theme_dot`).removeClass(`active`),e(this).addClass(`active`),e(`#tb_modal_box`).removeClass(`theme-0 theme-1 theme-2 theme-3 theme-4 theme-5`).addClass(`theme-${t}`)}).on(`click.tb`,`#tb_btn_save_item`,()=>{let t=e(`#tb_in_tit`).val().trim(),i=e(`#tb_in_cnt`).val().trim();if(!t&&!i){r(`La nota está vacía`,`warning`);return}if(d){let e=u.find(e=>e.id===d);e&&(e.titulo=t,e.contenido=i,e.theme=f,e.creado=Date.now()),u=u.filter(e=>e.id!==d),u.unshift(u.find(e=>e.id===d)||{id:d,titulo:t,contenido:i,theme:f,creado:Date.now()}),r(`Nota actualizada`,`success`)}else{let e={id:c(),titulo:t,contenido:i,theme:f,creado:Date.now()};u.unshift(e),r(`Nota creada`,`success`)}s(u),h(),m(),v(),n([`.tb_card:first-child`],0)}).on(`click.tb`,`.tb_card`,function(t){e(t.target).closest(`.tb_btn_act`).length||_(e(this).data(`id`))}).on(`click.tb`,`.tb_btn_act.edit`,function(t){t.stopPropagation(),_(e(this).closest(`.tb_card`).data(`id`))}).on(`click.tb`,`.tb_btn_act.del`,function(t){if(t.stopPropagation(),!confirm(`¿Eliminar esta nota del tablero?`))return;let n=e(this).closest(`.tb_card`),i=n.data(`id`);u=u.filter(e=>e.id!==i),s(u),h(),n.css({transform:`scale(0.8)`,opacity:0}),setTimeout(()=>{n.remove(),e(`#tb_count`).text(`${u.length} idea${u.length===1?``:`s`} guardada${u.length===1?``:`s`}`),u.length||m()},300),r(`Nota eliminada`,`success`)})},b=()=>{e(document).off(`.tb`)};export{b as cleanup,y as init,l as render};