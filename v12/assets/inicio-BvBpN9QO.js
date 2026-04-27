import{t as e}from"./rolldown-runtime-lhHHWwHU.js";import{t}from"./vendor-BDh6mtVu.js";import{S as n,T as r,a as i,x as a}from"./widev-CInXVJ_O.js";import{n as o,s,t as c}from"./wii-By3LwGGz.js";var l=e({cleanup:()=>y,init:()=>v,render:()=>_}),u=[`Estudiantes productivos 🚀`,`Escritores creativos 📝`,`Desarrolladores pro 💻`,`Equipos ágiles ⚡`,`Mentes maestras 🧠`],d=[{valor:100,label:`Gratis`,sufijo:`%`},{valor:0,label:`Distracciones`,sufijo:``},{valor:6,label:`Módulos Premium`,sufijo:``},{valor:1,label:`Ecosistema total`,sufijo:``}],f=[{id:`misnotas`,icon:`fa-note-sticky`,color:`#0EBEFF`,nombre:`Mis Notas`,desc:`Tu cerebro digital en la nube`,items:[{icon:`fa-cloud`,name:`Auto-guardado`,desc:`Seguridad en tiempo real`},{icon:`fa-thumbtack`,name:`Fijar Notas`,desc:`Lo importante primero`},{icon:`fa-bolt`,name:`Rápido`,desc:`Acceso instantáneo`}]},{id:`flash`,icon:`fa-bolt`,color:`#FFDA34`,nombre:`Captura Flash`,desc:`Ideas brillantes en milisegundos`,items:[{icon:`fa-eye-slash`,name:`Modo Zen`,desc:`Cero distracciones`},{icon:`fa-wind`,name:`Fluidez`,desc:`A la velocidad del pensamiento`},{icon:`fa-brain`,name:`Retención`,desc:`No pierdas más ideas`}]},{id:`tareas`,icon:`fa-tasks`,color:`#29C72E`,nombre:`Checklists Pro`,desc:`Domina tus pendientes diarios`,items:[{icon:`fa-check-circle`,name:`Tachado Auto`,desc:`Satisfacción garantizada`},{icon:`fa-chart-line`,name:`Progreso`,desc:`Barras de estado dinámicas`},{icon:`fa-layer-group`,name:`Organización`,desc:`Múltiples listas a la vez`}]},{id:`word`,icon:`fa-pen-to-square`,color:`#2B579A`,nombre:`Word Avanzado`,desc:`El lienzo perfecto para tus ensayos`,items:[{icon:`fa-file-lines`,name:`Lienzo A4`,desc:`Simulador de página real`},{icon:`fa-font`,name:`Tipografías`,desc:`Fuentes premium incluidas`},{icon:`fa-print`,name:`Formato Rico`,desc:`Opciones completas de estilo`}]},{id:`links`,icon:`fa-link`,color:`#FF5C69`,nombre:`Enlaces Rápidos`,desc:`Tus favoritos a un clic`,items:[{icon:`fa-globe`,name:`Extracción`,desc:`Dominios automáticos`},{icon:`fa-copy`,name:`Copiar rápido`,desc:`Un clic al portapapeles`},{icon:`fa-shield-halved`,name:`Seguro`,desc:`Borrado con confirmación`}]},{id:`tablero`,icon:`fa-th-large`,color:`#7000FF`,nombre:`Tablero Masonry`,desc:`Tu muro de inspiración visual`,items:[{icon:`fa-palette`,name:`Glassmorphism`,desc:`Fondos vibrantes`},{icon:`fa-table-cells-large`,name:`Masonry`,desc:`Layout fluido e inteligente`},{icon:`fa-expand`,name:`Auto-ajuste`,desc:`Textos que crecen solos`}]}],p=[{icon:`fa-layer-group`,titulo:`Un ecosistema unificado`,desc:`Deja de saltar entre 5 aplicaciones distintas. Notas, tareas, documentos y enlaces, todo en una sola plataforma maravillosamente diseñada.`},{icon:`fa-bolt`,titulo:`Velocidad relámpago`,desc:`Construida con tecnología de punta (Vite + Vanilla JS), la plataforma carga en milisegundos y reacciona al instante a cada uno de tus clics.`},{icon:`fa-shield-halved`,titulo:`Privacidad y seguridad`,desc:`Tus datos respaldados en la infraestructura global de Google Cloud (Firebase) con reglas de seguridad estrictas y sanitización anti-hackers.`}],m=e=>`
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${e.valor}" data-sufijo="${e.sufijo}">0</div>
    <div class="ini_stat_l">${e.label}</div>
  </div>`,h=e=>`
  <div class="ini_cat_card" style="--cc:${e.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${e.icon}"></i></div>
      <div class="ini_cat_info"><h3>${e.nombre}</h3><p>${e.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${e.items.map(e=>`
        <li><div class="ini_tool_a">
          <i class="fas ${e.icon}"></i>
          <div><strong>${e.name}</strong><span>${e.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join(``)}
    </ul>
  </div>`,g=(e,t)=>`
  <div class="ini_about_card" style="--d:${t*.15}s">
    <div class="ini_card_ico"><i class="fas ${e.icon}"></i></div>
    <h3>${e.titulo}</h3>
    <p>${e.desc}</p>
  </div>`,_=()=>`
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${i()}</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        El Ecosistema <span class="ini_grad">Definitivo</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${u.map((e,t)=>`<span class="ini_role${t===0?` active`:``}">${e}</span>`).join(``)}
      </div>

      <p class="ini_sub" style="--d:.54s">
        Centraliza todas tus ideas, tareas, documentos y enlaces en un solo espacio profesional. Carga ultrarrápida, diseño impecable y 100% gratis.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${d.map(m).join(``)}
      </div>

      <div class="ini_btns" style="--d:.9s">
        <a href="/login" class="ini_btn_p"><i class="fas fa-rocket"></i> Empezar Gratis</a>
        <a href="/descubre" class="ini_btn_s"><i class="fas fa-compass"></i> Descubrir Módulos</a>
      </div>

    </div>

    <!-- Derecha: preview NotasWii Dashboard -->
    <div class="ini_hero_visual">
      <div class="ini_nw_preview" style="--d:.3s">
        <div class="ini_nw_head">
          <div class="ini_nw_dots"><div></div><div></div><div></div></div>
          <div class="ini_nw_search">Buscar en mis notas...</div>
        </div>
        <div class="ini_nw_body">
          <div class="ini_nw_side">
            <div class="active"></div><div></div><div></div><div></div>
          </div>
          <div class="ini_nw_main">
            <div class="ini_nw_card"><div></div><div></div></div>
            <div class="ini_nw_card" style="width: 75%; background: var(--Dulce); opacity: 0.8;"><div></div><div style="background:#fff"></div></div>
            <div class="ini_nw_card" style="width: 90%;"><div></div><div></div></div>
            <div class="ini_nw_card" style="width: 60%; background: var(--Paz); opacity: 0.8;"><div></div><div style="background:#fff"></div></div>
          </div>
        </div>
      </div>
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${a(`Notas`)}><i class="fas fa-note-sticky"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${a(`Word`)}><i class="fas fa-pen-to-square"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${a(`Flash`)}><i class="fas fa-bolt"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${a(`Tareas`)}><i class="fas fa-tasks"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Módulos</span> del Éxito</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Herramientas poderosas diseñadas para maximizar tu productividad diaria</p>
    </div>
    <div class="ini_cats_grid">${f.map(h).join(``)}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Por qué usar <span class="ini_grad">${c}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${p.map(g).join(``)}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-rocket ini_cta_ico"></i>
      <h2>¿Listo para organizar tu vida digital?</h2>
      <p>Crea tu cuenta en segundos y únete al ecosistema de productividad definitivo.</p>
      <div class="ini_cta_chips">
        <a href="/login" class="ini_btn_p"><i class="fas fa-arrow-right"></i> Entrar a ${c}</a>
      </div>
      <p class="ini_cta_autor" style="margin-top:2vh;">Creado con ❤️ por <a href="${s}" target="_blank" rel="noopener">${o}</a> · v11 © ${r()}</p>
    </div>
  </section>

</div>`,v=()=>{let e=0,r=t(`.ini_role`);setInterval(()=>{r.removeClass(`active`),r.eq(e=(e+1)%r.length).addClass(`active`)},2800),n(`#in_stats`,()=>{t(`.ini_stat_n`).each(function(){let e=t(this),n=+e.data(`target`),r=e.data(`sufijo`)||``,i=0,a=setInterval(()=>{i+=n/50,i>=n?(e.text(n+r),clearInterval(a)):e.text(Math.floor(i))},28)})}),n(`.ini_cat_card`,null,{anim:`wi_fadeUp`,stagger:80}),n(`.ini_about_card`,null,{anim:`wi_fadeUp`,stagger:140}),console.log(`🚀 ${c} v11 · Inicio OK`)},y=()=>{};export{l as t};