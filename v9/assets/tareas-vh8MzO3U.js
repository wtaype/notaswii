import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,h as n,i as r}from"./widev-vc3w_AsM.js";import{t as i}from"./preload-helper-TQeha_t2.js";var a=`tareas`,o=()=>{try{return JSON.parse(localStorage.getItem(a)||`[]`)}catch{return[]}},s=e=>localStorage.setItem(a,JSON.stringify(e)),c=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),l=()=>`
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
`,u=e=>`
  <div class="tr_item ${e.done?`done`:``}" data-iid="${e.id}">
    <button class="tr_check" title="Marcar completado"><i class="fas fa-check"></i></button>
    <input type="text" class="tr_item_txt" value="${e.text}" placeholder="Elemento vacío...">
    <button class="tr_btn_del_item" title="Eliminar ítem"><i class="fas fa-times"></i></button>
  </div>
`,d=e=>{let t=e.items.length,n=e.items.filter(e=>e.done).length,r=t?n/t*100:0,i=[...e.items].sort((e,t)=>e.done===t.done?0:e.done?1:-1).map(u).join(``);return`
  <article class="tr_card" id="tr_${e.id}" data-id="${e.id}">
    <div class="tr_progress"><div class="tr_progress_bar" style="width:${r}%"></div></div>
    
    <div class="tr_card_tit">
      <input type="text" class="tr_in_tit" value="${e.titulo}" placeholder="Título de la lista...">
      <button class="tr_btn_del" title="Eliminar Lista completa"><i class="fas fa-trash-can"></i></button>
    </div>
    
    <div class="tr_items">
      ${i}
    </div>
    
    <div class="tr_add">
      <i class="fas fa-plus"></i>
      <input type="text" class="tr_in_add" placeholder="Añadir ítem y presionar Enter...">
    </div>
  </article>
  `},f=[],p=()=>{let t=0,n=0;f.forEach(e=>{t+=e.items.length,n+=e.items.filter(e=>e.done).length}),f.length?e(`#tr_resumen`).text(`${n}/${t} completadas`):e(`#tr_resumen`).text(`0/0`)},m=()=>{f.length?e(`#tr_grid`).html(f.map(d).join(``)):e(`#tr_grid`).html(`
      <div class="tr_empty">
        <i class="fas fa-tasks"></i>
        <span>No tienes listas. Crea una para organizar tus tareas.</span>
      </div>
    `),p()},h=async()=>{if(t.logged)try{let{db:e}=await i(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:n,setDoc:r}=await i(async()=>{let{doc:e,setDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,setDoc:t}},[]),a=f.map(i=>r(n(e,`usuarios`,t.user.usuario,`tareas`,i.id),i));await Promise.all(a)}catch(e){console.error(`Error sincronizando tareas`,e)}},g=()=>{f=o(),m(),n([`.tr_hero_left`,`.tr_btn_new`,`.tr_card`],60),e(document).off(`.tr`),e(document).on(`click.tr`,`#tr_btn_new`,()=>{let t={id:c(),titulo:``,items:[],creado:Date.now()};f.unshift(t),s(f),h(),e(`.tr_empty`).remove();let r=e(d(t));e(`#tr_grid`).prepend(r),n([`#tr_${t.id}`],0),p(),setTimeout(()=>r.find(`.tr_in_tit`).focus(),100)}).on(`change.tr`,`.tr_in_tit`,function(){let t=e(this).closest(`.tr_card`).data(`id`),n=f.find(e=>e.id===t);n&&(n.titulo=e(this).val(),s(f),h())}).on(`click.tr`,`.tr_btn_del`,function(){let t=e(this).closest(`.tr_card`),n=t.data(`id`);f=f.filter(e=>e.id!==n),s(f),h(),t.css(`overflow`,`hidden`).slideUp(300,function(){e(this).remove(),f.length||m()}),p(),r(`Lista eliminada`,`success`)}).on(`keydown.tr`,`.tr_in_add`,function(t){if(t.key===`Enter`){t.preventDefault();let n=e(this).val().trim();if(!n)return;let r=e(this).closest(`.tr_card`),i=r.data(`id`),a=f.find(e=>e.id===i);if(a){let t={id:c(),text:n,done:!1};a.items.push(t),s(f),h();let i=e(u(t)).hide();r.find(`.tr_items`).append(i),i.slideDown(250),e(this).val(``);let o=a.items.length,l=a.items.filter(e=>e.done).length;r.find(`.tr_progress_bar`).css(`width`,o?`${l/o*100}%`:`0%`),p()}}}).on(`click.tr`,`.tr_check`,function(){let t=e(this).closest(`.tr_item`),n=e(this).closest(`.tr_card`),r=n.data(`id`),i=t.data(`iid`),a=f.find(e=>e.id===r);if(a){let e=a.items.find(e=>e.id===i);if(e){e.done=!e.done,s(f),h(),t.toggleClass(`done`,e.done);let r=a.items.length,i=a.items.filter(e=>e.done).length;n.find(`.tr_progress_bar`).css(`width`,`${i/r*100}%`),p()}}}).on(`change.tr`,`.tr_item_txt`,function(){let t=e(this).closest(`.tr_card`).data(`id`),n=e(this).closest(`.tr_item`).data(`iid`),r=f.find(e=>e.id===t);if(r){let t=r.items.find(e=>e.id===n);t&&(t.text=e(this).val(),s(f),h())}}).on(`click.tr`,`.tr_btn_del_item`,function(){let t=e(this).closest(`.tr_item`),n=e(this).closest(`.tr_card`),r=n.data(`id`),i=t.data(`iid`),a=f.find(e=>e.id===r);if(a){a.items=a.items.filter(e=>e.id!==i),s(f),h(),t.slideUp(250,function(){e(this).remove()});let r=a.items.length,o=a.items.filter(e=>e.done).length;n.find(`.tr_progress_bar`).css(`width`,r?`${o/r*100}%`:`0%`),p()}})},_=()=>{e(document).off(`.tr`)};export{_ as cleanup,g as init,l as render};