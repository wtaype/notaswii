import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,E as n,S as r,w as i}from"./widev-BY9EW4md.js";import{c as a,i as o,n as s,t as c}from"./wii-IZM0MjcA.js";var l=[{num:`∞`,label:`Notas posibles`,icon:`fa-infinity`,color:`#0EBEFF`},{num:`100%`,label:`Gratis para empezar`,icon:`fa-heart`,color:`#FF5C69`},{num:`24/7`,label:`Siempre disponible`,icon:`fa-clock`,color:`#29C72E`},{num:`<1s`,label:`Para anotar tu idea`,icon:`fa-bolt`,color:`#7000FF`}],u=[{icon:`fa-bolt`,color:`Cielo`,titulo:`Captura Instantánea`,desc:`Abre NotasWii y en menos de un segundo ya estás escribiendo. Sin formularios, sin distracciones. Solo tus ideas.`},{icon:`fa-layer-group`,color:`Dulce`,titulo:`Todo Organizado`,desc:`Notas rápidas, tareas con checklist, links guardados y un tablero visual. Cada idea en su lugar exacto.`},{icon:`fa-cloud-arrow-up`,color:`Paz`,titulo:`Sincronización Inteligente`,desc:`Tus apuntes siempre contigo. Empieza en tu PC y termina en tu celular. Sin perder nada, nunca.`},{icon:`fa-shield-halved`,color:`Mora`,titulo:`Privacidad Absoluta`,desc:`Tus notas son solo tuyas. Almacenamiento seguro y encriptado. Nadie más leerá lo que escribiste.`},{icon:`fa-palette`,color:`Cielo`,titulo:`Diseño Premium`,desc:`Interfaz minimalista con temas personalizables. Un entorno de escritura que da gusto usar cada día.`},{icon:`fa-mobile-screen`,color:`Dulce`,titulo:`Mobile First`,desc:`Diseñado para el celular desde el primer pixel. Rápido, responsivo y optimizado para cualquier pantalla.`}],d=[{icon:`fa-bolt`,color:`#0EBEFF`,nombre:`Flash`,desc:`Captura instantánea de ideas`,url:`/flash`},{icon:`fa-note-sticky`,color:`#FF5C69`,nombre:`Mis Notas`,desc:`Tu historial completo`,url:`/misnotas`},{icon:`fa-check-double`,color:`#29C72E`,nombre:`Tareas`,desc:`Listas y checklists`,url:`/tareas`},{icon:`fa-link`,color:`#FFB800`,nombre:`Links`,desc:`Guarda URLs importantes`,url:`/links`},{icon:`fa-table-columns`,color:`#7000FF`,nombre:`Tablero`,desc:`Vista visual de tus notas`,url:`/tablero`}],f=[{num:`1`,icon:`fa-bolt`,titulo:`Abre y Escribe`,desc:`Entra a Flash y empieza a escribir de inmediato. Sin cuenta, sin configuración.`},{num:`2`,icon:`fa-layer-group`,titulo:`Organiza`,desc:`Clasifica tus ideas en notas, tareas o links. Todo con un clic.`},{num:`3`,icon:`fa-cloud-arrow-up`,titulo:`Sincroniza`,desc:`Crea una cuenta y tus apuntes estarán en todos tus dispositivos al instante.`}],p=[{avatar:`👩‍🎓`,nombre:`Valeria M.`,rol:`Estudiante universitaria`,texto:`NotasWii cambió cómo estudio. Capturo ideas al instante en clases y luego las organizo en el tablero. ¡Es increíblemente rápido!`,estrellas:5},{avatar:`👨‍💻`,nombre:`Rodrigo T.`,rol:`Desarrollador freelance`,texto:`Uso Flash todo el día para guardar snippets y links. El hecho de que ya esté listo para escribir al abrir la app es un game changer.`,estrellas:5},{avatar:`👩‍💼`,nombre:`Lucía P.`,rol:`Gerente de proyectos`,texto:`Las listas de tareas con checklist son perfectas para mi equipo. Todo organizado, sin complicaciones y con un diseño impecable.`,estrellas:5},{avatar:`✍️`,nombre:`Marco G.`,rol:`Escritor creativo`,texto:`El tablero visual es lo que necesitaba para organizar mis capítulos. NotasWii se convirtió en mi herramienta de escritura favorita.`,estrellas:5}],m=()=>`
<div class="ac_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_logo">
        <i class="fas ${o}" style="font-size:4rem;color:var(--mco);"></i>
      </div>
      <div class="ac_hero_badge"><i class="fas fa-pen-nib"></i> El ecosistema de notas más rápido</div>
      <h1 class="ac_hero_tit">${c}</h1>
      <p class="ac_hero_sub">
        Tu centro de ideas, apuntes y recordatorios con diseño premium.
        <strong>Abre. Escribe. Nunca pierdas una idea.</strong>
      </p>
      <div class="ac_hero_stats">
        ${l.map(e=>`
          <div class="ac_stat" style="--sc:${e.color}">
            <i class="fas ${e.icon}" style="color:${e.color}"></i>
            <strong>${e.num}</strong>
            <span>${e.label}</span>
          </div>`).join(``)}
      </div>
      <div class="ac_hero_btns">
        <a href="/flash" class="ac_btn_p"><i class="fas fa-bolt"></i> Empezar Ahora</a>
        <button class="ac_btn_s" id="ac_compartir"><i class="fas fa-share-nodes"></i> Compartir App</button>
      </div>
      <div class="ac_hero_scroll"><i class="fas fa-chevron-down"></i></div>
    </div>
  </section>

  <!-- ══ COUNTER BAND ══ -->
  <div class="ac_counter_band">
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="100">0</span><span>%</span>
      <p>Gratis para siempre</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="5">0</span><span>+</span>
      <p>Módulos integrados</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span>∞</span>
      <p>Notas posibles</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="${new Date().getFullYear()}">0</span>
      <p>Siempre actualizado</p>
    </div>
  </div>

  <!-- ══ NUESTRA HISTORIA ══ -->
  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-heart"></i> Acerca de nosotros</div>
      <h2 class="ac_sec_tit">El propósito de <span class="ac_grad">${c}</span></h2>
    </div>
    <div class="ac_historia wi_fadeUp">
      <p><strong>NotasWii</strong> nació de una necesidad real: ¿cuántas veces tuviste una idea brillante y no encontraste dónde anotarla rápido? La mayoría de apps de notas te piden demasiado antes de dejarte escribir.</p>

      <p>En <em>NotasWii</em> el enfoque es diferente. Entras, y ya estás escribiendo. Sin registro obligatorio, sin formularios, sin fricción. Tu idea se guarda automáticamente y está lista cuando vuelvas.</p>

      <p>El proyecto fue desarrollado con la filosofía de que las mejores herramientas son las que no se notan: solo funcionan, son rápidas, bonitas y confiables. Desde el módulo <strong>Flash</strong> para capturas instantáneas, hasta el <strong>Tablero</strong> visual para organizar tus proyectos, cada función fue pensada para una sola cosa: que nunca pierdas una buena idea.</p>

      <p>Si llegaste hasta aquí, ¡gracias por ser parte de NotasWii! Tu mente merece el mejor espacio para crecer. 🚀</p>

      <div class="ac_firma">
        <strong>Con pasión, Wilder Taype</strong>
        <span>Creador de ${c}</span>
      </div>
    </div>
  </section>

  <!-- ══ BENEFICIOS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-star"></i> ¿Por qué ${c}?</div>
      <h2 class="ac_sec_tit">Diseñado para <span class="ac_grad">tu productividad</span></h2>
      <p class="ac_sec_sub">Cada detalle fue pensado para que anotes más rápido y mejor</p>
    </div>
    <div class="ac_feat_grid">
      ${u.map(e=>`
        <div class="ac_feat_card wi_fadeUp ac_color_${e.color.toLowerCase()}">
          <div class="ac_feat_ico"><i class="fas ${e.icon}"></i></div>
          <h3>${e.titulo}</h3>
          <p>${e.desc}</p>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ CÓMO FUNCIONA ══ -->
  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-route"></i> Empieza ahora</div>
      <h2 class="ac_sec_tit">3 pasos para <span class="ac_grad">organizar tu mente</span></h2>
      <p class="ac_sec_sub">Sin curva de aprendizaje. En 30 segundos ya estás productivo.</p>
    </div>
    <div class="ac_pasos">
      ${f.map((e,t)=>`
        <div class="ac_paso wi_fadeUp">
          <div class="ac_paso_num">${e.num}</div>
          <div class="ac_paso_ico"><i class="fas ${e.icon}"></i></div>
          <h3>${e.titulo}</h3>
          <p>${e.desc}</p>
        </div>
        ${t<f.length-1?`<div class="ac_paso_sep"><i class="fas fa-chevron-right"></i></div>`:``}`).join(``)}
    </div>
  </section>

  <!-- ══ TESTIMONIOS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Comunidad</div>
      <h2 class="ac_sec_tit">Personas que usan <span class="ac_grad">${c}</span></h2>
      <p class="ac_sec_sub">Descubre cómo NotasWii está potenciando mentes creativas</p>
    </div>
    <div class="ac_test_grid">
      ${p.map(e=>`
        <div class="ac_test_card wi_fadeUp">
          <div class="ac_test_stars">${`<i class="fas fa-star"></i>`.repeat(e.estrellas)}</div>
          <p class="ac_test_txt">"${e.texto}"</p>
          <div class="ac_test_autor">
            <span class="ac_test_avatar">${e.avatar}</span>
            <div><strong>${e.nombre}</strong><span>${e.rol}</span></div>
          </div>
        </div>`).join(``)}
    </div>
  </section>

  <!-- ══ MÓDULOS ══ -->
  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-layer-group"></i> Módulos</div>
      <h2 class="ac_sec_tit">Herramientas para <span class="ac_grad">cada tipo de idea</span></h2>
      <p class="ac_sec_sub">Explora todas las secciones de NotasWii diseñadas para ti</p>
    </div>
    <div class="ac_modulos_grid">
      ${d.map(e=>`
        <a href="${e.url}" class="ac_modulo_card wi_fadeUp" style="--mc:${e.color}">
          <div class="ac_modulo_ico"><i class="fas ${e.icon}"></i></div>
          <div class="ac_modulo_info">
            <strong>${e.nombre}</strong>
            <span>${e.desc}</span>
          </div>
          <div class="ac_modulo_arr"><i class="fas fa-arrow-right"></i></div>
        </a>`).join(``)}
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="ac_cta_sec">
    <div class="ac_cta_wrap wi_fadeUp">
      <div class="ac_cta_glow"></div>
      <div class="ac_cta_particles">
        ${Array.from({length:6}).map(()=>`<span class="ac_particle"></span>`).join(``)}
      </div>
      <div class="ac_cta_inner">
        <span class="ac_cta_emoji">✍️</span>
        <h2>¿Listo para organizar<br>tu mente?</h2>
        <p>Empieza a anotar ahora mismo. Sin registro, sin complicaciones.</p>
        <div class="ac_cta_chips">
          ${d.map(e=>`
            <a href="${e.url}" class="ac_chip" style="--cc:${e.color}" ${r(e.desc)}>
              <i class="fas ${e.icon}"></i> ${e.nombre}
            </a>`).join(``)}
        </div>
        <div class="ac_cta_btns">
          <a href="/flash" class="ac_btn_p ac_btn_lg"><i class="fas fa-bolt"></i> Captura Flash</a>
          <a href="/misnotas" class="ac_btn_s ac_btn_lg"><i class="fas fa-note-sticky"></i> Mis Notas</a>
        </div>
        <p class="ac_footer_txt">
          ${c} v10 · Hecho con <i class="fas fa-heart"></i> por
          <a href="${a}" target="_blank" rel="noopener">${s}</a> · ${n()}
        </p>
      </div>
    </div>
  </section>

</div>`,h=()=>{e(`.ac_counter_num`).each(function(){let t=e(this),n=+t.data(`target`),r=null,i=e=>{r||=e;let a=Math.min((e-r)/1800,1),o=1-(1-a)**3;t.text(Math.floor(o*n).toLocaleString()),a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)})},g=()=>{t(`.ac_modulo_card`,null,{anim:`wi_fadeUp`,stagger:60}),t(`.ac_feat_card`,null,{anim:`wi_fadeUp`,stagger:80}),t(`.ac_paso`,null,{anim:`wi_fadeUp`,stagger:120}),t(`.ac_test_card`,null,{anim:`wi_fadeUp`,stagger:80}),t(`.ac_historia`,null,{anim:`wi_fadeUp`}),t(`.ac_cta_wrap`,null,{anim:`wi_fadeUp`});let r=e(`.ac_counter_band`)[0];if(r){let e=new IntersectionObserver(([t])=>{t.isIntersecting&&(h(),e.disconnect())},{threshold:.3});e.observe(r)}e(`#ac_compartir`).on(`click`,function(){let e=`https://notaswii.web.app/`;navigator.share?navigator.share({title:c,text:`✍️ ${c} — Tu centro de notas premium. Abre y escribe, sin fricciones.`,url:e}).catch(()=>{}):i(e,this,`¡Link copiado! ✨`)}),console.log(`📝 ${c} v10 · Acerca ${n()}`)},_=()=>{e(`#ac_compartir`).off(`click`),console.log(`🧹 Acerca limpiado`)};export{_ as cleanup,g as init,m as render};