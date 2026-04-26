import{t as e}from"./vendor-BDh6mtVu.js";import{h as t,i as n,m as r,x as i}from"./widev-H4r-I7mR.js";import{t as a}from"./wii-By3LwGGz.js";import{t as o}from"./preload-helper-DbWsiEEd.js";var s=`misNotas`,c=20,l=()=>`min`+Date.now(),u={idea:{icon:`fa-lightbulb`,label:`Idea`,color:`#0EBEFF`},nota:{icon:`fa-file-lines`,label:`Nota`,color:`#29C72E`},tarea:{icon:`fa-check-double`,label:`Tarea`,color:`#7000FF`},link:{icon:`fa-link`,label:`Link`,color:`#FFB800`}},d=()=>{try{return JSON.parse(localStorage.getItem(s)||`[]`).map(e=>({...e,link:e.link||e.url||``,pin:e.pin??e.fijada??!1,creado:e.creado||e.fecha||Date.now()}))}catch{return[]}},f=e=>localStorage.setItem(s,JSON.stringify(e)),p=(e,t)=>`${u[e]?.label||`Nota`} ${t.filter(t=>t.tipo===e).length+1}`,m=null,h=async()=>{if(m)return m;try{let{db:e}=await o(async()=>{let{db:e}=await import(`./firebase-DG8WAU6u.js`).then(e=>e.r);return{db:e}},[]);return m=e,e}catch{return null}},g=async e=>{let n=t.user;if(!n?.usuario)return;let r=await h();if(r)try{let{doc:t,setDoc:i,serverTimestamp:a}=await o(async()=>{let{doc:e,setDoc:t,serverTimestamp:n}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{doc:e,setDoc:t,serverTimestamp:n}},[]),s=!e.synced;s&&(e.synced=!0),await i(t(r,`misnotas`,e.id),{usuario:String(n.usuario||``),email:String(n.email||``),titulo:String(e.titulo||``),contenido:String(e.contenido||``),link:String(e.link||``),pin:!!e.pin,tipo:e.tipo||`idea`,...s?{creado:a()}:{actualizado:a()}},{merge:!0})}catch(e){console.error(`[misnotas] guardarNube:`,e)}},_=async e=>{if(!t.user?.usuario)return;let n=await h();if(n)try{let{doc:t,deleteDoc:r}=await o(async()=>{let{doc:e,deleteDoc:t}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{doc:e,deleteDoc:t}},[]);await r(t(n,`misnotas`,e))}catch{}},v=async()=>{let e=t.user;if(!e?.email)return null;let n=await h();if(!n)return null;try{let{collection:t,getDocs:r,query:i,where:a}=await o(async()=>{let{collection:e,getDocs:t,query:n,where:r}=await import(`./firebase-CCUuWaKQ.js`).then(e=>e.f);return{collection:e,getDocs:t,query:n,where:r}},[]);return(await r(i(t(n,`misnotas`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,tipo:t.tipo||`idea`,titulo:t.titulo||``,contenido:t.contenido||``,link:String(t.link||``),pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},y=[],b=`todas`,x=``,S=null,C=`idea`,w=e=>{let t=u[e.tipo]||u.idea,n=new Date(e.creado).toLocaleDateString(`es-PE`,{day:`2-digit`,month:`short`,year:`numeric`}),r=(e.contenido||``).slice(0,120);return`
  <article class="mn_card" data-id="${e.id}" data-tipo="${e.tipo}" style="--bc:${t.color}" title="Clic para editar">
    <div class="mn_card_bar"></div>
    <div class="mn_card_top">
      <span class="mn_badge"><i class="fas ${t.icon}"></i> ${t.label}</span>
      <div class="mn_card_acts">
        <button class="mn_act mn_act_copy" data-id="${e.id}" ${i(`Copiar`)}><i class="fas fa-copy"></i></button>
        <button class="mn_act mn_act_del"  data-id="${e.id}" ${i(`Eliminar`,``,`error`)}><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <h3 class="mn_card_tit">${e.titulo||p(e.tipo,y)}</h3>
    ${e.link?`<a class="mn_card_link" href="${e.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><i class="fas fa-arrow-up-right-from-square"></i> ${e.link}</a>`:``}
    ${r?`<p class="mn_card_body">${r}${(e.contenido||``).length>120?`…`:``}</p>`:``}
    <div class="mn_card_foot">
      <span class="mn_fecha"><i class="fas fa-clock"></i> ${n}</span>
      <div class="mn_card_foot_right">
        ${e.pin?`<span class="mn_pin"><i class="fas fa-thumbtack"></i></span>`:``}
        <i class="fas fa-chevron-right mn_card_arr"></i>
      </div>
    </div>
  </article>`},T=()=>`<div class="mn_empty"><div class="mn_empty_ico"><i class="fas fa-note-sticky"></i></div><h3>Sin notas aquí</h3><p>${x?`Sin resultados para "<strong>${x}</strong>"`:`Escribe algo y guárdalo`}</p></div>`,E=()=>`
<div class="mn_wrap">
  <div class="mn_header">
    <div class="mn_header_left">
      <h1 class="mn_titulo"><i class="fas fa-note-sticky"></i> Mis Notas</h1>
      <span class="mn_count" id="mn_count">0 notas</span>
    </div>
    <div class="mn_header_right">
      <div class="mn_search_box">
        <i class="fas fa-search mn_search_ico"></i>
        <input type="text" class="mn_search" id="mn_search" placeholder="Buscar…" autocomplete="off" />
        <button class="mn_search_clear dpn" id="mn_search_clear"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="mn_filtros" id="mn_filtros">
        <button class="mn_filtro active" data-tipo="todas" ${i(`Todas`)}><i class="fas fa-layer-group"></i></button>
        ${Object.entries(u).map(([e,t])=>`<button class="mn_filtro" data-tipo="${e}" style="--fc:${t.color}" ${i(t.label)}><i class="fas ${t.icon}"></i></button>`).join(``)}
      </div>
    </div>
  </div>

  <div class="mn_layout">
    <aside class="mn_panel" id="mn_panel">
      <div class="mn_panel_head">
        <h2 class="mn_panel_tit" id="mn_panel_tit">Nueva Nota</h2>
        <button class="mn_panel_new" id="mn_panel_new" ${i(`Nueva nota`)}>Nuevo <i class="fas fa-plus"></i></button>
      </div>
      <div class="mn_form" id="mn_form">
        <div class="mn_tipo_sel" id="mn_tipo_sel">
          ${Object.entries(u).map(([e,t])=>`<button class="mn_tipo_btn ${e===`idea`?`active`:``}" data-tipo="${e}" style="--tc:${t.color}" ${i(t.label)}><i class="fas ${t.icon}"></i> ${t.label}</button>`).join(``)}
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
        ${t.user?``:`
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
  <button class="mn_fab" id="mn_fab" ${i(`Nueva nota`)}><i class="fas fa-plus"></i></button>
</div>`,D=()=>{let t=[...y].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.creado||0)-(e.creado||0));if(b!==`todas`&&(t=t.filter(e=>e.tipo===b)),x){let e=x.toLowerCase();t=t.filter(t=>t.titulo?.toLowerCase().includes(e)||t.contenido?.toLowerCase().includes(e)||t.link?.toLowerCase().includes(e))}e(`#mn_grid`).html(t.length?t.map(w).join(``):T()),S&&e(`[data-id="${S}"]`).addClass(`mn_card_active`),e(`#mn_count`).text(`${y.length} nota${y.length===1?``:`s`}`),r([`.mn_grid > *`],80)},O=t=>{C=t,e(`#mn_inp_cuerpo`).attr(`placeholder`,{idea:`Tu idea brillante aquí…`,nota:`Escribe tu nota…`,tarea:`Describe la tarea…`,link:`Contenido del link…`}[t]||`Escribe…`)},k=()=>{S=null,C=`idea`,e(`#mn_panel_tit`).text(`Nueva Nota`),e(`#mn_save_lbl`).text(`Guardar`),e(`#mn_inp_titulo, #mn_inp_link`).val(``),e(`#mn_inp_cuerpo`).val(``).trigger(`input`),e(`#mn_chk_pin`).prop(`checked`,!1),e(`#mn_tipo_sel .mn_tipo_btn`).removeClass(`active`),e(`#mn_tipo_sel [data-tipo="idea"]`).addClass(`active`),O(`idea`),e(`#mn_grid .mn_card_active`).removeClass(`mn_card_active`),e(`#mn_inp_cuerpo`).focus()},A=t=>{S=t.id,C=t.tipo||`idea`,e(`#mn_panel_tit`).text(`Editando`),e(`#mn_save_lbl`).text(`Actualizar`),e(`#mn_inp_titulo`).val(t.titulo||``),e(`#mn_inp_cuerpo`).val(t.contenido||``).trigger(`input`),e(`#mn_inp_link`).val(t.link||``),e(`#mn_chk_pin`).prop(`checked`,!!t.pin),e(`.mn_tipo_btn`).removeClass(`active`),e(`.mn_tipo_btn[data-tipo="${t.tipo}"]`).addClass(`active`),O(t.tipo),e(`.mn_card`).removeClass(`mn_card_active`),e(`[data-id="${t.id}"]`).addClass(`mn_card_active`)},j=async()=>{let r=C,i=e(`#mn_inp_titulo`).val().trim()||p(r,S?y.filter(e=>e.id!==S):y),a=e(`#mn_inp_cuerpo`).val().trim(),o=String(e(`#mn_inp_link`).val()||``).trim();o&&!/^https?:\/\//i.test(o)&&(o=`https://`+o);let s=!!e(`#mn_chk_pin`).prop(`checked`);if(!a&&!o){n(`Escribe algo antes de guardar`,`warning`),e(`#mn_inp_cuerpo`).focus();return}let u=!!t.user;if(!u&&y.length>=c&&!S){n(`Límite de ${c} notas locales. ¡Crea una cuenta!`,`warning`,5e3);return}let d;if(S){let e=y.findIndex(e=>e.id===S);e>-1&&(y[e]={...y[e],tipo:r,titulo:i,contenido:a,link:o,pin:s,actualizado:Date.now()},d=y[e])}else d={id:l(),tipo:r,titulo:i,contenido:a,link:o,pin:s,creado:Date.now()},y.unshift(d);f(y),u&&d&&g(d),D(),n(S?`Nota actualizada ✓`:`Nota guardada ✓`,`success`),k()},M=e=>{confirm(`¿Eliminar esta nota?`)&&(y=y.filter(t=>t.id!==e),f(y),t.user&&_(e),S===e&&k(),D(),n(`Nota eliminada`,`info`))},N=async()=>{if(y=d(),D(),t.user){let e=await v();if(e?.length){let t=new Set(e.map(e=>e.id)),n=y.filter(e=>!t.has(e.id));n.length&&n.forEach(e=>g(e)),y=[...e,...n],f(y),D()}}e(document).on(`click`,`.mn_card`,function(t){if(!e(t.target).closest(`.mn_act`).length){let t=y.find(t=>t.id===e(this).data(`id`));t&&A(t)}}).on(`click`,`.mn_act_copy`,function(t){t.stopPropagation();let r=y.find(t=>t.id===e(this).data(`id`));r&&navigator.clipboard?.writeText(r.contenido||r.link||``),n(`Copiado ✓`,`success`)}).on(`click`,`.mn_act_del`,function(t){t.stopPropagation(),M(e(this).data(`id`))}).on(`click`,`.mn_tipo_btn`,function(){e(`.mn_tipo_btn`).removeClass(`active`),e(this).addClass(`active`),O(e(this).data(`tipo`))}).on(`click`,`#mn_panel_new, #mn_fab`,k).on(`click`,`#mn_btn_save`,j).on(`keydown`,`#mn_inp_cuerpo, #mn_inp_titulo, #mn_inp_link`,e=>{e.ctrlKey&&e.key===`Enter`&&j()}).on(`input`,`#mn_inp_cuerpo`,function(){let t=e(this).val().length;e(`#mn_char_count`).text(`${t} / 1000`).toggleClass(`mn_char_warn`,t>900)}).on(`click`,`.mn_filtro`,function(){e(`.mn_filtro`).removeClass(`active`),e(this).addClass(`active`),b=e(this).data(`tipo`),D()}),e(`#mn_search`).on(`input`,function(){x=e(this).val().trim(),e(`#mn_search_clear`).toggleClass(`dpn`,!x),D()}),e(`#mn_search_clear`).on(`click`,()=>{e(`#mn_search`).val(``),x=``,e(`#mn_search_clear`).addClass(`dpn`),D()}),t.on(t=>{t?e(`#mn_auth_banner`).stop(!0).fadeOut(150,function(){e(this).remove()}):e(`#mn_auth_banner`).length||(e(`#mn_form`).append(`<div class="mn_auth_banner" id="mn_auth_banner" style="display:none"><i class="fas fa-cloud-arrow-up"></i><p>Crea una cuenta para sincronizar</p><button class="mn_btn_login bt_auth login"><i class="fas fa-user-plus"></i> Crear cuenta</button></div>`),e(`#mn_auth_banner`).fadeIn(250))}),e(`#mn_inp_cuerpo`).focus(),console.log(`📋 ${a} v11 · MisNotas OK`)},P=()=>{e(document).off(`.mn`),console.log(`🧹 MisNotas OK`)};export{P as cleanup,N as init,E as render};