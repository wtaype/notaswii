import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,_ as n,a as r,f as i,h as a,i as o,m as s,p as c,w as l}from"./widev-CHrYgt0x.js";import{t as u}from"./wii-Cc9n5QkZ.js";import{t as d}from"./preload-helper-D8R59StC.js";var f=`links`,p=()=>`lk`+Date.now(),m=[{id:`ej1`,titulo:`Wilder Taype`,contenido:`https://wtaype.github.io/`,pin:!0,creado:Date.now(),synced:!1},{id:`ej2`,titulo:`NotasWii`,contenido:`https://notaswii.web.app/`,pin:!1,creado:Date.now()-1e3,synced:!1}],h={get:()=>{let e=localStorage.getItem(f);return e===null&&!a.user?[...m]:i(f)||(e?.startsWith(`[`)?JSON.parse(e):[])},set:e=>c(f,e,8760)},g=e=>{try{let t=new URL(e).hostname;return t=t.replace(`www.`,``),t.split(`.`)[0]||`Enlace`}catch{return`Enlace Web`}},_=e=>{let n=e.titulo?e.titulo.charAt(0).toUpperCase():`L`,r=e.contenido||e.url||``;return`
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
  </article>`},v=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-CKmAvfCP.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CU10hIs1.js`).then(e=>e.f),[])}},y=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[links] guardarNube:`,e)}},b=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`links`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||e.url||``),pin:!!e.pin,actualizado:a()},{merge:!0})}catch(e){console.error(`[links] actualizarNube:`,e)}},x=async e=>{if(a.user?.email)try{let{db:t,doc:n,deleteDoc:r}=await v();await r(n(t,`links`,e))}catch{}},S=async()=>{let e=a.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await v();return(await r(i(n(t,`links`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||t.url||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},C=()=>`
<div class="lk_wrap">
  <div class="lk_hero">
    <div class="lk_hero_left">
      <h1><i class="fas fa-link"></i> ${a.user?`${r()}${a.user.nombre||a.user.usuario}`:`Tus Enlaces Rápidos`}</h1>
      <span id="lk_count" class="lk_count">0 guardados</span>
    </div>
    <div class="lk_hero_right">
      <button class="lk_btn_refresh" id="lk_btn_refresh" style="display:none" ${t(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
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
</div>`,w=null,T=async()=>{let t=h.get(),r=()=>e(`#lk_grid`).html(`<div class="lk_skeleton"></div>`.repeat(3)),i=t=>e(`[data-id="${t}"] .lk_act_cloud`).removeClass(`fa-cloud-arrow-up lk_cloud_pen`).addClass(`fa-cloud lk_cloud_ok`).attr(`data-witip`,`En nube`),c=()=>e(`#lk_count`).text(`${t.length} guardado${t.length===1?``:`s`}`),d=()=>[...t].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),m=async()=>{let e=d();await n(`#lk_grid`,e.length?e.map(_).join(``):`<div class="lk_empty"><i class="fas fa-satellite-dish"></i><span>No tienes enlaces guardados. Pega uno arriba para empezar.</span></div>`,80),e.length&&s([`.lk_grid > *`],60),c()},v=e=>t.find(t=>t.id===e),C=()=>{t=t.filter(e=>!e.id.startsWith(`ej`));let n=e(`#lk_in_url`),r=n.val().trim();if(!r)return;/^https?:\/\//i.test(r)||(r=`https://`+r);let l=g(r),u=l.charAt(0).toUpperCase()+l.slice(1),d={id:p(),titulo:u,contenido:r,pin:!1,creado:Date.now(),synced:!1};t.unshift(d),h.set(t),n.val(``),e(`.lk_empty`).remove();let f=e(_(d)).css(`opacity`,0);e(`#lk_grid`).prepend(f),s([`#lk_${d.id}`],0),c(),o(`Enlace guardado`,`success`),a.user&&y(d).then(()=>{d.synced=!0,h.set(t),i(d.id)})};e(document).on(`click`,`#lk_btn_add`,C).on(`keydown`,`#lk_in_url`,function(e){e.key===`Enter`&&(e.preventDefault(),C())}).on(`click`,`#lk_btn_refresh`,async function(){let n=e(this).find(`i`);if(n.hasClass(`lk_spin`))return;n.addClass(`lk_spin`);let r=await S();r&&(JSON.stringify(r)!==JSON.stringify(t)&&(t=r,h.set(t),m()),o(`Sincronizado ✓`,`success`)),n.removeClass(`lk_spin`)}).on(`change`,`.lk_tit`,function(){let n=e(this).closest(`.lk_card`).data(`id`),r=v(n);if(!r)return;r.titulo=e(this).val();let o=r.titulo?r.titulo.charAt(0).toUpperCase():`L`;e(this).closest(`.lk_card`).find(`.lk_icon`).text(o),h.set(t),a.user&&b(r).then(()=>i(n))}).on(`click`,`.lk_act_pin`,function(){let n=e(this).data(`id`),r=v(n);r&&(r.pin=!r.pin,h.set(t),m(),o(r.pin?`Enlace fijado ✓`:`Desanclado`,`success`),a.user&&b(r).then(()=>i(n)))}).on(`click`,`.lk_act_del`,function(){let n=e(this).data(`id`);confirm(`¿Seguro que deseas eliminar este enlace?`)&&(t=t.filter(e=>e.id!==n),h.set(t),e(`#lk_${n}`).css(`overflow`,`hidden`).slideUp(280,function(){e(this).remove(),t.length||m()}),c(),o(`Enlace eliminado`,`success`),a.user&&x(n))}).on(`click`,`.lk_act_copy`,function(){let t=v(e(this).data(`id`));t&&l(t.contenido||t.url,this,`¡URL copiada!`)}),s([`.lk_hero_left`,`.lk_add_box`],50),setTimeout(()=>e(`#lk_in_url`).focus(),150),m(),w=a.on(async n=>{if(e(`#lk_btn_refresh`).toggle(!!n),n){t.length===0&&r();let e=await S();e&&JSON.stringify(e)!==JSON.stringify(t)&&(t=e,h.set(t),m())}else localStorage.removeItem(f),t=h.get(),m()}),console.log(`✅ ${u} v15 · Links OK`)},E=()=>{e(document).off(`click keydown change`,`#lk_btn_add, #lk_in_url, #lk_btn_refresh, .lk_tit, .lk_act_pin, .lk_act_del, .lk_act_copy`),w?.()};export{E as cleanup,T as init,C as render};