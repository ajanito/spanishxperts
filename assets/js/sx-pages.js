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

(function(){
 var root=document.querySelector("[data-sx-ct-accordion]");
 if(root){
  var cards=[].slice.call(root.querySelectorAll(".sx-ct-card"));
  function closeAll(except){cards.forEach(function(c){if(c===except)return;c.classList.remove("is-open");var b=c.querySelector(".sx-ct-toggle"),p=c.querySelector(".sx-ct-panel");if(b)b.setAttribute("aria-expanded","false");if(p)p.hidden=true})}
  cards.forEach(function(card){var btn=card.querySelector(".sx-ct-toggle"),panel=card.querySelector(".sx-ct-panel");if(!btn||!panel)return;
   btn.addEventListener("click",function(){var open=card.classList.contains("is-open");closeAll(open?null:card);if(open){card.classList.remove("is-open");btn.setAttribute("aria-expanded","false");panel.hidden=true}else{card.classList.add("is-open");btn.setAttribute("aria-expanded","true");panel.hidden=false}});
  });
 }
})();

(function(){
 var f=document.getElementById("sx-contact-form");if(!f)return;
 window.SX_CONFIG=window.SX_CONFIG||{};
 if(!window.SX_CONFIG.RECAPTCHA_SITE_KEY)window.SX_CONFIG.RECAPTCHA_SITE_KEY="RECAPTCHA_SITE_KEY";
 var C=window.SX_CONFIG,TO="adan@spanishxperts.com",msg=f.querySelector(".sx-form-msg"),note=document.getElementById("sx-recaptcha-note");
 var key=C.RECAPTCHA_SITE_KEY,hasKey=typeof key==="string"&&key!=="RECAPTCHA_SITE_KEY"&&key.trim().length>8;
 if(note){note.hidden=!!hasKey}
 function loadRecaptcha(cb){
  if(window.grecaptcha&&window.grecaptcha.execute){cb();return}
  var s=document.createElement("script");s.src="https://www.google.com/recaptcha/api.js?render="+encodeURIComponent(key);s.async=true;
  s.onload=function(){cb()};s.onerror=function(){msg.textContent="Could not load spam protection. Please try again, or email us directly.";};
  document.head.appendChild(s);
 }
 function openMail(n,m,motivo,exp,mes,token){
  var subject="Question from the website \u2013 "+n;
  var body="Name: "+n+"\nEmail: "+m+"\nReason: "+motivo+"\nEstimated month to start: "+mes+"\n\nSpanish experience / goals:\n"+exp+"\n";
  if(token)body+="\nreCAPTCHA token: "+token+"\n";
  var url="mailto:"+TO+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  msg.innerHTML="Opening your email app\u2026 If it does not open, write us at <a href=\"mailto:"+TO+"\" target=\"_top\">"+TO+"</a>.";
  try{window.top.location.href=url}catch(err){try{window.location.href=url}catch(err2){window.open(url,"_blank")}}
 }
 f.addEventListener("submit",function(e){e.preventDefault();
  var n=(f.nombre&&f.nombre.value||"").trim();
  var m=(f.email&&f.email.value||"").trim();
  var motivo=(f.motivo&&f.motivo.value||"").trim();
  var exp=(f.experiencia&&f.experiencia.value||"").trim();
  var mes=(f.mes_inicio&&f.mes_inicio.value||"").trim();
  if(!n||!m||!motivo||!exp||!mes){msg.textContent="Please fill in Name, Email, Reason, your experience/goals, and estimated start month.";return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)){msg.textContent="Please check your email — it does not look valid.";return}
  if(!hasKey){openMail(n,m,motivo,exp,mes,null);return}
  msg.textContent="Checking spam protection\u2026";
  loadRecaptcha(function(){
   try{
    window.grecaptcha.ready(function(){
     window.grecaptcha.execute(key,{action:"contact"}).then(function(token){openMail(n,m,motivo,exp,mes,token)}).catch(function(){msg.textContent="Spam check failed. Please try again, or email us directly.";});
    });
   }catch(err){msg.textContent="Spam check failed. Please try again, or email us directly."}
  });
 });
})();

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
