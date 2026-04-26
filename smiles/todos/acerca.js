import './acerca.css';
import $ from 'jquery';
import { app, version, by, linkme, icon } from '../wii.js';
import { wiVista, year, wiTip, wicopy } from '../widev.js';

// ============================================================
// 📦 DATA
// ============================================================
const stats = [
  { num: '∞',    label: 'Notas posibles',        icon: 'fa-infinity',       color: '#0EBEFF' },
  { num: '100%', label: 'Gratis para empezar',   icon: 'fa-heart',          color: '#FF5C69' },
  { num: '24/7', label: 'Siempre disponible',    icon: 'fa-clock',          color: '#29C72E' },
  { num: '<1s',  label: 'Para anotar tu idea',   icon: 'fa-bolt',           color: '#7000FF' },
];

const beneficios = [
  {
    icon: 'fa-bolt', color: 'Cielo',
    titulo: 'Captura Instantánea',
    desc: 'Abre NotasWii y en menos de un segundo ya estás escribiendo. Sin formularios, sin distracciones. Solo tus ideas.',
  },
  {
    icon: 'fa-layer-group', color: 'Dulce',
    titulo: 'Todo Organizado',
    desc: 'Notas rápidas, tareas con checklist, links guardados y un tablero visual. Cada idea en su lugar exacto.',
  },
  {
    icon: 'fa-cloud-arrow-up', color: 'Paz',
    titulo: 'Sincronización Inteligente',
    desc: 'Tus apuntes siempre contigo. Empieza en tu PC y termina en tu celular. Sin perder nada, nunca.',
  },
  {
    icon: 'fa-shield-halved', color: 'Mora',
    titulo: 'Privacidad Absoluta',
    desc: 'Tus notas son solo tuyas. Almacenamiento seguro y encriptado. Nadie más leerá lo que escribiste.',
  },
  {
    icon: 'fa-palette', color: 'Cielo',
    titulo: 'Diseño Premium',
    desc: 'Interfaz minimalista con temas personalizables. Un entorno de escritura que da gusto usar cada día.',
  },
  {
    icon: 'fa-mobile-screen', color: 'Dulce',
    titulo: 'Mobile First',
    desc: 'Diseñado para el celular desde el primer pixel. Rápido, responsivo y optimizado para cualquier pantalla.',
  },
];

const modulos = [
  { icon: 'fa-bolt',         color: '#0EBEFF', nombre: 'Flash',     desc: 'Captura instantánea de ideas', url: '/flash'    },
  { icon: 'fa-note-sticky',  color: '#FF5C69', nombre: 'Mis Notas', desc: 'Tu historial completo',        url: '/misnotas' },
  { icon: 'fa-check-double', color: '#29C72E', nombre: 'Tareas',    desc: 'Listas y checklists',          url: '/tareas'   },
  { icon: 'fa-link',         color: '#FFB800', nombre: 'Links',     desc: 'Guarda URLs importantes',      url: '/links'    },
  { icon: 'fa-table-columns',color: '#7000FF', nombre: 'Tablero',   desc: 'Vista visual de tus notas',    url: '/tablero'  },
];

const pasos = [
  { num: '1', icon: 'fa-bolt',          titulo: 'Abre y Escribe',  desc: 'Entra a Flash y empieza a escribir de inmediato. Sin cuenta, sin configuración.' },
  { num: '2', icon: 'fa-layer-group',   titulo: 'Organiza',        desc: 'Clasifica tus ideas en notas, tareas o links. Todo con un clic.' },
  { num: '3', icon: 'fa-cloud-arrow-up',titulo: 'Sincroniza',      desc: 'Crea una cuenta y tus apuntes estarán en todos tus dispositivos al instante.' },
];

const testimonios = [
  { avatar: '👩‍🎓', nombre: 'Valeria M.',  rol: 'Estudiante universitaria',
    texto: 'NotasWii cambió cómo estudio. Capturo ideas al instante en clases y luego las organizo en el tablero. ¡Es increíblemente rápido!', estrellas: 5 },
  { avatar: '👨‍💻', nombre: 'Rodrigo T.',  rol: 'Desarrollador freelance',
    texto: 'Uso Flash todo el día para guardar snippets y links. El hecho de que ya esté listo para escribir al abrir la app es un game changer.', estrellas: 5 },
  { avatar: '👩‍💼', nombre: 'Lucía P.',   rol: 'Gerente de proyectos',
    texto: 'Las listas de tareas con checklist son perfectas para mi equipo. Todo organizado, sin complicaciones y con un diseño impecable.', estrellas: 5 },
  { avatar: '✍️',  nombre: 'Marco G.',   rol: 'Escritor creativo',
    texto: 'El tablero visual es lo que necesitaba para organizar mis capítulos. NotasWii se convirtió en mi herramienta de escritura favorita.', estrellas: 5 },
];

// ============================================================
// 🎨 RENDER
// ============================================================
export const render = () => `
<div class="ac_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_logo">
        <i class="fas ${icon}" style="font-size:4rem;color:var(--mco);"></i>
      </div>
      <div class="ac_hero_badge"><i class="fas fa-pen-nib"></i> El ecosistema de notas más rápido</div>
      <h1 class="ac_hero_tit">${app}</h1>
      <p class="ac_hero_sub">
        Tu centro de ideas, apuntes y recordatorios con diseño premium.
        <strong>Abre. Escribe. Nunca pierdas una idea.</strong>
      </p>
      <div class="ac_hero_stats">
        ${stats.map(s => `
          <div class="ac_stat" style="--sc:${s.color}">
            <i class="fas ${s.icon}" style="color:${s.color}"></i>
            <strong>${s.num}</strong>
            <span>${s.label}</span>
          </div>`).join('')}
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
      <h2 class="ac_sec_tit">El propósito de <span class="ac_grad">${app}</span></h2>
    </div>
    <div class="ac_historia wi_fadeUp">
      <p><strong>NotasWii</strong> nació de una necesidad real: ¿cuántas veces tuviste una idea brillante y no encontraste dónde anotarla rápido? La mayoría de apps de notas te piden demasiado antes de dejarte escribir.</p>

      <p>En <em>NotasWii</em> el enfoque es diferente. Entras, y ya estás escribiendo. Sin registro obligatorio, sin formularios, sin fricción. Tu idea se guarda automáticamente y está lista cuando vuelvas.</p>

      <p>El proyecto fue desarrollado con la filosofía de que las mejores herramientas son las que no se notan: solo funcionan, son rápidas, bonitas y confiables. Desde el módulo <strong>Flash</strong> para capturas instantáneas, hasta el <strong>Tablero</strong> visual para organizar tus proyectos, cada función fue pensada para una sola cosa: que nunca pierdas una buena idea.</p>

      <p>Si llegaste hasta aquí, ¡gracias por ser parte de NotasWii! Tu mente merece el mejor espacio para crecer. 🚀</p>

      <div class="ac_firma">
        <strong>Con pasión, Wilder Taype</strong>
        <span>Creador de ${app}</span>
      </div>
    </div>
  </section>

  <!-- ══ BENEFICIOS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-star"></i> ¿Por qué ${app}?</div>
      <h2 class="ac_sec_tit">Diseñado para <span class="ac_grad">tu productividad</span></h2>
      <p class="ac_sec_sub">Cada detalle fue pensado para que anotes más rápido y mejor</p>
    </div>
    <div class="ac_feat_grid">
      ${beneficios.map(f => `
        <div class="ac_feat_card wi_fadeUp ac_color_${f.color.toLowerCase()}">
          <div class="ac_feat_ico"><i class="fas ${f.icon}"></i></div>
          <h3>${f.titulo}</h3>
          <p>${f.desc}</p>
        </div>`).join('')}
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
      ${pasos.map((p, i) => `
        <div class="ac_paso wi_fadeUp">
          <div class="ac_paso_num">${p.num}</div>
          <div class="ac_paso_ico"><i class="fas ${p.icon}"></i></div>
          <h3>${p.titulo}</h3>
          <p>${p.desc}</p>
        </div>
        ${i < pasos.length - 1 ? '<div class="ac_paso_sep"><i class="fas fa-chevron-right"></i></div>' : ''}`
      ).join('')}
    </div>
  </section>

  <!-- ══ TESTIMONIOS ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Comunidad</div>
      <h2 class="ac_sec_tit">Personas que usan <span class="ac_grad">${app}</span></h2>
      <p class="ac_sec_sub">Descubre cómo NotasWii está potenciando mentes creativas</p>
    </div>
    <div class="ac_test_grid">
      ${testimonios.map(t => `
        <div class="ac_test_card wi_fadeUp">
          <div class="ac_test_stars">${'<i class="fas fa-star"></i>'.repeat(t.estrellas)}</div>
          <p class="ac_test_txt">"${t.texto}"</p>
          <div class="ac_test_autor">
            <span class="ac_test_avatar">${t.avatar}</span>
            <div><strong>${t.nombre}</strong><span>${t.rol}</span></div>
          </div>
        </div>`).join('')}
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
      ${modulos.map(m => `
        <a href="${m.url}" class="ac_modulo_card wi_fadeUp" style="--mc:${m.color}">
          <div class="ac_modulo_ico"><i class="fas ${m.icon}"></i></div>
          <div class="ac_modulo_info">
            <strong>${m.nombre}</strong>
            <span>${m.desc}</span>
          </div>
          <div class="ac_modulo_arr"><i class="fas fa-arrow-right"></i></div>
        </a>`).join('')}
    </div>
  </section>

  <!-- ══ CTA ══ -->
  <section class="ac_cta_sec">
    <div class="ac_cta_wrap wi_fadeUp">
      <div class="ac_cta_glow"></div>
      <div class="ac_cta_particles">
        ${Array.from({length:6}).map(()=>'<span class="ac_particle"></span>').join('')}
      </div>
      <div class="ac_cta_inner">
        <span class="ac_cta_emoji">✍️</span>
        <h2>¿Listo para organizar<br>tu mente?</h2>
        <p>Empieza a anotar ahora mismo. Sin registro, sin complicaciones.</p>
        <div class="ac_cta_chips">
          ${modulos.map(m=>`
            <a href="${m.url}" class="ac_chip" style="--cc:${m.color}" ${wiTip(m.desc)}>
              <i class="fas ${m.icon}"></i> ${m.nombre}
            </a>`).join('')}
        </div>
        <div class="ac_cta_btns">
          <a href="/flash" class="ac_btn_p ac_btn_lg"><i class="fas fa-bolt"></i> Captura Flash</a>
          <a href="/misnotas" class="ac_btn_s ac_btn_lg"><i class="fas fa-note-sticky"></i> Mis Notas</a>
        </div>
        <p class="ac_footer_txt">
          ${app} ${version} · Hecho con <i class="fas fa-heart"></i> por
          <a href="${linkme}" target="_blank" rel="noopener">${by}</a> · ${year()}
        </p>
      </div>
    </div>
  </section>

</div>`;

// ============================================================
// 🔢 COUNTER ANIMATION
// ============================================================
const _animateCounters = () => {
  $('.ac_counter_num').each(function () {
    const $el = $(this), target = +$el.data('target'), duration = 1800;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      $el.text(Math.floor(ease * target).toLocaleString());
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

// ============================================================
// ⚡ INIT
// ============================================================
export const init = () => {
  wiVista('.ac_modulo_card', null, { anim: 'wi_fadeUp', stagger: 60  });
  wiVista('.ac_feat_card',   null, { anim: 'wi_fadeUp', stagger: 80  });
  wiVista('.ac_paso',        null, { anim: 'wi_fadeUp', stagger: 120 });
  wiVista('.ac_test_card',   null, { anim: 'wi_fadeUp', stagger: 80  });
  wiVista('.ac_historia',    null, { anim: 'wi_fadeUp' });
  wiVista('.ac_cta_wrap',    null, { anim: 'wi_fadeUp' });

  const $band = $('.ac_counter_band')[0];
  if ($band) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { _animateCounters(); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe($band);
  }

  $('#ac_compartir').on('click', function () {
    const url = 'https://notaswii.web.app/';
    if (navigator.share) {
      navigator.share({ title: app, text: `✍️ ${app} — Tu centro de notas premium. Abre y escribe, sin fricciones.`, url }).catch(() => {});
    } else {
      wicopy(url, this, '¡Link copiado! ✨');
    }
  });

  console.log(`📝 ${app} ${version} · Acerca ${year()}`);
};

export const cleanup = () => {
  $('#ac_compartir').off('click');
  console.log('🧹 Acerca limpiado');
};