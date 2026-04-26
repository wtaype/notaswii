import{t as e}from"./vendor-BDh6mtVu.js";import{c as t,f as n,p as r,u as i}from"./widev-BLqPD_AU.js";import{t as a}from"./wii-DEYC667F.js";import{i as o}from"./firebase-BVO2Ew-x.js";import{t as s}from"./firebase-CSWtr52h.js";var c=()=>new Promise(e=>{if(s.currentUser)return e(s.currentUser);let t=o(s,n=>{t(),e(n)})}),l=()=>{let e=new Date().getHours();return e<12?{txt:`Buenos días`,ico:`fa-sun`}:e<18?{txt:`Buenas tardes`,ico:`fa-cloud-sun`}:{txt:`Buenas noches`,ico:`fa-moon`}},u=[{ico:`fa-dove`,txt:`Dios está contigo en cada paso que das. ¡Confía plenamente!`},{ico:`fa-heart`,txt:`La fe no hace las cosas fáciles, pero sí hace que todo sea posible.`},{ico:`fa-seedling`,txt:`Tu vida es un testimonio hermoso del amor infinito de Dios.`},{ico:`fa-hands-praying`,txt:`La oración es la llave de la mañana y el cerrojo de la noche.`},{ico:`fa-star`,txt:`No te rindas, los planes de Dios siempre son mejores que los nuestros.`},{ico:`fa-sun`,txt:`Cada nuevo amanecer es una nueva misericordia que Él te regala.`},{ico:`fa-shield-halved`,txt:`En medio de la tormenta, Él es tu refugio y tu paz inquebrantable.`}],d=()=>`
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
`,f=async()=>{console.log(`✅ Smile Home — ${a}`);let o=await c();if(!o)return;let s=r(`wiSmile`);if(!s)return;let d=n(s.nombre||s.usuario||``),f=`${s.nombre||``} ${s.apellidos||``}`.trim(),p=s.email||o.email,m=s.rol||`smile`,h=t(s.creado?.seconds?new Date(s.creado.seconds*1e3):s.creado),g=`${(s.nombre||`?`)[0]}${(s.apellidos||``)[0]||``}`.toUpperCase(),_=l(),v=u[Math.floor(Math.random()*u.length)];e(`#smwAvatar`).text(g),e(`#smwSaludo`).html(`<i class="fas ${_.ico}"></i> ${_.txt}, <strong>${d}</strong>`),e(`#smwNombre`).text(f),e(`#smwHoy`).text(i()),e(`#smwBadges`).html(`
    <span class="smw_badge smw_rol"><i class="fas fa-shield-halved"></i> ${m}</span>
    <span class="smw_badge smw_email"><i class="fas fa-envelope"></i> ${p}</span>
  `);let y=h<=0?`Recién llegado 🎉`:h===1?`1 mes con nosotros`:`${h} meses con nosotros`;e(`#smwCards`).html(`
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
        <small>Tiempo en ${a}</small>
        <strong>${y}</strong>
      </div>
    </div>
    <a href="/nuevo" class="smw_card nv_item" data-page="nuevo" style="--d:.21s; text-decoration:none;">
      <span class="smw_card_ico" style="background:var(--mco); color:var(--wb);"><i class="fas fa-pen-nib"></i></span>
      <div class="smw_card_data">
        <small>Blog de Esperanza</small>
        <strong style="color:var(--mco);">Escribir Historia</strong>
      </div>
    </a>
  `),e(`#smwMotiv`).html(`
    <div class="smw_motiv_inner">
      <span class="smw_motiv_ico"><i class="fas ${v.ico}"></i></span>
      <div class="smw_motiv_txt">
        <small>Para ti, ${d} 💛</small>
        <p>${v.txt}</p>
      </div>
    </div>
  `)},p=()=>{console.log(`🧹 Smile Home`)};export{p as cleanup,f as init,d as render};