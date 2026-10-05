/* SpanishXperts inner pages. Header menu, review carousel and contact form are copied from the homepage scripts. */
(function(){var h=document.getElementById("sx-header"),b=h.querySelector(".sxh-burger"),n=h.querySelector(".sxh-nav");
function set(o){h.classList.toggle("is-open",o);b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Close menu":"Open menu")}
b.addEventListener("click",function(){set(!h.classList.contains("is-open"))});
[].forEach.call(n.querySelectorAll("a"),function(a){a.addEventListener("click",function(){set(false)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
document.addEventListener("click",function(e){if(!h.contains(e.target))set(false)});
var mq=window.matchMedia("(min-width:900px)");function mm(){if(mq.matches)set(false)}mq.addEventListener?mq.addEventListener("change",mm):mq.addListener(mm);
function hh(){document.documentElement.style.setProperty("--sxh-h",h.offsetHeight+"px")}hh();window.addEventListener("resize",hh);
})();
(function(){var root=document.querySelector(".sxc");if(!root)return;
var els=[].slice.call(root.querySelectorAll(".sxc-slide")),dots=root.querySelector(".sxc-dots"),cur=0,sx=0,drag=false;
els.forEach(function(_,i){var d=document.createElement("button");d.className="sxc-dot-btn"+(i===0?" sxc-active":"");d.type="button";d.setAttribute("role","tab");d.setAttribute("aria-label","Review "+(i+1));d.setAttribute("aria-selected",i===0?"true":"false");d.addEventListener("click",function(){show(i)});dots.appendChild(d)});
var ds=[].slice.call(dots.children);
function show(n){cur=(n+els.length)%els.length;els.forEach(function(e,i){e.classList.toggle("sxc-active",i===cur);e.setAttribute("aria-hidden",i===cur?"false":"true")});ds.forEach(function(d,i){d.classList.toggle("sxc-active",i===cur);d.setAttribute("aria-selected",i===cur?"true":"false")})}
root.querySelector(".sxc-prev").addEventListener("click",function(){show(cur-1)});root.querySelector(".sxc-next").addEventListener("click",function(){show(cur+1)});
root.addEventListener("touchstart",function(e){if(e.touches.length===1){sx=e.touches[0].clientX;drag=true}},{passive:true});
root.addEventListener("touchend",function(e){if(!drag)return;drag=false;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)show(cur+(dx<0?1:-1))},{passive:true});
root.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")show(cur-1);if(e.key==="ArrowRight")show(cur+1)});
})();

(function(){var f=document.getElementById("sx-contact-form");if(!f)return;var TO="adan@spanishxperts.com",msg=f.querySelector(".sx-form-msg");
f.addEventListener("submit",function(e){e.preventDefault();
 var n=f.nombre.value.trim(),m=f.email.value.trim(),t=f.mensaje.value.trim();
 if(!n||!m||!t){msg.textContent="Por favor completa Nombre, Email y Mensaje.";return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)){msg.textContent="Revisa tu email, parece que no es v\u00e1lido.";return}
 var subject="Pregunta desde la web \u2013 "+n,body="Nombre: "+n+"\nEmail: "+m+"\n\nMensaje:\n"+t+"\n";
 var url="mailto:"+TO+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
 msg.innerHTML="Abriendo tu app de correo\u2026 Si no se abre, escr\u00edbeme a <a href=\"mailto:"+TO+"\" target=\"_top\">"+TO+"</a>.";
 try{window.top.location.href=url}catch(err){try{window.location.href=url}catch(err2){window.open(url,"_blank")}}
});})();

/* Placeholder links (data-ph): do nothing until Adán provides the real URL */
[].forEach.call(document.querySelectorAll("a[data-ph]"),function(a){a.addEventListener("click",function(e){e.preventDefault();if(window.console)console.info("SpanishXperts draft: placeholder link not set yet: "+a.getAttribute("data-ph"))})});
/* Subtle scroll reveal (same CSS hooks as the homepage: .sx-anim [data-sx-reveal]) */
(function(){try{var W=window,d=document;if((W.matchMedia&&W.matchMedia("(prefers-reduced-motion: reduce)").matches)||!("IntersectionObserver" in W))return;
 var els=[].slice.call(d.querySelectorAll("[data-sx-reveal]"));if(!els.length)return;
 els.forEach(function(e){var p=e.parentNode,sib=[].filter.call(p.children,function(c){return c.hasAttribute("data-sx-reveal")}),i=sib.indexOf(e);e.style.setProperty("--sx-d",Math.min(i*90,360)+"ms")});
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:0.01});
 els.forEach(function(e){io.observe(e)});d.documentElement.classList.add("sx-anim");
 W.addEventListener("load",function(){setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().bottom<0)e.classList.add("is-in")})},400)});
}catch(err){document.documentElement.classList.remove("sx-anim")}})();
