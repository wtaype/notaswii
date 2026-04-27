import{t as e}from"./vendor-BDh6mtVu.js";import{t}from"./wii-BOG14u5H.js";import{S as n,b as r,c as i,f as a,h as o,n as s,o as c,p as l}from"./widev-DTlDEmBw.js";import{n as u}from"./rutas-DkTvaDBY.js";import{A as d,D as f,E as p,S as m,_ as h,a as g,c as _,d as v,g as y,l as b,n as x,o as S,s as ee,t as C,u as w,w as T,x as E}from"./firebase-CCUuWaKQ.js";import{n as D,t as O}from"./firebase-B1jMBrFt.js";var k={db:`smiles`,pagina:`rol`},A=`si`,j=`si`,M=`si`,N=`si`,P={smile:`/misnotas`,gestor:`/gestor`,empresa:`/empresa`,admin:`/admin`},F={"auth/email-already-in-use":`Email ya registrado`,"auth/weak-password":`Contraseña débil (mín. 6)`,"auth/invalid-credential":`Contraseña incorrecta`,"auth/invalid-email":`Email no válido`,"auth/missing-email":`Usuario no registrado`,"auth/too-many-requests":`Demasiados intentos`},I=e=>e.replace(/[<>="'`;/\\$}{]/g,``).replace(/\s+/g,` `).trim(),L={regEmail:[e=>e.replace(/[<>="'`;/\\$}{ ]/g,``).toLowerCase().trim(),e=>/^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)||`Email inválido`],regUsuario:[e=>e.toLowerCase().replace(/[^a-z0-9_-]/g,``).trim(),e=>e.length>=4||`Mínimo 4 caracteres`],regNombre:[I,e=>e.length>0||`Ingresa tu nombre`],regApellidos:[I,e=>e.length>0||`Ingresa tus apellidos`],regPassword:[e=>e,e=>e.length>=6||`Mínimo 6 caracteres`],regPassword1:[e=>e,t=>t===e(`#regPassword`).val()||`No coinciden`]},R=(e,t,n,r,i=!1)=>`<div class="wilg_grupo"><i class="fas fa-${e}"></i><input type="${t}" id="${n}" placeholder="${r}" autocomplete="off">${i?`<i class="fas fa-eye wilg_ojo"></i>`:``}</div>`,z=(e=`smile`)=>e===`smile`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_info_badge wilg_badge_smile">
        <i class="fas fa-rocket"></i> Ideal para influencers, freelancers y marca personal.
      </div>
    </div>`:e===`gestor`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-store"></i> Información del Negocio</div>
      <div class="wilg_extra_field" id="extraField">
        ${R(`store`,`text`,`regEmpresaNombre`,`Nombre de tu negocio o tienda`)}
      </div>
      <div class="wilg_info_badge wilg_badge_gestor">
        <i class="fas fa-bolt"></i> Activación inmediata. Herramientas de catálogo y WhatsApp.
      </div>
    </div>`:e===`empresa`?`
    <div class="wilg_rol_extra" id="rolExtra">
      <div class="wilg_extra_label"><i class="fas fa-building"></i> Datos Corporativos</div>
      <div class="wilg_extra_field wilg_extra_2col" id="extraField">
        ${R(`id-card`,`text`,`regRuc`,`RUC (Opcional)`)}
        ${R(`building`,`text`,`regEmpresaNombre`,`Nombre de la empresa`)}
      </div>
      <div class="wilg_info_badge wilg_badge_empresa">
        <i class="fas fa-users-cog"></i> Cuenta para gestionar múltiples perfiles y equipos.
      </div>
    </div>`:``,B={login:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/notaswii/smile.avif" alt="${t}"></div>
      <h2>Bienvenido</h2><p>Inicia sesión en tu cuenta</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    ${R(`envelope`,`text`,`email`,`Email o usuario`)}
    ${R(`lock`,`password`,`password`,`Contraseña`,!0)}
    <button type="button" id="Login" class="wilg_btn inactivo"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
    ${M===`si`||N===`si`?`<div class="wilg_links">
      ${M===`si`?`<span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>`:``}
      ${N===`si`?`<span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>`:``}
    </div>`:``}`,registrar:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/notaswii/smile.avif" alt="${t}"></div>
      <h2>Crear Cuenta</h2><p>Únete a la comunidad</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    <div class="wilg_grid">
      ${[[`envelope`,`email`,`regEmail`,`Email`],[`user`,`text`,`regUsuario`,`Usuario`],[`user-tie`,`text`,`regNombre`,`Nombre`],[`user-tie`,`text`,`regApellidos`,`Apellidos`]].map(([e,t,n,r])=>R(e,t,n,r)).join(``)}
      ${R(`lock`,`password`,`regPassword`,`Contraseña`,!0)}
      ${R(`lock`,`password`,`regPassword1`,`Confirmar contraseña`,!0)}
    </div>

    <!-- ── SELECTOR DE ROL ─────────────────── -->
    <div class="wilg_rol_selector">
      <div class="wilg_rol_label"><i class="fas fa-id-badge"></i> Tipo de cuenta</div>
      <div class="wilg_rol_tabs">
        <button type="button" class="wilg_rol_tab active" data-rol="smile">
          <i class="fas fa-user-circle"></i>
          <span>Creador</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="gestor">
          <i class="fas fa-store"></i>
          <span>Negocio</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="empresa">
          <i class="fas fa-building"></i>
          <span>Empresa</span>
        </button>
      </div>
    </div>
    ${z(`smile`)}
    <!-- ─────────────────────────────────────── -->

    <div class="wilg_check">
      <label><input type="checkbox" id="regTerminos">
      <span>Acepto los <a href="/terminos.html" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="Registrar" class="wilg_btn inactivo"><i class="fas fa-user-plus"></i> Registrarme</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`,restablecer:()=>`
    <div class="wilg_head">
      <div class="wilg_logo wilg_logo_sm"><img src="/notaswii/smile.avif" alt="${t}"></div>
      <h2>Recuperar</h2><p>Te enviaremos un enlace a tu email</p>
    </div>
    ${R(`envelope`,`text`,`recEmail`,`Email o usuario`)}
    <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`,username:()=>`
    <div class="wilg_head">
      <div class="wilg_logo"><img src="/notaswii/smile.avif" alt="${t}"></div>
      <h2>¡Casi listo!</h2><p>Completa tus datos de acceso</p>
    </div>
    ${R(`user`,`text`,`regUsuarioGoogle`,`Ingresa un usuario (ej: marcos)`)}
    ${R(`lock`,`password`,`regPasswordGoogle`,`Crea una contraseña segura`,!0)}
    
    <div class="wilg_rol_selector" style="margin-top: 1.5vh;">
      <div class="wilg_rol_label"><i class="fas fa-id-badge"></i> ¿Para qué lo usarás?</div>
      <div class="wilg_rol_tabs">
        <button type="button" class="wilg_rol_tab active" data-rol="smile">
          <i class="fas fa-user-circle"></i><span>Creador</span>
        </button>
        <button type="button" class="wilg_rol_tab" data-rol="gestor">
          <i class="fas fa-store"></i><span>Negocio</span>
        </button>
      </div>
    </div>
    <div class="wilg_check" style="margin-top: 1.5vh;">
      <label><input type="checkbox" id="regTerminosGoogle">
      <span>Acepto los <a href="/terminos.html" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="CompletarGoogle" class="wilg_btn inactivo" style="margin-top: 1.5vh;"><i class="fas fa-rocket"></i> Completar Registro</button>
  `},V=(e,t=``)=>`<div id="wilg_modal" class="wiModal wilg_mod ${t}"><div class="modalBody"><button class="modalX">&times;</button>
   <form id="liForm">${B[e]()}</form></div></div>`,H=(t=`login`)=>{e(`#wilg_modal`).remove();let n=t===`registrar`?`wilg_mod_reg`:``;e(`body`).append(V(t,n)),setTimeout(()=>{c(`wilg_modal`),e(`#liForm input:first`).focus()},50)},U=t=>{let n=t===`registrar`?`wilg_mod_reg`:``;e(`#wilg_modal`).toggleClass(`wilg_mod_reg`,n===`wilg_mod_reg`),e(`#liForm`).html(B[t]()).attr(`data-vista`,t),setTimeout(()=>e(`#liForm input:first`).focus(),30)},W=()=>j!==`si`||o.user?``:`<div class="wilg_wrap"><div class="wilg_card"><form id="liForm"></form></div></div>`,G=()=>{if(j!==`si`){setTimeout(()=>u.navigate(`/`),0);return}let e=o.user;if(e){setTimeout(()=>u.navigate(P[e.rol]||`/`),0);return}K(`login`)},K=t=>{e(`#liForm`).html(B[t]()).attr(`data-vista`,t),setTimeout(()=>e(`#liForm input:first`).focus(),30)},q=t=>e(`#${t}`).val().trim(),J=()=>e(`#wilg_modal.active`).length>0,Y=e=>J()?U(e):K(e),X=async(e,t,n)=>{r(e,!0,t);try{await n()}catch(e){s(F[e.code]||e.message,`error`)}finally{r(e,!1)}},Z=async e=>{if(e.includes(`@`))return{email:e,wi:null};let t=await y(f(D,`smiles`,e));if(!t.exists())throw Error(`Usuario no encontrado`);return{email:t.data().email,wi:t.data()}},Q=t=>{if(!t)return;let[n,r]=t.split(`|`);document.documentElement.dataset.theme=n,e(`meta[name="theme-color"]`).attr(`content`,r),e(`.tema`).removeClass(`mtha`).filter(`[data-ths="${t}"]`).addClass(`mtha`)},te=e=>{if(k.pagina===`actual`)return;let t=k.pagina===`rol`?P[e?.rol]||`/`:k.pagina;u.navigate(t)},$=e=>{o.login(e,7,[`wiSmart`]),e?.tema&&(localStorage.wiTema=e.tema,Q(e.tema)),J()&&i(),te(e)};e(document).on(`submit.wi`,`#liForm`,e=>e.preventDefault()).on(`click.wi`,`.wilg_ojo`,function(){let t=e(this).siblings(`input`);t.attr(`type`,t.attr(`type`)===`password`?`text`:`password`),e(this).toggleClass(`fa-eye fa-eye-slash`)}).on(`input.wi`,`#email, #recEmail, #regEmail`,function(){e(this).val(e(this).val().replace(/[<>="'`;/\\$}{ ]/g,``).toLowerCase())}).on(`input.wi`,`#regUsuario, #regUsuarioGoogle`,function(){e(this).val(e(this).val().toLowerCase().replace(/[^a-z0-9_-]/g,``))}).on(`input.wi`,`#regNombre, #regApellidos`,function(){e(this).val(e(this).val().replace(/[<>="'`;/\\$}{]/g,``))}).on(`click.wi`,`.wilg_reg`,()=>{N===`si`&&Y(`registrar`)}).on(`click.wi`,`.wilg_rec`,()=>{M===`si`&&Y(`restablecer`)}).on(`click.wi`,`.wilg_log`,()=>Y(`login`)).on(`input.wi keyup.wi`,`#password`,t=>{e(`#Login`).removeClass(`inactivo`),t.key===`Enter`&&e(`#Login`).click()}).on(`input.wi keyup.wi`,`#regPassword1`,t=>{e(`#Registrar`).removeClass(`inactivo`),t.key===`Enter`&&e(`#Registrar`).click()}).on(`input.wi keyup.wi`,`#recEmail`,t=>{t.key===`Enter`&&e(`#Recuperar`).trigger(`click`)}).on(`blur.wi`,Object.keys(L).map(e=>`#${e}`).join(`,`),function(){let t=e(this).val();if(!t)return;let[r,i]=L[this.id],a=r(t);e(this).val(a);let o=i(a);o!==!0&&n(this,o,`error`,2500)}).on(`blur.wi`,`#regUsuario`,async function(){let t=q(`regUsuario`);if(!t||t.length<3)return;if(t.includes(`@`))return e(this).data(`ok`,!1),n(this,`No puede contener @`,`error`,2500);let r=!(await y(f(D,`smiles`,t))).exists();e(this).data(`ok`,r),n(this,`Usuario ${r?`disponible <i class="fa-solid fa-check-circle"></i>`:`no disponible <i class="fa-solid fa-times-circle"></i>`}`,r?`success`:`error`,3e3)}).on(`blur.wi`,`#regEmail`,async function(){let t=q(`regEmail`);if(!t||!t.includes(`@`))return;let r=(await h(E(p(D,`smiles`),T(`email`,`==`,t)))).empty;e(this).data(`ok`,r),n(this,`Email ${r?`disponible <i class="fa-solid fa-check-circle"></i>`:`no disponible <i class="fa-solid fa-times-circle"></i>`}`,r?`success`:`error`,3e3)}).on(`click.wi`,`#btnGoogle`,async function(){if(e(this).data(`busy`))return;e(this).data(`busy`,!0);let t=e(this).html();e(this).html(`<i class="fas fa-circle-notch fa-spin"></i> Conectando...`);try{let e=(await _(O,new C)).user,t=await h(E(p(D,`smiles`),T(`uid`,`==`,e.uid)));if(t.empty)window.wiTempGoogleUser=e,Y(`username`);else{let e=t.docs[0].data();if(e.estado===`pendiente`)throw await b(O),Error(`Tu cuenta está pendiente de activación.`);$(e)}}catch(n){n.code!==`auth/popup-closed-by-user`&&n.code!==`auth/cancelled-popup-request`&&s(F[n.code]||n.message,`error`),e(this).html(t).data(`busy`,!1)}}).on(`input.wi keyup.wi`,`#regUsuarioGoogle, #regPasswordGoogle`,function(t){e(`#regUsuarioGoogle`).val().length>=4&&e(`#regPasswordGoogle`).val().length>=6?(e(`#CompletarGoogle`).removeClass(`inactivo`),t.key===`Enter`&&e(`#CompletarGoogle`).click()):e(`#CompletarGoogle`).addClass(`inactivo`)}).on(`blur.wi`,`#regUsuarioGoogle`,async function(){let t=q(`regUsuarioGoogle`);if(!t||t.length<3)return;if(t.includes(`@`))return e(this).data(`ok`,!1),n(this,`No puede contener @`,`error`,2500);let r=!(await y(f(D,`smiles`,t))).exists();e(this).data(`ok`,r),n(this,`Usuario ${r?`disponible <i class="fa-solid fa-check-circle"></i>`:`no disponible <i class="fa-solid fa-times-circle"></i>`}`,r?`success`:`error`,3e3)}).on(`click.wi`,`#CompletarGoogle`,async function(){if(e(this).data(`busy`))return;if(!e(`#regTerminosGoogle`).is(`:checked`))return n(e(`#regTerminosGoogle`)[0],`Acepta los términos`,`error`,2500);let t=q(`regUsuarioGoogle`);if(!t||!e(`#regUsuarioGoogle`).data(`ok`))return n(e(`#regUsuarioGoogle`)[0],`Verifica el usuario`,`error`,2500);let r=q(`regPasswordGoogle`);if(!r||r.length<6)return n(e(`#regPasswordGoogle`)[0],`Mínimo 6 caracteres`,`error`,2500);let i=window.wiTempGoogleUser;if(!i)return s(`Error de sesión con Google. Intenta de nuevo.`,`error`);let a=e(`.wilg_rol_tab.active`).data(`rol`)||`smile`;e(this).data(`busy`,!0),await X(this,`Finalizando`,async()=>{try{await w(i,r)}catch(e){console.warn(`Aviso Auth Password:`,e)}let e=i.displayName?i.displayName.split(` `):[`Usuario`,``],n={usuario:t,email:i.email,nombre:e[0],apellidos:e.slice(1).join(` `)||``,rol:a,estado:`activo`,uid:i.uid,terminos:!0,tema:localStorage.wiTema||`Cielo|#0EBEFF`};await m(f(D,`smiles`,t),{...n,creado:d()}),$(n),s(`<i class="fa-solid fa-rocket"></i> ¡Tu cuenta está lista!`,`success`)}),e(this).data(`busy`,!1)}).on(`click.wi`,`.wilg_rol_tab`,function(){let t=e(this).data(`rol`);e(`.wilg_rol_tab`).removeClass(`active`),e(this).addClass(`active`),e(`#rolExtra`).replaceWith(z(t)),ne()}).on(`change.wi`,`input[name="regExtra"]`,function(){let t=e(this).val();e(`.wilg_extra_opt`).removeClass(`active`),e(this).closest(`.wilg_extra_opt`).addClass(`active`);let n=e(`#extraField`);t===`personal`||t===`crear`?n.addClass(`hidden`):(n.removeClass(`hidden`),n.find(`input:first`).focus())}).on(`click.wi`,`#Login`,async function(){await X(this,`Iniciando`,async()=>{let e=q(`email`),t=q(`password`),{email:n,wi:r}=await Z(e);await ee(O,n,t);let i=r??(await y(f(D,`smiles`,O.currentUser.displayName||e))).data();if(i.status===`pendiente`)throw await b(O),Error(`Tu cuenta está pendiente de activación. Te notificaremos por email.`);$(i)})}).on(`click.wi`,`#Registrar`,async function(){if(e(this).data(`busy`))return;let t=e(`.wilg_rol_tab.active`).data(`rol`)||`smile`,r=[[!e(`#regTerminos`).is(`:checked`),`#regTerminos`,`Acepta los términos`],[!e(`#regUsuario`).data(`ok`),`#regUsuario`,`Verifica el usuario`],[!e(`#regEmail`).data(`ok`),`#regEmail`,`Verifica el email`]].find(([e])=>e);if(r)return n(e(r[1])[0],r[2],`error`,2500);e(this).data(`busy`,!0),await X(this,`Registrando`,async()=>{let e={email:q(`regEmail`),usuario:q(`regUsuario`),nombre:q(`regNombre`),apellidos:q(`regApellidos`),password:q(`regPassword`)},{user:n}=await x(O,e.email,e.password);await Promise.all([v(n,{displayName:e.usuario}),g(n)]);let r=t===`empresa`,i=t,a=r?`pendiente`:`activo`,o={usuario:e.usuario,email:e.email,nombre:e.nombre,apellidos:e.apellidos,rol:i,estado:a,uid:n.uid,terminos:!0,tema:localStorage.wiTema||`Cielo|#0EBEFF`,avatar:``,bio:``,plan:`free`,segmento:{smile:`creador`,gestor:`negocio`,empresa:`empresa`}[i]||`creador`,verificado:!1,registradoPor:`correo`,...t===`empresa`&&{ruc:q(`regRuc`),empresaNombre:q(`regEmpresaNombre`)},...t===`gestor`&&{empresaNombre:q(`regEmpresaNombre`)}};await m(f(D,`smiles`,e.usuario),{...o,creado:d()}),r?(await b(O),s(`<i class="fa-solid fa-clock"></i> Registro enviado. Tu cuenta será activada pronto.`,`success`),setTimeout(()=>Y(`login`),2500)):($(o),s(`<i class="fa-solid fa-check-circle"></i> ¡Cuenta creada! Verifica tu email`,`success`))}),e(this).data(`busy`,!1)}).on(`click.wi`,`#Recuperar`,async function(){let e=q(`recEmail`);if(!e)return n(this,`Ingresa tu email o usuario`,`error`,2500);await X(this,`Enviando`,async()=>{let{email:t}=await Z(e);await S(O,t),s(`<i class="fa-solid fa-check-circle"></i> Email enviado, revisa tu bandeja`,`success`),setTimeout(()=>Y(`login`),2e3)})}).on(`click.wi`,`.tema`,async function(){let e=a(`wiSmile`);e?.usuario&&setTimeout(async()=>{let t=localStorage.wiTema;if(t)try{await m(f(D,`smiles`,e.usuario),{tema:t,actualizado:d()},{merge:!0}),l(`wiSmile`,{...e,tema:t},7),s(`Tema ${t.split(`|`)[0]} guardado <i class="fas fa-check-circle"></i>`,`success`)}catch(e){console.error(`tema:`,e)}},0)});function ne(){let t=e(`input[name="regExtra"]:checked`).val();(t===`personal`||t===`crear`)&&e(`#extraField`).addClass(`hidden`)}var re=(e=`login`)=>{A===`si`?H(e===`registrar`&&N===`si`?`registrar`:`login`):u.navigate(`/login`)},ie=async(e=[])=>{try{await b(O)}catch(e){console.error(`signOut:`,e)}o.logout(e)},ae=()=>{e(document).off(`.wi`)};export{re as abrirLogin,O as auth,ae as cleanup,G as init,W as render,ie as salir,b as signOut};