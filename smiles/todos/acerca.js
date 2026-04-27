import './acerca.css';
import $ from 'jquery';
import { app, version, by, linkme, icon } from '../wii.js';
import { year, wiTip, wicopy } from '../widev.js';

// ============================================================
// 📦 DATA
// ============================================================
const stats = [
  { num: '∞',    label: 'Notas posibles' },
  { num: '100%', label: 'Gratuito' },
  { num: '24/7', label: 'Disponibilidad' },
  { num: '<1s',  label: 'Velocidad de captura' },
];

const beneficios = [
  { icon: 'fa-bolt', color: 'var(--Oro)', titulo: 'Captura Instantánea', desc: 'Sin formularios ni tiempos de carga.' },
  { icon: 'fa-layer-group', color: 'var(--Dulce)', titulo: 'Todo Organizado', desc: 'Soporte para listas, tableros y texto.' },
  { icon: 'fa-cloud-arrow-up', color: 'var(--Paz)', titulo: 'Sincronización', desc: 'Multidispositivo en tiempo real.' },
  { icon: 'fa-shield-halved', color: 'var(--Cielo)', titulo: 'Privacidad Absoluta', desc: 'Almacenamiento seguro en la nube.' },
];

const modulos = [
  { icon: 'fa-bolt', color: 'var(--Oro)', nombre: 'Flash', url: '/flash' },
  { icon: 'fa-note-sticky', color: 'var(--Futuro)', nombre: 'Borradores', url: '/misnotas' },
  { icon: 'fa-check-double', color: 'var(--Dulce)', nombre: 'Tareas', url: '/tareas' },
  { icon: 'fa-file-word', color: 'var(--Cielo)', nombre: 'Documentos', url: '/word' },
  { icon: 'fa-link', color: 'var(--Mora)', nombre: 'Links', url: '/links' },
  { icon: 'fa-table-columns', color: 'var(--Paz)', nombre: 'Tablero', url: '/tablero' },
];

// ============================================================
// 🎨 RENDER
// ============================================================
export const render = () => `
  <div class="ac_dash">

    <!-- ★ HEADER COMPACTO (Vercel Style) -->
    <header class="ac_dhead">
      <div class="ac_dbrand">
        <div class="ac_dlogo"><i class="fas ${icon}"></i></div>
        <div class="ac_dinfo">
          <h1>${app} <span class="ac_badge">${version}</span></h1>
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
            <p><strong>${app}</strong> nació de una necesidad real: capturar ideas al vuelo sin fricciones. Las herramientas tradicionales exigen demasiados clics; nosotros elegimos la inmediatez.</p>
            <p>Desde el módulo <strong>Flash</strong> hasta el <strong>Tablero Visual</strong>, cada componente ha sido diseñado bajo la premisa de la velocidad, la elegancia y la cero distracción.</p>
            <div class="ac_firma">
              <span>Desarrollado por</span>
              <a href="${linkme}" target="_blank" rel="noopener"><strong>${by}</strong></a>
              <span class="ac_year">${year()}</span>
            </div>
          </div>
        </section>

        <!-- Métricas (Compactas) -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-chart-line"></i> Capacidades</h2>
          </div>
          <div class="ac_stats_grid">
            ${stats.map(s => `
              <div class="ac_stat_item">
                <strong data-target="${s.num.replace(/\D/g,'')}">${s.num}</strong>
                <span>${s.label}</span>
              </div>
            `).join('')}
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
            ${modulos.map((m, i) => `
              <a href="${m.url}" class="ac_mod_item" style="animation-delay:${i * 0.05}s">
                <div class="ac_mod_ico" style="color:${m.color}; background:color-mix(in srgb, ${m.color} 12%, transparent);"><i class="fas ${m.icon}"></i></div>
                <strong>${m.nombre}</strong>
                <i class="fas fa-arrow-right ac_mod_arrow"></i>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- Infraestructura / Beneficios -->
        <section class="ac_card">
          <div class="ac_card_header">
            <h2><i class="fas fa-server"></i> Infraestructura</h2>
          </div>
          <div class="ac_feat_list">
            ${beneficios.map((f, i) => `
              <div class="ac_feat_item" style="animation-delay:${i * 0.05}s">
                <i class="fas fa-check-circle" style="color:${f.color}"></i>
                <div class="ac_feat_txt">
                  <strong>${f.titulo}</strong>
                  <span>${f.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

      </div>

    </main>
  </div>
`;

// ============================================================
// 🔢 COUNTER ANIMATION
// ============================================================
const animateCounters = () => {
  $('.ac_counter').each(function () {
    const $el = $(this);
    const targetVal = $el.data('target');
    if (!targetVal) return; // Si es infinito o texto
    
    const target = parseInt(targetVal);
    const originalText = $el.text();
    const suffix = originalText.replace(/[0-9]/g, '');
    const duration = 1500;
    let start = null;
    
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      $el.text(current + (progress >= 1 ? suffix : ''));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

// ============================================================
// ⚡ INIT
// ============================================================
export const init = () => {
  // Ejecutar contadores de inmediato (ya no dependemos del scroll)
  setTimeout(animateCounters, 300);

  $('#ac_compartir').on('click', function () {
    const url = 'https://notaswii.web.app/';
    if (navigator.share) {
      navigator.share({ title: app, text: `✍️ ${app} — Ecosistema de productividad.`, url }).catch(() => {});
    } else {
      wicopy(url, this, '¡Link copiado!');
    }
  });

  console.log(`📝 ${app} ${version} · Acerca (Compact Pro)`);
};

export const cleanup = () => {
  $('#ac_compartir').off('click');
};