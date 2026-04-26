import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,h as n,i as r}from"./widev-BLqPD_AU.js";import{t as i}from"./preload-helper-DbWsiEEd.js";var a=`word_docs`,o=()=>{try{return JSON.parse(localStorage.getItem(a)||`[]`)}catch{return[]}},s=e=>localStorage.setItem(a,JSON.stringify(e)),c=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),l=()=>`
<div class="wd_wrap">
  <!-- RIBBON (Solo Herramientas) -->
  <header class="wd_ribbon">
    <div class="wd_tools">
      <button id="wd_btn_menu" class="wd_btn_tool" style="color:var(--mco);" title="Explorador de Documentos"><i class="fas fa-bars"></i></button>
      <div class="wd_tool_sep"></div>
      
      <div class="wd_tool_group">
        <select id="wd_f_fam" class="wd_font_sel" title="Fuente">
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
        <input type="text" id="wd_f_sz" class="wd_font_size" value="16" maxlength="2" title="Tamaño de fuente (Enter para aplicar)" autocomplete="off">
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="bold" title="Negrita"><i class="fas fa-bold"></i></button>
        <button class="wd_btn_tool" data-cmd="italic" title="Cursiva"><i class="fas fa-italic"></i></button>
        <button class="wd_btn_tool" data-cmd="underline" title="Subrayado"><i class="fas fa-underline"></i></button>
        <button class="wd_btn_tool" data-cmd="strikeThrough" title="Tachado"><i class="fas fa-strikethrough"></i></button>
      </div>

      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="justifyLeft" title="Alinear Izquierda"><i class="fas fa-align-left"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyCenter" title="Centrar"><i class="fas fa-align-center"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyRight" title="Alinear Derecha"><i class="fas fa-align-right"></i></button>
        <button class="wd_btn_tool" data-cmd="justifyFull" title="Justificar"><i class="fas fa-align-justify"></i></button>
      </div>
      
      <div class="wd_tool_group">
        <button class="wd_btn_tool" data-cmd="insertUnorderedList" title="Viñetas"><i class="fas fa-list-ul"></i></button>
        <button class="wd_btn_tool" data-cmd="insertOrderedList" title="Lista Numerada"><i class="fas fa-list-ol"></i></button>
        <div class="wd_tool_sep"></div>
        <select id="wd_l_ht" class="wd_font_sel" style="width: 60px;" title="Interlineado">
           <option value="1">1.0</option>
           <option value="1.15">1.15</option>
           <option value="1.5">1.5</option>
           <option value="2">2.0</option>
        </select>
      </div>
      
      <div class="wd_tool_group">
        <div title="Color de Texto" style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-font" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_txt" value="#222222" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
        <div class="wd_tool_sep"></div>
        <div title="Color de Resaltado" style="display:flex; align-items:center; padding: 0 0.5vh; height: 4vh;">
           <i class="fas fa-highlighter" style="color:var(--tx2); margin-right: 0.5vh; font-size:12px;"></i>
           <input type="color" id="wd_c_bg" value="#ffff00" style="width:2.5vh;height:2.5vh;border:none;background:none;cursor:pointer;padding:0;">
        </div>
      </div>
    </div>
  </header>

  <!-- WORKSPACE -->
  <div class="wd_workspace">
    <aside id="wd_sidebar" class="wd_sidebar">
      <div class="wd_sb_actions_panel">
        <input type="text" id="wd_in_tit" class="wd_doc_title_sb" placeholder="Título del documento..." autocomplete="off">
        <div style="display:flex; gap:1vh; margin-top:1.5vh;">
          <button id="wd_btn_save" class="wd_btn_main" style="flex:1; justify-content:center;"><i class="fas fa-save"></i> Guardar</button>
          <button id="wd_btn_del" class="wd_btn_sec" style="color:#FF5C69; border-color:transparent; background:color-mix(in srgb, #FF5C69 10%, transparent); padding: 1.2vh;" title="Eliminar"><i class="fas fa-trash-can"></i></button>
        </div>
      </div>
      
      <div class="wd_sb_head">
        <h3>Tus Archivos</h3>
        <button id="wd_btn_new" class="wd_sb_add" title="Nuevo Documento"><i class="fas fa-plus"></i></button>
      </div>
      <div id="wd_sb_list" class="wd_sb_list"></div>
    </aside>
    
    <main class="wd_canvas">
      <div class="wd_page">
        <div id="wd_editor" class="wd_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false"></div>
      </div>
    </main>
  </div>
</div>
`,u=[],d=null,f=!1,p=null,m=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``},h=e=>{let t=m(e.contenido),n=t.length>50?t.substring(0,50)+`...`:t||`Sin contenido...`,r=d&&d.id===e.id?`active`:``,i=e.titulo||`Documento sin título`;return`
    <div class="wd_doc_item ${r}" data-id="${e.id}">
      <h4>${i}</h4>
      <p>${n}</p>
    </div>
  `},g=()=>{u.length?e(`#wd_sb_list`).html(u.map(h).join(``)):e(`#wd_sb_list`).html(`<div style="padding:2vh; color:var(--tx3); text-align:center;">No tienes documentos.</div>`)},_=t=>{d=t,e(`#wd_in_tit`).val(t.titulo),e(`#wd_editor`).html(t.contenido),g()},v=()=>{let t={id:c(),titulo:``,contenido:``,creado:Date.now()};u.unshift(t),_(t),s(u),b(),setTimeout(()=>{e(`#wd_editor`).focus(),document.execCommand(`fontName`,!1,`'Segoe UI', system-ui`)},50)},y=()=>{d&&(d.titulo=e(`#wd_in_tit`).val().trim(),d.contenido=e(`#wd_editor`).html(),d.actualizado=Date.now(),s(u),b(),g())},b=async()=>{if(!(!t.logged||f)){f=!0;try{let{db:e}=await i(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:n,setDoc:r}=await i(async()=>{let{doc:e,setDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,setDoc:t}},[]);d&&await r(n(e,`usuarios`,t.user.usuario,`word`,d.id),d)}catch(e){console.error(`Error sincronizando word`,e)}finally{f=!1}}},x=()=>{e(`.wd_btn_tool[data-cmd]`).each(function(){let t=e(this).data(`cmd`);try{document.queryCommandState(t)?e(this).addClass(`active`):e(this).removeClass(`active`)}catch{}});try{let t=window.getSelection().anchorNode;if(t){let n=t.nodeType===3?t.parentNode:t;if(e(n).closest(`.wd_editor`).length){let t=window.getComputedStyle(n);if(t.fontSize&&e(`#wd_f_sz`).val(parseInt(t.fontSize)),t.fontFamily){let n=t.fontFamily.split(`,`)[0].replace(/['"]/g,``);e(`#wd_f_fam option`).each(function(){(e(this).text()===n||e(this).val().includes(n))&&e(`#wd_f_fam`).val(e(this).val())})}let r=e(n).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);r.length&&r[0].style.lineHeight&&e(`#wd_l_ht`).val(r[0].style.lineHeight)}}}catch{}},S=()=>{u=o().sort((e,t)=>t.actualizado-e.actualizado),u.length?_(u[0]):v(),n([`.wd_ribbon`,`.wd_sidebar`,`.wd_page`],50),e(document).off(`.wd`),e(document).on(`click.wd`,`#wd_btn_menu`,()=>{e(`#wd_sidebar`).toggleClass(`closed`)}).on(`click.wd`,`.wd_doc_item`,function(){y();let t=e(this).data(`id`),n=u.find(e=>e.id===t);n&&_(n)}).on(`click.wd`,`#wd_btn_new`,()=>{y(),v()}).on(`click.wd`,`#wd_btn_del`,async()=>{if(!d||!confirm(`¿Seguro que deseas eliminar permanentemente este documento?`))return;let e=d.id;if(u=u.filter(t=>t.id!==e),s(u),t.logged)try{let{db:n}=await i(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:r,deleteDoc:a}=await i(async()=>{let{doc:e,deleteDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,deleteDoc:t}},[]);await a(r(n,`usuarios`,t.user.usuario,`word`,e))}catch{}r(`Documento eliminado`,`success`),u.length?_(u[0]):v()}).on(`click.wd`,`#wd_btn_save`,()=>{y(),r(`Documento guardado`,`success`)}).on(`keyup.wd mouseup.wd click.wd`,`.wd_editor`,function(){x();let e=window.getSelection();e.rangeCount>0&&(p=e.getRangeAt(0))}).on(`input.wd`,`#wd_editor`,()=>{x(),d&&(d.contenido=e(`#wd_editor`).html(),s(u))}).on(`input.wd`,`#wd_in_tit`,()=>{d&&(d.titulo=e(`#wd_in_tit`).val().trim(),s(u),g())}).on(`mouseup.wd keyup.wd`,`#wd_editor`,x).on(`click.wd`,`.wd_btn_tool`,function(t){t.preventDefault();let n=e(this).data(`cmd`);document.execCommand(n,!1,null),x(),e(`#wd_editor`).focus()}).on(`change.wd`,`#wd_f_fam`,function(){if(p){let e=window.getSelection();e.removeAllRanges(),e.addRange(p)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontName`,!1,e(this).val()),e(`#wd_editor`).focus().trigger(`input.wd`)}).on(`keydown.wd`,`#wd_f_sz`,function(t){if(t.key===`Enter`){t.preventDefault();let n=Math.max(8,Math.min(100,parseInt(e(this).val())||16));if(e(this).val(n),p){let e=window.getSelection();e.removeAllRanges(),e.addRange(p)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontSize`,!1,`7`),e(`.wd_editor font[size="7"], .wd_editor span[style*="xxx-large"]`).removeAttr(`size`).css(`font-size`,n+`px`),e(`#wd_editor`).focus().trigger(`input.wd`)}}).on(`change.wd`,`#wd_l_ht`,function(){if(p){let e=window.getSelection();e.removeAllRanges(),e.addRange(p)}let t=window.getSelection();if(t.rangeCount){let n=t.getRangeAt(0).commonAncestorContainer,r=n.nodeType===3?n.parentNode:n,i=e(r).hasClass(`wd_editor`)?e(r).children().filter(function(){return t.containsNode(this,!0)}):e(r).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);!i.length&&e(r).hasClass(`wd_editor`)&&(i=e(r)),i.css(`line-height`,e(this).val())}e(`#wd_editor`).focus().trigger(`input.wd`)}).on(`input.wd`,`#wd_c_txt`,function(){document.execCommand(`foreColor`,!1,e(this).val()),e(`#wd_editor`).focus()}).on(`input.wd`,`#wd_c_bg`,function(){document.execCommand(`hiliteColor`,!1,e(this).val()),e(`#wd_editor`).focus()})},C=()=>{y(),e(document).off(`.wd`)};export{C as cleanup,S as init,l as render};