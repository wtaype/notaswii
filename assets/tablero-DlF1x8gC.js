import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,_ as n,a as r,f as i,h as a,i as o,m as s,p as c}from"./widev-DRhaZoqv.js";import{t as l}from"./wii-BL3abZT3.js";import{t as u}from"./preload-helper-DbWsiEEd.js";var d=`tablero_items`,f=()=>`tb`+Date.now(),p=[{id:`ej1`,titulo:`¡Bienvenido al Tablero!`,contenido:`Aquí puedes organizar tus ideas de forma visual.`,color:`#87CEEB`,pin:!0,creado:Date.now(),synced:!1},{id:`ej2`,titulo:`Tip visual`,contenido:`Usa colores pasteles suaves para categorizar.`,color:`#FFB6C1`,pin:!1,creado:Date.now()-1e3,synced:!1}],m={get:()=>{let e=localStorage.getItem(d);return e===null&&!a.user?[...p]:i(d)||(e?.startsWith(`[`)?JSON.parse(e):[])},set:e=>c(d,e,8760)},h=async()=>{let{db:e}=await u(async()=>{let{db:e}=await import(`./firebase-Csc0LBnf.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await u(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},g=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await h();await i(r(n,`tableroNotas`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),color:String(e.color||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[tablero] guardarNube:`,e)}},_=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await h();await i(r(n,`tableroNotas`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),color:String(e.color||``),pin:!!e.pin,actualizado:a()},{merge:!0})}catch(e){console.error(`[tablero] actualizarNube:`,e)}},v=async e=>{if(a.user?.email)try{let{db:t,doc:n,deleteDoc:r}=await h();await r(n(t,`tableroNotas`,e))}catch{}},y=async()=>{let e=a.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await h();return(await r(i(n(t,`tableroNotas`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||``,color:t.color||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},b=()=>`
<div class="tb_wrap">
  <div class="tb_hero">
    <div class="tb_hero_left">
      <h1><i class="fas fa-th-large"></i> ${a.user?`${r()}${a.user.nombre||a.user.usuario}`:`Tu Tablero Visual`}</h1>
      <p id="tb_count">0 ideas guardadas</p>
    </div>
    <div class="tb_hero_right">
      <button class="tb_btn_refresh" id="tb_btn_refresh" style="display:none" ${t(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
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
          <input type="color" id="tb_in_color" class="tb_theme_custom" ${t(`Color personalizado`,void 0,`top`)} value="#cccccc">
        </div>
        <div style="display:flex; gap:1vh; align-items:center;">
           <button class="tb_btn_save" id="tb_btn_close" style="background:var(--bg); color:var(--tx2);">Cancelar</button>
           <button class="tb_btn_save" id="tb_btn_save_item">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>`,x=null,S=async()=>{let r=m.get(),i=null,c=``,u=()=>e(`#tb_grid`).html(`<div class="tb_skeleton"></div>`.repeat(3)),p=t=>e(`[data-id="${t}"] .tb_act_cloud`).removeClass(`fa-cloud-arrow-up tb_cloud_pen`).addClass(`fa-cloud tb_cloud_ok`).attr(`data-witip`,`En nube`),h=()=>e(`#tb_count`).text(`${r.length} idea${r.length===1?``:`s`} guardada${r.length===1?``:`s`}`),b=()=>[...r].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)),S=e=>`
    <article class="tb_card${e.color?``:` default-color`}${e.pin?` tb_pinned`:``}" id="tb_${e.id}" data-id="${e.id}" ${e.color?`style="--card-color: ${e.color};"`:``}>
      ${e.titulo?`<h3 class="tb_card_title">${e.titulo}</h3>`:``}
      ${e.contenido?`<p class="tb_card_content">${e.contenido}</p>`:``}
      
      <div class="tb_card_acts">
        <button class="tb_btn_act tb_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${t(e.pin?`Quitar pin`:`Fijar`,void 0,`top`)}><i class="fas fa-thumbtack"></i></button>
        <button class="tb_btn_act edit" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="tb_btn_act del" ${t(`Eliminar`,void 0,`top`)}><i class="fas fa-trash-can"></i></button>
        <i class="tb_btn_act tb_act_cloud fas ${e.synced?`fa-cloud tb_cloud_ok`:`fa-cloud-arrow-up tb_cloud_pen`}" ${t(e.synced?`En nube`:`Local`,void 0,`top`)}></i>
      </div>
    </article>
  `,C=async()=>{let e=b();await n(`#tb_grid`,e.length?e.map(S).join(``):`<div class="tb_empty"><i class="fas fa-magic"></i><h2>Tu tablero está vacío</h2><p>Añade tu primera nota visual colorida para comenzar a organizar tus ideas.</p></div>`,80),e.length&&s([`.tb_grid > *`],60),h()},w=t=>{c=t;let n=e(`#tb_modal_box`);if(e(`.tb_theme_dot`).removeClass(`active`),!t)n.addClass(`default-color`).removeAttr(`style`),e(`.tb_theme_dot[data-hex=""]`).addClass(`active`),e(`#tb_in_color`).val(`#cccccc`);else{n.removeClass(`default-color`).attr(`style`,`--card-color: ${t};`);let r=e(`.tb_theme_dot[data-hex="${t.toUpperCase()}"]`);r.length&&r.addClass(`active`),e(`#tb_in_color`).val(t)}},T=(t=null)=>{if(i=t,t){let n=r.find(e=>e.id===t);n&&(e(`#tb_in_tit`).val(n.titulo),e(`#tb_in_cnt`).val(n.contenido),w(n.color||``))}else e(`#tb_in_tit`).val(``),e(`#tb_in_cnt`).val(``),w(``);e(`#tb_modal_wrap`).addClass(`active`),setTimeout(()=>e(`#tb_in_cnt`).focus(),100)},E=()=>{e(`#tb_modal_wrap`).removeClass(`active`),i=null};e(document).on(`click.tablero`,`#tb_btn_add`,()=>T()).on(`click.tablero`,`#tb_btn_close`,E).on(`click.tablero`,`#tb_modal_wrap`,function(e){e.target===this&&E()}).on(`click.tablero`,`#tb_btn_refresh`,async function(){let t=e(this).find(`i`);if(t.hasClass(`tb_spin`))return;t.addClass(`tb_spin`);let n=await y();n&&(JSON.stringify(n)!==JSON.stringify(r)&&(r=n,m.set(r),C()),o(`Sincronizado ✓`,`success`)),t.removeClass(`tb_spin`)}).on(`click.tablero`,`.tb_theme_dot`,function(){w(e(this).data(`hex`))}).on(`input.tablero`,`#tb_in_color`,function(){w(e(this).val())}).on(`click.tablero`,`#tb_btn_save_item`,()=>{let t=e(`#tb_in_tit`).val().trim(),n=e(`#tb_in_cnt`).val().trim();if(!t&&!n){o(`La nota está vacía`,`warning`);return}if(i){let e=r.find(e=>e.id===i);e&&(e.titulo=t,e.contenido=n,e.color=c,e.creado=Date.now(),e.synced=!1),r=r.filter(e=>e.id!==i),r.unshift(e),m.set(r),o(`Nota actualizada`,`success`),a.user&&_(e).then(()=>{e.synced=!0,m.set(r),p(e.id)})}else{r=r.filter(e=>!e.id.startsWith(`ej`));let e={id:f(),titulo:t,contenido:n,color:c,pin:!1,creado:Date.now(),synced:!1};r.unshift(e),m.set(r),o(`Nota creada`,`success`),a.user&&g(e).then(()=>{e.synced=!0,m.set(r),p(e.id)})}C(),E(),s([`.tb_card:first-child`],0)}).on(`click.tablero`,`.tb_act_pin`,function(t){t.stopPropagation();let n=e(this).data(`id`),i=r.find(e=>e.id===n);i&&(i.pin=!i.pin,m.set(r),C(),o(i.pin?`Nota fijada ✓`:`Desanclada`,`success`),a.user&&_(i).then(()=>p(n)))}).on(`click.tablero`,`.tb_btn_act.edit, .tb_card`,function(t){e(t.target).closest(`.tb_btn_act`).length&&!e(this).hasClass(`edit`)||(t.stopPropagation(),T(e(this).closest(`.tb_card`).data(`id`)))}).on(`click.tablero`,`.tb_btn_act.del`,function(t){if(t.stopPropagation(),!confirm(`¿Eliminar esta nota del tablero?`))return;let n=e(this).closest(`.tb_card`),i=n.data(`id`);r=r.filter(e=>e.id!==i),m.set(r),n.css({transform:`scale(0.8)`,opacity:0}),setTimeout(()=>{n.remove(),h(),r.length||C()},300),o(`Nota eliminada`,`success`),a.user&&v(i)}),s([`.tb_hero_left`,`.tb_btn_new`],50),C(),x=a.on(async t=>{if(e(`#tb_btn_refresh`).toggle(!!t),t){r.length===0&&u();let e=await y();e&&JSON.stringify(e)!==JSON.stringify(r)&&(r=e,m.set(r),C())}else localStorage.removeItem(d),r=m.get(),C()}),console.log(`✅ ${l} v15 · Tablero OK`)},C=()=>{e(document).off(`.tablero`),x?.()};export{C as cleanup,S as init,b as render};