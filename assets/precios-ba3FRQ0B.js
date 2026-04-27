import{C as e}from"./widev-DRhaZoqv.js";import{t}from"./wii-Ce1IXd2j.js";var n=[{id:`gratis`,color:`#8b9bb4`,name:`Gratis`,desc:`Todo lo que necesitas para empezar a anotar hoy mismo.`,price:`0`,btn:`Empezar Gratis`,btnType:`outline`,features:[{t:`Módulo Flash (captura rápida)`,v:!0},{t:`Hasta 20 notas locales`,v:!0},{t:`Tareas y checklists`,v:!0},{t:`Guardado en localStorage`,v:!0},{t:`Sincronización en la nube`,v:!1},{t:`Tablero visual`,v:!1}]},{id:`personal`,color:`#0EBEFF`,name:`Personal`,desc:`Para mentes activas que quieren notas en todos sus dispositivos.`,price:`3`,btn:`Elegir Personal`,btnType:`outline`,features:[{t:`Todo lo de Gratis, más:`,v:!0},{t:`Notas ilimitadas en la nube`,v:!0},{t:`Sincronización multi-dispositivo`,v:!0},{t:`Tablero visual completo`,v:!0},{t:`Colección de Links ilimitada`,v:!0},{t:`Exportar notas en PDF`,v:!0}]},{id:`pro`,color:`#7000FF`,name:`Pro`,desc:`El ecosistema completo para profesionales y creativos exigentes.`,price:`7`,btn:`Obtener Pro`,btnType:`solid`,destacado:!0,features:[{t:`Todo lo de Personal, más:`,v:!0},{t:`Etiquetas y carpetas avanzadas`,v:!0},{t:`Historial de versiones (30 días)`,v:!0},{t:`Asistente IA para resumir`,v:!0},{t:`Compartir notas con enlace`,v:!0},{t:`Soporte prioritario por email`,v:!0}]},{id:`equipo`,color:`#FF8C00`,name:`Equipo`,desc:`Notas colaborativas para equipos que crean juntos.`,price:`12`,btn:`Elegir Equipo`,btnType:`outline`,features:[{t:`Todo lo de Pro, más:`,v:!0},{t:`Hasta 5 usuarios colaboradores`,v:!0},{t:`Notas compartidas en tiempo real`,v:!0},{t:`Panel de administración`,v:!0},{t:`Historial de versiones (90 días)`,v:!0},{t:`API de integración`,v:!0}]},{id:`empresa`,color:`#29C72E`,name:`Empresa`,desc:`Soluciones a medida para organizaciones que necesitan escalar.`,price:`Hablemos`,btn:`Contactar Ventas`,btnType:`outline`,customPrice:!0,features:[{t:`Usuarios ilimitados`,v:!0},{t:`Dominio y branding personalizados`,v:!0},{t:`SLA garantizado del 99.9%`,v:!0},{t:`Servidor dedicado opcional`,v:!0},{t:`Integraciones a medida`,v:!0},{t:`Facturación corporativa`,v:!0}]}],r=()=>`
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Transparente y Sin Sorpresas</div>
    <h1 class="pr_title">Planes diseñados para <span class="pr_grad">cada mente</span></h1>
    <p class="pr_desc">Desde el estudiante que quiere anotar ideas rápidas hasta el equipo que crea en colaboración. Elige el plan que acompaña tu ritmo.</p>
  </div>
  
  <div class="pr_grid">
    ${n.map((e,t)=>`
      <div class="pr_card wi_fadeUp ${e.destacado?`destacado`:``}" style="--cc:${e.color}; --d:${t*.15}s">
        ${e.destacado?`<div class="pr_popular"><i class="fas fa-star"></i> Más Elegido</div>`:``}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${e.name}</div>
          <div class="pr_desc_card">${e.desc}</div>
          <div class="pr_price_wrap">
            ${e.customPrice?`
              <div class="pr_price" style="font-size:2.8rem">${e.price}</div>
            `:`
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${e.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${e.features.map(e=>`
            <li class="pr_feat ${e.v?``:`no`}">
              <i class="fas ${e.v?`fa-check`:`fa-xmark`}"></i>
              <span>${e.t}</span>
            </li>
          `).join(``)}
        </ul>
        
        <a href="/p/login" class="pr_btn pr_btn_${e.btnType}">${e.btn}</a>
      </div>
    `).join(``)}
  </div>

  <!-- SECCIÓN COMPROMISO -->
  <div class="pr_trust_sec">
    <div class="pr_trust_head pr_anim" style="--d:0.2s">
      <h2>¿Por qué confiar en <span>${t}</span>?</h2>
      <p>No somos solo una app de notas. Somos el ecosistema que te ayuda a pensar mejor, organizarte más rápido y nunca perder una idea brillante.</p>
    </div>
    <div class="pr_trust_grid">
      <div class="pr_trust_card pr_anim" style="--d:0.3s">
        <i class="fas fa-bolt"></i>
        <h3>Captura en &lt;1 segundo</h3>
        <p>El módulo Flash está diseñado para que en menos de un segundo ya estés escribiendo. Sin fricciones, sin clics extras.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.4s">
        <i class="fas fa-cloud-arrow-up"></i>
        <h3>Siempre sincronizado</h3>
        <p>Tus notas viven en la nube. Empieza en tu celular en el bus y termina en tu PC en casa. Sin cables, sin copiar nada.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.5s">
        <i class="fas fa-shield-halved"></i>
        <h3>Privacidad Absoluta</h3>
        <p>Tus ideas son solo tuyas. Encriptación de nivel bancario y sin lectura de contenido por terceros. Tu mente, tu espacio.</p>
      </div>
    </div>
  </div>

</div>
`,i=()=>{e(`.pr_card, .pr_anim`,null,{anim:`pr_anim`,stagger:80}),console.log(`💳 ${t} v13 · Precios OK`)},a=()=>{console.log(`🧹 Precios limpiado`)};export{a as cleanup,i as init,r as render};