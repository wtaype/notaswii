import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,_ as n,a as r,f as i,h as a,i as o,m as s,p as c,x as l}from"./widev-Di7bYMvC.js";import{t as u}from"./wii-DnBLd2G7.js";import{t as d}from"./preload-helper-DK0U7nVd.js";var f=`flash`,p=()=>`fl`+Date.now(),m={get:()=>{try{return JSON.parse(localStorage.getItem(f)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(f,JSON.stringify(e))},h=()=>!!i(`fl_sync`),g=()=>c(`fl_sync`,1,168),_=e=>{let t=Math.floor((Date.now()-e)/1e3);if(t<60)return`Justo ahora`;let n=Math.floor(t/60);if(n<60)return`Hace ${n} min`;let r=Math.floor(n/60);return r<24?`Hace ${r}h`:new Date(e).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`})},v=({id:e,pin:t,synced:n,creado:r,contenido:i})=>`
  <div class="fl_card${t?` fl_card_pinned`:``}" data-id="${e}">
    <div class="fl_card_head">
      <div class="fl_card_time"><i class="fas fa-bolt"></i> ${_(r)}</div>
      <div class="fl_card_acts">
        <button class="fl_act fl_act_copy"  data-id="${e}" ${l(`Copiar contenido`)}><i class="fas fa-copy"></i></button>
        <button class="fl_act fl_act_pin${t?` active`:``}" data-id="${e}" ${l(t?`Quitar pin`:`Fijar`)}><i class="fas fa-thumbtack"></i></button>
        <button class="fl_act fl_act_cloud${n?` synced`:``}" data-id="${e}" ${l(n?`Guardado en nube`:`Pendiente de subir`)}><i class="fas ${n?`fa-cloud`:`fa-cloud-arrow-up`}"></i></button>
        <button class="fl_act fl_act_edit"  data-id="${e}" ${l(`Editar`)}><i class="fas fa-pen"></i></button>
        <button class="fl_act fl_act_del"   data-id="${e}" ${l(`Eliminar`,void 0,`error`)}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="fl_card_body">${(i||``).replace(/\n/g,`<br>`)}</div>
  </div>`,y=async()=>{let{db:e}=await d(async()=>{let{db:e}=await import(`./firebase-CKMRR4tO.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await d(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},b=async e=>{let t=a.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await y();await i(r(n,`flash`,e.id),{id:e.id,usuario:t.usuario,email:t.email,contenido:String(e.contenido||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[flash] guardarNube:`,e)}},x=async e=>{if(a.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await y();await r(n(t,`flash`,e.id),{contenido:String(e.contenido||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[flash] actualizarNube:`,e)}},S=async e=>{if(a.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await y();await r(n(t,`flash`,e))}catch{}},C=async()=>{let e=a.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await y();return(await r(i(n(t,`flash`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,contenido:t.contenido||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},w=()=>`
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">${a.user?`${r()}${a.user.nombre} ⚡`:`Captura al instante`}</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Tu próxima gran idea..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" ${l(`Guardar (Enter)`)}><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift+Enter</strong> para nueva línea</div>
  </div>
  <div class="fl_timeline">
    <div class="fl_timeline_tit">
      <button id="fl_btn_refresh" class="fl_refresh_btn" ${l(`Actualizar desde la nube`)}>
        <i class="fas fa-clock-rotate-left"></i>
      </button>
      Tus últimos flashes
    </div>
    <div id="fl_grid" class="fl_grid">
      <div class="fl_skeleton"></div><div class="fl_skeleton"></div><div class="fl_skeleton"></div>
    </div>
  </div>
</div>`,T=async()=>{let r=e(`#fl_input`),i=m.get(),c=()=>e(`#fl_grid`).html(`<div class="fl_skeleton"></div>`.repeat(3)),l=t=>e(`[data-id="${t}"] .fl_act_cloud`).removeClass(`fl_act fl_act_cloud`).addClass(`fl_act fl_act_cloud synced`).attr(`title`,`Guardado en nube`).html(`<i class="fas fa-cloud"></i>`),d=()=>[...i].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)).slice(0,50),f=async()=>{let e=d();await n(`#fl_grid`,e.length?e.map(v).join(``):`<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>`,80),e.length&&s([`.fl_grid > *`],50)},_=async(t=!1)=>{if(!a.logged)return;t&&c();let n=e(`#fl_btn_refresh i`).addClass(`fl_spin`);try{let e=await C();if(e?.length){let t=new Set(e.map(e=>e.id)),n=i.filter(e=>!t.has(e.id));n.forEach(e=>b(e)),i=[...e,...n],m.set(i),g()}}finally{n.removeClass(`fl_spin`),f()}},y=()=>{let t=r.val().trim();if(!t)return;let n={id:p(),contenido:t,pin:!1,creado:Date.now()};i.unshift(n),m.set(i),r.val(``).css(`height`,`auto`),e(`.fl_input_box`).removeClass(`active`),o(`¡Flash capturado! ⚡`,`success`),f(),a.logged&&b(n).then(()=>{n.synced=!0,m.set(i),l(n.id)})},w=e=>i.find(t=>t.id===e);r.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`,e(`.fl_input_box`).toggleClass(`active`,!!this.value.trim())}),e(document).on(`click`,`#fl_btn_send`,y).on(`click`,`#fl_btn_refresh`,()=>_(!0)).on(`keydown`,`#fl_input`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),y())}).on(`click`,`.fl_act_copy`,function(){let n=w(e(this).data(`id`));n&&t(n.contenido,this,`¡Copiado!`)}).on(`click`,`.fl_act_del`,function(){let t=e(this).data(`id`);confirm(`¿Eliminar este flash?`)&&(i=i.filter(e=>e.id!==t),m.set(i),e(this).closest(`.fl_card`).slideUp(200,function(){e(this).remove()}),o(`Flash eliminado`,`info`),a.logged&&S(t))}).on(`click`,`.fl_act_pin`,function(){let t=w(e(this).data(`id`));t&&(t.pin=!t.pin,m.set(i),f(),o(t.pin?`Fijado ✓`:`Desanclado`,`success`),a.logged&&x(t).then(()=>l(t.id)))}).on(`click`,`.fl_act_edit`,function(){let t=w(e(this).data(`id`));if(!t)return;let n=e(this).closest(`.fl_card`).find(`.fl_card_body`);n.html(`<textarea class="fl_edit_ta">${t.contenido}</textarea>
        <div class="fl_edit_acts">
          <button class="fl_edit_ok"><i class="fas fa-check"></i> Guardar</button>
          <button class="fl_edit_cancel"><i class="fas fa-xmark"></i></button>
        </div>`);let r=n.find(`.fl_edit_ta`).focus();r.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`}),n.find(`.fl_edit_cancel`).on(`click`,f),n.find(`.fl_edit_ok`).on(`click`,()=>{let e=r.val().trim();e&&(Object.assign(t,{contenido:e,actualizado:Date.now()}),m.set(i),f(),o(`Flash actualizado ✓`,`success`),a.logged&&x(t).then(()=>l(t.id)))})}),s([`.fl_hero > *`,`.fl_timeline_tit`],60),i.length?(f(),a.logged&&!h()&&_(!1)):a.logged?await _(!0):f(),setTimeout(()=>r.focus(),300),console.log(`⚡ ${u} v12 · Flash OK`)},E=()=>{e(document).off(`click keydown`,`#fl_input, #fl_btn_send, #fl_btn_refresh, .fl_act_del, .fl_act_pin, .fl_act_edit, .fl_act_copy`)};export{E as cleanup,T as init,w as render};