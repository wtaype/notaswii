import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,h as n,i as r,w as i}from"./widev-BLqPD_AU.js";import{t as a}from"./preload-helper-DbWsiEEd.js";var o=`links`,s=()=>{try{return JSON.parse(localStorage.getItem(o)||`[]`)}catch{return[]}},c=e=>localStorage.setItem(o,JSON.stringify(e)),l=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),u=e=>{try{let t=new URL(e).hostname;return t=t.replace(`www.`,``),t.split(`.`)[0]||`Enlace`}catch{return`Enlace Web`}},d=()=>`
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
`,f=e=>{let t=e.titulo?e.titulo.charAt(0).toUpperCase():`L`;return`
  <article class="lk_card" id="lk_${e.id}" data-id="${e.id}">
    <div class="lk_icon">
      ${t}
    </div>
    
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${e.titulo}" placeholder="Título del enlace...">
      <a href="${e.url}" target="_blank" rel="noopener" class="lk_url" title="${e.url}">${e.url}</a>
    </div>
    
    <div class="lk_actions">
      <button class="lk_btn_act copy" title="Copiar URL"><i class="far fa-copy"></i></button>
      <button class="lk_btn_act del" title="Eliminar"><i class="fas fa-trash-can"></i></button>
      <a href="${e.url}" target="_blank" rel="noopener" class="lk_btn_act" title="Abrir enlace"><i class="fas fa-external-link-alt"></i></a>
    </div>
  </article>
  `},p=[],m=()=>{e(`#lk_count`).text(`${p.length} guardado${p.length===1?``:`s`}`),p.length?e(`#lk_grid`).html(p.map(f).join(``)):e(`#lk_grid`).html(`
      <div class="lk_empty">
        <i class="fas fa-satellite-dish"></i>
        <span>No tienes enlaces guardados. Pega uno arriba para empezar.</span>
      </div>
    `)},h=async()=>{if(t.logged)try{let{db:e}=await a(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:n,setDoc:r}=await a(async()=>{let{doc:e,setDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,setDoc:t}},[]),i=p.map(i=>r(n(e,`usuarios`,t.user.usuario,`links`,i.id),i));await Promise.all(i)}catch(e){console.error(`Error sincronizando links`,e)}},g=()=>{p=s().sort((e,t)=>t.creado-e.creado),m(),n([`.lk_hero_left`,`.lk_add_box`,`.lk_card`],60),e(document).off(`.lk`);let t=()=>{let t=e(`#lk_in_url`),i=t.val().trim();if(!i)return;/^https?:\/\//i.test(i)||(i=`https://`+i);let a=u(i),o=a.charAt(0).toUpperCase()+a.slice(1),s={id:l(),url:i,titulo:o,creado:Date.now()};p.unshift(s),c(p),h(),t.val(``),e(`.lk_empty`).remove();let d=e(f(s));e(`#lk_grid`).prepend(d),n([`#lk_${s.id}`],0),e(`#lk_count`).text(`${p.length} guardado${p.length===1?``:`s`}`),r(`Enlace guardado`,`success`)};e(document).on(`click.lk`,`#lk_btn_add`,t).on(`keydown.lk`,`#lk_in_url`,function(e){e.key===`Enter`&&(e.preventDefault(),t())}).on(`change.lk`,`.lk_tit`,function(){let t=e(this).closest(`.lk_card`).data(`id`),n=p.find(e=>e.id===t);if(n){n.titulo=e(this).val();let t=n.titulo?n.titulo.charAt(0).toUpperCase():`L`;e(this).closest(`.lk_card`).find(`.lk_icon`).text(t),c(p),h()}}).on(`click.lk`,`.lk_btn_act.del`,function(t){if(t.stopPropagation(),!confirm(`¿Seguro que deseas eliminar este enlace?`))return;let n=e(this).closest(`.lk_card`),i=n.data(`id`);p=p.filter(e=>e.id!==i),c(p),h(),n.css(`overflow`,`hidden`).slideUp(300,function(){e(this).remove(),e(`#lk_count`).text(`${p.length} guardado${p.length===1?``:`s`}`),p.length||m()}),r(`Enlace eliminado`,`success`)}).on(`click.lk`,`.lk_btn_act.copy`,function(t){t.stopPropagation();let n=e(this).closest(`.lk_card`).data(`id`),r=p.find(e=>e.id===n);r&&i(r.url,this,`URL copiada`)}).on(`click.lk`,`.lk_card`,function(t){if(e(t.target).closest(`input, button, a`).length)return;let n=e(this).data(`id`),r=p.find(e=>e.id===n);r&&window.open(r.url,`_blank`,`noopener,noreferrer`)}),setTimeout(()=>e(`#lk_in_url`).focus(),100)},_=()=>{e(document).off(`.lk`)};export{_ as cleanup,g as init,d as render};