import{t as e}from"./vendor-BDh6mtVu.js";import{_ as t,a as n,f as r,h as i,i as a,m as o,p as s,x as c}from"./widev-H4r-I7mR.js";import{t as l}from"./wii-DG5HC90G.js";import{t as u}from"./preload-helper-DbWsiEEd.js";var d=`tablero_items`,f=()=>`tb`+Date.now(),p={get:()=>{try{return JSON.parse(localStorage.getItem(d)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(d,JSON.stringify(e))},m=()=>!!r(`tb_sync`),h=()=>s(`tb_sync`,1,168),g=async()=>{let{db:e}=await u(async()=>{let{db:e}=await import(`./firebase-BnvZAN8B.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await u(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},_=async e=>{let t=i.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await g();await i(r(n,`tableroNotas`,e.id),{id:e.id,usuario:t.usuario,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),color:String(e.color||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[tablero] guardarNube:`,e)}},v=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await g();await r(n(t,`tableroNotas`,e.id),{titulo:String(e.titulo||``),contenido:String(e.contenido||``),color:String(e.color||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[tablero] actualizarNube:`,e)}},y=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await g();await r(n(t,`tableroNotas`,e))}catch{}},b=async()=>{let e=i.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await g();return(await r(i(n(t,`tableroNotas`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||``,color:t.color||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},x=()=>`
<div class="tb_wrap">
  <div class="tb_hero">
    <div class="tb_hero_left">
      <h1><i class="fas fa-th-large"></i> ${i.user?`${n()}${i.user.nombre||i.user.usuario}`:`Tu Tablero Visual`}</h1>
      <p id="tb_count">0 ideas guardadas</p>
    </div>
    <div class="tb_hero_right">
      <button class="tb_btn_refresh" id="tb_btn_refresh" ${c(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
      <button class="tb_btn_new" id="tb_btn_add"><i class="fas fa-plus"></i> Nueva Nota</button>
    </div>
  </div>

  <div id="tb_grid" class="tb_masonry">
    <div class="tb_skeleton"></div><div class="tb_skeleton"></div><div class="tb_skeleton"></div>
  </div>

  <!-- MODAL EDITOR -->
  <div id="tb_modal_wrap" class="tb_modal_overlay">
    <div class="tb_modal" id="tb_modal_box">
      <input type="text" id="tb_in_tit" class="tb_modal_in_tit" placeholder="Título de la idea..." autocomplete="off">
      <textarea id="tb_in_cnt" class="tb_modal_in_cnt" placeholder="Escribe algo increíble..."></textarea>
      
      <div class="tb_modal_foot">
        <div class="tb_theme_picker">
          <div class="tb_theme_dot active" data-hex="" title="Predeterminado" style="background:var(--bg); border: 1px solid var(--brd);"></div>
          <div class="tb_theme_dot" data-hex="#87CEEB" title="Cielo" style="background:var(--Cielo);"></div>
          <div class="tb_theme_dot" data-hex="#FFB6C1" title="Dulce" style="background:var(--Dulce);"></div>
          <div class="tb_theme_dot" data-hex="#98FB98" title="Paz" style="background:var(--Paz);"></div>
          <div class="tb_theme_dot" data-hex="#FFD700" title="Oro" style="background:var(--Oro);"></div>
          <div class="tb_theme_dot" data-hex="#DDA0DD" title="Mora" style="background:var(--Mora);"></div>
          <input type="color" id="tb_in_color" class="tb_theme_custom" ${c(`Color personalizado`,void 0,`top`)} value="#cccccc">
        </div>
        <div style="display:flex; gap:1vh; align-items:center;">
           <button class="tb_btn_save" id="tb_btn_close" style="background:var(--bg); color:var(--tx2);">Cancelar</button>
           <button class="tb_btn_save" id="tb_btn_save_item">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>`,S=async()=>{let n=p.get(),r=null,s=``,u=()=>e(`#tb_grid`).html(`<div class="tb_skeleton"></div>`.repeat(3)),d=t=>e(`[data-id="${t}"] .tb_act_cloud`).removeClass(`fa-cloud-arrow-up tb_cloud_pen`).addClass(`fa-cloud tb_cloud_ok`).attr(`data-witip`,`En nube`),g=()=>e(`#tb_count`).text(`${n.length} idea${n.length===1?``:`s`} guardada${n.length===1?``:`s`}`),x=()=>[...n].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),S=e=>`
    <article class="tb_card${e.color?``:` default-color`}${e.pin?` tb_pinned`:``}" id="tb_${e.id}" data-id="${e.id}" ${e.color?`style="--card-color: ${e.color};"`:``}>
      ${e.titulo?`<h3 class="tb_card_title">${e.titulo}</h3>`:``}
      ${e.contenido?`<p class="tb_card_content">${e.contenido}</p>`:``}
      
      <div class="tb_card_acts">
        <button class="tb_btn_act tb_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${c(e.pin?`Quitar pin`:`Fijar`,void 0,`top`)}><i class="fas fa-thumbtack"></i></button>
        <button class="tb_btn_act edit" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="tb_btn_act del" ${c(`Eliminar`,void 0,`top`)}><i class="fas fa-trash-can"></i></button>
        <i class="tb_btn_act tb_act_cloud fas ${e.synced?`fa-cloud tb_cloud_ok`:`fa-cloud-arrow-up tb_cloud_pen`}" ${c(e.synced?`En nube`:`Local`,void 0,`top`)}></i>
      </div>
    </article>
  `,C=async()=>{let e=x();await t(`#tb_grid`,e.length?e.map(S).join(``):`<div class="tb_empty"><i class="fas fa-magic"></i><h2>Tu tablero está vacío</h2><p>Añade tu primera nota visual colorida para comenzar a organizar tus ideas.</p></div>`,80),e.length&&o([`.tb_grid > *`],60),g()},w=async(t=!1)=>{if(!i.logged)return;t&&u();let r=e(`#tb_btn_refresh i`).addClass(`tb_spin`);try{let e=await b();if(e?.length){let t=new Set(e.map(e=>e.id)),r=n.filter(e=>!t.has(e.id));r.forEach(e=>_(e)),n=[...e,...r],p.set(n),h()}}finally{r.removeClass(`tb_spin`),C()}},T=t=>{s=t;let n=e(`#tb_modal_box`);if(e(`.tb_theme_dot`).removeClass(`active`),!t)n.addClass(`default-color`).removeAttr(`style`),e(`.tb_theme_dot[data-hex=""]`).addClass(`active`),e(`#tb_in_color`).val(`#cccccc`);else{n.removeClass(`default-color`).attr(`style`,`--card-color: ${t};`);let r=e(`.tb_theme_dot[data-hex="${t.toUpperCase()}"]`);r.length&&r.addClass(`active`),e(`#tb_in_color`).val(t)}},E=(t=null)=>{if(r=t,t){let r=n.find(e=>e.id===t);r&&(e(`#tb_in_tit`).val(r.titulo),e(`#tb_in_cnt`).val(r.contenido),T(r.color||``))}else e(`#tb_in_tit`).val(``),e(`#tb_in_cnt`).val(``),T(``);e(`#tb_modal_wrap`).addClass(`active`),setTimeout(()=>e(`#tb_in_cnt`).focus(),100)},D=()=>{e(`#tb_modal_wrap`).removeClass(`active`),r=null};e(document).on(`click`,`#tb_btn_add`,()=>E()).on(`click`,`#tb_btn_close`,D).on(`click`,`#tb_modal_wrap`,function(e){e.target===this&&D()}).on(`click`,`#tb_btn_refresh`,()=>w(!0)).on(`click`,`.tb_theme_dot`,function(){T(e(this).data(`hex`))}).on(`input`,`#tb_in_color`,function(){T(e(this).val())}).on(`click`,`#tb_btn_save_item`,()=>{let t=e(`#tb_in_tit`).val().trim(),c=e(`#tb_in_cnt`).val().trim();if(!t&&!c){a(`La nota está vacía`,`warning`);return}if(r){let e=n.find(e=>e.id===r);e&&(e.titulo=t,e.contenido=c,e.color=s,e.creado=Date.now(),e.synced=!1),n=n.filter(e=>e.id!==r),n.unshift(e),p.set(n),a(`Nota actualizada`,`success`),i.logged&&v(e).then(()=>{e.synced=!0,p.set(n),d(e.id)})}else{let e={id:f(),titulo:t,contenido:c,color:s,pin:!1,creado:Date.now(),synced:!1};n.unshift(e),p.set(n),a(`Nota creada`,`success`),i.logged&&_(e).then(()=>{e.synced=!0,p.set(n),d(e.id)})}C(),D(),o([`.tb_card:first-child`],0)}).on(`click`,`.tb_act_pin`,function(t){t.stopPropagation();let r=e(this).data(`id`),o=n.find(e=>e.id===r);o&&(o.pin=!o.pin,p.set(n),C(),a(o.pin?`Nota fijada ✓`:`Desanclada`,`success`),i.logged&&v(o).then(()=>d(r)))}).on(`click`,`.tb_btn_act.edit, .tb_card`,function(t){e(t.target).closest(`.tb_btn_act`).length&&!e(this).hasClass(`edit`)||(t.stopPropagation(),E(e(this).closest(`.tb_card`).data(`id`)))}).on(`click`,`.tb_btn_act.del`,function(t){if(t.stopPropagation(),!confirm(`¿Eliminar esta nota del tablero?`))return;let r=e(this).closest(`.tb_card`),o=r.data(`id`);n=n.filter(e=>e.id!==o),p.set(n),r.css({transform:`scale(0.8)`,opacity:0}),setTimeout(()=>{r.remove(),g(),n.length||C()},300),a(`Nota eliminada`,`success`),i.logged&&y(o)}),o([`.tb_hero_left`,`.tb_btn_new`],50),n.length?(C(),i.logged&&!m()&&w(!1)):i.logged?await w(!0):C(),console.log(`✅ ${l} v11 · Tablero OK`)},C=()=>{e(document).off(`click input`,`#tb_btn_add, #tb_btn_close, #tb_modal_wrap, #tb_btn_refresh, .tb_theme_dot, #tb_in_color, #tb_btn_save_item, .tb_act_pin, .tb_btn_act.edit, .tb_card, .tb_btn_act.del`)};export{C as cleanup,S as init,x as render};