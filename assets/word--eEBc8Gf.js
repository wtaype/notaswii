import{t as e}from"./vendor-BDh6mtVu.js";import{S as t,_ as n,a as r,f as i,h as a,i as o,m as s,p as c,u as l,x as u}from"./widev-DRhaZoqv.js";import{t as d}from"./wii-Ce1IXd2j.js";import{t as f}from"./preload-helper-DbWsiEEd.js";var p=`word_docs`,m=()=>`wd`+Date.now(),h=[{id:`ej1`,titulo:`Documento de Ejemplo`,contenido:`<p>Este es un documento de ejemplo. <b>Prueba a editar el texto</b> y usar las herramientas de la barra superior para darle estilo.</p>`,pin:!0,creado:Date.now(),actualizado:Date.now(),synced:!1}],g={get:()=>{let e=localStorage.getItem(p);return e===null&&!a.user?[...h]:i(p)||(e?.startsWith(`[`)?JSON.parse(e):[])},set:e=>c(p,e,8760)},_=()=>`
<div class="wd_wrap">
  <!-- RIBBON -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" ${t(`Archivos`)}><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" ${t(`Fuente`,void 0,`bottom`)}>
          <option value="'Segoe UI', system-ui" selected>Segoe UI</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Outfit', sans-serif">Outfit</option>
          <option value="'Rubik', sans-serif">Rubik</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
        </select>
        <div class="wd_tool_sep"></div>
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" ${t(`Tamaño (Enter para aplicar)`,void 0,`bottom`)} autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" ${t(`Negrita`,void 0,`bottom`)}><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" ${t(`Cursiva`,void 0,`bottom`)}><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" ${t(`Subrayado`,void 0,`bottom`)}><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" ${t(`Tachado`,void 0,`bottom`)}><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" ${t(`Alinear Izquierda`,void 0,`bottom`)}><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" ${t(`Centrar`,void 0,`bottom`)}><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" ${t(`Alinear Derecha`,void 0,`bottom`)}><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" ${t(`Justificar`,void 0,`bottom`)}><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" ${t(`Viñetas`,void 0,`bottom`)}><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" ${t(`Numeración`,void 0,`bottom`)}><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width:60px;" ${t(`Interlineado`,void 0,`bottom`)}>
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div ${t(`Color Texto`,void 0,`bottom`)} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div ${t(`Color Resaltado`,void 0,`bottom`)} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
      </div>

      <!-- Metadata Group (Integrated in Ribbon) -->
      <div class="wd_tool_sep wd_meta_sep_main" style="display:none"></div>
      <div id="wd_meta" class="wd_tool_group wd_meta_group" style="display:none; padding: 0 1.5vh; gap: 2vh; border: none; background: transparent;">
        <span class="wd_meta_item" id="wd_meta_rel" ${t(`Actividad reciente`)}><i class="fas fa-clock"></i> <span>—</span></span>
        <span class="wd_meta_item" id="wd_meta_cre" ${t(`Fecha de creación`)}><i class="fas fa-calendar-plus"></i> <span>—</span></span>
        <span class="wd_meta_item" id="wd_meta_upd" ${t(`Última edición`)}><i class="fas fa-pen-nib"></i> <span>—</span></span>
      </div>
    </div>
  </header>

  <!-- WORKSPACE -->
  <div class="wd_workspace">
    <!-- SIDEBAR -->
    <aside id="wd_sidebar" class="wd_sidebar">
      <div class="wd_sb_actions_panel">
        <input type="text" id="wd_in_tit" class="wd_doc_title_sb" placeholder="Título del documento..." autocomplete="off">
        <div style="display:flex; gap:1vh; margin-top:1.5vh;">
          <button id="wd_btn_save" class="wd_btn_main" style="flex:1; justify-content:center;"><i class="fas fa-save"></i> Guardar</button>
          <button id="wd_btn_del" class="wd_btn_sec wd_btn_del_doc" ${t(`Eliminar`,void 0,`error`)}><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      <div class="wd_sb_head">
        <h3 id="wd_saludo">Archivos</h3>
        <div style="display:flex; gap: 5px;">
          <button id="wd_btn_refresh" class="wd_sb_btn" style="display:none" ${t(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
          <button id="wd_btn_new" class="wd_sb_btn" ${t(`Nuevo Documento`)}><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div id="wd_sb_list" class="wd_sb_list">
        <div class="wd_skeleton"></div><div class="wd_skeleton"></div>
      </div>
    </aside>
    
    <!-- CANVAS -->
    <main class="wd_canvas">
      <div class="wd_page">
        <div id="wd_editor" class="wd_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false"></div>
      </div>
    </main>
  </div>
</div>`,v=async()=>{let{db:e}=await f(async()=>{let{db:e}=await import(`./firebase-CCwEX8XK.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await f(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},y=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`word`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[word] guardarNube:`,e)}},b=async e=>{let t=a.user;if(t?.email)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await v();await i(r(n,`word`,e.id),{id:e.id,usuario:t.usuario||t.email,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),pin:!!e.pin,actualizado:a()},{merge:!0})}catch(e){console.error(`[word] actualizarNube:`,e)}},x=async e=>{if(a.user?.email)try{let{db:t,doc:n,deleteDoc:r}=await v();await r(n(t,`word`,e))}catch{}},S=async()=>{let e=a.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await v();return(await r(i(n(t,`word`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),actualizado:t.actualizado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},C=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``},w=(e,n)=>{let r=C(e.contenido),i=r.length>50?r.substring(0,50)+`...`:r||`Sin contenido...`,a=e.id===n?`active`:``,o=e.titulo||`Documento sin título`;return`
    <div class="wd_doc_item ${a}${e.pin?` wd_pinned`:``}" data-id="${e.id}">
      <div class="wd_doc_head">
        <h4>${o}</h4>
        <div class="wd_doc_acts">
          <button class="wd_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${t(e.pin?`Desanclar`:`Fijar`,void 0,`right`)}><i class="fas fa-thumbtack"></i></button>
          <i class="fas ${e.synced?`fa-cloud wd_cloud_ok`:`fa-cloud-arrow-up wd_cloud_pen`}" ${t(e.synced?`En nube`:`Local`,void 0,`right`)}></i>
        </div>
      </div>
      <p>${i}</p>
    </div>`},T=null,E=null,D=async()=>{let t=g.get(),i=null,c=null;a.user&&e(`#wd_saludo`).text(`${r()}${a.user.nombre||a.user.usuario}`);let f=t=>{if(!a.user||!t){e(`#wd_meta, .wd_meta_sep_main`).hide();return}e(`#wd_meta, .wd_meta_sep_main`).css(`display`,`flex`),e(`#wd_meta_rel span`).text(u(t.actualizado||t.creado)),e(`#wd_meta_cre span`).text(l(t.creado)),e(`#wd_meta_upd span`).text(l(t.actualizado))},h=t=>{clearInterval(E),!(!a.user||!t)&&(E=setInterval(()=>{e(`#wd_meta_rel span`).text(u(t.actualizado||t.creado))},6e4))},_=()=>e(`#wd_sb_list`).html(`<div class="wd_skeleton"></div>`.repeat(3)),v=()=>[...t].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.actualizado||0)-(e.actualizado||0)),D=async()=>{let e=v();await n(`#wd_sb_list`,e.length?e.map(e=>w(e,i?.id)).join(``):`<div class="wd_empty">No tienes documentos. Crea uno nuevo.</div>`,80)},O=t=>{i=t,e(`#wd_in_tit`).val(t.titulo||``),e(`#wd_editor`).html(t.contenido||``),D(),f(t),h(t)},k=()=>{t=t.filter(e=>!e.id.startsWith(`ej`));let n={id:m(),titulo:``,contenido:``,pin:!1,creado:Date.now(),actualizado:Date.now(),synced:!1};t.unshift(n),g.set(t),O(n),setTimeout(()=>{e(`#wd_editor`).focus(),document.execCommand(`fontName`,!1,`'Segoe UI', system-ui`)},50)},A=()=>{if(!i)return;i.titulo=e(`#wd_in_tit`).val().trim(),i.contenido=e(`#wd_editor`).html(),i.actualizado=Date.now(),g.set(t);let n=e(`#wd_sb_list .wd_doc_item[data-id="${i.id}"]`);if(n.length){n.find(`h4`).text(i.titulo||`Documento sin título`);let e=C(i.contenido);n.find(`p`).text(e.length>50?e.substring(0,50)+`...`:e||`Sin contenido...`),n.find(`.fa-cloud.wd_cloud_ok`).removeClass(`fa-cloud wd_cloud_ok`).addClass(`fa-cloud-arrow-up wd_cloud_pen`).attr(`data-witip`,`Local (Cambios sin guardar)`)}},j=()=>{e(`.wd_btn_tool[data-cmd]`).each(function(){try{e(this).toggleClass(`active`,document.queryCommandState(e(this).data(`cmd`)))}catch{}});try{let t=window.getSelection();if(!t.anchorNode)return;let n=t.anchorNode.nodeType===3?t.anchorNode.parentNode:t.anchorNode;if(e(n).closest(`.wd_editor`).length){let t=window.getComputedStyle(n);if(t.fontSize&&e(`#wd_f_sz`).val(parseInt(t.fontSize)),t.fontFamily){let n=t.fontFamily.split(`,`)[0].replace(/['"]/g,``);e(`#wd_f_fam option`).filter(function(){return e(this).text()===n||e(this).val().includes(n)}).prop(`selected`,!0)}let r=e(n).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);r.length&&r[0].style.lineHeight&&e(`#wd_l_ht`).val(r[0].style.lineHeight)}}catch{}};e(document).on(`click`,`#wd_btn_menu`,()=>e(`#wd_sidebar`).toggleClass(`closed`)).on(`click`,`#wd_btn_new`,k).on(`click`,`#wd_btn_refresh`,async function(){let n=e(this).find(`i`);if(n.hasClass(`wd_spin`))return;n.addClass(`wd_spin`);let r=await S();r&&(t=r,g.set(t),t.length?O(v()[0]):k(),o(`Sincronizado ✓`,`success`)),n.removeClass(`wd_spin`)}).on(`click`,`.wd_doc_item`,function(n){if(e(n.target).closest(`.wd_doc_acts`).length)return;let r=t.find(t=>t.id===e(this).data(`id`));r&&r.id!==i?.id&&O(r)}).on(`click`,`.wd_btn_del_doc`,function(){!i||!confirm(`¿Eliminar este documento permanentemente?`)||(t=t.filter(e=>e.id!==i.id),g.set(t),a.user&&i.synced&&x(i.id),o(`Documento eliminado`,`success`),t.length?O(v()[0]):k())}).on(`click`,`#wd_btn_save`,function(){if(!i)return;A();let n=i.titulo||C(i.contenido).trim().length>0;if(a.user&&n){let n=e(this).find(`i`).removeClass(`fa-save`).addClass(`fa-spinner wd_spin`);(i.synced?b(i):y(i)).then(()=>{i.synced=!0,i.actualizado=Date.now(),g.set(t),e(`#wd_sb_list .wd_doc_item[data-id="${i.id}"] .fa-cloud-arrow-up`).removeClass(`fa-cloud-arrow-up wd_cloud_pen`).addClass(`fa-cloud wd_cloud_ok`).attr(`data-witip`,`En nube`),f(i),n.removeClass(`fa-spinner wd_spin`).addClass(`fa-save`),o(`¡Guardado con éxito! ☁️`,`success`)}).catch(()=>{n.removeClass(`fa-spinner wd_spin`).addClass(`fa-save`),o(`Error al guardar en la nube`,`error`)})}else a.user&&!n?o(`Agrega un título o contenido primero`,`warning`):o(`Guardado localmente ✓`,`success`)}).on(`click`,`.wd_act_pin`,function(n){n.stopPropagation();let r=e(this).data(`id`),i=t.find(e=>e.id===r);i&&(i.pin=!i.pin,g.set(t),D(),a.user&&i.synced&&b(i))}).on(`input`,`#wd_editor`,()=>{j(),A()}).on(`input`,`#wd_in_tit`,A).on(`mouseup keyup`,`#wd_editor`,function(){j();let e=window.getSelection();e.rangeCount>0&&(c=e.getRangeAt(0))}).on(`click`,`.wd_btn_tool[data-cmd]`,function(t){t.preventDefault(),document.execCommand(e(this).data(`cmd`),!1,null),j(),e(`#wd_editor`).focus()}).on(`change`,`#wd_f_fam`,function(){if(c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontName`,!1,e(this).val()),e(`#wd_editor`).focus().trigger(`input`)}).on(`keydown`,`#wd_f_sz`,function(t){if(t.key!==`Enter`)return;t.preventDefault();let n=Math.max(8,Math.min(100,parseInt(e(this).val())||16));if(e(this).val(n),c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontSize`,!1,`7`),e(`.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]`).removeAttr(`size`).css(`font-size`,n+`px`),e(`#wd_editor`).focus().trigger(`input`)}).on(`change`,`#wd_l_ht`,function(){if(c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}let t=window.getSelection();if(t.rangeCount){let n=t.getRangeAt(0).commonAncestorContainer,r=n.nodeType===3?n.parentNode:n,i=e(r).hasClass(`wd_editor`)?e(r).children().filter(function(){return t.containsNode(this,!0)}):e(r).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);!i.length&&e(r).hasClass(`wd_editor`)&&(i=e(r)),i.css(`line-height`,e(this).val())}e(`#wd_editor`).focus().trigger(`input`)}).on(`input`,`#wd_c_txt`,function(){document.execCommand(`foreColor`,!1,e(this).val()),e(`#wd_editor`).focus()}).on(`input`,`#wd_c_bg`,function(){document.execCommand(`hiliteColor`,!1,e(this).val()),e(`#wd_editor`).focus()}),s([`.wd_ribbon`,`.wd_sidebar`,`.wd_page`],50),t.length?O(v()[0]):k(),T=a.on(async n=>{e(`#wd_btn_refresh`).toggle(!!n),n?(e(`#wd_saludo`).text(`${r()}${n.nombre||n.usuario}`),t.length===0&&_(),t=await S()||[],g.set(t),t.length?O(v()[0]):k()):(e(`#wd_saludo`).text(`Archivos`),localStorage.removeItem(p),t=g.get(),t.length?O(v()[0]):k())}),console.log(`📝 ${d} v13 · Word OK`)},O=()=>{e(document).off(`click input mouseup keyup change keydown`,`#wd_btn_menu, #wd_btn_new, #wd_btn_refresh, .wd_doc_item, .wd_btn_del_doc, #wd_btn_save, .wd_act_pin, #wd_editor, #wd_in_tit, .wd_btn_tool, #wd_f_fam, #wd_f_sz, #wd_l_ht, #wd_c_txt, #wd_c_bg`),clearInterval(E),T?.()};export{O as cleanup,D as init,_ as render};