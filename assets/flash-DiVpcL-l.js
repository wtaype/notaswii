import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,_ as n,a as r,h as i,i as a,m as o,x as s}from"./widev-DghgRcN4.js";import{t as c}from"./wii-Ce1IXd2j.js";import{t as l}from"./preload-helper-DbWsiEEd.js";var u=`flash`,d=()=>`fl`+Date.now(),f=[{id:`ej1`,pin:!0,contenido:`⚡ ¡Bienvenido a Flash!
Escribe aquí cualquier idea suelta y dale a Enter.`,creado:Date.now()},{id:`ej2`,pin:!1,contenido:`☁️ Crea una cuenta para sincronizar todos tus flashes en la nube.`,creado:Date.now()-1e3}],p={get:()=>{try{let e=localStorage.getItem(u);return e===null&&!i.user?[...f]:JSON.parse(e||`[]`)}catch{return i.user?[]:[...f]}},set:e=>localStorage.setItem(u,JSON.stringify(e))},m=e=>{let t=Math.floor((Date.now()-e)/1e3);if(t<60)return`Justo ahora`;let n=Math.floor(t/60);if(n<60)return`Hace ${n} min`;let r=Math.floor(n/60);return r<24?`Hace ${r}h`:new Date(e).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`})},h=({id:e,pin:t,synced:n,creado:r,contenido:i})=>`
  <div class="fl_card${t?` fl_card_pinned`:``}" data-id="${e}">
    <div class="fl_card_head">
      <div class="fl_card_time"><i class="fas fa-bolt"></i> ${m(r)}</div>
      <div class="fl_card_acts">
        <button class="fl_act fl_act_copy"  data-id="${e}" ${s(`Copiar contenido`)}><i class="fas fa-copy"></i></button>
        <button class="fl_act fl_act_pin${t?` active`:``}" data-id="${e}" ${s(t?`Quitar pin`:`Fijar`)}><i class="fas fa-thumbtack"></i></button>
        <button class="fl_act fl_act_cloud${n?` synced`:``}" data-id="${e}" ${s(n?`Guardado en nube`:`Pendiente de subir`)}><i class="fas ${n?`fa-cloud`:`fa-cloud-arrow-up`}"></i></button>
        <button class="fl_act fl_act_edit"  data-id="${e}" ${s(`Editar`)}><i class="fas fa-pen"></i></button>
        <button class="fl_act fl_act_del"   data-id="${e}" ${s(`Eliminar`,void 0,`error`)}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="fl_card_body">${(i||``).replace(/\n/g,`<br>`)}</div>
  </div>`,g=async()=>{let{db:e}=await l(async()=>{let{db:e}=await import(`./firebase-CCwEX8XK.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await l(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},_=async e=>{let t=i.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await g();await i(r(n,`flash`,e.id),{id:e.id,usuario:t.usuario,email:t.email,contenido:String(e.contenido||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[flash] guardarNube:`,e)}},v=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await g();await r(n(t,`flash`,e.id),{contenido:String(e.contenido||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[flash] actualizarNube:`,e)}},y=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await g();await r(n(t,`flash`,e))}catch{}},b=async()=>{let e=i.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await g();return(await r(i(n(t,`flash`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,contenido:t.contenido||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},x=()=>`
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">${i.user?`${r()}${i.user.nombre} ⚡`:`Captura al instante`}</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Tu próxima gran idea..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" ${s(`Guardar (Enter)`)}><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift+Enter</strong> para nueva línea</div>
  </div>
  <div class="fl_timeline">
    <div class="fl_timeline_tit">
      <button id="fl_btn_refresh" class="fl_refresh_btn" style="display:none" ${s(`Actualizar desde la nube`)}>
        <i class="fas fa-clock-rotate-left"></i>
      </button>
      Tus últimos flashes
    </div>
    <div id="fl_grid" class="fl_grid">
      <div class="fl_skeleton"></div><div class="fl_skeleton"></div><div class="fl_skeleton"></div>
    </div>
  </div>
</div>`,S=null,C=async()=>{let r=e(`#fl_input`),s=p.get(),l=()=>e(`#fl_grid`).html(`<div class="fl_skeleton"></div>`.repeat(3)),f=t=>e(`[data-id="${t}"] .fl_act_cloud`).removeClass(`fl_act fl_act_cloud`).addClass(`fl_act fl_act_cloud synced`).attr(`title`,`Guardado en nube`).html(`<i class="fas fa-cloud"></i>`),m=()=>[...s].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0)).slice(0,50),g=async()=>{let e=m();await n(`#fl_grid`,e.length?e.map(h).join(``):`<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>`,80),e.length&&o([`.fl_grid > *`],50)},x=()=>{let t=r.val().trim();if(!t)return;s=s.filter(e=>!e.id.startsWith(`ej`));let n={id:d(),contenido:t,pin:!1,creado:Date.now()};s.unshift(n),p.set(s),r.val(``).css(`height`,`auto`),e(`.fl_input_box`).removeClass(`active`),a(`¡Flash capturado! ⚡`,`success`),g(),i.user&&_(n).then(()=>{n.synced=!0,p.set(s),f(n.id)})},C=e=>s.find(t=>t.id===e);r.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`,e(`.fl_input_box`).toggleClass(`active`,!!this.value.trim())}),e(document).on(`click`,`#fl_btn_send`,x).on(`click`,`#fl_btn_refresh`,async function(){let t=e(this).find(`i`);if(t.hasClass(`fl_spin`))return;t.addClass(`fl_spin`);let n=await b();n&&(JSON.stringify(n)!==JSON.stringify(s)&&(s=n,p.set(s),g()),a(`Sincronizado ✓`,`success`)),t.removeClass(`fl_spin`)}).on(`keydown`,`#fl_input`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),x())}).on(`click`,`.fl_act_copy`,function(){let n=C(e(this).data(`id`));n&&t(n.contenido,this,`¡Copiado!`)}).on(`click`,`.fl_act_del`,function(){let t=e(this).data(`id`);confirm(`¿Eliminar este flash?`)&&(s=s.filter(e=>e.id!==t),p.set(s),e(this).closest(`.fl_card`).slideUp(200,function(){e(this).remove()}),a(`Flash eliminado`,`info`),i.user&&y(t))}).on(`click`,`.fl_act_pin`,function(){let t=C(e(this).data(`id`));t&&(t.pin=!t.pin,p.set(s),g(),a(t.pin?`Fijado ✓`:`Desanclado`,`success`),i.user&&v(t).then(()=>f(t.id)))}).on(`click`,`.fl_act_edit`,function(){let t=C(e(this).data(`id`));if(!t)return;let n=e(this).closest(`.fl_card`).find(`.fl_card_body`);n.html(`<textarea class="fl_edit_ta">${t.contenido}</textarea>
        <div class="fl_edit_acts">
          <button class="fl_edit_ok"><i class="fas fa-check"></i> Guardar</button>
          <button class="fl_edit_cancel"><i class="fas fa-xmark"></i></button>
        </div>`);let r=n.find(`.fl_edit_ta`).focus();r.on(`input`,function(){this.style.height=`auto`,this.style.height=`${this.scrollHeight}px`}),n.find(`.fl_edit_cancel`).on(`click`,g),n.find(`.fl_edit_ok`).on(`click`,()=>{let e=r.val().trim();e&&(Object.assign(t,{contenido:e,actualizado:Date.now()}),p.set(s),g(),a(`Flash actualizado ✓`,`success`),i.user&&v(t).then(()=>f(t.id)))})}),o([`.fl_hero > *`,`.fl_timeline_tit`],60),g(),S=i.on(async t=>{if(e(`#fl_btn_refresh`).toggle(!!t),t){s.length===0&&l();let e=await b();e&&JSON.stringify(e)!==JSON.stringify(s)&&(s=e,p.set(s),g())}else localStorage.removeItem(u),s=p.get(),g()}),setTimeout(()=>r.focus(),300),console.log(`⚡ ${c} v13 · Flash OK`)},w=()=>{S?.(),e(document).off(`click keydown`,`#fl_input, #fl_btn_send, #fl_btn_refresh, .fl_act_del, .fl_act_pin, .fl_act_edit, .fl_act_copy`)};export{w as cleanup,C as init,x as render};