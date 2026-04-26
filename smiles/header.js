import $ from 'jquery';
import { app, icon } from './wii.js';
import { rutas, NAV } from './rutas.js';
import { Mensaje, wiAuth } from './widev.js';

// ── LOGO — generado desde wii.js ─────────────────────────────────────────────
const LOGO = `<a href="/"><i class="fa-solid ${icon}"></i> ${app}</a>`;

// ── MOTOR DE RENDERIZADO ──────────────────────────────────────────────────────
const buildNav = (items, wi) => items.map(i => {
  if (i.isBtn) return `<button class="${i.cls}"><i class="fas ${i.ico}"></i><span>${i.txt}</span></button>`;
  if (i.isPerfil) return `<a href="/perfil" class="nv_item" data-page="perfil"><img src="${wi?.avatar || `${import.meta.env.BASE_URL}smile.avif`}" alt="${wi?.nombre}"><span>${wi?.nombre}</span></a>`;
  if (i.isSalir) return `<button class="nv_item bt_salir" data-page="inicio"><i class="fa-solid fa-sign-out-alt"></i> <span>Salir</span></button>`;
  return `<a href="${i.href}" class="nv_item" data-page="${i.page}"><i class="fas ${i.ico}"></i> <span>${i.txt}</span></a>`;
}).join('');

const renderHeader = (wi) => {
  const cfg = NAV[wi?.rol] ?? NAV.todos;
  if (wi) Mensaje?.('Bienvenido ' + wi.nombre);
  $('.wilogo').html(LOGO);
  $('.winav').html(buildNav(cfg.nvleft, wi));
  $('.nv_right').html(buildNav(cfg.nvright, wi));
};

// ── AUTH LISTENER ─────────────────────────────────────────────────────────────
wiAuth.on(wi => wi ? renderHeader(wi) : (renderHeader(), rutas.navigate('/')));
const wi = wiAuth.user; wi ? renderHeader(wi) : renderHeader();

// ── EVENTOS GLOBALES ──────────────────────────────────────────────────────────
$(document).on('click', '.bt_salir', async () => {
  const { salir } = await import('./todos/login.js');
  salir(['wiTema', 'wiSmart', 'wiFresh']);
});

$(document).on('click', '.bt_auth', async function () {
  const { abrirLogin } = await import('./todos/login.js');
  abrirLogin($(this).hasClass('registrar') ? 'registrar' : 'login');
});
