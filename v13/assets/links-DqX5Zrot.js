import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,_ as n,a as r,f as i,h as a,i as o,m as s,p as c,x as l}from"./widev-Di7bYMvC.js";import{t as u}from"./wii-DnBLd2G7.js";import{t as d}from"./preload-helper-DK0U7nVd.js";var f=`links`,p=()=>`lk`+Date.now(),m={get:()=>{try{return JSON.parse(localStorage.getItem(f)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(f,JSON.stringify(e))},h=()=>!!i(`lk_sync`),g=()=>c(`lk_sync`,1,168),_=e=>{try{let t=new URL(e).hostname;return t=t.replace(`www.`,``),t.split(`.`)[0]||`Enlace`}catch{return`Enlace Web`}},v=e=>{let t=e.titulo?e.titulo.charAt(0).toUpperCase():`L`,n=e.contenido||e.url||``;return`
  <article class="lk_card${e.pin?` lk_pinned`:``}" id="lk_${e.id}" data-id="${e.id}">
    <div class="lk_icon">${t}</div>
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${e.titulo||``}" placeholder="Título del enlace...">
      <a href="${n}" target="_blank" rel="noopener" class="lk_url" title="${n}">${n}</a>
    </div>
    
    <div class="lk_acts">
      <button class="lk_act lk_act_copy" data-id="${e.id}" ${l(`Copiar URL`,void 0,`top`)}><i class="far fa-copy"></i></button>
      <button class="lk_act lk_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${l(e.pin?`Quitar pin`:`Fijar`,void 0,`top`)}><i class="fas fa-thumbtack"></i></button>
      <a href="${n}" target="_blank" rel="noopener" class="lk_act" ${l(`Abrir`,void 0,`top`)}><i class="fas fa-external-link-alt"></i></a>
      <button class="lk_act lk_act_del" data-id="${e.id}" ${l(`Eliminar`,void 0,`error`)}><i class="fas fa-trash-can"></i></button>
    </div>
    <i class="lk_act_cloud fas ${e.synced?`fa-cloud lk_cloud_ok`:`fa-cloud-arrow-up lk_cloud_pen`}" ${l(e.synced?`En nube`:`Local`,void 0,`left`)}></i>
  </article>`},y=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-CKMRR4tO.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},b=async e=>{let t=a.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await y();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[links] guardarNube:`,e)}},x=async e=>{if(a.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await y();await r(n(t,`links`,e.id),{titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[links] actualizarNube:`,e)}},S=async e=>{if(a.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await y();await r(n(t,`links`,e))}catch{}},C=async()=>{let e=a.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await y();return(await r(i(n(t,`links`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||t.url||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},w=()=>`
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> ${a.user?`${r()}${a.user.nombre||a.user.usuario}`:`Tus Enlaces Rápidos`}</h1>
      <span id="lk_count" class="lk_count">0 guardados</span>
    </div>
    <div class="lk_hero_right">
      <button class="lk_btn_refresh" id="lk_btn_refresh" ${l(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
    </div>
  </div>
  
  <div class="lk_add_box">
    <i class="fas fa-globe"></i>
    <input type="url" id="lk_in_url" class="lk_input" placeholder="Pega una URL y presiona Enter..." autocomplete="off">
    <button id="lk_btn_add" class="lk_btn_add"><i class="fas fa-plus"></i> Guardar</button>
  </div>

  <div id="lk_grid" class="lk_grid">
    <div class="lk_skeleton"></div><div class="lk_skeleton"></div><div class="lk_skeleton"></div>
  </div>
</div>`,T=async()=>{let r=m.get(),i=()=>e(`#lk_grid`).html(`<div class="lk_skeleton"></div>`.repeat(3)),c=t=>e(`[data-id="${t}"] .lk_act_cloud`).removeClass(`fa-cloud-arrow-up lk_cloud_pen`).addClass(`fa-cloud lk_cloud_ok`).attr(`data-witip`,`En nube`),l=()=>e(`#lk_count`).text(`${r.length} guardado${r.length===1?``:`s`}`),d=()=>[...r].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),f=async()=>{let e=d();await n(`#lk_grid`,e.length?e.map(v).join(``):`<div class="lk_empty"><i class="fas fa-satellite-dish"></i><span>No tienes enlaces guardados. Pega uno arriba para empezar.</span></div>`,80),e.length&&s([`.lk_grid > *`],60),l()},y=async(t=!1)=>{if(!a.logged)return;t&&i();let n=e(`#lk_btn_refresh i`).addClass(`lk_spin`);try{let e=await C();if(e?.length){let t=new Set(e.map(e=>e.id)),n=r.filter(e=>!t.has(e.id));n.forEach(e=>b(e)),r=[...e,...n],m.set(r),g()}}finally{n.removeClass(`lk_spin`),f()}},w=e=>r.find(t=>t.id===e),T=()=>{let t=e(`#lk_in_url`),n=t.val().trim();if(!n)return;/^https?:\/\//i.test(n)||(n=`https://`+n);let i=_(n),u=i.charAt(0).toUpperCase()+i.slice(1),d={id:p(),titulo:u,contenido:n,pin:!1,creado:Date.now(),synced:!1};r.unshift(d),m.set(r),t.val(``),e(`.lk_empty`).remove();let f=e(v(d)).css(`opacity`,0);e(`#lk_grid`).prepend(f),s([`#lk_${d.id}`],0),l(),o(`Enlace guardado`,`success`),a.logged&&b(d).then(()=>{d.synced=!0,m.set(r),c(d.id)})};e(document).on(`click`,`#lk_btn_add`,T).on(`keydown`,`#lk_in_url`,function(e){e.key===`Enter`&&(e.preventDefault(),T())}).on(`click`,`#lk_btn_refresh`,()=>y(!0)).on(`change`,`.lk_tit`,function(){let t=e(this).closest(`.lk_card`).data(`id`),n=w(t);if(!n)return;n.titulo=e(this).val();let i=n.titulo?n.titulo.charAt(0).toUpperCase():`L`;e(this).closest(`.lk_card`).find(`.lk_icon`).text(i),m.set(r),a.logged&&x(n).then(()=>c(t))}).on(`click`,`.lk_act_pin`,function(){let t=e(this).data(`id`),n=w(t);n&&(n.pin=!n.pin,m.set(r),f(),o(n.pin?`Enlace fijado ✓`:`Desanclado`,`success`),a.logged&&x(n).then(()=>c(t)))}).on(`click`,`.lk_act_del`,function(){let t=e(this).data(`id`);confirm(`¿Seguro que deseas eliminar este enlace?`)&&(r=r.filter(e=>e.id!==t),m.set(r),e(`#lk_${t}`).css(`overflow`,`hidden`).slideUp(280,function(){e(this).remove(),r.length||f()}),l(),o(`Enlace eliminado`,`success`),a.logged&&S(t))}).on(`click`,`.lk_act_copy`,function(){let n=w(e(this).data(`id`));n&&t(n.contenido||n.url,this,`¡URL copiada!`)}),s([`.lk_hero_left`,`.lk_add_box`],50),setTimeout(()=>e(`#lk_in_url`).focus(),150),r.length?(f(),a.logged&&!h()&&y(!1)):a.logged?await y(!0):f(),console.log(`✅ ${u} v12 · Links OK`)},E=()=>e(document).off(`click keydown change`,`#lk_btn_add, #lk_in_url, #lk_btn_refresh, .lk_tit, .lk_act_pin, .lk_act_del, .lk_act_copy`);export{E as cleanup,T as init,w as render};