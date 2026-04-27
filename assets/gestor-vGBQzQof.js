const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inicio-CaA29QNn.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BDh6mtVu.js";import{a as t,f as n,l as r,p as i,r as a,s as o,t as s,u as c}from"./widev-DghgRcN4.js";import"./wii-Ce1IXd2j.js";import{t as l}from"./preload-helper-DbWsiEEd.js";import{E as u,_ as d,b as f,v as p,w as m,x as h,y as g}from"./firebase-CCUuWaKQ.js";import{n as _}from"./firebase-CCwEX8XK.js";var v=()=>n(`wiSmile`),y=`gsTotalAlumnos`,b=`gsTotalClases`,x=`gsFeedReciente`,S=`gsMetricas`,C={feedSub:null},w=async()=>{let e=v();if(!e)return`
    <div class="gs_page">
      <div class="gs_empty"><i class="fas fa-lock"></i><p>Sin sesión activa.</p></div>
    </div>`;let i=a(e.nombres||e.nombre||`Instructor`),c=o(e.nombres||e.nombre||``),l=e.foto||null,u=n(y)??`—`,d=n(b)??`—`,f=n(S)||{};return`
  <div class="gs_page">
    <div class="gs_ambient"></div>

    <!-- ══ HERO PREMIUM ══ -->
    <div class="gs_hero">
      <div class="gs_hero_main">
        <div class="gs_av_container">
          <div class="gs_av_glow"></div>
          <div class="gs_av">
            ${l?`<img src="${l}" alt="${i}" onerror="this.parentElement.innerHTML='${c}'">`:c}
          </div>
        </div>
        <div class="gs_hero_text">
          <p class="gs_hero_saludo">${t()}</p>
          <h1 class="gs_hero_nombre">${i.split(` `)[0]}</h1>
          <div class="gs_hero_tags">
            <span class="gs_tag"><i class="fas fa-crown"></i> Admin. Aula</span>
            <span class="gs_tag"><i class="fas fa-school"></i> ${s(e.empresa||`NotasWii`)}</span>
          </div>
        </div>
      </div>
      <div class="gs_hero_right">
        <div class="gs_date"><i class="fas fa-calendar-alt"></i> ${r()}</div>
        <div class="gs_rt_toggle" id="gs_btn_rt" title="Monitoreo de prácticas en vivo">
          <div class="gs_rt_dot"></div>
          <span class="gs_rt_txt">En Vivo</span>
        </div>
      </div>
    </div>

    <!-- ══ KPI GRID ══ -->
    <div class="gs_kpi_grid">
      ${[{id:`gs_k_alumnos`,ico:`fa-user-graduate`,col:`#0ea5e9`,lbl:`Alumnos Activos`,val:u},{id:`gs_k_clases`,ico:`fa-layer-group`,col:`#6366f1`,lbl:`Aulas Creadas`,val:d},{id:`gs_k_wpm`,ico:`fa-bolt`,col:`#f59e0b`,lbl:`Promedio WPM`,val:f.wpm||`—`},{id:`gs_k_cert`,ico:`fa-award`,col:`#22c55e`,lbl:`Certificados`,val:f.cert||0}].map(e=>`
        <div class="gs_kpi_card" style="--kc:${e.col}">
          <div class="gs_kpi_top">
            <div class="gs_kpi_ico"><i class="fas ${e.ico}"></i></div>
          </div>
          <div class="gs_kpi_val" id="${e.id}">${e.val}</div>
          <div class="gs_kpi_lbl">${e.lbl}</div>
        </div>`).join(``)}
    </div>

    <!-- ══ ACCESOS ══ -->
    <div class="gs_sec_hdr">
      <i class="fas fa-grip-horizontal"></i> Herramientas
    </div>
    <div class="gs_access_grid">
      ${[{page:`misclases`,ico:`fa-chalkboard-teacher`,color:`#6366f1`,title:`Aulas`,sub:`Crea y gestiona tus clases`},{page:`alumnos`,ico:`fa-users`,color:`#0ea5e9`,title:`Estudiantes`,sub:`Métricas y asignaciones`},{page:`calificaciones`,ico:`fa-chart-bar`,color:`#f59e0b`,title:`Rankings`,sub:`Podio de rendimiento`},{page:`buscar`,ico:`fa-search`,color:`#22c55e`,title:`Búsqueda`,sub:`Historial detallado`},{page:`mensajes`,ico:`fa-paper-plane`,color:`#ec4899`,title:`Notificaciones`,sub:`Comunicados oficiales`},{page:`perfil`,ico:`fa-user-shield`,color:`#a855f7`,title:`Mi Cuenta`,sub:`Configuración personal`}].map(e=>`
        <a href="/${e.page}" class="gs_ac_card nv_item" data-page="${e.page}" style="--ac:${e.color}">
          <div class="gs_ac_ico"><i class="fas ${e.ico}"></i></div>
          <div class="gs_ac_info">
            <div class="gs_ac_tit">${e.title}</div>
            <div class="gs_ac_sub">${e.sub}</div>
          </div>
          <i class="fas fa-arrow-right gs_ac_arr"></i>
        </a>`).join(``)}
    </div>

    <!-- ══ FEED EN VIVO ══ -->
    <div class="gs_sec_hdr" style="margin-top:1.5vh">
      <i class="fas fa-chart-line"></i> Últimas Prácticas
      <div class="gs_feed_tools">
        <span class="gs_badge_count" id="gs_feed_num">—</span>
        <button class="gs_btn_sync" id="gs_refresh" title="Actualizar datos"><i class="fas fa-sync-alt"></i></button>
      </div>
    </div>
    <div class="gs_feed_wrap" id="gs_feed">
      <div class="gs_feed_empty">
        <i class="fas fa-spinner fa-spin" style="font-size:3vh;margin-bottom:1vh"></i>
        <p>Cargando registros...</p>
      </div>
    </div>

  </div>`},T=async()=>{let t=v();if(!t)return;e(document).off(`.gs`);let r=n(`gsRealTime`)===!0;r&&e(`#gs_btn_rt`).addClass(`active`),await D(t),r&&A(t),e(document).on(`click.gs`,`#gs_btn_rt`,function(){let n=!e(this).hasClass(`active`);e(this).toggleClass(`active`,n),i(`gsRealTime`,n,24*365),n?A(t):(C.feedSub?.(),C.feedSub=null)}),e(document).on(`click.gs`,`#gs_refresh`,async function(){let n=e(this).find(`i`).addClass(`fa-spin`);[y,b,x,S].forEach(e=>localStorage.removeItem(e)),await D(t,!0),setTimeout(()=>n.removeClass(`fa-spin`),500)}),e(document).on(`click.gs`,`.nv_item`,function(t){t.preventDefault();let n=e(this).data(`page`);n&&l(async()=>{let{rutas:e}=await import(`./rutas-BiPjO1vX.js`).then(e=>e.r);return{rutas:e}},__vite__mapDeps([0])).then(({rutas:e})=>e.navigate(`/${n}`))}),e(document).on(`click.gs`,`.gs_fi_btn`,function(){i(`gsBuscarTerm`,e(this).data(`usuario`),1/60),l(async()=>{let{rutas:e}=await import(`./rutas-BiPjO1vX.js`).then(e=>e.r);return{rutas:e}},__vite__mapDeps([0])).then(({rutas:e})=>e.navigate(`/buscar`))})},E=()=>{C.feedSub?.(),e(document).off(`.gs`)};async function D(e,t=!1){await Promise.all([O(e,t),k(e,t)])}async function O(t,r=!1){if(!r){let t=n(y),r=n(b),i=n(S);if(t!=null&&e(`#gs_k_alumnos`).text(t),r!=null&&e(`#gs_k_clases`).text(r),i?.wpm&&e(`#gs_k_wpm`).text(i.wpm),i?.cert!=null&&e(`#gs_k_cert`).text(i.cert),t!=null&&r!=null&&i)return}try{let n=await d(h(u(_,`lecciones`),m(`gestor_id`,`==`,t.usuario)));n.empty&&(n=await d(h(u(_,`lecciones`),m(`gestorId`,`==`,t.usuario))));let r=n.docs.map(e=>e.data()),a=r.length,o=r.reduce((e,t)=>e+(t.wpmMax||0),0),s=a>0?Math.round(o/a):0,c=r.filter(e=>(e.completadas?.length||0)>=45&&(e.wpmMax||0)>=80).length;i(y,a,2),i(S,{wpm:s,cert:c},2),e(`#gs_k_alumnos`).text(a),e(`#gs_k_wpm`).text(s||`—`),e(`#gs_k_cert`).text(c);let l=await d(h(u(_,`clases`),m(`gestor_id`,`==`,t.usuario)));l.empty&&(l=await d(h(u(_,`clases`),m(`gestorId`,`==`,t.usuario)))),i(b,l.size,2),e(`#gs_k_clases`).text(l.size)}catch(e){console.error(`[gestor] Error KPIs`,e)}}async function k(e,t=!1){if(!(!t&&n(`gsRealTime`)===!0)){if(!t){let e=n(x);if(e?.length){j(e);return}}try{let t=await d(h(u(_,`lecciones`),m(`gestor_id`,`==`,e.usuario),f(`ultPractica`,`desc`),p(15)));t.empty&&(t=await d(h(u(_,`lecciones`),m(`gestorId`,`==`,e.usuario),f(`ultPractica`,`desc`),p(15))));let n=t.docs.map(e=>({usuario:e.id,...e.data()}));i(x,n,1/12),j(n)}catch{try{j((await d(h(u(_,`lecciones`),m(`gestor_id`,`==`,e.usuario),p(15)))).docs.map(e=>({usuario:e.id,...e.data()})))}catch{j([])}}}}function A(e){C.feedSub?.(),C.feedSub=g(h(u(_,`lecciones`),m(`gestor_id`,`==`,e.usuario),p(15)),e=>{let t=e.docs.map(e=>({usuario:e.id,...e.data()}));t.sort((e,t)=>{let n=e.ultPractica?.toDate?e.ultPractica.toDate().getTime():0;return(t.ultPractica?.toDate?t.ultPractica.toDate().getTime():0)-n}),j(t)})}function j(t){if(e(`#gs_feed_num`).text(t.length>0?`${t.length} Registros`:`0 Registros`),!t.length){e(`#gs_feed`).html(`
      <div class="gs_feed_empty">
        <i class="fas fa-ghost"></i>
        <p>No hay actividad registrada aún.<br><small>Tus alumnos aparecerán aquí al iniciar una lección.</small></p>
      </div>`);return}let n=t.map(e=>{let t=o(e.nombre||e.usuario||`A`),n=e.wpmMax||0,r=e.precision||0,i=e.completadas?.length||0,a=Math.round(i/45*100),s=e.clase_id||e.claseId||null,l=e.ultPractica?.toDate?c(e.ultPractica):`Reciente`;return`
      <div class="gs_fi">
        <div class="gs_fi_av">${t}</div>
        <div class="gs_fi_main">
          <div class="gs_fi_head">
            <span class="gs_fi_nom">${e.nombre||e.usuario||`—`}</span>
            ${s?`<span class="gs_fi_clase"><i class="fas fa-chalkboard"></i> ${s}</span>`:``}
          </div>
          <div class="gs_fi_metrics">
            <div class="gs_fi_metric wpm"><i class="fas fa-bolt"></i> ${n} WPM</div>
            <div class="gs_fi_metric prec"><i class="fas fa-bullseye"></i> ${r}%</div>
            <div class="gs_fi_prog">
              <div class="gs_fi_track"><div class="gs_fi_fill" style="width:${a}%"></div></div>
              <span>${i}/45</span>
            </div>
          </div>
        </div>
        <div class="gs_fi_time">${l}</div>
        <button class="gs_fi_btn" data-usuario="${e.usuario}" title="Ver historial completo">
          <i class="fas fa-search"></i>
        </button>
      </div>`}).join(``);e(`#gs_feed`).html(`<div class="gs_feed_list">${n}</div>`)}export{E as cleanup,T as init,w as render};