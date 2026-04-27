const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inicio-CaA29QNn.css"])))=>i.map(i=>d[i]);
import{t as e}from"./vendor-BDh6mtVu.js";import{C as t,S as n,h as r,i,w as a}from"./widev-BFdt7IHB.js";import{i as o,t as s}from"./wii-BA2rwkUR.js";import{t as c}from"./preload-helper-CwLZyQiu.js";import{addView as l,clearPostCache as u,clearRelCache as d,fade as f,getPost as p,getPreview as m,getRelacionados as h,superDate as g,tplShare as _}from"./devblog-BW7tldOV.js";import{adRight as v}from"./wiad-B0mWuurT.js";var y=e=>`<a href="/${e.slug}" class="po_rel_card" ${n(e.resumen||e.titulo)}><div class="po_rel_img"><img src="${e.imagen}" alt="${e.imagenAlt||e.titulo}" loading="lazy"/></div><div class="po_rel_info"><span class="po_rel_cat"><i class="fas fa-paw"></i> ${e.categoria}</span><strong>${e.titulo}</strong><span class="po_rel_meta"><i class="fas fa-clock"></i> ${e.tiempo_lectura} · <i class="fas fa-eye"></i> ${e.vistas||0}</span></div></a>`,b=e=>{let t=e&&m(e);return t?`
    <div class="po_wrap"><div class="po_layout">
      <div class="po_content">
        <div class="po_hero po_fade po_visible" style="--d:0s">
          <img src="${t.imagen}" alt="${t.imagenAlt||t.titulo}" class="po_hero_img" loading="eager"/>
          <div class="po_hero_over">
            <a href="/blog" class="po_back" ${n(`Volver`)}><i class="fas fa-arrow-left"></i> Blog</a>
            <div class="po_hero_badges"><span class="po_cat_badge" ${n(t.categoria)}><i class="fas fa-paw"></i> ${t.categoria}</span></div>
          </div>
        </div>
        <header class="po_header po_fade po_visible" style="--d:0s">
          <h1 class="po_titulo">${t.titulo}</h1>
          <p class="po_resumen">${t.resumen}</p>
          <div class="po_meta">
            <span><i class="fas fa-user-pen"></i> ${t.autor}</span>
            <span><i class="fas fa-calendar"></i> ${g(t.creado,!0)}</span>
            <span><i class="fas fa-clock"></i> ${t.tiempo_lectura}</span>
            <span><i class="fas fa-eye"></i> ${t.vistas||0}</span>
          </div>
        </header>
        <div class="po_contenido po_fade" style="--d:.1s"><div class="po_sk_body">${`<div class="po_sk_p shimmer"></div>`.repeat(6)}</div></div>
      </div>
      <aside class="po_sidebar">${`<div class="po_sk_side shimmer"></div>`.repeat(3)}</aside>
    </div></div>`:`<div class="po_wrap"><div class="po_layout"><div class="po_content"><div class="po_sk_img shimmer"></div><div class="po_sk_body"><div class="po_sk_cat shimmer"></div><div class="po_sk_tit shimmer"></div><div class="po_sk_tit po_sk_t2 shimmer"></div><div class="po_sk_meta shimmer"></div>${`<div class="po_sk_p shimmer"></div>`.repeat(5)}</div></div><aside class="po_sidebar">${`<div class="po_sk_side shimmer"></div>`.repeat(3)}</aside></div></div>`},x=async(b,S=!1)=>{if(b)try{let i=m(b),[C,w]=await Promise.all([p(b,S),i?h(b,i.categoria,S):Promise.resolve([])]);if(!C?.data?.activo){e(`#wimain`).html(`<div class="po_err dpvc"><i class="fas fa-paw"></i><h2>Historia no encontrada</h2><p>No existe o no está disponible 🐾</p><a href="/blog" class="po_back_btn"><i class="fas fa-arrow-left"></i> Ver historias</a></div>`);return}let{data:T,fromCache:E}=C;!E&&!S&&l(b);let D=w.length?w:await h(b,T.categoria,S),O=g(T.creado,!0),k=(T.tags||[]).map(e=>`<span class="po_tag">#${e}</span>`).join(``),A=(T.vistas||0)+1,j=r.user?.usuario;e(`#wimain`).html(`
      <div class="po_wrap"><div class="po_layout">
        <div class="po_content">
          <div class="po_hero po_fade" style="--d:0s">
            <img src="${T.imagen}" alt="${T.imagenAlt||T.titulo}" class="po_hero_img" loading="eager"/>
            <div class="po_hero_over">
              <a href="/blog" class="po_back" ${n(`Volver`)}><i class="fas fa-arrow-left"></i> Blog</a>
              <div class="po_hero_badges">
                <span class="po_cat_badge" ${n(T.categoria)}><i class="fas fa-paw"></i> ${T.categoria}</span>
                ${T.destacado?`<span class="po_dest_badge" ${n(`Destacada`)}><i class="fas fa-star"></i> Destacado</span>`:``}
              </div>
            </div>
          </div>
          <header class="po_header po_fade" style="--d:.1s">
            <h1 class="po_titulo">${T.titulo}</h1>
            <p class="po_resumen">${T.resumen}</p>
            <div class="po_meta">
              <span ${n(`Autor`)}><i class="fas fa-user-pen"></i> ${T.autor}</span>
              <span ${n(`Fecha`)}><i class="fas fa-calendar"></i> ${O}</span>
              <span ${n(`Lectura`)}><i class="fas fa-clock"></i> ${T.tiempo_lectura}</span>
              <span ${n(`Vistas`)}><i class="fas fa-eye"></i> ${A}</span>
              ${E?`<span class="po_cache_badge" ${n(`Cache ⚡`)}><i class="fas fa-bolt"></i></span>`:``}
            </div>
          </header>
          <div class="po_contenido po_fade" style="--d:.2s">${T.contenido}</div>
          ${k?`<div class="po_tags po_fade" style="--d:.35s">${k}</div>`:``}
          <div class="po_share po_fade" style="--d:.45s">
            <span><i class="fas fa-share-nodes"></i> Comparte</span>
            <div class="po_share_btns">${_(T.titulo)}<button class="po_share_btn po_copy" style="--sc:var(--mco)" ${n(`Copiar`)}><i class="fas fa-link"></i></button></div>
          </div>
        </div>
        <aside class="po_sidebar">
          <div class="po_side_card po_fade" style="--d:.15s">
            <div class="po_side_title"><i class="fas fa-user-pen"></i> Autor</div>
            <div class="po_autor_box"><div class="po_autor_av"><img src="/notaswii/v14/smile.avif" alt="${T.autor}"/></div><div class="po_autor_info"><strong>${T.autor}</strong><span>${s} <i class="fas ${o}"></i></span></div></div>
            ${j?`<div class="po_admin_actions" style="margin-top:.8vh"><a href="/nuevo?edit=${b}" class="po_admin_btn_edit" ${n(`Editar post`)}><i class="fas fa-pen"></i> Editar</a><button id="po_refresh" class="po_admin_btn_refresh" ${n(`Recargar`)}><i class="fas fa-rotate"></i></button></div>`:``}
          </div>
          <div class="po_ad_sticky po_fade" style="--d:.25s">${v}</div>
          ${D.length?`<div class="po_side_card po_fade" style="--d:.35s"><div class="po_side_title"><i class="fas fa-heart"></i> Te gustará</div><div class="po_relacionados">${D.map(y).join(``)}</div></div>`:``}
        </aside>
      </div></div>`),f(`po_fade`),t(`.po_side_card`,null,{anim:`wi_fadeUp`,stagger:60}),e(document).on(`click.post`,`.po_copy,.po_copy2`,()=>a(location.href,`.po_copy`,`¡Enlace copiado! 🔗`)).on(`click.post`,`.po_rel_card`,function(t){t.preventDefault(),c(()=>import(`./rutas-CIT4VMl_.js`).then(e=>e.r).then(t=>t.rutas.navigate(e(this).attr(`href`))),__vite__mapDeps([0]))}).on(`click.post`,`#po_refresh`,async()=>{e(`#po_refresh`).html(`<i class="fas fa-spinner fa-spin"></i>`).prop(`disabled`,!0),u(b),d(T.categoria),await x(b,!0)})}catch(e){console.error(`[post]`,e),i(`Error al cargar`,`error`)}},S=()=>e(document).off(`.post`);export{S as cleanup,x as init,b as render};