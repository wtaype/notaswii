const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inicio-CaA29QNn.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BDh6mtVu.js";import{b as t,f as n,h as r,i,n as a,v as o,x as s}from"./widev-B--4oPfx.js";import{a as c,r as l}from"./wii-By3LwGGz.js";import{t as u}from"./preload-helper-DezNxDVI.js";import{A as d,C as f,D as p,E as m,S as h,_ as g,b as _,g as v,v as y,x as b}from"./firebase-CCUuWaKQ.js";import{n as x}from"./firebase-DG8WAU6u.js";import{COL as S,clearBlogCache as C,clearPostCache as w,getPost as T}from"./devblog-BFtwN-S9.js";var E=e=>e.trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/\b(el|la|los|las|de|del|en|un|una|y|a|con|por|para|que|es|se)\b/g,` `).replace(/[^a-z0-9\s]/g,``).replace(/\s+/g,`_`).replace(/_{2,}/g,`_`).replace(/^_|_$/g,``).slice(0,50),D=e=>{let t=e.replace(/<[^>]*>/g,` `).split(/\s+/).filter(Boolean);return{words:t.length,min:Math.max(1,Math.ceil(t.length/200))}},O=()=>o.params()?.edit||new URLSearchParams(location.search).get(`edit`)||null,k=()=>{let e=r.user?.usuario?r.user:n(`wiSmile`)||{};if(!e.email)return`<div class="nu_err dpvc"><i class="fas fa-lock"></i><h2>Acceso restringido</h2><p>Inicia sesión para crear historias</p></div>`;let t=O();return`
  <div class="nu_wrap">
    <div class="nu_head">
      <div class="nu_head_left"><h1><i class="fas fa-${t?`pen`:`pen-fancy`}"></i> ${t?`Editar historia`:`Nueva historia`}</h1><p>${t?`Editando: <strong>${t}</strong> ✏️`:``}</p></div>
      <div class="nu_head_right">
        ${t?`<a href="/${t}" class="nu_btn_outline" ${s(`Ver post`)}><i class="fas fa-eye"></i> Ver</a>`:`<button type="button" id="nu_preview_pg" class="nu_btn_outline" ${s(`Preview`)}><i class="fas fa-eye"></i> Preview</button>`}
        <button type="submit" form="nu_form" id="nu_submit" class="nu_btn_submit"><i class="fas fa-${t?`save`:`paper-plane`}"></i> ${t?`Guardar`:`Publicar`}</button>
      </div>
    </div>
    <form id="nu_form" autocomplete="off"><div class="nu_layout">
      <div class="nu_left">
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-heading"></i> Título</div>
          <input id="nu_titulo" type="text" class="nu_titulo_inp" placeholder="${l}" maxlength="100" required/>
          <div class="nu_slug_box">
            <span class="nu_slug_label"><i class="fas fa-link"></i> ${c}.web.app/</span>
            <input id="nu_slug_inp" type="text" placeholder="mi_historia" maxlength="50" spellcheck="false" ${t?`readonly`:``}/>
            ${t?``:`<button type="button" id="nu_slug_reset" class="nu_slug_btn" ${s(`Regenerar`)}><i class="fas fa-rotate"></i></button>`}
          </div>
          <div id="nu_slug_status" class="nu_slug_status">${t?`<span class="ok"><i class="fas fa-lock"></i> Slug bloqueado (edición)</span>`:``}</div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-align-left"></i> Resumen</div>
          <textarea id="nu_resumen" rows="3" maxlength="160" placeholder="Describe en pocas palabras..."></textarea>
          <div class="nu_counter"><span id="nu_resumen_cnt">0</span>/160</div>
        </div>
        <div class="nu_card nu_card_editor">
          <div class="nu_card_title_row">
            <span><i class="fas fa-code"></i> Contenido HTML</span>
            <div class="nu_editor_tabs">
              <button type="button" class="nu_tab active" data-tab="edit"><i class="fas fa-code"></i> Editor</button>
              <button type="button" class="nu_tab" data-tab="prev"><i class="fas fa-eye"></i> Preview</button>
            </div>
          </div>
          <div class="nu_toolbar">${[[`fa-bold`,`<strong>texto</strong>`],[`fa-italic`,`<em>texto</em>`],[`fa-heading`,`<h2>Título</h2>`],[`fa-quote-left`,`<blockquote>cita</blockquote>`],[`fa-list-ul`,`<ul>
  <li>item</li>
</ul>`],[`fa-image`,`<img src="url" alt="desc"/>`],[`fa-link`,`<a href="url">texto</a>`]].map(([e,t])=>`<button type="button" class="nu_tool" data-tag='${t}' ${s(e)}><i class="fas ${e}"></i></button>`).join(``)}</div>
          <textarea id="nu_contenido" class="nu_code" rows="18" placeholder="<p>Había una vez...</p>"></textarea>
          <div id="nu_prev_html" class="nu_html_prev dpn"></div>
          <div class="nu_content_footer"><span id="nu_palabras" class="nu_hint"><i class="fas fa-font"></i> 0 palabras</span><span id="nu_lectura" class="nu_hint"><i class="fas fa-clock"></i> 1 min</span></div>
        </div>
      </div>
      <div class="nu_right">
        <div class="nu_card nu_card_publish">
          <div class="nu_card_title"><i class="fas fa-rocket"></i> ${t?`Actualizar`:`Publicar`}</div>
          <div class="nu_publish_opts">
            <label class="nu_check_l"><input type="checkbox" id="nu_activo" checked/><span><i class="fas fa-eye"></i> Visible</span></label>
            <label class="nu_check_l"><input type="checkbox" id="nu_destacado"/><span><i class="fas fa-star"></i> Destacado</span></label>
          </div>
          <button type="submit" form="nu_form" class="nu_btn_submit nu_btn_full"><i class="fas fa-${t?`save`:`paper-plane`}"></i> ${t?`Guardar cambios`:`Publicar`}</button>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-folder"></i> Categoría</div>
          <input id="nu_cat_inp" type="text" placeholder="Ej: Esperanza, Salud..." maxlength="30" required/>
          <div id="nu_cat_sug" class="nu_sug_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-tags"></i> Tags</div>
          <input id="nu_tags_inp" type="text" placeholder="Escribe y presiona Enter"/>
          <div id="nu_tag_sug" class="nu_sug_box"></div>
          <div id="nu_tags_box" class="nu_tags_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-image"></i> Imagen</div>
          <input id="nu_img" type="url" placeholder="https://cdn.pixabay.com/..."/>
          <div id="nu_img_prev" class="nu_img_prev dpn"><img id="nu_img_el" src="" alt=""/><button type="button" id="nu_img_clear" class="nu_img_clear" ${s(`Quitar`)}><i class="fas fa-xmark"></i></button></div>
        </div>
        <div class="nu_card nu_card_autor">
          <div class="nu_card_title"><i class="fas fa-user-pen"></i> Autor</div>
          <div class="nu_autor_info"><div class="nu_autor_av"><i class="fas fa-user-circle"></i></div><div><strong>${e?.nombre||e?.usuario||`Anónimo`}</strong><span>${e?.email||``}</span></div></div>
        </div>
      </div>
    </div></form>
  </div>`},A=async()=>{if(!(r.user?.usuario?r.user:n(`wiSmile`)||{}).email)return;let o=O(),s=[],c,l,k,A=!!o,j=()=>E(e(`#nu_titulo`).val()),M=()=>{let{words:t,min:n}=D(e(`#nu_contenido`).val());e(`#nu_palabras`).html(`<i class="fas fa-font"></i> ${t} palabras`),e(`#nu_lectura`).html(`<i class="fas fa-clock"></i> ${n} min`)},N=()=>e(`#nu_tags_box`).html(s.map((e,t)=>`<span class="nu_tag_chip">#${e} <i class="fas fa-xmark nu_tag_rm" data-i="${t}"></i></span>`).join(``));if((async()=>{try{let t=await g(b(m(x,S),_(`creado`,`desc`),y(15))),n=new Set,r=new Set;t.forEach(e=>{let t=e.data();t.categoria&&n.add(t.categoria),t.tags&&Array.isArray(t.tags)&&t.tags.forEach(e=>r.add(e))}),n.size>0&&e(`#nu_cat_sug`).html(Array.from(n).map(e=>`<span class="nu_sug_chip cat_sug">${e}</span>`).join(``)),r.size>0&&e(`#nu_tag_sug`).html(Array.from(r).map(e=>`<span class="nu_sug_chip tag_sug">#${e}</span>`).join(``))}catch{console.warn(`No se pudieron cargar sugerencias`)}})(),A)try{let t=await T(o,!0);if(!t?.data){i(`Post no encontrado`,`error`);return}let n=t.data;e(`#nu_titulo`).val(n.titulo),e(`#nu_slug_inp`).val(n.slug||n.id),e(`#nu_resumen`).val(n.resumen||``).trigger(`input`),e(`#nu_contenido`).val(n.contenido||``),e(`#nu_img`).val(n.imagen||``),e(`#nu_activo`).prop(`checked`,n.activo!==!1),e(`#nu_destacado`).prop(`checked`,!!n.destacado),e(`#nu_cat_inp`).val(n.categoria||``),s=Array.isArray(n.tags)?[...n.tags]:[],N(),n.imagen&&(e(`#nu_img_el`).attr(`src`,n.imagen),e(`#nu_img_prev`).removeClass(`dpn`)),e(`#nu_resumen_cnt`).text((n.resumen||``).length),M()}catch(e){console.error(`edit load:`,e),i(`Error cargando post`,`error`)}A||(e(`#nu_titulo`).on(`input`,function(){clearTimeout(c),c=setTimeout(()=>{e(`#nu_slug_inp`).data(`m`)||e(`#nu_slug_inp`).val(j()).trigger(`input`)},400)}),e(`#nu_slug_inp`).on(`input`,function(){e(this).data(`m`,!0),e(this).val(e(this).val().replace(/[^a-z0-9_]/gi,e=>e===` `?`_`:``).toLowerCase().replace(/_{2,}/g,`_`)),clearTimeout(k);let t=e(this).val(),n=e(`#nu_slug_status`);if(!t)return n.html(``).removeClass(`ok err`);n.html(`<i class="fas fa-spinner fa-spin"></i>`).removeClass(`ok err`),k=setTimeout(async()=>{if(t.length<3)return n.html(`<i class="fas fa-exclamation"></i> Muy corto`).addClass(`err`).removeClass(`ok`);(await v(p(x,`blog`,t)).catch(()=>null))?.exists()?n.html(`<i class="fas fa-xmark"></i> Ya existe`).addClass(`err`).removeClass(`ok`):n.html(`<i class="fas fa-check"></i> OK`).addClass(`ok`).removeClass(`err`)},600)}),e(`#nu_slug_reset`).on(`click`,()=>{e(`#nu_slug_inp`).removeData(`m`).val(j()).trigger(`input`)})),e(`#nu_resumen`).on(`input`,function(){e(`#nu_resumen_cnt`).text(e(this).val().length)}),e(`#nu_img`).on(`input`,function(){clearTimeout(l),l=setTimeout(()=>{let t=e(this).val().trim();if(!t)return e(`#nu_img_prev`).addClass(`dpn`);e(`#nu_img_el`).attr(`src`,t).off(`load error`).on(`load`,()=>e(`#nu_img_prev`).removeClass(`dpn`)).on(`error`,()=>e(`#nu_img_prev`).addClass(`dpn`))},600)}),e(`#nu_img_clear`).on(`click`,()=>{e(`#nu_img`).val(``),e(`#nu_img_prev`).addClass(`dpn`)}),e(`#nu_contenido`).on(`input`,M),e(`#nu_tags_inp`).on(`keydown`,function(t){if(t.key!==`Enter`&&t.key!==`,`)return;t.preventDefault();let n=e(this).val().trim().toLowerCase().replace(/\s+/g,`_`);n&&!s.includes(n)&&s.length<8&&(s.push(n),N()),e(this).val(``)}),e(document).on(`click.nuevo`,`.nu_tool`,function(){let t=e(this).data(`tag`),n=e(`#nu_contenido`),r=n[0],i=r.selectionStart,a=r.selectionEnd,o=r.value.substring(i,a)||`texto`,s=t.replace(`texto`,o).replace(`cita`,o);n.val(r.value.substring(0,i)+s+r.value.substring(a)),r.focus(),r.selectionStart=i,r.selectionEnd=i+s.length,M()}).on(`click.nuevo`,`.nu_tab`,function(){let t=e(this).data(`tab`);e(`.nu_tab`).removeClass(`active`),e(this).addClass(`active`),t===`prev`?(e(`#nu_prev_html`).html(e(`#nu_contenido`).val()).removeClass(`dpn`),e(`#nu_contenido`).addClass(`dpn`)):(e(`#nu_contenido`).removeClass(`dpn`),e(`#nu_prev_html`).addClass(`dpn`))}).on(`click.nuevo`,`.nu_tag_rm`,function(){s.splice(+e(this).data(`i`),1),N()}).on(`click.nuevo`,`.cat_sug`,function(){e(`#nu_cat_inp`).val(e(this).text())}).on(`click.nuevo`,`.tag_sug`,function(){let t=e(this).text().replace(`#`,``);t&&!s.includes(t)&&s.length<8&&(s.push(t),N())}),e(`#nu_form`).on(`submit`,async function(c){c.preventDefault();let l=e(`#nu_submit,.nu_btn_full`),m=r.user?.usuario?r.user:n(`wiSmile`)||{},g=e(`#nu_cat_inp`).val().trim();g&&=g.charAt(0).toUpperCase()+g.slice(1).toLowerCase();let[_,y,b,T,E,O]=[e(`#nu_titulo`).val().trim(),e(`#nu_resumen`).val().trim(),g,e(`#nu_img`).val().trim(),e(`#nu_contenido`).val().trim(),e(`#nu_slug_inp`).val().trim()];if(!_||!y||!b||!T||!E)return i(`Completa todos los campos`,`warning`);if(E.length<50)return i(`Contenido muy corto`,`warning`);if(!O||O.length<3)return i(`Slug inválido`,`warning`);if(!A&&e(`#nu_slug_status`).hasClass(`err`))return i(`Slug no disponible`,`error`);t(l,!0,A?`Guardando...`:`Publicando...`);try{let n=`${D(E).min} min`;if(A)await f(p(x,S,o),{activo:e(`#nu_activo`).is(`:checked`),destacado:e(`#nu_destacado`).is(`:checked`),titulo:_,resumen:y,categoria:b,contenido:E,imagen:T,imagenAlt:_,tags:s,tiempo_lectura:n,actualizado:d()}),w(o),C(),a(`¡Historia actualizada! 🐾✨`,`success`),setTimeout(()=>u(()=>import(`./rutas-Cg-sGy9c.js`).then(e=>e.r).then(e=>e.rutas.navigate(`/${o}`)),__vite__mapDeps([0])),1200);else{if((await v(p(x,`blog`,O))).exists())return t(l,!1),i(`Slug existente`,`warning`);await h(p(x,S,O),{id:O,slug:O,activo:e(`#nu_activo`).is(`:checked`),destacado:e(`#nu_destacado`).is(`:checked`),usuario:m.usuario,email:m.email,autor:m.nombre||m.usuario,titulo:_,resumen:y,categoria:b,contenido:E,imagen:T,imagenAlt:_,tags:s,vistas:0,tiempo_lectura:n,creado:d(),actualizado:d()}),C(),a(`¡Historia publicada! 🐾✨`,`success`),setTimeout(()=>u(()=>import(`./rutas-Cg-sGy9c.js`).then(e=>e.r).then(e=>e.rutas.navigate(`/${O}`)),__vite__mapDeps([0])),1200)}}catch(e){console.error(`nuevo:`,e),i(A?`Error al guardar`:`Error al publicar`,`error`),t(l,!1)}})},j=()=>{e(`#nu_form,#nu_slug_inp,#nu_titulo,#nu_resumen,#nu_img,#nu_contenido`).off(),e(document).off(`.nuevo`)};export{j as cleanup,A as init,k as render};