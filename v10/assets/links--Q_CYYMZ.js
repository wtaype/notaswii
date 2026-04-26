import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,a as n,g as r,h as i,i as a,m as o,p as s,v as c,w as l}from"./widev-BY9EW4md.js";import{t as u}from"./wii-IZM0MjcA.js";import{t as d}from"./preload-helper-CwAw_xRM.js";var f=`links`,p=()=>`lk`+Date.now(),m={get:()=>{try{return JSON.parse(localStorage.getItem(f)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(f,JSON.stringify(e))},h=()=>!!s(`lk_sync`),g=()=>o(`lk_sync`,1,168),_=e=>{try{let t=new URL(e).hostname;return t=t.replace(`www.`,``),t.split(`.`)[0]||`Enlace`}catch{return`Enlace Web`}},v=e=>{let n=e.titulo?e.titulo.charAt(0).toUpperCase():`L`,r=e.contenido||e.url||``;return`
  <article class="lk_card${e.pin?` lk_pinned`:``}" id="lk_${e.id}" data-id="${e.id}">
    <div class="lk_icon">${n}</div>
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${e.titulo||``}" placeholder="Título del enlace...">
      <a href="${r}" target="_blank" rel="noopener" class="lk_url" title="${r}">${r}</a>
    </div>
    
    <div class="lk_acts">
      <button class="lk_act lk_act_copy" data-id="${e.id}" ${t(`Copiar URL`,void 0,`top`)}><i class="far fa-copy"></i></button>
      <button class="lk_act lk_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${t(e.pin?`Quitar pin`:`Fijar`,void 0,`top`)}><i class="fas fa-thumbtack"></i></button>
      <a href="${r}" target="_blank" rel="noopener" class="lk_act" ${t(`Abrir`,void 0,`top`)}><i class="fas fa-external-link-alt"></i></a>
      <button class="lk_act lk_act_del" data-id="${e.id}" ${t(`Eliminar`,void 0,`error`)}><i class="fas fa-trash-can"></i></button>
    </div>
    <i class="lk_act_cloud fas ${e.synced?`fa-cloud lk_cloud_ok`:`fa-cloud-arrow-up lk_cloud_pen`}" ${t(e.synced?`En nube`:`Local`,void 0,`left`)}></i>
  </article>`},y=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-BNeWaP4M.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},b=async e=>{let t=r.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await y();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[links] guardarNube:`,e)}},x=async e=>{if(r.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await y();await r(n(t,`links`,e.id),{titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[links] actualizarNube:`,e)}},S=async e=>{if(r.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await y();await r(n(t,`links`,e))}catch{}},C=async()=>{let e=r.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await y();return(await r(i(n(t,`links`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||t.url||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},w=()=>`
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> ${r.user?`${n()}${r.user.nombre||r.user.usuario}`:`Tus Enlaces Rápidos`}</h1>
      <span id="lk_count" class="lk_count">0 guardados</span>
    </div>
    <div class="lk_hero_right">
      <button class="lk_btn_refresh" id="lk_btn_refresh" ${t(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
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
</div>`,T=async()=>{let t=m.get(),n=()=>e(`#lk_grid`).html(`<div class="lk_skeleton"></div>`.repeat(3)),o=t=>e(`[data-id="${t}"] .lk_act_cloud`).removeClass(`fa-cloud-arrow-up lk_cloud_pen`).addClass(`fa-cloud lk_cloud_ok`).attr(`data-witip`,`En nube`),s=()=>e(`#lk_count`).text(`${t.length} guardado${t.length===1?``:`s`}`),d=()=>[...t].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),f=async()=>{let e=d();await c(`#lk_grid`,e.length?e.map(v).join(``):`<div class="lk_empty"><i class="fas fa-satellite-dish"></i><span>No tienes enlaces guardados. Pega uno arriba para empezar.</span></div>`,80),e.length&&i([`.lk_grid > *`],60),s()},y=async(i=!1)=>{if(!r.logged)return;i&&n();let a=e(`#lk_btn_refresh i`).addClass(`lk_spin`);try{let e=await C();if(e?.length){let n=new Set(e.map(e=>e.id)),r=t.filter(e=>!n.has(e.id));r.forEach(e=>b(e)),t=[...e,...r],m.set(t),g()}}finally{a.removeClass(`lk_spin`),f()}},w=e=>t.find(t=>t.id===e),T=()=>{let n=e(`#lk_in_url`),c=n.val().trim();if(!c)return;/^https?:\/\//i.test(c)||(c=`https://`+c);let l=_(c),u=l.charAt(0).toUpperCase()+l.slice(1),d={id:p(),titulo:u,contenido:c,pin:!1,creado:Date.now(),synced:!1};t.unshift(d),m.set(t),n.val(``),e(`.lk_empty`).remove();let f=e(v(d)).css(`opacity`,0);e(`#lk_grid`).prepend(f),i([`#lk_${d.id}`],0),s(),a(`Enlace guardado`,`success`),r.logged&&b(d).then(()=>{d.synced=!0,m.set(t),o(d.id)})};e(document).on(`click`,`#lk_btn_add`,T).on(`keydown`,`#lk_in_url`,function(e){e.key===`Enter`&&(e.preventDefault(),T())}).on(`click`,`#lk_btn_refresh`,()=>y(!0)).on(`change`,`.lk_tit`,function(){let n=e(this).closest(`.lk_card`).data(`id`),i=w(n);if(!i)return;i.titulo=e(this).val();let a=i.titulo?i.titulo.charAt(0).toUpperCase():`L`;e(this).closest(`.lk_card`).find(`.lk_icon`).text(a),m.set(t),r.logged&&x(i).then(()=>o(n))}).on(`click`,`.lk_act_pin`,function(){let n=e(this).data(`id`),i=w(n);i&&(i.pin=!i.pin,m.set(t),f(),a(i.pin?`Enlace fijado ✓`:`Desanclado`,`success`),r.logged&&x(i).then(()=>o(n)))}).on(`click`,`.lk_act_del`,function(){let n=e(this).data(`id`);confirm(`¿Seguro que deseas eliminar este enlace?`)&&(t=t.filter(e=>e.id!==n),m.set(t),e(`#lk_${n}`).css(`overflow`,`hidden`).slideUp(280,function(){e(this).remove(),t.length||f()}),s(),a(`Enlace eliminado`,`success`),r.logged&&S(n))}).on(`click`,`.lk_act_copy`,function(){let t=w(e(this).data(`id`));t&&l(t.contenido||t.url,this,`¡URL copiada!`)}),i([`.lk_hero_left`,`.lk_add_box`],50),setTimeout(()=>e(`#lk_in_url`).focus(),150),t.length?(f(),r.logged&&!h()&&y(!1)):r.logged?await y(!0):f(),console.log(`✅ ${u} v10 · Links OK`)},E=()=>e(document).off(`click keydown change`,`#lk_btn_add, #lk_in_url, #lk_btn_refresh, .lk_tit, .lk_act_pin, .lk_act_del, .lk_act_copy`);export{E as cleanup,T as init,w as render};