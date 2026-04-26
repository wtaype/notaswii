import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,a as n,g as r,h as i,i as a,m as o,p as s,v as c,w as l}from"./widev-BLqPD_AU.js";import{t as u}from"./wii-IZM0MjcA.js";import{t as d}from"./preload-helper-DbWsiEEd.js";var f=`flash`,p=()=>`fl`+Date.now(),m={get:()=>{try{return JSON.parse(localStorage.getItem(f)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(f,JSON.stringify(e))},h=()=>!!s(`fl_sync`),g=()=>o(`fl_sync`,1,168),_=e=>{let t=Math.floor((Date.now()-e)/1e3);if(t<60)return`Justo ahora`;let n=Math.floor(t/60);if(n<60)return`Hace ${n} min`;let r=Math.floor(n/60);return r<24?`Hace ${r}h`:new Date(e).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`})},v=({id:e,pin:n,synced:r,creado:i,contenido:a})=>`
  <div class="fl_card${n?` fl_card_pinned`:``}" data-id="${e}">
    <div class="fl_card_head">
      <div class="fl_card_time"><i class="fas fa-bolt"></i> ${_(i)}</div>
      <div class="fl_card_acts">
        <button class="fl_act fl_act_copy"  data-id="${e}" ${t(`Copiar contenido`)}><i class="fas fa-copy"></i></button>
        <button class="fl_act fl_act_pin${n?` active`:``}" data-id="${e}" ${t(n?`Quitar pin`:`Fijar`)}><i class="fas fa-thumbtack"></i></button>
        <button class="fl_act fl_act_cloud${r?` synced`:``}" data-id="${e}" ${t(r?`Guardado en nube`:`Pendiente de subir`)}><i class="fas ${r?`fa-cloud`:`fa-cloud-arrow-up`}"></i></button>
        <button class="fl_act fl_act_edit"  data-id="${e}" ${t(`Editar`)}><i class="fas fa-pen"></i></button>
        <button class="fl_act fl_act_del"   data-id="${e}" ${t(`Eliminar`,void 0,`error`)}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="fl_card_body">${(a||``).replace(/\n/g,`<br>`)}</div>
  </div>`,y=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-BNeWaP4M.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},b=async e=>{let t=r.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await y();await i(r(n,`flash`,e.id),{id:e.id,usuario:t.usuario,email:t.email,contenido:String(e.contenido||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[flash] guardarNube:`,e)}},x=async e=>{if(r.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await y();await r(n(t,`flash`,e.id),{contenido:String(e.contenido||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[flash] actualizarNube:`,e)}},S=async e=>{if(r.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await y();await r(n(t,`flash`,e))}catch{}},C=async()=>{let e=r.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await y();return(await r(i(n(t,`flash`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,contenido:t.contenido||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},w=()=>`
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">${r.user?`${n()}${r.user.nombre} ⚡`:`Captura al instante`}</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Tu próxima gran idea..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" ${t(`Guardar (Enter)`)}><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift+Enter</strong> para nueva línea</div>
  </div>
  <div class="fl_timeline">
    <div class="fl_timeline_tit">
      <button id="fl_btn_refresh" class="fl_refresh_btn" ${t(`Actualizar desde la nube`)}>
        <i class="fas fa-clock-rotate-left"></i>
      </button>
      Tus últimos flashes
    </div>
    <div id="fl_grid" class="fl_grid">
      <div class="fl_skeleton"></div><div class="fl_skeleton"></div><div class="fl_skeleton"></div>
    </div>
  </div>
</div>`,T=async()=>{let t=e(`#fl_input`),n=m.get(),o=()=>e(`#fl_grid`).html(`<div class="fl_skeleton"></div>`.repeat(3)),s=t=>e(`[data-id="${t}"] .fl_act_cloud`).removeClass(`fl_act fl_act_cloud`).addClass(`fl_act fl_act_cloud synced`).attr(`title`,`Guardado en nube`).html(`<i class="fas fa-cloud"></i>`),d=()=>[...n].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)).slice(0,50),f=async()=>{let e=d();await c(`#fl_grid`,e.length?e.map(v).join(``):`<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>`,80),e.length&&i([`.fl_grid > *`],50)},_=async(t=!1)=>{if(!r.logged)return;t&&o();let i=e(`#fl_btn_refresh i`).addClass(`fl_spin`);try{let e=await C();if(e?.length){let t=new Set(e.map(e=>e.id)),r=n.filter(e=>!t.has(e.id));r.forEach(e=>b(e)),n=[...e,...r],m.set(n),g()}}finally{i.removeClass(`fl_spin`),f()}},y=()=>{let i=t.val().trim();if(!i)return;let o={id:p(),contenido:i,pin:!1,creado:Date.now()};n.unshift(o),m.set(n),t.val(``).css(`height`,`auto`),e(`.fl_input_box`).removeClass(`active`),a(`¡Flash capturado! ⚡`,`success`),f(),r.logged&&b(o).then(()=>{o.synced=!0,m.set(n),s(o.id)})},w=e=>n.find(t=>t.id===e);t.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`,e(`.fl_input_box`).toggleClass(`active`,!!this.value.trim())}),e(document).on(`click`,`#fl_btn_send`,y).on(`click`,`#fl_btn_refresh`,()=>_(!0)).on(`keydown`,`#fl_input`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),y())}).on(`click`,`.fl_act_copy`,function(){let t=w(e(this).data(`id`));t&&l(t.contenido,this,`¡Copiado!`)}).on(`click`,`.fl_act_del`,function(){let t=e(this).data(`id`);confirm(`¿Eliminar este flash?`)&&(n=n.filter(e=>e.id!==t),m.set(n),e(this).closest(`.fl_card`).slideUp(200,function(){e(this).remove()}),a(`Flash eliminado`,`info`),r.logged&&S(t))}).on(`click`,`.fl_act_pin`,function(){let t=w(e(this).data(`id`));t&&(t.pin=!t.pin,m.set(n),f(),a(t.pin?`Fijado ✓`:`Desanclado`,`success`),r.logged&&x(t).then(()=>s(t.id)))}).on(`click`,`.fl_act_edit`,function(){let t=w(e(this).data(`id`));if(!t)return;let i=e(this).closest(`.fl_card`).find(`.fl_card_body`);i.html(`<textarea class="fl_edit_ta">${t.contenido}</textarea>
        <div class="fl_edit_acts">
          <button class="fl_edit_ok"><i class="fas fa-check"></i> Guardar</button>
          <button class="fl_edit_cancel"><i class="fas fa-xmark"></i></button>
        </div>`);let o=i.find(`.fl_edit_ta`).focus();o.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`}),i.find(`.fl_edit_cancel`).on(`click`,f),i.find(`.fl_edit_ok`).on(`click`,()=>{let e=o.val().trim();e&&(Object.assign(t,{contenido:e,actualizado:Date.now()}),m.set(n),f(),a(`Flash actualizado ✓`,`success`),r.logged&&x(t).then(()=>s(t.id)))})}),i([`.fl_hero > *`,`.fl_timeline_tit`],60),n.length?(f(),r.logged&&!h()&&_(!1)):r.logged?await _(!0):f(),setTimeout(()=>t.focus(),300),console.log(`⚡ ${u} v10 · Flash OK`)},E=()=>{e(document).off(`click keydown`,`#fl_input, #fl_btn_send, #fl_btn_refresh, .fl_act_del, .fl_act_pin, .fl_act_edit, .fl_act_copy`)};export{E as cleanup,T as init,w as render};