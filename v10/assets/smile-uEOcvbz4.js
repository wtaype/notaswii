import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,c as n,f as r,p as i}from"./widev-BY9EW4md.js";import{t as a}from"./wii-IZM0MjcA.js";import{i as o}from"./firebase-CCUuWaKQ.js";import{t as s}from"./firebase-BNeWaP4M.js";var c=()=>new Promise(e=>{if(s.currentUser)return e(s.currentUser);let t=o(s,n=>{t(),e(n)})}),l=e=>{try{return JSON.parse(localStorage.getItem(e))||[]}catch{return[]}},u=[{ico:`fa-dove`,txt:`Confía plenamente, cada paso está guiado hacia un propósito mayor.`},{ico:`fa-heart`,txt:`La perseverancia no hace las cosas fáciles, pero sí las hace posibles.`},{ico:`fa-seedling`,txt:`Tu progreso es el testimonio más hermoso de tu esfuerzo diario.`},{ico:`fa-hands-praying`,txt:`Agradece el hoy, es el cimiento de los logros del mañana.`},{ico:`fa-star`,txt:`Sigue brillando, tus ideas están destinadas a dejar huella.`},{ico:`fa-sun`,txt:`Cada nuevo amanecer es una página en blanco para reescribir tu historia.`},{ico:`fa-bolt`,txt:`Tienes el talento necesario para transformar cualquier obstáculo en una oportunidad.`}],d=()=>`
  <div class="smw_page">
    
    <!-- ★ HERO ULTRA PRO -->
    <section class="smw_hero">
      <div class="smw_hero_text">
        <div class="smw_saludo_badge">
          <i class="fas fa-sparkles"></i>
          <span>${t()}</span>
        </div>
        <h1>Bienvenido de vuelta,<br><span class="gradient" id="smwNombre">Usuario</span></h1>
        <p>Este es tu centro de operaciones personal. Todas tus ideas, documentos, tareas y enlaces están centralizados aquí, listos para tu próxima gran creación.</p>
        <div class="smw_hero_badges" id="smwBadges"></div>
      </div>
      <div class="smw_hero_visual">
        <div class="smw_avatar_ring"></div>
        <div class="smw_avatar" id="smwAvatar"></div>
      </div>
    </section>

    <div class="smw_wrapper">
      
      <!-- ★ ESTADÍSTICAS (MÓDULOS) -->
      <section>
        <h2 class="smw_section_title"><i class="fas fa-layer-group"></i> Tu Ecosistema Creativo</h2>
        <div class="smw_stats_grid" id="smwStats"></div>
      </section>

      <!-- ★ 2 COLUMNAS (TIMELINE Y WIDGET) -->
      <section class="smw_bento_grid">
        
        <!-- Actividad Reciente -->
        <div>
          <h2 class="smw_section_title"><i class="fas fa-clock-rotate-left"></i> Actividad Reciente</h2>
          <div class="smw_timeline" id="smwTimeline"></div>
        </div>

        <!-- Widget Pro -->
        <div>
          <h2 class="smw_section_title"><i class="fas fa-fire"></i> Inspiración</h2>
          <div class="smw_widget_card" id="smwWidget"></div>
        </div>

      </section>
    </div>

  </div>
`,f=async()=>{let t=await c();if(!t)return;let o=i(`wiSmile`);if(!o)return;let s=r(o.nombre||o.usuario||``),d=o.email||t.email,f=o.rol||`smile`,p=n(o.creado?.seconds?new Date(o.creado.seconds*1e3):o.creado),m=`${(o.nombre||`?`)[0]}${(o.apellidos||``)[0]||``}`.toUpperCase(),h=u[Math.floor(Math.random()*u.length)];e(`#smwNombre`).text(s),e(`#smwAvatar`).text(m),e(`#smwBadges`).html(`
    <div class="smw_badge_pro"><i class="fas fa-id-badge" style="color:var(--mco);"></i> <span>${f.toUpperCase()}</span></div>
    <div class="smw_badge_pro"><i class="fas fa-envelope" style="color:#2B579A;"></i> <span>${d}</span></div>
    <div class="smw_badge_pro"><i class="fas fa-calendar-check" style="color:#0F9D58;"></i> <span>${p<=0?`Miembro Nuevo`:`+${p} meses`}</span></div>
  `);let g={notas:l(`misNotas`),flash:l(`flash`),tareas:l(`tareas`),word:l(`word_docs`),links:l(`links`),tablero:l(`tablero_items`)},_=[{n:`Notas Flash`,c:g.flash.length,i:`fa-bolt`,col:`#FF9800`,url:`/flash`},{n:`Documentos`,c:g.word.length,i:`fa-file-word`,col:`#2B579A`,url:`/word`},{n:`Listas Tareas`,c:g.tareas.length,i:`fa-list-check`,col:`#FF5C69`,url:`/tareas`},{n:`Tablero Visual`,c:g.tablero.length,i:`fa-th-large`,col:`#FFB800`,url:`/tablero`},{n:`Enlaces Web`,c:g.links.length,i:`fa-link`,col:`#7c3aed`,url:`/links`},{n:`Borradores`,c:g.notas.length,i:`fa-book-open`,col:`#0F9D58`,url:`/`}];e(`#smwStats`).html(_.map((e,t)=>`
    <a href="${e.url}" class="smw_stat_card nv_item" data-page="${e.url.replace(`/`,``)}" style="--c: ${e.col}; animation-delay: ${t*.08}s">
      <div class="smw_stat_info">
        <h3>${e.c}</h3>
        <span>${e.n}</span>
      </div>
      <div class="smw_stat_icon"><i class="fas ${e.i}"></i></div>
    </a>
  `).join(``));let v=[];g.flash.forEach(e=>v.push({...e,mod:`Flash`,i:`fa-bolt`,col:`#FF9800`,url:`/flash`})),g.word.forEach(e=>v.push({...e,mod:`Word`,i:`fa-file-word`,col:`#2B579A`,url:`/word`})),g.tareas.forEach(e=>v.push({...e,mod:`Tareas`,i:`fa-list-check`,col:`#FF5C69`,url:`/tareas`})),g.tablero.forEach(e=>v.push({...e,mod:`Tablero`,i:`fa-th-large`,col:`#FFB800`,url:`/tablero`})),g.links.forEach(e=>v.push({...e,mod:`Links`,i:`fa-link`,col:`#7c3aed`,url:`/links`})),g.notas.forEach(e=>v.push({...e,mod:`Notas`,i:`fa-book-open`,col:`#0F9D58`,url:`/`})),v.sort((e,t)=>(t.actualizado||t.creado||0)-(e.actualizado||e.creado||0));let y=v.slice(0,6);if(y.length){let t=e=>{let t=Math.floor((Date.now()-e)/6e4);if(t<1)return`Justo ahora`;if(t<60)return`Hace ${t} min`;let n=Math.floor(t/60);if(n<24)return`Hace ${n} h`;let r=Math.floor(n/24);return`Hace ${r} día${r>1?`s`:``}`},n=e=>{let t=document.createElement(`div`);return t.innerHTML=e||``,t.textContent||t.innerText||``};e(`#smwTimeline`).html(y.map(e=>{let r=e.titulo||n(e.contenido).substring(0,40)||`Sin título`;return`
      <a href="${e.url}" class="smw_tl_item nv_item" style="--c: ${e.col};" data-page="${e.url.replace(`/`,``)}">
        <div class="smw_tl_icon"><i class="fas ${e.i}"></i></div>
        <div class="smw_tl_data">
          <h4>${r}</h4>
          <p>Módulo <strong>${e.mod}</strong> · ${t(e.actualizado||e.creado)}</p>
        </div>
      </a>
      `}).join(``))}else e(`#smwTimeline`).html(`
      <div class="smw_empty">
        <i class="fas fa-ghost"></i>
        <p>Aún no has creado nada.</p>
        <span style="font-size:var(--fz_s3);">¡Anímate a usar alguno de los módulos!</span>
      </div>
    `);e(`#smwWidget`).html(`
    <div class="smw_widget_icon"><i class="fas ${h.ico}"></i></div>
    <h3>Reflexión Diaria</h3>
    <p>"${h.txt}"</p>
  `),console.log(`✅ Smile Home — ${a} (Premium Pro Dashboard)`)},p=()=>{};export{p as cleanup,f as init,d as render};