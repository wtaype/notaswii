import{t as e}from"./vendor-BDh6mtVu.js";import{a as t}from"./widev-CJ_xp4HE.js";import{t as n}from"./preload-helper-DbWsiEEd.js";import{add as r,clear as i,loadHistory as a}from"./memoria-DE6cAb2m.js";import"./wii-C-b5mBZQ.js";import{SUGERENCIAS as o,detectarTema as s,generate as c,getSugerencias as l}from"./orar-CwXoGauZ.js";var u=()=>{let e=o.general,n=t().replace(/, $/,``).toLowerCase();return`
<div class="miia">
  <div class="miia_messages" id="miiaMessages">
    <div class="miia_empty">
      <div class="miia_welcome_icon">
        <img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img">
      </div>
      <h2 class="miia_welcome_title">ChatWil 🙏💚</h2>
      <p class="miia_welcome_text">
        ${n.charAt(0).toUpperCase()+n.slice(1)} herman@, vamos a orar juntos.
      </p>
      <div class="miia_suggestions">
        ${e.map(e=>`
          <div class="suggestion_card" data-prompt="${e.prompt}">
            <i class="fas ${e.ico}"></i><span>${e.txt}</span>
          </div>`).join(``)}
      </div>
    </div>
  </div>
  <div class="miia_input_area">
    <div class="miia_input_wrapper">
      <textarea class="miia_input" id="miiaInput" placeholder="Escribe aquí tu petición..." rows="1"></textarea>
      <button class="miia_send active" id="miiaSend">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <div class="miia_input_info">
      <span><i class="fas fa-hands-praying"></i> Presiona <kbd>Enter</kbd> para enviar · ChatWil v16 · <a href="https://chatwiil.web.app/terminos.html" target="_blank">Términos</a></span>
    </div>
  </div>
</div>`},d=!1,f=0,p=null,m=()=>({$msg:e(`#miiaMessages`),$inp:e(`#miiaInput`),$btn:e(`#miiaSend`)}),h=(t=!1)=>{let n=e(`#miiaMessages`)[0];n&&(t?n.scrollTo({top:n.scrollHeight,behavior:`smooth`}):n.scrollTop=n.scrollHeight)},g=async()=>p??=await n(()=>import(`./brain-DHSxbB1S.js`),[]),_=(t,n)=>{let{$msg:r}=m(),i=new Date().toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}),a=e(`
    <div class="miia_message ${n}" data-time="${i}">
      <div class="message_avatar">${n===`user`?`<i class="fas fa-user-circle"></i>`:`<img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img">`}</div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">${n===`user`?`Tú`:`ChatWil`}</span>
          <span class="message_time">${i}</span>
        </div>
        <div class="message_text"></div>
      </div>
    </div>`);a.find(`.message_text`).text(t),r.append(a),h()},v=t=>{e(`.miia_message.typing`).remove(),t&&(e(`#miiaMessages`).append(`
    <div class="miia_message ai typing">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div>
      </div>
    </div>`),h())},y=(t,n)=>{let{$msg:r}=m(),i=new Date().toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}),a=`tw_${Date.now()}_${++f}`;r.append(`
    <div class="miia_message ai" data-time="${i}">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil Pastor" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">ChatWil</span>
          <span class="message_time">${i}</span>
        </div>
        <div class="message_text" id="${a}"></div>
      </div>
    </div>`),h();let o=e(`#${a}`),s=t,c=0,l=0,u=()=>{c<s.length?(o.text(s.substring(0,c+1)),c++,Date.now()-l>100&&(h(),l=Date.now()),setTimeout(u,15)):(o.removeAttr(`id`),h(!0),n?.())};u()},b=t=>{e(`.miia_contextual_suggestions`).remove();let n=l(t);if(!n?.length)return;let r=`
    <div class="miia_contextual_suggestions">
      <p class="suggestions_title"><i class="fas fa-hands-praying"></i> ¿Quieres continuar orando?</p>
      <div class="suggestions_grid">
        ${n.map(e=>`
          <div class="suggestion_card_small" data-prompt="${e.prompt}">
            <i class="fas ${e.ico}"></i><span>${e.txt}</span>
          </div>`).join(``)}
      </div>
    </div>`;e(`#miiaMessages`).append(r),h(!0)},x=async()=>{let{$inp:t}=m(),n=t.val().trim();if(!(!n||d)){e(`.miia_empty`).fadeOut(200,function(){e(this).remove()}),_(n,`user`),t.val(``).css(`height`,`auto`).trigger(`input`),d=!0,v(!0);try{r(`user`,n),await new Promise(e=>setTimeout(e,800+Math.random()*700));let e=c(n);if(e||=await(await g()).procesar(n),v(!1),!e||typeof e!=`string`)throw Error(`Respuesta inválida`);r(`assistant`,e),y(e,()=>{d=!1,b(s(n))})}catch(e){console.error(`❌ Error:`,e),v(!1),_(`😔 Disculpa, tuve un problema. Por favor, intenta de nuevo. 💚`,`ai`),d=!1}}},S=()=>{let{$inp:n,$btn:r}=m(),i=t().replace(/, $/,``).toLowerCase(),o=`${i.charAt(0).toUpperCase()+i.slice(1)}, me gustaría que oremos por mi salud.`;n.val(o),n.on(`input`,function(){this.style.height=`auto`,this.style.height=Math.min(this.scrollHeight,120)+`px`;let t=e(this).val().trim().length>0;r.prop(`disabled`,!t).toggleClass(`active`,t)}),n.on(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),x())}),r.on(`click`,x),e(document).on(`click`,`.suggestion_card, .suggestion_card_small`,function(){n.val(e(this).data(`prompt`)).css(`height`,`auto`).trigger(`input`).focus(),e(this).hasClass(`suggestion_card_small`)&&setTimeout(x,120)}),a(),console.log(`✅ ChatWil v16 iniciado`)},C=()=>{e(`#miiaInput, #miiaSend`).off(),e(document).off(`click`,`.suggestion_card, .suggestion_card_small`),i()};export{C as cleanup,S as init,u as render};