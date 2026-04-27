import{t as e}from"./vendor-BDh6mtVu.js";import{f as t,h as n,i as r,m as i,p as a,x as o}from"./widev-DghgRcN4.js";import{t as s}from"./wii-Ce1IXd2j.js";import{t as c}from"./preload-helper-DbWsiEEd.js";var l=`misNotas`,u=20,d=()=>`min`+Date.now(),f={idea:{icon:`fa-lightbulb`,label:`Idea`,color:`#0EBEFF`},nota:{icon:`fa-file-lines`,label:`Nota`,color:`#29C72E`},tarea:{icon:`fa-check-double`,label:`Tarea`,color:`#7000FF`},link:{icon:`fa-link`,label:`Link`,color:`#FFB800`}},p=[{id:`ej1`,tipo:`idea`,titulo:`¡Bienvenido a Mis Notas!`,contenido:`Guarda tus ideas rápidas. Dale clic al icono de la chincheta para fijarlas arriba.`,pin:!0,creado:Date.now()},{id:`ej2`,tipo:`tarea`,titulo:`Sincroniza en la nube`,contenido:`Crea una cuenta gratuita para guardar todo en la nube y acceder desde cualquier dispositivo.`,pin:!1,creado:Date.now()-1e3},{id:`ej3`,tipo:`link`,titulo:`Mis Proyectos`,link:`https://wtaype.web.app/proyectos`,pin:!1,creado:Date.now()-2e3}],m={get:()=>{let e=localStorage.getItem(l);return e===null&&!n.user?[...p]:(t(l)||(e?.startsWith(`[`)?JSON.parse(e):[])).map(e=>({...e,link:e.link||e.url||``,pin:e.pin??e.fijada??!1,creado:e.creado||e.fecha||Date.now()}))},set:e=>a(l,e,8760)},h=(e,t)=>`${f[e]?.label||`Nota`} ${t.filter(t=>t.tipo===e).length+1}`,g=null,_=async()=>{if(g)return g;try{let{db:e}=await c(async()=>{let{db:e}=await import(`./firebase-CCwEX8XK.js`).then(e=>e.r);return{db:e}},[]);return g=e,e}catch{return null}},v=async e=>{let t=n.user;if(!t?.usuario)return;let r=await _();if(r)try{let{doc:n,setDoc:i,serverTimestamp:a}=await c(async()=>{let{doc:e,setDoc:t,serverTimestamp:n}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{doc:e,setDoc:t,serverTimestamp:n}},[]),o=!e.synced;o&&(e.synced=!0),await i(n(r,`misnotas`,e.id),{usuario:String(t.usuario||``),email:String(t.email||``),titulo:String(e.titulo||``),contenido:String(e.contenido||``),link:String(e.link||``),pin:!!e.pin,tipo:e.tipo||`idea`,...o?{creado:a()}:{actualizado:a()}},{merge:!0})}catch(e){console.error(`[misnotas] guardarNube:`,e)}},y=async e=>{if(!n.user?.usuario)return;let t=await _();if(t)try{let{doc:n,deleteDoc:r}=await c(async()=>{let{doc:e,deleteDoc:t}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{doc:e,deleteDoc:t}},[]);await r(n(t,`misnotas`,e))}catch{}},b=async()=>{let e=n.user;if(!e?.email)return null;let t=await _();if(!t)return null;try{let{collection:n,getDocs:r,query:i,where:a}=await c(async()=>{let{collection:e,getDocs:t,query:n,where:r}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{collection:e,getDocs:t,query:n,where:r}},[]);return(await r(i(n(t,`misnotas`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,tipo:t.tipo||`idea`,titulo:t.titulo||``,contenido:t.contenido||``,link:String(t.link||``),pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},x=[],S=`todas`,C=``,w=null,T=`idea`,E=e=>{let t=f[e.tipo]||f.idea,n=new Date(e.creado).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`,year:`numeric`}),r=(e.contenido||``).slice(0,120);return`
  <article class="mn_card" data-id="${e.id}" data-tipo="${e.tipo}" style="--bc:${t.color}" title="Clic para editar">
    <div class="mn_card_bar"></div>
    <div class="mn_card_top">
      <span class="mn_badge"><i class="fas ${t.icon}"></i> ${t.label}</span>
      <div class="mn_card_acts">
        <button class="mn_act mn_act_copy" data-id="${e.id}" ${o(`Copiar`)}><i class="fas fa-copy"></i></button>
        <button class="mn_act mn_act_del"  data-id="${e.id}" ${o(`Eliminar`,``,`error`)}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <h3 class="mn_card_tit">${e.titulo||h(e.tipo,x)}</h3>
    ${e.link?`<a class="mn_card_link" href="${e.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fas fa-arrow-up-right-from-square"></i> ${e.link}</a>`:``}
    ${r?`<p class="mn_card_body">${r}${(e.contenido||``).length>120?`…`:``}</p>`:``}
    <div class="mn_card_foot">
      <span class="mn_fecha"><i class="fas fa-clock"></i> ${n}</span>
      <div class="mn_card_foot_right">
        ${e.pin?`<span class="mn_pin"><i class="fas fa-thumbtack"></i></span>`:``}
        <i class="fas fa-chevron-right mn_card_arr"></i>
      </div>
    </div>
  </article>`},D=()=>`<div class="mn_empty"><div class="mn_empty_ico"><i class="fas fa-note-sticky"></i></div><h3>Sin notas aquí</h3><p>${C?`Sin resultados para "<strong>${C}</strong>"`:`Escribe algo y guárdalo`}</p></div>`,O=()=>`
<div class="mn_wrap">
  <div class="mn_header">
    <div class="mn_header_left">
      <h1 class="mn_titulo"><i class="fas fa-note-sticky"></i> Mis Notas</h1>
      <span class="mn_count" id="mn_count">0 notas</span>
    </div>
    <div class="mn_header_right">
      <button class="mn_btn_sync" id="mn_btn_sync" style="display:none" data-witip="Sincronizar" data-wtipo="bottom"><i class="fas fa-rotate"></i></button>
      <div class="mn_search_box">
        <i class="fas fa-search mn_search_ico"></i>
        <input type="text" class="mn_search" id="mn_search" placeholder="Buscar…" autocomplete="off" />
        <button class="mn_search_clear dpn" id="mn_search_clear"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="mn_filtros" id="mn_filtros">
        <button class="mn_filtro active" data-tipo="todas" ${o(`Todas`)}><i class="fas fa-layer-group"></i></button>
        ${Object.entries(f).map(([e,t])=>`<button class="mn_filtro" data-tipo="${e}" style="--fc:${t.color}" ${o(t.label)}><i class="fas ${t.icon}"></i></button>`).join(``)}
      </div>
    </div>
  </div>

  <div class="mn_layout">
    <aside class="mn_panel" id="mn_panel">
      <div class="mn_panel_head">
        <h2 class="mn_panel_tit" id="mn_panel_tit">Nueva Nota</h2>
        <button class="mn_panel_new" id="mn_panel_new" ${o(`Nueva nota`)}>Nuevo <i class="fas fa-plus"></i></button>
      </div>
      <div class="mn_form" id="mn_form">
        <div class="mn_tipo_sel" id="mn_tipo_sel">
          ${Object.entries(f).map(([e,t])=>`<button class="mn_tipo_btn ${e===`idea`?`active`:``}" data-tipo="${e}" style="--tc:${t.color}" ${o(t.label)}><i class="fas ${t.icon}"></i> ${t.label}</button>`).join(``)}
        </div>
        <div class="mn_form_row">
          <input type="text" id="mn_inp_titulo" class="mn_inp" placeholder="Título (opcional)…" maxlength="80" />
        </div>
        <div class="mn_form_row mn_row_flex">
          <textarea id="mn_inp_cuerpo" class="mn_textarea" placeholder="Tu idea aquí…" rows="5"></textarea>
          <div class="mn_char_count" id="mn_char_count">0 / 1000</div>
        </div>
        <!-- Link siempre visible, se guarda como string -->
        <div class="mn_form_row">
          <input type="text" id="mn_inp_link" class="mn_inp mn_inp_link" placeholder="Link (opcional): https://…" autocomplete="off" />
        </div>
        <div class="mn_form_row mn_row_pin">
          <label class="mn_toggle_label">
            <input type="checkbox" id="mn_chk_pin" />
            <span class="mn_toggle"></span>
            <span>Fijar al inicio</span>
          </label>
        </div>
        <div class="mn_form_acts">
          <button class="mn_btn_save" id="mn_btn_save">
            <i class="fas fa-floppy-disk"></i>
            <span id="mn_save_lbl">Guardar</span>
            <span class="mn_shortcut">Ctrl+↵</span>
          </button>
        </div>
        ${n.user?``:`
        <div class="mn_auth_banner" id="mn_auth_banner">
          <i class="fas fa-cloud-arrow-up"></i>
          <p>Crea una cuenta para sincronizar en todos tus dispositivos</p>
          <button class="mn_btn_login bt_auth login"><i class="fas fa-user-plus"></i> Crear cuenta</button>
        </div>`}
      </div>
    </aside>
    <div class="mn_grid" id="mn_grid">
      <div class="mn_skeleton"></div><div class="mn_skeleton"></div><div class="mn_skeleton"></div>
    </div>
  </div>
  <button class="mn_fab" id="mn_fab" ${o(`Nueva nota`)}><i class="fas fa-plus"></i></button>
</div>`,k=()=>{let t=[...x].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0));if(S!==`todas`&&(t=t.filter(e=>e.tipo===S)),C){let e=C.toLowerCase();t=t.filter(t=>t.titulo?.toLowerCase().includes(e)||t.contenido?.toLowerCase().includes(e)||t.link?.toLowerCase().includes(e))}e(`#mn_grid`).html(t.length?t.map(E).join(``):D()),w&&e(`[data-id="${w}"]`).addClass(`mn_card_active`),e(`#mn_count`).text(`${x.length} nota${x.length===1?``:`s`}`),i([`.mn_grid > *`],80)},A=t=>{T=t,e(`#mn_inp_cuerpo`).attr(`placeholder`,{idea:`Tu idea brillante aquí…`,nota:`Escribe tu nota…`,tarea:`Describe la tarea…`,link:`Contenido del link…`}[t]||`Escribe…`)},j=()=>{w=null,T=`idea`,e(`#mn_panel_tit`).text(`Nueva Nota`),e(`#mn_save_lbl`).text(`Guardar`),e(`#mn_inp_titulo, #mn_inp_link`).val(``),e(`#mn_inp_cuerpo`).val(``).trigger(`input`),e(`#mn_chk_pin`).prop(`checked`,!1),e(`#mn_tipo_sel .mn_tipo_btn`).removeClass(`active`),e(`#mn_tipo_sel [data-tipo="idea"]`).addClass(`active`),A(`idea`),e(`#mn_grid .mn_card_active`).removeClass(`mn_card_active`),e(`#mn_inp_cuerpo`).focus()},M=t=>{w=t.id,T=t.tipo||`idea`,e(`#mn_panel_tit`).text(`Editando`),e(`#mn_save_lbl`).text(`Actualizar`),e(`#mn_inp_titulo`).val(t.titulo||``),e(`#mn_inp_cuerpo`).val(t.contenido||``).trigger(`input`),e(`#mn_inp_link`).val(t.link||``),e(`#mn_chk_pin`).prop(`checked`,!!t.pin),e(`.mn_tipo_btn`).removeClass(`active`),e(`.mn_tipo_btn[data-tipo="${t.tipo}"]`).addClass(`active`),A(t.tipo),e(`.mn_card`).removeClass(`mn_card_active`),e(`[data-id="${t.id}"]`).addClass(`mn_card_active`)},N=async()=>{let t=T,i=e(`#mn_inp_titulo`).val().trim()||h(t,w?x.filter(e=>e.id!==w):x),a=e(`#mn_inp_cuerpo`).val().trim(),o=String(e(`#mn_inp_link`).val()||``).trim();o&&!/^https?:\/\//i.test(o)&&(o=`https://`+o);let s=!!e(`#mn_chk_pin`).prop(`checked`);if(!a&&!o){r(`Escribe algo antes de guardar`,`warning`),e(`#mn_inp_cuerpo`).focus();return}let c=!!n.user;if(!c&&x.length>=u&&!w){r(`Límite de ${u} notas locales. ¡Crea una cuenta!`,`warning`,5e3);return}x=x.filter(e=>!e.id.startsWith(`ej`));let l;if(w){let e=x.findIndex(e=>e.id===w);e>-1&&(x[e]={...x[e],tipo:t,titulo:i,contenido:a,link:o,pin:s,actualizado:Date.now()},l=x[e])}else l={id:d(),tipo:t,titulo:i,contenido:a,link:o,pin:s,creado:Date.now()},x.unshift(l);m.set(x),c&&l&&v(l),k(),r(w?`Nota actualizada ✓`:`Nota guardada ✓`,`success`),j()},P=e=>{confirm(`¿Eliminar esta nota?`)&&(x=x.filter(t=>t.id!==e),m.set(x),n.user&&y(e),w===e&&j(),k(),r(`Nota eliminada`,`info`))},F=null,I=async()=>{x=m.get(),k(),e(document).on(`click`,`.mn_card`,function(t){if(!e(t.target).closest(`.mn_act`).length){let t=x.find(t=>t.id===e(this).data(`id`));t&&M(t)}}).on(`click`,`.mn_act_copy`,function(t){t.stopPropagation();let n=x.find(t=>t.id===e(this).data(`id`));n&&navigator.clipboard?.writeText(n.contenido||n.link||``),r(`Copiado ✓`,`success`)}).on(`click`,`.mn_act_del`,function(t){t.stopPropagation(),P(e(this).data(`id`))}).on(`click`,`.mn_tipo_btn`,function(){e(`.mn_tipo_btn`).removeClass(`active`),e(this).addClass(`active`),A(e(this).data(`tipo`))}).on(`click`,`#mn_panel_new, #mn_fab`,j).on(`click`,`#mn_btn_save`,N).on(`keydown`,`#mn_inp_cuerpo, #mn_inp_titulo, #mn_inp_link`,e=>{e.ctrlKey&&e.key===`Enter`&&N()}).on(`input`,`#mn_inp_cuerpo`,function(){let t=e(this).val().length;e(`#mn_char_count`).text(`${t} / 1000`).toggleClass(`mn_char_warn`,t>900)}).on(`click`,`.mn_filtro`,function(){e(`.mn_filtro`).removeClass(`active`),e(this).addClass(`active`),S=e(this).data(`tipo`),k()}),e(`#mn_search`).on(`input.mn`,function(){C=e(this).val().trim(),e(`#mn_search_clear`).toggleClass(`dpn`,!C),k()}),e(`#mn_search_clear`).on(`click.mn`,()=>{e(`#mn_search`).val(``),C=``,e(`#mn_search_clear`).addClass(`dpn`),k()}),e(`#mn_btn_sync`).on(`click.mn`,async function(){let t=e(this).find(`i`);if(t.hasClass(`fa-spin`))return;t.addClass(`fa-spin`);let n=await b();n&&(JSON.stringify(n)!==JSON.stringify(x)&&(x=n,m.set(x),k()),r(`Sincronizado ✓`,`success`)),t.removeClass(`fa-spin`)}),F=n.on(async t=>{if(e(`#mn_btn_sync`).toggle(!!t),t){e(`#mn_auth_banner`).stop(!0).fadeOut(150,function(){e(this).remove()}),x.length===0&&e(`#mn_grid`).html(`<div class="mn_skeleton"></div>`.repeat(3));let t=await b();t&&JSON.stringify(t)!==JSON.stringify(x)&&(x=t,m.set(x),k())}else localStorage.removeItem(l),x=m.get(),k(),e(`#mn_auth_banner`).length||(e(`#mn_form`).append(`<div class="mn_auth_banner" id="mn_auth_banner" style="display:none"><i class="fas fa-cloud-arrow-up"></i><p>Crea una cuenta para sincronizar</p><button class="mn_btn_login bt_auth login"><i class="fas fa-user-plus"></i> Crear cuenta</button></div>`),e(`#mn_auth_banner`).fadeIn(250))}),e(`#mn_inp_cuerpo`).focus(),console.log(`📋 ${s} v13 · MisNotas OK`)},L=()=>{e(document).off(`.mn`),F?.(),console.log(`🧹 MisNotas OK`)};export{L as cleanup,I as init,O as render};