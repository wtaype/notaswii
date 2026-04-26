import './smile.css';
import $ from 'jquery';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { getls, getNombre, fechaHoy, calcMeses, formatearFechaHora } from '../widev.js';
import { app } from '../wii.js';

const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

const fmtFecha = (ts) => {
  if (!ts) return '—';
  const f = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  if (isNaN(f.getTime())) return '—';
  return f.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getSaludo = () => {
  const h = new Date().getHours();
  if (h < 12) return { txt: 'Buenos días',   ico: 'fa-sun'       };
  if (h < 18) return { txt: 'Buenas tardes', ico: 'fa-cloud-sun' };
  return           { txt: 'Buenas noches', ico: 'fa-moon'      };
};

const FRASES = [
  { ico: 'fa-dove',          txt: 'Dios está contigo en cada paso que das. ¡Confía plenamente!' },
  { ico: 'fa-heart',         txt: 'La fe no hace las cosas fáciles, pero sí hace que todo sea posible.' },
  { ico: 'fa-seedling',      txt: 'Tu vida es un testimonio hermoso del amor infinito de Dios.' },
  { ico: 'fa-hands-praying', txt: 'La oración es la llave de la mañana y el cerrojo de la noche.' },
  { ico: 'fa-star',          txt: 'No te rindas, los planes de Dios siempre son mejores que los nuestros.' },
  { ico: 'fa-sun',           txt: 'Cada nuevo amanecer es una nueva misericordia que Él te regala.' },
  { ico: 'fa-shield-halved', txt: 'En medio de la tormenta, Él es tu refugio y tu paz inquebrantable.' },
];

export const render = () => `
  <div class="smw_page">

    <!-- HERO -->
    <div class="smw_hero">
      <div class="smw_hero_inner">
        <div class="smw_avatar" id="smwAvatar"></div>
        <div class="smw_hero_info">
          <p class="smw_saludo"   id="smwSaludo"></p>
          <h1 class="smw_nombre" id="smwNombre"></h1>
          <p class="smw_hoy"     id="smwHoy"></p>
          <div class="smw_badges" id="smwBadges"></div>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div class="smw_wrap">
      <div class="smw_cards" id="smwCards"></div>

      <!-- FRASE MOTIVACIONAL -->
      <div class="smw_motiv" id="smwMotiv"></div>
    </div>

  </div>
`;

export const init = async () => {
  console.log(`✅ Smile Home — ${app}`);

  const user = await waitAuth();
  if (!user) return;

  const wi = getls('wiSmile');
  if (!wi) return;

  const nombre    = getNombre(wi.nombre || wi.usuario || '');
  const fullName  = `${wi.nombre || ''} ${wi.apellidos || ''}`.trim();
  const email     = wi.email || user.email;
  const rol       = wi.rol   || 'smile';
  const meses     = calcMeses(wi.creado?.seconds ? new Date(wi.creado.seconds * 1000) : wi.creado);
  const iniciales = `${(wi.nombre || '?')[0]}${(wi.apellidos || '')[0] || ''}`.toUpperCase();
  const saludo    = getSaludo();
  const frase     = FRASES[Math.floor(Math.random() * FRASES.length)];

  // Hero
  $('#smwAvatar').text(iniciales);
  $('#smwSaludo').html(`<i class="fas ${saludo.ico}"></i> ${saludo.txt}, <strong>${nombre}</strong>`);
  $('#smwNombre').text(fullName);
  $('#smwHoy').text(fechaHoy());
  $('#smwBadges').html(`
    <span class="smw_badge smw_rol"><i class="fas fa-shield-halved"></i> ${rol}</span>
    <span class="smw_badge smw_email"><i class="fas fa-envelope"></i> ${email}</span>
  `);

  // Stats cards
  const tiempoTxt = meses <= 0   ? 'Recién llegado 🎉'
                  : meses === 1  ? '1 mes con nosotros'
                  : `${meses} meses con nosotros`;

  $('#smwCards').html(`
    <div class="smw_card" style="--d:0s">
      <span class="smw_card_ico"><i class="fas fa-book-bible" style="color:var(--mco);"></i></span>
      <div class="smw_card_data">
        <small>Lectura Diaria</small>
        <strong>Biblia en Quechua</strong>
      </div>
    </div>
    <div class="smw_card" style="--d:.07s">
      <span class="smw_card_ico"><i class="fas fa-hands-praying" style="color:#0F9D58;"></i></span>
      <div class="smw_card_data">
        <small>Refugio Espiritual</small>
        <strong>Oración Constante</strong>
      </div>
    </div>
    <div class="smw_card" style="--d:.14s">
      <span class="smw_card_ico"><i class="fas fa-clock-rotate-left" style="color:#E53935;"></i></span>
      <div class="smw_card_data">
        <small>Tiempo en ${app}</small>
        <strong>${tiempoTxt}</strong>
      </div>
    </div>
    <a href="/nuevo" class="smw_card nv_item" data-page="nuevo" style="--d:.21s; text-decoration:none;">
      <span class="smw_card_ico" style="background:var(--mco); color:var(--wb);"><i class="fas fa-pen-nib"></i></span>
      <div class="smw_card_data">
        <small>Blog de Esperanza</small>
        <strong style="color:var(--mco);">Escribir Historia</strong>
      </div>
    </a>
  `);

  // Frase motivacional
  $('#smwMotiv').html(`
    <div class="smw_motiv_inner">
      <span class="smw_motiv_ico"><i class="fas ${frase.ico}"></i></span>
      <div class="smw_motiv_txt">
        <small>Para ti, ${nombre} 💛</small>
        <p>${frase.txt}</p>
      </div>
    </div>
  `);
};

export const cleanup = () => {
  console.log('🧹 Smile Home');
};