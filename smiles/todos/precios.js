import './precios.css';
import { app, version } from '../wii.js';
import { wiVista } from '../widev.js';

const planes = [
  {
    id: 'gratis', color: '#8b9bb4', name: 'Gratis', desc: 'Todo lo que necesitas para empezar a anotar hoy mismo.', price: '0',
    btn: 'Empezar Gratis', btnType: 'outline',
    features: [
      { t: 'Módulo Flash (captura rápida)',  v: true  },
      { t: 'Hasta 20 notas locales',         v: true  },
      { t: 'Tareas y checklists',            v: true  },
      { t: 'Guardado en localStorage',       v: true  },
      { t: 'Sincronización en la nube',      v: false },
      { t: 'Tablero visual',                 v: false },
    ]
  },
  {
    id: 'personal', color: '#0EBEFF', name: 'Personal', desc: 'Para mentes activas que quieren notas en todos sus dispositivos.', price: '3',
    btn: 'Elegir Personal', btnType: 'outline',
    features: [
      { t: 'Todo lo de Gratis, más:',       v: true },
      { t: 'Notas ilimitadas en la nube',   v: true },
      { t: 'Sincronización multi-dispositivo', v: true },
      { t: 'Tablero visual completo',       v: true },
      { t: 'Colección de Links ilimitada',  v: true },
      { t: 'Exportar notas en PDF',         v: true },
    ]
  },
  {
    id: 'pro', color: '#7000FF', name: 'Pro', desc: 'El ecosistema completo para profesionales y creativos exigentes.', price: '7',
    btn: 'Obtener Pro', btnType: 'solid', destacado: true,
    features: [
      { t: 'Todo lo de Personal, más:',      v: true },
      { t: 'Etiquetas y carpetas avanzadas', v: true },
      { t: 'Historial de versiones (30 días)',v: true },
      { t: 'Asistente IA para resumir',      v: true },
      { t: 'Compartir notas con enlace',     v: true },
      { t: 'Soporte prioritario por email',  v: true },
    ]
  },
  {
    id: 'equipo', color: '#FF8C00', name: 'Equipo', desc: 'Notas colaborativas para equipos que crean juntos.', price: '12',
    btn: 'Elegir Equipo', btnType: 'outline',
    features: [
      { t: 'Todo lo de Pro, más:',            v: true },
      { t: 'Hasta 5 usuarios colaboradores',  v: true },
      { t: 'Notas compartidas en tiempo real',v: true },
      { t: 'Panel de administración',         v: true },
      { t: 'Historial de versiones (90 días)',v: true },
      { t: 'API de integración',              v: true },
    ]
  },
  {
    id: 'empresa', color: '#29C72E', name: 'Empresa', desc: 'Soluciones a medida para organizaciones que necesitan escalar.', price: 'Hablemos',
    btn: 'Contactar Ventas', btnType: 'outline', customPrice: true,
    features: [
      { t: 'Usuarios ilimitados',             v: true },
      { t: 'Dominio y branding personalizados',v: true },
      { t: 'SLA garantizado del 99.9%',       v: true },
      { t: 'Servidor dedicado opcional',      v: true },
      { t: 'Integraciones a medida',          v: true },
      { t: 'Facturación corporativa',         v: true },
    ]
  }
];

export const render = () => `
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Transparente y Sin Sorpresas</div>
    <h1 class="pr_title">Planes diseñados para <span class="pr_grad">cada mente</span></h1>
    <p class="pr_desc">Desde el estudiante que quiere anotar ideas rápidas hasta el equipo que crea en colaboración. Elige el plan que acompaña tu ritmo.</p>
  </div>
  
  <div class="pr_grid">
    ${planes.map((p, i) => `
      <div class="pr_card wi_fadeUp ${p.destacado ? 'destacado' : ''}" style="--cc:${p.color}; --d:${i * 0.15}s">
        ${p.destacado ? `<div class="pr_popular"><i class="fas fa-star"></i> Más Elegido</div>` : ''}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${p.name}</div>
          <div class="pr_desc_card">${p.desc}</div>
          <div class="pr_price_wrap">
            ${p.customPrice ? `
              <div class="pr_price" style="font-size:2.8rem">${p.price}</div>
            ` : `
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${p.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${p.features.map(f => `
            <li class="pr_feat ${f.v ? '' : 'no'}">
              <i class="fas ${f.v ? 'fa-check' : 'fa-xmark'}"></i>
              <span>${f.t}</span>
            </li>
          `).join('')}
        </ul>
        
        <a href="/p/login" class="pr_btn pr_btn_${p.btnType}">${p.btn}</a>
      </div>
    `).join('')}
  </div>

  <!-- SECCIÓN COMPROMISO -->
  <div class="pr_trust_sec">
    <div class="pr_trust_head pr_anim" style="--d:0.2s">
      <h2>¿Por qué confiar en <span>${app}</span>?</h2>
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
`;

export const init = () => {
  wiVista('.pr_card, .pr_anim', null, { anim: 'pr_anim', stagger: 80 });
  console.log(`💳 ${app} ${version} · Precios OK`);
};

export const cleanup = () => {
  console.log('🧹 Precios limpiado');
};
