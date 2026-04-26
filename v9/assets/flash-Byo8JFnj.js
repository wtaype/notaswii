import{t as e}from"./vendor-BDh6mtVu.js";import{g as t,h as n,i as r}from"./widev-vc3w_AsM.js";import{t as i}from"./preload-helper-TQeha_t2.js";var a=`flash`,o=()=>{try{return JSON.parse(localStorage.getItem(a)||`[]`)}catch{return[]}},s=e=>localStorage.setItem(a,JSON.stringify(e)),c=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),l=e=>{let t=Math.floor((Date.now()-e)/1e3);if(t<60)return`Justo ahora`;let n=Math.floor(t/60);if(n<60)return`Hace ${n} min`;let r=Math.floor(n/60);return r<24?`Hace ${r}h`:new Date(e).toLocaleDateString()},u=e=>`
  <div class="fl_card" data-id="${e.id}">
    <div class="fl_card_time"><i class="fas fa-bolt"></i> ${l(e.creado)}</div>
    <div class="fl_card_body">${e.contenido?.replace(/\n/g,`<br>`)||``}</div>
  </div>
`,d=()=>`
<div class="fl_wrap">
  <div class="fl_hero">
    <h1 class="fl_title">Captura al instante</h1>
    <p class="fl_sub">Sin distracciones. Escribe y presiona Enter.</p>
    
    <div class="fl_input_box">
      <textarea id="fl_input" class="fl_textarea" placeholder="Escribe una idea brillante..." rows="1"></textarea>
      <button class="fl_btn_send" id="fl_btn_send" title="Guardar (Enter)"><i class="fas fa-paper-plane"></i></button>
    </div>
    <div class="fl_hint">Presiona <strong>Enter</strong> para guardar • <strong>Shift + Enter</strong> para nueva línea</div>
  </div>

  <div class="fl_timeline">
    <div class="fl_timeline_tit"><i class="fas fa-clock-rotate-left"></i> Tus últimos flashes</div>
    <div id="fl_grid" class="fl_grid"></div>
  </div>
</div>
`,f=()=>{let a=e(`#fl_input`);a.on(`input`,function(){this.style.height=`auto`,this.style.height=this.scrollHeight+`px`,this.value.trim().length>0?e(`.fl_input_box`).addClass(`active`):e(`.fl_input_box`).removeClass(`active`)});let l=()=>{let t=o().sort((e,t)=>t.creado-e.creado).slice(0,50);e(`#fl_grid`).html(t.length?t.map(u).join(``):`<div class="fl_empty">Aún no tienes destellos de genialidad hoy...</div>`),t.length&&n([`.fl_grid > *`],50)},d=async()=>{let n=a.val().trim();if(!n)return;let u=o(),d={id:c(),tipo:`flash`,contenido:n,creado:Date.now(),actualizado:Date.now()};if(u.unshift(d),s(u),a.val(``).css(`height`,`auto`),e(`.fl_input_box`).removeClass(`active`),r(`¡Flash capturado! ⚡`,`success`),l(),t.logged)try{let{db:e}=await i(async()=>{let{db:e}=await import(`./firebase-CSWtr52h.js`).then(e=>e.r);return{db:e}},[]),{doc:n,setDoc:r}=await i(async()=>{let{doc:e,setDoc:t}=await import(`./firebase-BVO2Ew-x.js`).then(e=>e.f);return{doc:e,setDoc:t}},[]);await r(n(e,`usuarios`,t.user.usuario,`flash`,d.id),d)}catch(e){console.error(`Error guardando flash en nube`,e)}};e(`#fl_btn_send`).on(`click`,d),a.on(`keydown`,function(e){e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),d())}),n([`.fl_hero > *`,`.fl_timeline_tit`],60),l(),setTimeout(()=>a.focus(),300),console.log(`⚡ Modo Flash Activado`)},p=()=>{e(`#fl_input`).off(`input keydown`),e(`#fl_btn_send`).off(`click`)};export{p as cleanup,f as init,d as render};