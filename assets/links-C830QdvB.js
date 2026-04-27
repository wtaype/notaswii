import{t as e}from"./vendor-BDh6mtVu.js";import{t}from"./wii-LYmyu9Jv.js";import{S as n,T as r,_ as i,a,f as o,h as s,i as c,m as l,p as u}from"./widev-CJ_xp4HE.js";import{t as d}from"./preload-helper-DbWsiEEd.js";var f=`links`,p=()=>`lk`+Date.now(),m=[{id:`ej1`,titulo:`Wilder Taype`,contenido:`https://wtaype.github.io/`,pin:!0,creado:Date.now(),synced:!1},{id:`ej2`,titulo:`NotasWii`,contenido:`https://notaswii.web.app/`,pin:!1,creado:Date.now()-1e3,synced:!1}],h={get:()=>{let e=localStorage.getItem(f);return e===null&&!s.user?[...m]:o(f)||(e?.startsWith(`[`)?JSON.parse(e):[])},set:e=>u(f,e,8760)},g=e=>{try{let t=new URL(e).hostname;return t=t.replace(`www.`,``),t.split(`.`)[0]||`Enlace`}catch{return`Enlace Web`}},_=e=>{let t=e.titulo?e.titulo.charAt(0).toUpperCase():`L`,r=e.contenido||e.url||``;return`
  <article class="lk_card${e.pin?` lk_pinned`:``}" id="lk_${e.id}" data-id="${e.id}">
    <div class="lk_icon">${t}</div>
    <div class="lk_info">
      <input type="text" class="lk_tit" value="${e.titulo||``}" placeholder="Título del enlace...">
      <a href="${r}" target="_blank" rel="noopener" class="lk_url" title="${r}">${r}</a>
    </div>
    
    <div class="lk_acts">
      <button class="lk_act lk_act_copy" data-id="${e.id}" ${n(`Copiar URL`,void 0,`top`)}><i class="far fa-copy"></i></button>
      <button class="lk_act lk_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${n(e.pin?`Quitar pin`:`Fijar`,void 0,`top`)}><i class="fas fa-thumbtack"></i></button>
      <a href="${r}" target="_blank" rel="noopener" class="lk_act" ${n(`Abrir`,void 0,`top`)}><i class="fas fa-external-link-alt"></i></a>
      <button class="lk_act lk_act_del" data-id="${e.id}" ${n(`Eliminar`,void 0,`error`)}><i class="fas fa-trash-can"></i></button>
    </div>
    <i class="lk_act_cloud fas ${e.synced?`fa-cloud lk_cloud_ok`:`fa-cloud-arrow-up lk_cloud_pen`}" ${n(e.synced?`En nube`:`Local`,void 0,`left`)}></i>
  </article>`},v=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-wt8kx56z.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},y=async e=>{let t=s.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[links] guardarNube:`,e)}},b=async e=>{let t=s.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,actualizado:a()},{merge:!0})}catch(e){console.error(`[links] actualizarNube:`,e)}},x=async e=>{if(s.user?.email)try{let{db:t,doc:n,deleteDoc:r}=await v();await r(n(t,`links`,e))}catch{}},S=async()=>{let e=s.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await v();return(await r(i(n(t,`links`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||t.url||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},C=()=>`
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> ${s.user?`${a()}${s.user.nombre||s.user.usuario}`:`Tus Enlaces Rápidos`}</h1>
      <span id="lk_count" class="lk_count">0 guardados</span>
    </div>
    <div class="lk_hero_right">
      <button class="lk_btn_refresh" id="lk_btn_refresh" style="display:none" ${n(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
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
</div>`,w=null,T=async()=>{let n=h.get(),a=()=>e(`#lk_grid`).html(`<div class="lk_skeleton"></div>`.repeat(3)),o=t=>e(`[data-id="${t}"] .lk_act_cloud`).removeClass(`fa-cloud-arrow-up lk_cloud_pen`).addClass(`fa-cloud lk_cloud_ok`).attr(`data-witip`,`En nube`),u=()=>e(`#lk_count`).text(`${n.length} guardado${n.length===1?``:`s`}`),d=()=>[...n].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),m=async()=>{let e=d();await i(`#lk_grid`,e.length?e.map(_).join(``):`<div class="lk_empty"><i class="fas fa-satellite-dish"></i><span>No tienes enlaces guardados. Pega uno arriba para empezar.</span></div>`,80),e.length&&l([`.lk_grid > *`],60),u()},v=e=>n.find(t=>t.id===e),C=()=>{n=n.filter(e=>!e.id.startsWith(`ej`));let t=e(`#lk_in_url`),r=t.val().trim();if(!r)return;/^https?:\/\//i.test(r)||(r=`https://`+r);let i=g(r),a=i.charAt(0).toUpperCase()+i.slice(1),d={id:p(),titulo:a,contenido:r,pin:!1,creado:Date.now(),synced:!1};n.unshift(d),h.set(n),t.val(``),e(`.lk_empty`).remove();let f=e(_(d)).css(`opacity`,0);e(`#lk_grid`).prepend(f),l([`#lk_${d.id}`],0),u(),c(`Enlace guardado`,`success`),s.user&&y(d).then(()=>{d.synced=!0,h.set(n),o(d.id)})};e(document).on(`click`,`#lk_btn_add`,C).on(`keydown`,`#lk_in_url`,function(e){e.key===`Enter`&&(e.preventDefault(),C())}).on(`click`,`#lk_btn_refresh`,async function(){let t=e(this).find(`i`);if(t.hasClass(`lk_spin`))return;t.addClass(`lk_spin`);let r=await S();r&&(JSON.stringify(r)!==JSON.stringify(n)&&(n=r,h.set(n),m()),c(`Sincronizado ✓`,`success`)),t.removeClass(`lk_spin`)}).on(`change`,`.lk_tit`,function(){let t=e(this).closest(`.lk_card`).data(`id`),r=v(t);if(!r)return;r.titulo=e(this).val();let i=r.titulo?r.titulo.charAt(0).toUpperCase():`L`;e(this).closest(`.lk_card`).find(`.lk_icon`).text(i),h.set(n),s.user&&b(r).then(()=>o(t))}).on(`click`,`.lk_act_pin`,function(){let t=e(this).data(`id`),r=v(t);r&&(r.pin=!r.pin,h.set(n),m(),c(r.pin?`Enlace fijado ✓`:`Desanclado`,`success`),s.user&&b(r).then(()=>o(t)))}).on(`click`,`.lk_act_del`,function(){let t=e(this).data(`id`);confirm(`¿Seguro que deseas eliminar este enlace?`)&&(n=n.filter(e=>e.id!==t),h.set(n),e(`#lk_${t}`).css(`overflow`,`hidden`).slideUp(280,function(){e(this).remove(),n.length||m()}),u(),c(`Enlace eliminado`,`success`),s.user&&x(t))}).on(`click`,`.lk_act_copy`,function(){let t=v(e(this).data(`id`));t&&r(t.contenido||t.url,this,`¡URL copiada!`)}),l([`.lk_hero_left`,`.lk_add_box`],50),setTimeout(()=>e(`#lk_in_url`).focus(),150),m(),w=s.on(async t=>{if(e(`#lk_btn_refresh`).toggle(!!t),t){n.length===0&&a();let e=await S();e&&JSON.stringify(e)!==JSON.stringify(n)&&(n=e,h.set(n),m())}else localStorage.removeItem(f),n=h.get(),m()}),console.log(`✅ ${t} v15 · Links OK`)},E=()=>{e(document).off(`click keydown change`,`#lk_btn_add, #lk_in_url, #lk_btn_refresh, .lk_tit, .lk_act_pin, .lk_act_del, .lk_act_copy`),w?.()};export{E as cleanup,T as init,C as render};