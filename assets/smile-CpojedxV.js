import{t as e}from"./vendor-BDh6mtVu.js";import{t}from"./wii-BOG14u5H.js";import{a as n,d as r,f as i}from"./widev-DTlDEmBw.js";import{i as a}from"./firebase-CCUuWaKQ.js";import{t as o}from"./firebase-B1jMBrFt.js";var s=()=>new Promise(e=>{if(o.currentUser)return e(o.currentUser);let t=a(o,n=>{t(),e(n)})}),c=e=>{try{return JSON.parse(localStorage.getItem(e))||[]}catch{return[]}},l=[`Confía plenamente, cada paso está guiado.`,`Tu progreso es el testimonio más hermoso.`,`Cada nuevo amanecer es una página en blanco.`,`Transforma obstáculos en oportunidades.`,`Sigue brillando, tus ideas dejarán huella.`],u=()=>`
  <div class="smw_dash">
    
    <!-- ★ HEADER COMPACTO -->
    <header class="smw_dhead">
      <div class="smw_duser">
        <div class="smw_davatar" id="smwAvatar"></div>
        <div class="smw_dinfo">
          <h1 id="smwSaludo">Hola, Usuario</h1>
          <p id="smwEmail">correo@ejemplo.com</p>
        </div>
      </div>
      <div class="smw_dquote" id="smwQuote"></div>
    </header>

    <!-- ★ CONTENIDO PRINCIPAL -->
    <main class="smw_dmain">
      
      <!-- GRID DE ESTADÍSTICAS -->
      <section class="smw_dstats" id="smwStats"></section>

      <!-- ACTIVIDAD RECIENTE (TABLA/LISTA LIMPIA) -->
      <section class="smw_drecent">
        <div class="smw_dtitle">
          <h2><i class="fas fa-history"></i> Actividad Reciente</h2>
          <a href="#" class="smw_dlink">Ver todo</a>
        </div>
        <div class="smw_dlist" id="smwTimeline"></div>
      </section>

    </main>

  </div>
`,d=async()=>{let a=await s();if(!a)return;let o=i(`wiSmile`);if(!o)return;let u=r(o.nombre||o.usuario||``),d=o.email||a.email,f=o.rol||`smile`,p=`${(o.nombre||`?`)[0]}${(o.apellidos||``)[0]||``}`.toUpperCase(),m=l[Math.floor(Math.random()*l.length)];e(`#smwAvatar`).text(p),e(`#smwSaludo`).html(`${n()} <strong>${u}</strong>`),e(`#smwEmail`).html(`<i class="fas fa-shield-halved"></i> Rol: ${f} &nbsp;&nbsp;·&nbsp;&nbsp; <i class="fas fa-envelope"></i> ${d}`),e(`#smwQuote`).html(`<i class="fas fa-quote-left"></i> <span>${m}</span>`);let h={notas:c(`misNotas`),flash:c(`flash`),tareas:c(`tareas`),word:c(`word_docs`),links:c(`links`),tablero:c(`tablero_items`)},g=[{n:`Notas Rápidas`,c:h.notas.length,i:`fa-book-open`,col:`var(--Futuro)`,bg:`var(--bg6)`,url:`/`},{n:`Flash Cards`,c:h.flash.length,i:`fa-bolt`,col:`var(--Oro)`,bg:`var(--bg6)`,url:`/flash`},{n:`Listas Tareas`,c:h.tareas.length,i:`fa-list-check`,col:`var(--Dulce)`,bg:`var(--bg6)`,url:`/tareas`},{n:`Documentos`,c:h.word.length,i:`fa-file-word`,col:`var(--Cielo)`,bg:`var(--bg6)`,url:`/word`},{n:`Enlaces Web`,c:h.links.length,i:`fa-link`,col:`var(--Mora)`,bg:`var(--bg6)`,url:`/links`},{n:`Tableros`,c:h.tablero.length,i:`fa-th-large`,col:`var(--Paz)`,bg:`var(--bg6)`,url:`/tablero`}];e(`#smwStats`).html(g.map((e,t)=>`
    <a href="${e.url}" class="smw_scard nv_item" data-page="${e.url.replace(`/`,``)}" style="animation-delay: ${t*.05}s">
      <div class="smw_scard_ico" style="color: ${e.col}; background: color-mix(in srgb, ${e.col} 15%, transparent);"><i class="fas ${e.i}"></i></div>
      <div class="smw_scard_info">
        <h3>${e.n}</h3>
        <strong>${e.c}</strong>
      </div>
    </a>
  `).join(``));let _=[];h.flash.forEach(e=>_.push({...e,mod:`Flash`,i:`fa-bolt`,col:`var(--Oro)`,url:`/flash`})),h.word.forEach(e=>_.push({...e,mod:`Word`,i:`fa-file-word`,col:`var(--Cielo)`,url:`/word`})),h.tareas.forEach(e=>_.push({...e,mod:`Tareas`,i:`fa-list-check`,col:`var(--Dulce)`,url:`/tareas`})),h.tablero.forEach(e=>_.push({...e,mod:`Tablero`,i:`fa-th-large`,col:`var(--Paz)`,url:`/tablero`})),h.links.forEach(e=>_.push({...e,mod:`Links`,i:`fa-link`,col:`var(--Mora)`,url:`/links`})),h.notas.forEach(e=>_.push({...e,mod:`Notas`,i:`fa-book-open`,col:`var(--Futuro)`,url:`/`})),_.sort((e,t)=>(t.actualizado||t.creado||0)-(e.actualizado||e.creado||0));let v=_.slice(0,8);if(v.length){let t=e=>{let t=Math.floor((Date.now()-e)/6e4);if(t<1)return`Ahora`;if(t<60)return`${t} min`;let n=Math.floor(t/60);return n<24?`${n} h`:`${Math.floor(n/24)} d`},n=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``};e(`#smwTimeline`).html(v.map((e,r)=>{let i=e.titulo||n(e.contenido).substring(0,50)||`Sin título`;return`
      <a href="${e.url}" class="smw_ritem nv_item" data-page="${e.url.replace(`/`,``)}" style="animation-delay: ${r*.05}s">
        <div class="smw_ritem_ico" style="color: ${e.col}; background: color-mix(in srgb, ${e.col} 12%, transparent);"><i class="fas ${e.i}"></i></div>
        <div class="smw_ritem_txt">
          <h4>${i}</h4>
          <span>${e.mod}</span>
        </div>
        <div class="smw_ritem_time">${t(e.actualizado||e.creado)}</div>
      </a>
      `}).join(``))}else e(`#smwTimeline`).html(`
      <div class="smw_rempty">
        <i class="fas fa-inbox"></i>
        <p>No hay actividad reciente</p>
      </div>
    `);console.log(`✅ Smile Home — ${t} (Vercel Style)`)},f=()=>{};export{f as cleanup,d as init,u as render};