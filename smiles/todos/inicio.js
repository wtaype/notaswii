import './inicio.css';
import $ from 'jquery';
import { app, version, by, linkme } from '../wii.js';
import { wiVista, year, wiTip, Saludar } from '../widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = ['Estudiantes productivos 🚀','Escritores creativos 📝','Desarrolladores pro 💻','Equipos ágiles ⚡', 'Mentes maestras 🧠'];

const stats = [
  { valor:100,  label:'Gratis',            sufijo:'%' },
  { valor:0,    label:'Distracciones',     sufijo:'' },
  { valor:6,    label:'Módulos Premium',   sufijo:'' },
  { valor:1,    label:'Ecosistema total',  sufijo:'' },
];

const features = [
  { id:'misnotas',  icon:'fa-note-sticky', color:'#0EBEFF', nombre:'Mis Notas',  desc:'Tu cerebro digital en la nube',
    items:[{icon:'fa-cloud',name:'Auto-guardado',desc:'Seguridad en tiempo real'},{icon:'fa-thumbtack',name:'Fijar Notas',desc:'Lo importante primero'},{icon:'fa-bolt',name:'Rápido',desc:'Acceso instantáneo'}]},
  { id:'flash',   icon:'fa-bolt',    color:'#FFDA34', nombre:'Captura Flash',   desc:'Ideas brillantes en milisegundos',
    items:[{icon:'fa-eye-slash',name:'Modo Zen',desc:'Cero distracciones'},{icon:'fa-wind',name:'Fluidez',desc:'A la velocidad del pensamiento'},{icon:'fa-brain',name:'Retención',desc:'No pierdas más ideas'}]},
  { id:'tareas',  icon:'fa-tasks',   color:'#29C72E', nombre:'Checklists Pro',  desc:'Domina tus pendientes diarios',
    items:[{icon:'fa-check-circle',name:'Tachado Auto',desc:'Satisfacción garantizada'},{icon:'fa-chart-line',name:'Progreso',desc:'Barras de estado dinámicas'},{icon:'fa-layer-group',name:'Organización',desc:'Múltiples listas a la vez'}]},
  { id:'word', icon:'fa-pen-to-square',   color:'#2B579A', nombre:'Word Avanzado', desc:'El lienzo perfecto para tus ensayos',
    items:[{icon:'fa-file-lines',name:'Lienzo A4',desc:'Simulador de página real'},{icon:'fa-font',name:'Tipografías',desc:'Fuentes premium incluidas'},{icon:'fa-print',name:'Formato Rico',desc:'Opciones completas de estilo'}]},
  { id:'links',  icon:'fa-link', color:'#FF5C69', nombre:'Enlaces Rápidos',  desc:'Tus favoritos a un clic',
    items:[{icon:'fa-globe',name:'Extracción',desc:'Dominios automáticos'},{icon:'fa-copy',name:'Copiar rápido',desc:'Un clic al portapapeles'},{icon:'fa-shield-halved',name:'Seguro',desc:'Borrado con confirmación'}]},
  { id:'tablero', icon:'fa-th-large',   color:'#7000FF', nombre:'Tablero Masonry', desc:'Tu muro de inspiración visual',
    items:[{icon:'fa-palette',name:'Glassmorphism',desc:'Fondos vibrantes'},{icon:'fa-table-cells-large',name:'Masonry',desc:'Layout fluido e inteligente'},{icon:'fa-expand',name:'Auto-ajuste',desc:'Textos que crecen solos'}]},
];

const beneficios = [
  { icon:'fa-layer-group',titulo:'Un ecosistema unificado',   desc:'Deja de saltar entre 5 aplicaciones distintas. Notas, tareas, documentos y enlaces, todo en una sola plataforma maravillosamente diseñada.' },
  { icon:'fa-bolt',       titulo:'Velocidad relámpago',   desc:'Construida con tecnología de punta (Vite + Vanilla JS), la plataforma carga en milisegundos y reacciona al instante a cada uno de tus clics.' },
  { icon:'fa-shield-halved',titulo:'Privacidad y seguridad', desc:'Tus datos respaldados en la infraestructura global de Google Cloud (Firebase) con reglas de seguridad estrictas y sanitización anti-hackers.' },
];

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplFeature = f => `
  <div class="ini_cat_card" style="--cc:${f.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it=>`
        <li><div class="ini_tool_a">
          <i class="fas ${it.icon}"></i>
          <div><strong>${it.name}</strong><span>${it.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b,i) => `
  <div class="ini_about_card" style="--d:${i*.15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${Saludar()}</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        El Ecosistema <span class="ini_grad">Definitivo</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${roles.map((r,i)=>`<span class="ini_role${i===0?' active':''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub" style="--d:.54s">
        Centraliza todas tus ideas, tareas, documentos y enlaces en un solo espacio profesional. Carga ultrarrápida, diseño impecable y 100% gratis.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${stats.map(tplStat).join('')}
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
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${wiTip('Notas')}><i class="fas fa-note-sticky"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${wiTip('Word')}><i class="fas fa-pen-to-square"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${wiTip('Flash')}><i class="fas fa-bolt"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${wiTip('Tareas')}><i class="fas fa-tasks"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Módulos</span> del Éxito</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Herramientas poderosas diseñadas para maximizar tu productividad diaria</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Por qué usar <span class="ini_grad">${app}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-rocket ini_cta_ico"></i>
      <h2>¿Listo para organizar tu vida digital?</h2>
      <p>Crea tu cuenta en segundos y únete al ecosistema de productividad definitivo.</p>
      <div class="ini_cta_chips">
        <a href="/login" class="ini_btn_p"><i class="fas fa-arrow-right"></i> Entrar a ${app}</a>
      </div>
      <p class="ini_cta_autor" style="margin-top:2vh;">Creado con ❤️ por <a href="${linkme}" target="_blank" rel="noopener">${by}</a> · ${version} © ${year()}</p>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {

  // Roles rotantes
  let ri = 0;
  const $r = $('.ini_role');
  setInterval(() => { $r.removeClass('active'); $r.eq(ri = (ri+1) % $r.length).addClass('active'); }, 2800);

  // Stats contador — al entrar en viewport
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function() {
      const $n = $(this), obj = +$n.data('target'), suf = $n.data('sufijo') || '';
      let v = 0;
      const t = setInterval(() => {
        v += obj / 50;
        if (v >= obj) { $n.text(obj + suf); clearInterval(t); }
        else $n.text(Math.floor(v));
      }, 28);
    });
  });

  // Scroll animations
  wiVista('.ini_cat_card',   null, { anim:'wi_fadeUp', stagger:80  });
  wiVista('.ini_about_card', null, { anim:'wi_fadeUp', stagger:140 });

  console.log(`🚀 ${app} ${version} · Inicio OK`);
};

export const cleanup = () => {};