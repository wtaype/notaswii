import{t as e}from"./vendor-BDh6mtVu.js";import{t}from"./wii-LYmyu9Jv.js";import{S as n,T as r,a as i,f as a,i as o}from"./widev-CJ_xp4HE.js";import{n as s}from"./rutas-DwYdJnfY.js";import{A as c,D as l,E as u,S as d,_ as f,m as p,v as m,w as h,x as g}from"./firebase-CCUuWaKQ.js";import{n as _,t as v}from"./firebase-wt8kx56z.js";var y=[],b=null,x=!1,S=null,C=null,w=`wi_mensajes_cache`,T=50,E=()=>a(`wiSmile`)||{},D=e=>{try{localStorage.setItem(w,JSON.stringify(e))}catch{}},O=()=>{try{return JSON.parse(localStorage.getItem(w)||`[]`)}catch{return[]}},k=()=>{let e=document.getElementById(`wmChat`);e&&requestAnimationFrame(()=>e.scrollTop=e.scrollHeight)},A=()=>{let e=E();if(!e.email)return location.replace(`/`),``;let r=e.nombre||e.usuario||e.email||v.currentUser?.email||``;return`
  <div class="wm_container">
    <div class="wm_header">
      <div class="wm_info">
        <img src="/smile.avif" alt="${t}" class="wm_avatar" />
        <div class="wm_text">
          <h1>Mis Mensajes</h1>
          <p>${i()} <strong>${r}</strong></p>
        </div>
      </div>
      <div class="wm_status">
        <span class="wm_dot"></span>
        <span class="wm_dotxt">Conectando...</span>
      </div>
    </div>

    <div class="wm_chat" id="wmChat">${R(O())}</div>

    <div class="wm_input">
      <div class="wm_wrap">
        <textarea id="wmNuevo" placeholder="Escribe un mensaje." rows="1" maxlength="500"></textarea>
        <span class="wm_count" id="wmCount">0/500</span>
      </div>
      <button id="wmEnviar" disabled ${n(`Enviar · Enter`)}><i class="fas fa-paper-plane"></i></button>
    </div>

    <div class="wm_modal" id="wmEliminar">
      <div class="wm_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer</p>
        <div class="wm_modal_acts">
          <button class="wm_cancel" id="wmCancel">Cancelar</button>
          <button class="wm_confirm" id="wmConfirm">Eliminar</button>
        </div>
      </div>
    </div>
  </div>`},j=()=>{V();let t=E();if(!t.email)return s.navigate(`/`);let n=t.email||v.currentUser?.email;e(document).on(`input.wm`,`#wmNuevo`,function(){e(`#wmCount`).text(`${e(this).val().length}/500`),e(`#wmEnviar`).prop(`disabled`,!e(this).val().trim()),e(this).css(`height`,`auto`).css(`height`,Math.min(this.scrollHeight,150)+`px`)}).on(`keydown.wm`,`#wmNuevo`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),N(n))}).on(`click.wm`,`#wmEnviar`,()=>N(n)).on(`click.wm`,`.wm_item`,function(t){if(e(t.target).closest(`.wm_del`).length)return;let n=y.find(t=>t.id===e(this).data(`id`));n&&(r(n.mensaje,this,`¡Copiado! <i class="fas fa-check-circle"></i>`),e(this).addClass(`copied`),setTimeout(()=>e(this).removeClass(`copied`),800))}).on(`click.wm`,`.wm_del`,function(t){t.stopPropagation(),b=e(this).data(`id`),e(`#wmEliminar`).addClass(`show`)}).on(`click.wm`,`#wmCancel, #wmEliminar`,t=>{e(t.target).is(`#wmCancel, #wmEliminar`)&&(e(`#wmEliminar`).removeClass(`show`),b=null)}).on(`click.wm`,`#wmConfirm`,P),M(n,!0),S=setInterval(()=>!document.hidden&&M(n,!0),3e4),C=()=>{!document.hidden&&M(n,!0)},document.addEventListener(`visibilitychange`,C),k()},M=async(t,n=!1)=>{try{y=(await f(g(u(_,`wiMensajes`),h(`email`,`==`,t),m(T)))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(e.fecha?.seconds||0)-(t.fecha?.seconds||0)),D(y),e(`#wmChat`).html(R(y)),F(!0),k()}catch(t){if(console.error(`❌`,t),F(!1),!n){let t=O();t.length?(y=t,e(`#wmChat`).html(R(y)),o(`Caché local 📦`,`warning`,2e3)):e(`#wmChat`).html(z(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet`))}}},N=t=>{if(x)return;let n=e(`#wmNuevo`),r=n.val().trim();if(!r)return;x=!0;let{usuario:i=``,nombre:a=``}=E(),s=`m${Date.now()}`,u={id:s,mensaje:r,email:t,usuario:a||i||t,fecha:{seconds:Date.now()/1e3}};y.push(u),D(y),e(`#wmChat`).html(R(y)),k(),n.val(``).css(`height`,`auto`).trigger(`focus`),e(`#wmCount`).text(`0/500`),e(`#wmEnviar`).prop(`disabled`,!0),d(l(_,`wiMensajes`,s),{id:s,mensaje:r,email:t,usuario:a||i||t,fecha:c()}).then(()=>{F(!0)}).catch(t=>{console.error(`❌`,t),y=y.filter(e=>e.id!==s),D(y),e(`#wmChat`).html(R(y)),o(`Error al guardar`,`error`)}).finally(()=>{x=!1})},P=()=>{if(!b)return;let t=b;b=null,e(`#wmEliminar`).removeClass(`show`);let n=[...y];y=y.filter(e=>e.id!==t),D(y),e(`.wm_item[data-id="${t}"]`).addClass(`deleting`),setTimeout(()=>{e(`#wmChat`).html(R(y))},250),p(l(_,`wiMensajes`,t)).then(()=>o(`Eliminado 🗑️`,`success`,1200)).catch(t=>{console.error(`❌`,t),y=n,D(y),e(`#wmChat`).html(R(y)),o(`Error al eliminar`,`error`)})},F=t=>{e(`.wm_dot`).removeClass(`active error`).addClass(t?`active`:`error`),e(`.wm_dotxt`).text(t?`Online`:`Offline`)},I=e=>{if(!e)return`Hoy`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=new Date,r=new Date(n);return n.setHours(0,0,0,0),r.setDate(r.getDate()-1),r.setHours(0,0,0,0),t>=n?`Hoy`:t>=r?`Ayer`:t.toLocaleDateString(`es`,{day:`numeric`,month:`long`})},L=e=>e?(e.toDate?.()||new Date((e.seconds||0)*1e3)).toLocaleTimeString(`es`,{hour:`2-digit`,minute:`2-digit`}):`Ahora`,R=e=>{if(!e?.length)return z(`fa-comment-dots`,`Sin mensajes aún`,`Escribe tu primer mensaje 👇`);let t=``;return e.map(e=>{let r=I(e.fecha),i=r===t?``:`<div class="wm_sep"><span>${r}</span></div>`;return t=r,`${i}<div class="wm_item" data-id="${e.id}" ${n(`Click para copiar`)}>
      <div class="wm_bubble">
        <p class="wm_txt">${B(e.mensaje).replace(/\n/g,`<br>`)}</p>
        <div class="wm_foot"><span class="wm_time">${L(e.fecha)}</span><i class="fas fa-check-double wm_check"></i></div>
      </div>
      <button class="wm_del" data-id="${e.id}" ${n(`Eliminar`)}><i class="fas fa-trash"></i></button>
    </div>`}).join(``)},z=(e,t,n)=>`<div class="wm_empty"><i class="fas ${e}"></i><p>${t}</p><span>${n}</span></div>`,B=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),V=()=>{clearInterval(S),S=null,C&&=(document.removeEventListener(`visibilitychange`,C),null),e(document).off(`.wm`),[y,b,x]=[[],null,!1]};export{V as cleanup,j as init,A as render};