import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,T as n}from"./widev-DghgRcN4.js";import{i as r,n as i,s as a,t as o}from"./wii-Ce1IXd2j.js";var s=[{num:`∞`,label:`Notas posibles`},{num:`100%`,label:`Gratuito`},{num:`24/7`,label:`Disponibilidad`},{num:`<1s`,label:`Velocidad de captura`}],c=[{icon:`fa-bolt`,color:`var(--Oro)`,titulo:`Captura Instantánea`,desc:`Sin formularios ni tiempos de carga.`},{icon:`fa-layer-group`,color:`var(--Dulce)`,titulo:`Todo Organizado`,desc:`Soporte para listas, tableros y texto.`},{icon:`fa-cloud-arrow-up`,color:`var(--Paz)`,titulo:`Sincronización`,desc:`Multidispositivo en tiempo real.`},{icon:`fa-shield-halved`,color:`var(--Cielo)`,titulo:`Privacidad Absoluta`,desc:`Almacenamiento seguro en la nube.`}],l=[{icon:`fa-bolt`,color:`var(--Oro)`,nombre:`Flash`,url:`/flash`},{icon:`fa-note-sticky`,color:`var(--Futuro)`,nombre:`Borradores`,url:`/misnotas`},{icon:`fa-check-double`,color:`var(--Dulce)`,nombre:`Tareas`,url:`/tareas`},{icon:`fa-file-word`,color:`var(--Cielo)`,nombre:`Documentos`,url:`/word`},{icon:`fa-link`,color:`var(--Mora)`,nombre:`Links`,url:`/links`},{icon:`fa-table-columns`,color:`var(--Paz)`,nombre:`Tablero`,url:`/tablero`}],u=()=>`
  <div class="ac_dash">

    <!-- ★ HEADER COMPACTO (Vercel Style) -->
    <header class="ac_dhead">
      <div class="ac_dbrand">
        <div class="ac_dlogo"><i class="fas ${r}"></i></div>
        <div class="ac_dinfo">
          <h1>${o} <span class="ac_badge">v13</span></h1>
          <p>Ecosistema de Productividad y Organización</p>
        </div>
      </div>
      <div class="ac_dactions">
        <button class="ac_btn_sec" id="ac_compartir"><i class="fas fa-share-nodes"></i> Compartir</button>
        <a href="/flash" class="ac_btn_pri"><i class="fas fa-bolt"></i> Iniciar</a>
      </div>
    </header>

    <!-- ★ CONTENIDO PRINCIPAL 2 COLUMNAS -->
    <main class="ac_dmain">

      <!-- COLUMNA IZQUIERDA -->
      <div class="ac_dcol">
        
        <!-- Nuestra Filosofía -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-heart"></i> Filosofía</h2>
          </div>
          <div class="ac_card_body ac_text_content">
            <p><strong>${o}</strong> nació de una necesidad real: capturar ideas al vuelo sin fricciones. Las herramientas tradicionales exigen demasiados clics; nosotros elegimos la inmediatez.</p>
            <p>Desde el módulo <strong>Flash</strong> hasta el <strong>Tablero Visual</strong>, cada componente ha sido diseñado bajo la premisa de la velocidad, la elegancia y la cero distracción.</p>
            <div class="ac_firma">
              <span>Desarrollado por</span>
              <a href="${a}" target="_blank" rel="noopener"><strong>${i}</strong></a>
              <span class="ac_year">${n()}</span>
            </div>
          </div>
        </section>

        <!-- Métricas (Compactas) -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-chart-line"></i> Capacidades</h2>
          </div>
          <div class="ac_stats_grid">
            ${s.map(e=>`
              <div class="ac_stat_item">
                <strong class="ac_counter" data-target="${e.num.replace(/\D/g,``)}">${e.num}</strong>
                <span>${e.label}</span>
              </div>
            `).join(``)}
          </div>
        </section>

      </div>

      <!-- COLUMNA DERECHA -->
      <div class="ac_dcol">
        
        <!-- Módulos Integrados -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-layer-group"></i> Arquitectura de Módulos</h2>
          </div>
          <div class="ac_mods_list">
            ${l.map((e,t)=>`
              <a href="${e.url}" class="ac_mod_item" style="animation-delay:${t*.05}s">
                <div class="ac_mod_ico" style="color:${e.color}; background:color-mix(in srgb, ${e.color} 12%, transparent);"><i class="fas ${e.icon}"></i></div>
                <strong>${e.nombre}</strong>
                <i class="fas fa-arrow-right ac_mod_arrow"></i>
              </a>
            `).join(``)}
          </div>
        </section>

        <!-- Infraestructura / Beneficios -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-server"></i> Infraestructura</h2>
          </div>
          <div class="ac_feat_list">
            ${c.map((e,t)=>`
              <div class="ac_feat_item" style="animation-delay:${t*.05}s">
                <i class="fas fa-check-circle" style="color:${e.color}"></i>
                <div class="ac_feat_txt">
                  <strong>${e.titulo}</strong>
                  <span>${e.desc}</span>
                </div>
              </div>
            `).join(``)}
          </div>
        </section>

      </div>

    </main>
  </div>
`,d=()=>{e(`.ac_counter`).each(function(){let t=e(this),n=t.data(`target`);if(!n)return;let r=parseInt(n),i=t.text().replace(/[0-9]/g,``),a=null,o=e=>{a||=e;let n=Math.min((e-a)/1500,1),s=1-(1-n)**3,c=Math.floor(s*r);t.text(c+(n>=1?i:``)),n<1&&requestAnimationFrame(o)};requestAnimationFrame(o)})},f=()=>{setTimeout(d,300),e(`#ac_compartir`).on(`click`,function(){let e=`https://notaswii.web.app/`;navigator.share?navigator.share({title:o,text:`✍️ ${o} — Ecosistema de productividad.`,url:e}).catch(()=>{}):t(e,this,`¡Link copiado!`)}),console.log(`📝 ${o} v13 · Acerca (Compact Pro)`)},p=()=>{e(`#ac_compartir`).off(`click`)};export{p as cleanup,f as init,u as render};