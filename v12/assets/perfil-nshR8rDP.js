import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,f as n,g as r,n as i,p as a,x as o}from"./widev-CInXVJ_O.js";import{n as s}from"./rutas-wCn6BKqB.js";import{C as c,D as l,u}from"./firebase-CCUuWaKQ.js";import{n as d,t as f}from"./firebase-DG8WAU6u.js";var p=()=>n(`wiSmile`)||{},m=()=>{let e=p();if(!e.email)return location.replace(`/`),``;let t=e.nombre||``,n=e.apellidos||``,i=e.usuario||``,a=e.email||``,s=e.rol||`smile`,c=e.plan||`free`,l=e.estado||`activo`,u=(e.tema||`Por defecto`).split(`|`)[0],d=e.uid||``,f=e.avatar||``,m=e.fechaNacimiento||``,h=e.pais||``,g=e.genero||``,_=e.gustos||``,v=e.creado?r(null).get(e.creado,`local`):`Desconocido`,y=`https://ui-avatars.com/api/?name=`+encodeURIComponent(t+` `+n)+`&background=random&color=fff`;return`
  <div class="prf_wrap">

    <div class="prf_hero">
      <div class="prf_av_wrap">
        <img src="${f||y}" alt="${t}" class="prf_av" onerror="this.src='./smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname">${t} ${n}</h1>
        <p class="prf_username"><i class="fas fa-at"></i> ${i}</p>
        <span class="prf_rol_chip"><i class="fas fa-crown"></i> Plan ${c.toUpperCase()}</span>
      </div>
    </div>

    <div class="prf_grid">

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar perfil</h2>
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Nombres</label>
            <input id="prf_nombre" value="${t}" placeholder="Tus nombres">
          </div>
          <div class="prf_form_grp">
            <label>Apellidos</label>
            <input id="prf_apellidos" value="${n}" placeholder="Tus apellidos">
          </div>
        </div>
        
        <label>Enlace del Avatar (URL)</label>
        <input id="prf_avatar" value="${f}" placeholder="https://tu-foto.com/imagen.jpg">
        
        <label>Fecha de Nacimiento</label>
        <input type="date" id="prf_nacimiento" value="${m}">
        
        <label>País</label>
        <input id="prf_pais" value="${h}" placeholder="Ej. Perú, México, España...">
        
        <label>Género</label>
        <select id="prf_genero">
          <option value="" disabled ${g?``:`selected`}>Selecciona tu género</option>
          <option value="Masculino" ${g===`Masculino`?`selected`:``}>Masculino</option>
          <option value="Femenino" ${g===`Femenino`?`selected`:``}>Femenino</option>
          <option value="Otro" ${g===`Otro`?`selected`:``}>Otro</option>
          <option value="Prefiero no decirlo" ${g===`Prefiero no decirlo`?`selected`:``}>Prefiero no decirlo</option>
        </select>
        
        <label>Gustos, intereses o deportes</label>
        <textarea id="prf_gustos" rows="3" placeholder="¿Qué te gusta hacer? Ej. Fútbol, leer, viajar...">${_}</textarea>

        <button id="prf_guardar" class="prf_btn"><i class="fas fa-save"></i> Guardar cambios</button>
      </div>

      <div class="prf_col_right">
        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-lock"></i> Actualizar contraseña</h2>
          <label>Nueva contraseña</label>
          <input type="password" id="prf_pass" placeholder="Ingresa tu nueva contraseña">
          <label>Confirmar contraseña</label>
          <input type="password" id="prf_pass_conf" placeholder="Confirma tu nueva contraseña">
          <button id="prf_guardar_pass" class="prf_btn"><i class="fas fa-key"></i> Actualizar contraseña</button>
        </div>

        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-info-circle"></i> Datos de cuenta</h2>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-envelope"></i> Email</span>
            <span class="prf_val em">${a}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-user"></i> Usuario</span>
            <span class="prf_val">@${i}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-shield-alt"></i> Rol</span>
            <span class="prf_val prf_rol_val">${s}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-palette"></i> Tema</span>
            <span class="prf_val">${u}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-calendar-alt"></i> Registro</span>
            <span class="prf_val">${v}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-signal"></i> Estado</span>
            <span class="prf_val" style="color:var(--success)">${l}</span>
          </div>
          <div class="prf_row prf_uid_row">
            <span class="prf_lbl"><i class="fas fa-fingerprint"></i> UID</span>
            <span class="prf_uid_val">${d}</span>
            <button class="prf_copy" id="prf_copy_uid" ${o(`Copiar UID`)}><i class="fas fa-copy"></i></button>
          </div>
        </div>
      </div>

    </div>
  </div>`},h=()=>{if(!p().email)return s.navigate(`/`);e(document).on(`click.prf`,`#prf_guardar`,async function(){let t=p(),n={nombre:e(`#prf_nombre`).val().trim(),apellidos:e(`#prf_apellidos`).val().trim(),avatar:e(`#prf_avatar`).val().trim(),fechaNacimiento:e(`#prf_nacimiento`).val(),pais:e(`#prf_pais`).val().trim(),genero:e(`#prf_genero`).val()||``,gustos:e(`#prf_gustos`).val().trim()};if(!n.nombre)return o(document.getElementById(`prf_nombre`),`Ingresa tu nombre`,`error`);e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{await c(l(d,`smiles`,t.usuario),n),a(`wiSmile`,{...t,...n},24),e(`.prf_fullname`).text(`${n.nombre} ${n.apellidos}`),n.avatar?e(`.prf_av`).attr(`src`,n.avatar):e(`.prf_av`).attr(`src`,`https://ui-avatars.com/api/?name=`+encodeURIComponent(n.nombre+` `+n.apellidos)+`&background=random&color=fff`),i(`Perfil actualizado ✅`,`success`)}catch(e){console.error(e),i(`Error al guardar`,`error`)}finally{e(this).prop(`disabled`,!1).html(`<i class="fas fa-save"></i> Guardar cambios`)}}).on(`click.prf`,`#prf_guardar_pass`,async function(){let t=e(`#prf_pass`).val(),n=e(`#prf_pass_conf`).val(),r=e(this);if(!t||t.length<6)return o(document.getElementById(`prf_pass`),`Mínimo 6 caracteres`,`error`);if(t!==n)return o(document.getElementById(`prf_pass_conf`),`Las contraseñas no coinciden`,`error`);if(!f.currentUser)return i(`Sesión expirada. Por favor recarga`,`error`);r.prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Actualizando...`);try{await u(f.currentUser,t),e(`#prf_pass`).val(``),e(`#prf_pass_conf`).val(``),i(`Contraseña actualizada correctamente ✅`,`success`)}catch(e){console.error(e),e.code===`auth/requires-recent-login`?i(`Por seguridad, cierra sesión y vuelve a ingresar para cambiar la contraseña.`,`error`):i(`Error al actualizar contraseña`,`error`)}finally{r.prop(`disabled`,!1).html(`<i class="fas fa-key"></i> Actualizar contraseña`)}}).on(`click.prf`,`#prf_copy_uid`,function(){t(p().uid||``,this,`¡UID copiado!`)})},g=()=>e(document).off(`.prf`);export{g as cleanup,h as init,m as render};