import $ from 'jquery';
import { app } from './wii.js';
import { Notificacion, wiPath, wiFade } from './widev.js';
import * as inicioMod from './todos/inicio.js';

// ── NAV COMUN — rutas compartidas entre todos los roles ────────────────────────
const COMUN = [
  { href: '/misnotas', page: 'misnotas', ico: 'fa-note-sticky',    txt: 'Mis Notas' },
  { href: '/flash',    page: 'flash',    ico: 'fa-bolt',           txt: 'Flash' },
  { href: '/tareas',   page: 'tareas',   ico: 'fa-tasks',          txt: 'Tareas' },
  { href: '/word',     page: 'word',     ico: 'fa-pen-to-square',  txt: 'Word' },
  { href: '/links',    page: 'links',    ico: 'fa-link',           txt: 'Links' },
  { href: '/tablero',  page: 'tablero',  ico: 'fa-th',             txt: 'Tablero' },
  { href: '/blog',     page: 'blog',     ico: 'fa-blog',           txt: 'Blog' },
  { href: '/precios',  page: 'precios',  ico: 'fa-tag',            txt: 'Precios' },
  { href: '/acerca',   page: 'acerca',   ico: 'fa-circle-info',    txt: 'Acerca' },
];

// ── NAV — Config visual por rol (nvleft = izquierda, nvright = derecha) ────────
export const NAV = {
  todos: {
    nvleft:  [{ href: '/', page: 'inicio', ico: 'fa-house', txt: 'Inicio' }, ...COMUN],
    nvright: [
      { href: '/descubre', page: 'descubre', ico: 'fa-gauge',       txt: 'Descubre'  },
      { isBtn: true, cls: 'bt_auth registrar', ico: 'fa-user-plus', txt: 'Registrar' },
      { isBtn: true, cls: 'bt_auth login',     ico: 'fa-sign-in-alt', txt: 'Login'  },
    ],
  },
  smile: {
    nvleft:  [{ href: '/smile', page: 'smile', ico: 'fa-house', txt: 'Dashboard' }, ...COMUN],
    nvright: [
      // { href: '/win',      page: 'win',      ico: 'fa-rocket', txt: 'Planificar'     },
      { href: '/nuevo',    page: 'nuevo',    ico: 'fa-plus',        txt: 'Post' },
      // { href: '/notas',    page: 'notas',    ico: 'fa-note-sticky', txt: 'Notas'      },
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments',    txt: 'Mensajes'   },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  gestor: {
    nvleft:  [{ href: '/gestor', page: 'gestor', ico: 'fa-house', txt: 'Dashboard' }, ...COMUN],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  empresa: {
    nvleft:  [{ href: '/empresa', page: 'empresa', ico: 'fa-building', txt: 'Panel' }],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  admin: {
    nvleft: [
      { href: '/admin',    page: 'admin',    ico: 'fa-globe', txt: 'Plataforma' },
      { href: '/usuarios', page: 'usuarios', ico: 'fa-users', txt: 'Usuarios'   },
    ],
    nvright: [
      { href: '/mensajes', page: 'mensajes', ico: 'fa-comments', txt: 'Mensajes' },
      { isPerfil: true }, { isSalir: true },
    ],
  },
};

// ── RUTAS — Fuente única de verdad ─────────────────────────────────────────────
// roles: null = público · ['rol',...] = protegido · area = carpeta del módulo
export const RUTAS = [
  // ── Públicas ───────────────────────────────────────────
  { path: '/inicio',   area: 'todos/'          },
  { path: '/acerca',   area: 'todos/'          },
  { path: '/login',    area: 'todos/'          },
  { path: '/descubre', area: 'todos/'          },
  { path: '/emojis',   area: 'todos/'          },
  { path: '/precios',  area: 'todos/'          },
  { path: '/blog',     area: 'todos/blog/'     },
  { path: '/post',     area: 'todos/blog/'     },
  { path: '/chatwil',  area: 'todos/chatwil/'  },
  { path: '/misnotas', area: 'todos/'          },
  { path: '/flash',    area: 'todos/'          },
  { path: '/tareas',   area: 'todos/'          },
  { path: '/word',     area: 'todos/'          },
  { path: '/links',    area: 'todos/'          },
  { path: '/tablero',  area: 'todos/'          },

  // ── Autenticadas ───────────────────────────────────────
  { path: '/smile',    area: 'smile/',      roles: ['smile','gestor','empresa','admin'] },
  { path: '/notas',    area: 'smile/',      roles: ['smile','gestor','empresa','admin'] },
  { path: '/perfil',   area: 'smile/',      roles: ['smile','gestor','empresa','admin'] },
  { path: '/mensajes', area: 'smile/',      roles: ['smile','gestor','empresa','admin'] },
  { path: '/win',      area: 'smile/',      roles: ['smile','gestor','empresa','admin'] },
  { path: '/nuevo',    area: 'todos/blog/', roles: ['smile','gestor','empresa','admin'] },
  
  { path: '/gestor',   area: 'gestor/',     roles: ['gestor','empresa','admin']         },
  { path: '/empresa',  area: 'empresa/',    roles: ['empresa','admin']                  },
  { path: '/admin',    area: 'admin/',      roles: ['admin']                            },
  { path: '/usuarios', area: 'admin/',      roles: ['admin']                            },
];

// ── GLOB — Vite mapea todos los módulos en build time ─────────────────────────
const MODS = import.meta.glob('./**/*.js');
const rutasMod = (area, page) => MODS[`./${area}${page}.js`];

// ── MOTOR ──────────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};               // funciones lazy originales — nunca se sobreescriben
    this.cache     = { '/inicio': inicioMod }; // inicio eagerly bundled, cero red
    this.modActual = null;
    this.cargand   = false;
    this.HOME      = 'inicio';
    this.main      = '#wimain';
  }

  register(path, fn) { this.rutas[path] = fn; }

  registerAll(getRol) {
    const pub = {}, priv = {};

    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      const page = mod ?? path.split('/').pop();
      const imp  = rutasMod(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ${area}${page}.js`); return; }
      roles === null ? (pub[path] = imp) : (priv[path] ??= []).push({ roles, imp });
    });

    const noAuth = () => Promise.resolve({
      render: () => '',
      init:   () => setTimeout(() => this.navigate('/login'), 0),
    });

    new Set([...Object.keys(pub), ...Object.keys(priv)]).forEach(path => {
      const pubImp   = pub[path];
      const privList = priv[path] || [];
      const resolve  = () => { const rol = getRol?.() || 'smile'; return privList.find(e => e.roles.includes(rol)); };

      if (!privList.length)  return this.register(path, pubImp);
      if (!pubImp)           return this.register(path, () => { const e = resolve(); return e ? e.imp() : noAuth(); });
      this.register(path, () => { const e = resolve(); return e ? e.imp() : pubImp(); });
    });
  }

  // ── PREFETCH: descarga el módulo al hacer hover, sin bloquear nada ───────────
  async prefetch(ruta) {
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
    if (this.cache[norm] || !this.rutas[norm]) return;   // ya listo o no existe
    try {
      this.cache[norm] = await this.rutas[norm]();
      console.log(`⚡ Listo ${norm.replace('/', '')}`);
    } catch { console.warn('[ruta] prefetch falló:', norm); }
  }

  // ── NAVIGATE: si ya está en cache, carga instantánea ─────────────────────────
  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);

    try {
      this.modActual?.cleanup?.();
      const slug = !this.rutas[norm] ? norm.slice(1) : null;
      const cargar  = slug ? rutasMod('todos/blog/', 'post') : (this.rutas[norm] ?? rutasMod('todos/', '404'));
      const mod = this.cache[norm] ?? await cargar();
      if (!slug) this.cache[norm] = mod;

      const [html] = await Promise.all([mod.render(slug)]);
      const pagName = norm.split('/').pop();
      const titulo  = `${pagName.replace(/^\w/, c => c.toUpperCase()) || 'Inicio'} - ${app}`;

      document.body.classList.remove('is-public-profile');
      this.marcarNav(norm);
      await wiFade(this.main, html);
      window.scrollTo(0, 0);
      document.title = titulo;
      mod.init?.(slug);

      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, titulo);
      this.modActual = mod;
    } catch (err) {
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    $('.nv_item').removeClass('active');
    $(`.nv_item[data-page="${pag}"]`).addClass('active');
  }

  init() {
    this.marcarNav(wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual));

    $(document)
      .on('click', '.nv_item', (e) => {
        e.preventDefault();
        const pag = $(e.currentTarget).data('page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      })
      .on('mouseenter touchstart', '.nv_item[data-page]', (e) => {
        const pag = $(e.currentTarget).data('page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      });

    window.addEventListener('popstate', (e) =>
      this.navigate(e.state?.ruta || wiPath.actual, false)
    );
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();