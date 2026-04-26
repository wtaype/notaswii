import{t as e}from"./vendor-BDh6mtVu.js";import{_ as t,a as n,f as r,h as i,i as a,m as o,p as s,x as c}from"./widev-H4r-I7mR.js";import{t as l}from"./wii-DG5HC90G.js";import{t as u}from"./preload-helper-DbWsiEEd.js";var d=`word_docs`,f=()=>`wd`+Date.now(),p={get:()=>{try{return JSON.parse(localStorage.getItem(d)||`[]`)}catch{return[]}},set:e=>localStorage.setItem(d,JSON.stringify(e))},m=()=>!!r(`wd_sync`),h=()=>s(`wd_sync`,1,168),g=()=>`
<div class="wd_wrap">
  <!-- RIBBON -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" ${c(`Archivos`)}><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" ${c(`Fuente`,void 0,`bottom`)}>
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
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" ${c(`Tamaño (Enter para aplicar)`,void 0,`bottom`)} autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" ${c(`Negrita`,void 0,`bottom`)}><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" ${c(`Cursiva`,void 0,`bottom`)}><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" ${c(`Subrayado`,void 0,`bottom`)}><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" ${c(`Tachado`,void 0,`bottom`)}><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" ${c(`Alinear Izquierda`,void 0,`bottom`)}><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" ${c(`Centrar`,void 0,`bottom`)}><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" ${c(`Alinear Derecha`,void 0,`bottom`)}><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" ${c(`Justificar`,void 0,`bottom`)}><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" ${c(`Viñetas`,void 0,`bottom`)}><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" ${c(`Numeración`,void 0,`bottom`)}><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width:60px;" ${c(`Interlineado`,void 0,`bottom`)}>
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div ${c(`Color Texto`,void 0,`bottom`)} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div ${c(`Color Resaltado`,void 0,`bottom`)} style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
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
          <button id="wd_btn_del" class="wd_btn_sec wd_btn_del_doc" ${c(`Eliminar`,void 0,`error`)}><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      <div class="wd_sb_head">
        <h3 id="wd_saludo">Archivos</h3>
        <div style="display:flex; gap: 5px;">
          <button id="wd_btn_refresh" class="wd_sb_btn" ${c(`Actualizar`)}><i class="fas fa-rotate-right"></i></button>
          <button id="wd_btn_new" class="wd_sb_btn" ${c(`Nuevo Documento`)}><i class="fas fa-plus"></i></button>
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
</div>`,_=async()=>{let{db:e}=await u(async()=>{let{db:e}=await import(`./firebase-BnvZAN8B.js`).then(e=>e.r);return{db:e}},[]);return{db:e,...await u(()=>import(`./firebase-CCUuWaKQ.js`).then(e=>e.f),[])}},v=async e=>{let t=i.user;if(t?.usuario)try{let{db:n,doc:r,setDoc:i,serverTimestamp:a}=await _();await i(r(n,`word`,e.id),{id:e.id,usuario:t.usuario,email:t.email,titulo:String(e.titulo||``),contenido:String(e.contenido||``),pin:!!e.pin,creado:a(),actualizado:a()})}catch(e){console.error(`[word] guardarNube:`,e)}},y=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,updateDoc:r,serverTimestamp:i}=await _();await r(n(t,`word`,e.id),{titulo:String(e.titulo||``),contenido:String(e.contenido||``),pin:!!e.pin,actualizado:i()})}catch(e){console.error(`[word] actualizarNube:`,e)}},b=async e=>{if(i.user?.usuario)try{let{db:t,doc:n,deleteDoc:r}=await _();await r(n(t,`word`,e))}catch{}},x=async()=>{let e=i.user;if(!e?.email)return null;try{let{db:t,collection:n,getDocs:r,query:i,where:a}=await _();return(await r(i(n(t,`word`),a(`email`,`==`,e.email)))).docs.map(e=>{let t=e.data();return{id:e.id,titulo:t.titulo||``,contenido:t.contenido||``,pin:!!t.pin,creado:t.creado?.toMillis?.()||Date.now(),actualizado:t.actualizado?.toMillis?.()||Date.now(),synced:!0}})}catch{return null}},S=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``},C=(e,t)=>{let n=S(e.contenido),r=n.length>50?n.substring(0,50)+`...`:n||`Sin contenido...`,i=e.id===t?`active`:``,a=e.titulo||`Documento sin título`;return`
    <div class="wd_doc_item ${i}${e.pin?` wd_pinned`:``}" data-id="${e.id}">
      <div class="wd_doc_head">
        <h4>${a}</h4>
        <div class="wd_doc_acts">
          <button class="wd_act_pin${e.pin?` active`:``}" data-id="${e.id}" ${c(e.pin?`Desanclar`:`Fijar`,void 0,`right`)}><i class="fas fa-thumbtack"></i></button>
          <i class="fas ${e.synced?`fa-cloud wd_cloud_ok`:`fa-cloud-arrow-up wd_cloud_pen`}" ${c(e.synced?`En nube`:`Local`,void 0,`right`)}></i>
        </div>
      </div>
      <p>${r}</p>
    </div>`},w=async()=>{let r=p.get(),s=null,c=null;i.logged&&e(`#wd_saludo`).text(`${n()}${i.user.nombre||i.user.usuario}`);let u=()=>e(`#wd_sb_list`).html(`<div class="wd_skeleton"></div>`.repeat(3)),d=()=>[...r].sort((e,t)=>e.pin&&!t.pin?-1:!e.pin&&t.pin?1:(t.actualizado||0)-(e.actualizado||0)),g=async()=>{let e=d();await t(`#wd_sb_list`,e.length?e.map(e=>C(e,s?.id)).join(``):`<div class="wd_empty">No tienes documentos. Crea uno nuevo.</div>`,80)},_=t=>{s=t,e(`#wd_in_tit`).val(t.titulo||``),e(`#wd_editor`).html(t.contenido||``),g()},w=()=>{let t={id:f(),titulo:``,contenido:``,pin:!1,creado:Date.now(),actualizado:Date.now(),synced:!1};r.unshift(t),p.set(r),_(t),setTimeout(()=>{e(`#wd_editor`).focus(),document.execCommand(`fontName`,!1,`'Segoe UI', system-ui`)},50)},T=async(t=!1)=>{if(!i.logged)return;t&&u();let n=e(`#wd_btn_refresh i`).addClass(`wd_spin`);try{let e=await x();if(e?.length){let t=new Set(e.map(e=>e.id)),n=r.filter(e=>!t.has(e.id));n.forEach(e=>{(e.contenido||e.titulo)&&v(e)}),r=[...e,...n],p.set(r),h()}}finally{n.removeClass(`wd_spin`),r.length&&!s?_(d()[0]):r.length?g():w()}},E=()=>{if(!s)return;s.titulo=e(`#wd_in_tit`).val().trim(),s.contenido=e(`#wd_editor`).html(),s.actualizado=Date.now(),p.set(r);let t=e(`#wd_sb_list .wd_doc_item[data-id="${s.id}"]`);if(t.length){t.find(`h4`).text(s.titulo||`Documento sin título`);let e=S(s.contenido);t.find(`p`).text(e.length>50?e.substring(0,50)+`...`:e||`Sin contenido...`),t.find(`.fa-cloud.wd_cloud_ok`).removeClass(`fa-cloud wd_cloud_ok`).addClass(`fa-cloud-arrow-up wd_cloud_pen`).attr(`data-witip`,`Local (Cambios sin guardar)`)}},D=()=>{e(`.wd_btn_tool[data-cmd]`).each(function(){try{e(this).toggleClass(`active`,document.queryCommandState(e(this).data(`cmd`)))}catch{}});try{let t=window.getSelection();if(!t.anchorNode)return;let n=t.anchorNode.nodeType===3?t.anchorNode.parentNode:t.anchorNode;if(e(n).closest(`.wd_editor`).length){let t=window.getComputedStyle(n);if(t.fontSize&&e(`#wd_f_sz`).val(parseInt(t.fontSize)),t.fontFamily){let n=t.fontFamily.split(`,`)[0].replace(/['"]/g,``);e(`#wd_f_fam option`).filter(function(){return e(this).text()===n||e(this).val().includes(n)}).prop(`selected`,!0)}let r=e(n).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);r.length&&r[0].style.lineHeight&&e(`#wd_l_ht`).val(r[0].style.lineHeight)}}catch{}};e(document).on(`click`,`#wd_btn_menu`,()=>e(`#wd_sidebar`).toggleClass(`closed`)).on(`click`,`#wd_btn_new`,w).on(`click`,`#wd_btn_refresh`,()=>T(!0)).on(`click`,`.wd_doc_item`,function(t){if(e(t.target).closest(`.wd_doc_acts`).length)return;let n=r.find(t=>t.id===e(this).data(`id`));n&&n.id!==s?.id&&_(n)}).on(`click`,`.wd_btn_del_doc`,function(){!s||!confirm(`¿Eliminar este documento permanentemente?`)||(r=r.filter(e=>e.id!==s.id),p.set(r),i.logged&&s.synced&&b(s.id),a(`Documento eliminado`,`success`),r.length?_(d()[0]):w())}).on(`click`,`#wd_btn_save`,function(){if(!s)return;E();let t=s.titulo||S(s.contenido).trim().length>0;if(i.logged&&t){let t=e(this).find(`i`).removeClass(`fa-save`).addClass(`fa-spinner wd_spin`);(s.synced?y(s):v(s)).then(()=>{s.synced=!0,p.set(r),e(`#wd_sb_list .wd_doc_item[data-id="${s.id}"] .fa-cloud-arrow-up`).removeClass(`fa-cloud-arrow-up wd_cloud_pen`).addClass(`fa-cloud wd_cloud_ok`).attr(`data-witip`,`En nube`),t.removeClass(`fa-spinner wd_spin`).addClass(`fa-save`),a(`Guardado en la nube`,`success`)})}else a(`Guardado localmente`,`success`)}).on(`click`,`.wd_act_pin`,function(t){t.stopPropagation();let n=e(this).data(`id`),a=r.find(e=>e.id===n);a&&(a.pin=!a.pin,p.set(r),g(),i.logged&&a.synced&&y(a))}).on(`input`,`#wd_editor`,()=>{D(),E()}).on(`input`,`#wd_in_tit`,E).on(`mouseup keyup`,`#wd_editor`,function(){D();let e=window.getSelection();e.rangeCount>0&&(c=e.getRangeAt(0))}).on(`click`,`.wd_btn_tool[data-cmd]`,function(t){t.preventDefault(),document.execCommand(e(this).data(`cmd`),!1,null),D(),e(`#wd_editor`).focus()}).on(`change`,`#wd_f_fam`,function(){if(c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontName`,!1,e(this).val()),e(`#wd_editor`).focus().trigger(`input`)}).on(`keydown`,`#wd_f_sz`,function(t){if(t.key!==`Enter`)return;t.preventDefault();let n=Math.max(8,Math.min(100,parseInt(e(this).val())||16));if(e(this).val(n),c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontSize`,!1,`7`),e(`.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]`).removeAttr(`size`).css(`font-size`,n+`px`),e(`#wd_editor`).focus().trigger(`input`)}).on(`change`,`#wd_l_ht`,function(){if(c){let e=window.getSelection();e.removeAllRanges(),e.addRange(c)}let t=window.getSelection();if(t.rangeCount){let n=t.getRangeAt(0).commonAncestorContainer,r=n.nodeType===3?n.parentNode:n,i=e(r).hasClass(`wd_editor`)?e(r).children().filter(function(){return t.containsNode(this,!0)}):e(r).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);!i.length&&e(r).hasClass(`wd_editor`)&&(i=e(r)),i.css(`line-height`,e(this).val())}e(`#wd_editor`).focus().trigger(`input`)}).on(`input`,`#wd_c_txt`,function(){document.execCommand(`foreColor`,!1,e(this).val()),e(`#wd_editor`).focus()}).on(`input`,`#wd_c_bg`,function(){document.execCommand(`hiliteColor`,!1,e(this).val()),e(`#wd_editor`).focus()}),o([`.wd_ribbon`,`.wd_sidebar`,`.wd_page`],50),r.length?(_(d()[0]),i.logged&&!m()&&T(!1)):i.logged?await T(!0):w(),console.log(`📝 ${l} v11 · Word OK`)},T=()=>{e(document).off(`click input mouseup keyup change keydown`,`#wd_btn_menu, #wd_btn_new, #wd_btn_refresh, .wd_doc_item, .wd_btn_del_doc, #wd_btn_save, .wd_act_pin, #wd_editor, #wd_in_tit, .wd_btn_tool, #wd_f_fam, #wd_f_sz, #wd_l_ht, #wd_c_txt, #wd_c_bg`)};export{T as cleanup,w as init,g as render};