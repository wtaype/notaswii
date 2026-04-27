const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inicio-CaA29QNn.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BDh6mtVu.js";import{i as t,x as n}from"./widev-DghgRcN4.js";import{t as r}from"./preload-helper-DbWsiEEd.js";import{catInfo as i,clearBlogCache as a,fade as o,getPosts as s,prefetchPost as c,skCard as l,srcBadge as u}from"./devblog-DaEngqDw.js";var d=9,f=[{id:`nuevo`,icon:`fa-clock`,label:`Recientes`},{id:`vistas`,icon:`fa-fire`,label:`Populares`}],p=`wi_blog_cats`,m=(e,t)=>{let r=i(e.categoria);return`
  <article class="bl_card bl_fade" style="--d:${t*.05}s" data-slug="${e.slug||e.id}">
    <div class="bl_card_img">
      <img src="${e.imagen||`https://placehold.co/600x400?text=📖`}" alt="${e.imagenAlt||e.titulo}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=📖'"/>
      <div class="bl_card_over">
        <span class="bl_card_cat" style="--cc:${r.color}"><i class="fas ${r.icon}"></i> ${e.categoria||`—`}</span>
        ${e.destacado?`<span class="bl_card_dest" ${n(`Destacada`)}><i class="fas fa-star"></i></span>`:``}
      </div>
    </div>
    <div class="bl_card_body">
      <h2 class="bl_card_tit">${e.titulo}</h2>
      <p class="bl_card_res">${e.resumen||``}</p>
      <div class="bl_card_footer">
        <div class="bl_card_meta">
          <span><i class="fas fa-clock"></i> ${e.tiempo_lectura||`—`}</span>
          <span><i class="fas fa-eye"></i> ${e.vistas||0}</span>
        </div>
        <span class="bl_card_leer">Leer <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  </article>`},h=()=>`
  <div class="bl_wrap">
    <div class="bl_hero bl_fade bl_visible" style="--d:0s">
      <h1 class="bl_hero_tit">Historias que <span class="bl_grad">inspiran</span> 🕊️</h1>
      <p class="bl_hero_sub">Reflexiones, fe y palabras que tocan el corazón</p>
    </div>
    <div class="bl_search_bar" id="bl_search_bar" style="display:none">
      <div class="bl_search_inner">
        <i class="fas fa-search bl_search_ico"></i>
        <input id="bl_search_inp" type="text" placeholder="Buscar historias..." autocomplete="off" spellcheck="false"/>
        <button id="bl_search_close" class="bl_search_close"><i class="fas fa-xmark"></i></button>
      </div>
    </div>
    <div class="bl_bar">
      <div class="bl_cats" id="bl_cats">
        <button class="bl_cat_btn active" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>
      </div>
      <div class="bl_bar_right">
        <div class="bl_orden">${f.map(e=>`<button class="bl_ord_btn ${e.id===`nuevo`?`active`:``}" data-ord="${e.id}"><i class="fas ${e.icon}"></i><span>${e.label}</span></button>`).join(``)}</div>
        <button class="bl_icon_btn" id="bl_search_toggle" ${n(`Buscar`)}><i class="fas fa-search"></i></button>
        <button class="bl_icon_btn" id="bl_refresh" ${n(`Actualizar`)}><i class="fas fa-rotate"></i></button>
      </div>
    </div>
    <div class="bl_result_bar" id="bl_result_bar"></div>
    <div class="bl_grid" id="bl_grid">${[,,,,,,].fill(l()).join(``)}</div>
    <div class="bl_mas_wrap" id="bl_mas_wrap" style="display:none"><button class="bl_mas_btn" id="bl_mas"><i class="fas fa-plus"></i> Ver más</button></div>
    <div class="bl_empty dpvc" id="bl_empty" style="display:none"><i class="fas fa-dove"></i><h3>Sin historias</h3><p>Pronto habrá más 🕊️</p></div>
  </div>`,g=async()=>{let n=`todo`,f=`nuevo`,h=0,g=[],_=[],v=!1,y=e=>r(()=>import(`./rutas-_PuX0s51.js`).then(e=>e.r).then(t=>t.rutas.navigate(e)),__vite__mapDeps([0])),b=t=>{let r=[...new Set(t.map(e=>e.categoria).filter(Boolean))].sort();localStorage.setItem(p,JSON.stringify(r));let a=e(`#bl_cats`);a.html(`<button class="bl_cat_btn ${n===`todo`?`active`:``}" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>`),r.forEach(e=>{let t=i(e);a.append(`<button class="bl_cat_btn ${n===e?`active`:``}" data-cat="${e}" style="--cc:${t.color}"><i class="fas ${t.icon}"></i><span>${e}</span></button>`)})},x=(()=>{try{return JSON.parse(localStorage.getItem(p)||`[]`)}catch{return[]}})();if(x.length){let t=e(`#bl_cats`);x.forEach(e=>{let n=i(e);t.append(`<button class="bl_cat_btn" data-cat="${e}" style="--cc:${n.color}"><i class="fas ${n.icon}"></i><span>${e}</span></button>`)})}let S=t=>{let n=e(`#bl_grid`);t||(n.html(``),h=0);let r=t?h*d:0,i=g.slice(r,r+d);if(!i.length&&!t){e(`#bl_empty`).show(),e(`#bl_mas_wrap`).hide();return}e(`#bl_empty`).hide(),n.append(i.map(m).join(``)),o(`bl_fade`,n[0]),e(`#bl_mas_wrap`).toggle(r+d<g.length)},C=async(r=!1)=>{if(!v){v=!0,r||e(`#bl_grid`).html([,,,,,,].fill(l()).join(``)),e(`#bl_empty,#bl_mas_wrap`).hide(),e(`#bl_result_bar`).html(``);try{let t=await s(n,f,r);g=t.lista,_=g,(!x.length||r)&&b(g),e(`#bl_result_bar`).html(`<span><strong>${g.length}</strong> historia${g.length===1?``:`s`}</span>${u(t.fromCache)}`),S()}catch(n){console.error(`[blog]`,n),t(`Error`,`error`),e(`#bl_empty`).show()}v=!1}},w,T=t=>{clearTimeout(w),w=setTimeout(()=>{if(!t.trim()){g=_,S(),e(`#bl_result_bar`).html(`<span><strong>${g.length}</strong> historias</span>`);return}let n=t.toLowerCase();g=_.filter(e=>e.titulo?.toLowerCase().includes(n)||e.resumen?.toLowerCase().includes(n)||e.categoria?.toLowerCase().includes(n)||(e.tags||[]).some(e=>e.toLowerCase().includes(n))),e(`#bl_result_bar`).html(`<span><i class="fas fa-search"></i> <strong>${g.length}</strong> resultado${g.length===1?``:`s`} — "<em>${t}</em>"</span>`),S()},280)};await C(),e(document).on(`click.blog`,`.bl_cat_btn`,function(){let t=e(this).data(`cat`);t!==n&&(n=t,h=0,e(`.bl_cat_btn`).removeClass(`active`),e(this).addClass(`active`),C())}).on(`click.blog`,`.bl_ord_btn`,function(){let t=e(this).data(`ord`);t!==f&&(f=t,h=0,e(`.bl_ord_btn`).removeClass(`active`),e(this).addClass(`active`),C())}).on(`click.blog`,`#bl_refresh`,async function(){e(this).html(`<i class="fas fa-spinner fa-spin"></i>`).prop(`disabled`,!0),a(),localStorage.removeItem(p),await C(!0),e(this).html(`<i class="fas fa-rotate"></i>`).prop(`disabled`,!1),t(`Actualizado ✅`,`success`)}).on(`click.blog`,`#bl_search_toggle`,function(){let t=e(`#bl_search_bar`),n=t.is(`:visible`);t.stop(!0).slideToggle(180),n?(e(`#bl_search_inp`).val(``),g=_,S()):setTimeout(()=>e(`#bl_search_inp`).focus(),200)}).on(`click.blog`,`#bl_search_close`,()=>{e(`#bl_search_bar`).slideUp(160),e(`#bl_search_inp`).val(``),g=_,S()}).on(`input.blog`,`#bl_search_inp`,function(){T(e(this).val())}).on(`click.blog`,`#bl_mas`,()=>{h++,S(!0)}).on(`click.blog`,`.bl_card`,function(){let t=e(this).data(`slug`);t&&y(`/${t}`)}).on(`mouseenter.blog`,`.bl_card`,function(){c(e(this).data(`slug`))})},_=()=>e(document).off(`.blog`);export{_ as cleanup,g as init,h as render};