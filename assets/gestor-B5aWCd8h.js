const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inicio-CaA29QNn.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,d as n,f as r}from"./widev-DRhaZoqv.js";import{t as i}from"./wii-BL3abZT3.js";import{t as a}from"./preload-helper-DbWsiEEd.js";import{i as o}from"./firebase-CCUuWaKQ.js";import{t as s}from"./firebase-Csc0LBnf.js";var c=()=>new Promise(e=>{if(s.currentUser)return e(s.currentUser);let t=o(s,n=>{t(),e(n)})}),l=e=>{try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:t?.value&&Array.isArray(t.value)?t.value:[]}catch{return[]}},u=[`Liderazgo es inspirar a otros a alcanzar su máximo potencial.`,`La educación es el arma más poderosa para cambiar el mundo.`,`El éxito empresarial se construye con constancia y visión.`,`Gestiona con propósito, lidera con el corazón.`,`La organización es la clave para la productividad empresarial.`],d=()=>`
  <div class="gs_dash">
    
    <!-- ★ HEADER COMPACTO (Estilo Vercel) -->
    <header class="gs_dhead">
      <div class="gs_duser">
        <div class="gs_davatar" id="gsAvatar"></div>
        <div class="gs_dinfo">
          <h1 id="gsSaludo">Hola, Gestor</h1>
          <p id="gsEmail">cargando...</p>
        </div>
      </div>
      <div class="gs_dquote" id="gsQuote"></div>
    </header>

    <!-- ★ CONTENIDO PRINCIPAL -->
    <main class="gs_dmain">
      
      <!-- COLUMNA IZQUIERDA: MÉTRICAS & HERRAMIENTAS -->
      <div class="gs_dleft">
        
        <!-- GRID DE ESTADÍSTICAS (KPIs - Estilo Bento) -->
        <section class="gs_dstats" id="gsStats"></section>

        <!-- HERRAMIENTAS (GRID DE ACCESOS) -->
        <section class="gs_dtools">
          <div class="gs_dtitle">
            <h2><i class="fas fa-grip-horizontal"></i> Herramientas de Gestión</h2>
          </div>
          <div class="gs_tgrid">
            ${[{page:`misnotas`,ico:`fa-book-open`,col:`var(--Futuro)`,tit:`Notas Rápidas`,sub:`Mis anotaciones`},{page:`flash`,ico:`fa-bolt`,col:`var(--Oro)`,tit:`Flash Cards`,sub:`Repaso rápido`},{page:`tareas`,ico:`fa-list-check`,col:`var(--Dulce)`,tit:`Tareas`,sub:`Lista de pendientes`},{page:`word`,ico:`fa-file-word`,col:`var(--Cielo)`,tit:`Documentos`,sub:`Editor pro`},{page:`links`,ico:`fa-link`,col:`var(--Mora)`,tit:`Enlaces Web`,sub:`Marcadores`},{page:`tablero`,ico:`fa-th-large`,col:`var(--Paz)`,tit:`Tableros`,sub:`Kanban & Visual`}].map((e,t)=>`
              <a href="/${e.page}" class="gs_tcard nv_item" data-page="${e.page}" style="animation-delay: ${t*.05}s">
                <div class="gs_tcard_ico" style="color: ${e.col}; background: color-mix(in srgb, ${e.col} 12%, transparent);"><i class="fas ${e.ico}"></i></div>
                <div class="gs_tcard_txt">
                  <h4>${e.tit}</h4>
                  <span>${e.sub}</span>
                </div>
              </a>
            `).join(``)}
          </div>
        </section>

      </div>

      <!-- COLUMNA DERECHA: ACTIVIDAD RECIENTE -->
      <div class="gs_dright">
        <section class="gs_drecent">
          <div class="gs_dtitle">
            <h2><i class="fas fa-history"></i> Actividad Reciente</h2>
            <div class="gs_dcontrols">
               <button class="gs_btn_sync" id="gs_refresh"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <div class="gs_dlist" id="gsFeed">
            <div class="gs_rempty"><i class="fas fa-circle-notch fa-spin"></i><p>Actualizando...</p></div>
          </div>
        </section>
      </div>

    </main>

  </div>
`,f=async()=>{let o=await c();if(!o)return;let s=r(`wiSmile`);if(!s)return;e(document).off(`.gs`);let l=n(s.nombre||s.usuario||`Gestor`),d=s.email||o.email,f=`${(s.nombre||`?`)[0]}${(s.apellidos||``)[0]||``}`.toUpperCase(),p=u[Math.floor(Math.random()*u.length)];e(`#gsAvatar`).text(f),e(`#gsSaludo`).html(`${t()} <strong>${l}</strong>`),e(`#gsEmail`).html(`<i class="fas fa-building"></i> ${s.empresa||`NotasWii`} &nbsp;&nbsp;·&nbsp;&nbsp; <i class="fas fa-envelope"></i> ${d}`),e(`#gsQuote`).html(`<i class="fas fa-quote-left"></i> <span>${p}</span>`),m(),e(document).on(`click.gs`,`#gs_refresh`,async function(){let t=e(this).find(`i`).addClass(`fa-spin`);m(),setTimeout(()=>t.removeClass(`fa-spin`),500)}).on(`click.gs`,`.nv_item`,function(t){t.preventDefault();let n=e(this).data(`page`);a(async()=>{let{rutas:e}=await import(`./rutas-CeYiceAh.js`).then(e=>e.r);return{rutas:e}},__vite__mapDeps([0])).then(({rutas:e})=>e.navigate(`/${n||``}`))}),console.log(`✅ Gestor Home — ${i} (NotasWii Pro)`)},p=()=>{e(document).off(`.gs`)};function m(){let t={notas:l(`misNotas`),flash:l(`flash`),tareas:l(`tareas`),word:l(`word_docs`),links:l(`links`),tablero:l(`tablero_items`)},n=[{n:`Notas Totales`,c:t.notas.length,i:`fa-book-open`,col:`var(--Futuro)`},{n:`Flash Cards`,c:t.flash.length,i:`fa-bolt`,col:`var(--Oro)`},{n:`Tareas Pend.`,c:t.tareas.length,i:`fa-list-check`,col:`var(--Dulce)`},{n:`Documentos`,c:t.word.length,i:`fa-file-word`,col:`var(--Cielo)`}];e(`#gsStats`).html(n.map((e,t)=>`
    <div class="gs_scard" style="animation-delay: ${t*.05}s">
      <div class="gs_scard_ico" style="color: ${e.col}; background: color-mix(in srgb, ${e.col} 15%, transparent);"><i class="fas ${e.i}"></i></div>
      <div class="gs_scard_info">
        <h3>${e.n}</h3>
        <strong>${e.c}</strong>
      </div>
    </div>
  `).join(``));let r=[];t.flash.forEach(e=>r.push({...e,mod:`Flash`,i:`fa-bolt`,col:`var(--Oro)`,url:`flash`})),t.word.forEach(e=>r.push({...e,mod:`Word`,i:`fa-file-word`,col:`var(--Cielo)`,url:`word`})),t.tareas.forEach(e=>r.push({...e,mod:`Tareas`,i:`fa-list-check`,col:`var(--Dulce)`,url:`tareas`})),t.tablero.forEach(e=>r.push({...e,mod:`Tablero`,i:`fa-th-large`,col:`var(--Paz)`,url:`tablero`})),t.links.forEach(e=>r.push({...e,mod:`Links`,i:`fa-link`,col:`var(--Mora)`,url:`links`})),t.notas.forEach(e=>r.push({...e,mod:`Notas`,i:`fa-book-open`,col:`var(--Futuro)`,url:`misnotas`})),r.sort((e,t)=>(t.actualizado||t.creado||0)-(e.actualizado||e.creado||0));let i=r.slice(0,8);if(i.length){let t=e=>{let t=Math.floor((Date.now()-e)/6e4);if(t<1)return`Ahora`;if(t<60)return`${t} min`;let n=Math.floor(t/60);return n<24?`${n} h`:`${Math.floor(n/24)} d`},n=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``};e(`#gsFeed`).html(i.map((e,r)=>{let i=e.titulo||n(e.contenido).substring(0,40)||`Sin título`;return`
        <div class="gs_ritem" style="animation-delay: ${r*.05}s">
          <div class="gs_ritem_ico" style="color: ${e.col}; background: color-mix(in srgb, ${e.col} 12%, transparent);"><i class="fas ${e.i}"></i></div>
          <div class="gs_ritem_txt">
            <h4>${i}</h4>
            <span>${e.mod}</span>
          </div>
          <div class="gs_ritem_time">${t(e.actualizado||e.creado)}</div>
          <a href="/${e.url}" class="gs_fi_btn nv_item" data-page="${e.url}"><i class="fas fa-arrow-right"></i></a>
        </div>
      `}).join(``))}else e(`#gsFeed`).html(`<div class="gs_rempty"><i class="fas fa-inbox"></i><p>Sin actividad reciente</p></div>`)}export{p as cleanup,f as init,d as render};