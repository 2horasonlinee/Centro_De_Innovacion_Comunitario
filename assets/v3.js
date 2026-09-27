/* CIC v3 · comportamientos dinámicos compartidos */
(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const paused=()=>reduced.matches||document.body.classList.contains('motion-paused');
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const fmt=n=>Math.round(n).toLocaleString('es-CO');
const money=n=>'$'+fmt(n);
const base=($('link[href$="assets/v3.css"]')?.getAttribute('href')||'assets/v3.css').replace('v3.css','');

/* Botón de movimiento: nombre accesible también como información emergente */
const motionButton=$('.motion-toggle');
if(motionButton){const sync=()=>motionButton.title=motionButton.textContent.trim();sync();new MutationObserver(sync).observe(motionButton,{childList:true,characterData:true,subtree:true})}

/* Auroras de fondo en todos los héroes */
$$('.hero,.inner-hero').forEach(h=>{if(!$('.hero-aurora',h))h.insertAdjacentHTML('afterbegin','<div class="hero-aurora" aria-hidden="true"><i></i><i></i><i></i></div>')});
/* Escenarios editoriales heredados: manchas de color y sello girando */
$$('.editorial-visual').forEach(v=>v.insertAdjacentHTML('beforeend',`<span class="blob b1"></span><span class="blob b2"></span><img class="stage-seal" src="${base}sello-cic.svg" alt="">`));

/* Cintas: desplazamiento continuo */
$$('.brand-ribbon').forEach(r=>{const span=$('span',r);if(!span||$('.marquee',r))return;const copy=span.innerHTML+' <i>✳</i> ';const track=document.createElement('div');track.className='marquee';track.innerHTML=`<span>${copy}</span><span aria-hidden="true">${copy}</span><span aria-hidden="true">${copy}</span><span aria-hidden="true">${copy}</span>`;span.replaceWith(track)});

/* Aparición progresiva al desplazarse */
const revealSel='.page-v3 .block-head,.res-card,.steps li,.cascade-flow li,.pillar-card,.duo-card,.topic-card,.contact-card,.dept-layout,.manifesto,.feature-tool,.login-steps,.route-timeline,.badges,.module-list li,.faq details,.info-card,.territory-explorer,.help-shortcuts button,.campus-overview article,.continue-card,.stats>div,.help-band,.community-story,.detail-layout>div,table';
if(!reduced.matches&&'IntersectionObserver'in window){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add('rv-in');setTimeout(()=>{el.classList.remove('rv','rv-in');el.style.transitionDelay=''},1400)}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
const groups=new Map();
$$(revealSel).forEach(el=>{if(el.closest('.reveal')||el.classList.contains('reveal'))return;const p=el.parentElement;const i=groups.get(p)||0;groups.set(p,i+1);el.style.transitionDelay=Math.min(i,6)*.09+'s';el.classList.add('rv');io.observe(el)});
}
/* Marcadores de entrada genéricos */
const seen=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');seen.unobserve(e.target)}}),{threshold:.3});
$$('[data-inview]').forEach(el=>seen.observe(el));

/* Contadores animados */
const countEls=[...$$('[data-count]'),...$$('.stats strong')];
const runCount=el=>{const target=Number(el.dataset.count||el.textContent.replace(/\D/g,''));if(!target||paused()){el.textContent=fmt(target);return}const t0=performance.now(),d=1400+Math.min(target,300)*2;const step=t=>{const k=Math.max(0,Math.min(1,(t-t0)/d)),e=1-Math.pow(1-k,3);el.textContent=fmt(target*e);if(k<1)requestAnimationFrame(step)};el.textContent='0';requestAnimationFrame(step)};
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){co.unobserve(e.target);runCount(e.target)}}),{threshold:.6});
countEls.forEach(el=>co.observe(el));

/* Brillo que sigue al cursor y ligera inclinación 3D */
const fine=matchMedia('(pointer:fine)').matches;
if(fine){
$$('.spot,.stage,.dept-card,.feature-tool').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',e.clientX-r.left+'px');el.style.setProperty('--my',e.clientY-r.top+'px')}));
$$('.route-card,.res-card,.pillar-card,.topic-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(paused())return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateY(-8px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
/* Paralaje suave de los escenarios */
$$('.stage').forEach(stage=>{const layers=$$('.glass,.bubble,.pchip,.phone,.big-seal',stage);stage.addEventListener('pointermove',e=>{if(paused())return;const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;layers.forEach((l,i)=>{const d=(i%3+1)*6;l.style.transform=`translate(${(x*d).toFixed(1)}px,${(y*d).toFixed(1)}px)`})});stage.addEventListener('pointerleave',()=>layers.forEach(l=>l.style.transform=''))});
}

/* Inicio: los cinco pilares avanzan solos hasta que la persona interactúa */
const eco=$('.ecosystem');
if(eco){let auto=true,visible=true;const next=$('[data-pillar-step="1"]',eco);eco.addEventListener('pointerdown',()=>auto=false);eco.addEventListener('keydown',()=>auto=false);new IntersectionObserver(es=>visible=es[0].isIntersecting).observe(eco);setInterval(()=>{if(auto&&visible&&!paused()&&!document.hidden)next?.click()},5200)}

/* Registro: la cédula solo admite números */
const ced=$('#register-cedula');ced?.addEventListener('input',()=>{const v=ced.value.replace(/\D/g,'').slice(0,15);if(v!==ced.value)ced.value=v});

/* Calculadora completa: recalcula mientras escribes */
const calc=$('#calculator');
if(calc){const out=$('#result');calc.addEventListener('input',()=>{if(calc.checkValidity()){calc.requestSubmit();out.classList.remove('flash');void out.offsetWidth;out.classList.add('flash')}})}

/* Recursos: calculadora rápida con controles deslizantes */
$$('[data-mini-calc]').forEach(panel=>{const q=n=>$(`[name="${n}"]`,panel),o=n=>$(`[data-out="${n}"]`,panel);let last=null;
const update=()=>{['fixed','price','cost'].forEach(n=>{const i=q(n);i.style.setProperty('--p',((i.value-i.min)/(i.max-i.min)*100)+'%');o(n).textContent=money(Number(i.value))});const f=+q('fixed').value,p=+q('price').value,c=+q('cost').value,units=o('units'),cap=o('caption'),meter=o('meter'),margin=o('margin');
if(p<=c){units.textContent='—';cap.textContent='El precio debe ser mayor que el costo variable para cubrir tus costos.';meter.style.width='0%';margin.textContent='Margen por unidad: sin margen';return}
const u=Math.ceil(f/(p-c));units.textContent=fmt(u);cap.textContent='unidades al mes para cubrir tus costos';meter.style.width=Math.round((p-c)/p*100)+'%';margin.textContent=`Margen por unidad: ${money(p-c)} (${Math.round((p-c)/p*100)} % del precio)`;if(last!==u&&!paused()){units.classList.add('bump');setTimeout(()=>units.classList.remove('bump'),220)}last=u};
panel.addEventListener('input',update);update()});
/* Recursos: contador de resultados y enlace a categorías */
const grid=$('.page-v3 .resource-grid');
if(grid){const count=$('#result-count');const refresh=()=>{const n=$$('[data-category]',grid).filter(c=>!c.hidden).length;if(count)count.textContent=n?`Mostrando ${n} ${n===1?'recurso':'recursos'}`:'Sin resultados'};$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>setTimeout(refresh)));$('#search')?.addEventListener('input',()=>setTimeout(refresh));refresh();
/* Número animado en la tarjeta de la caja de herramientas */
const num=$('.tb-num');if(num){setInterval(()=>{if(paused()||document.hidden)return;const t0=performance.now();const step=t=>{const k=Math.max(0,Math.min(1,(t-t0)/1600));num.textContent=Math.round(50*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)},6000)}}

/* Territorio: mapa y explorador sincronizados */
const depts=[['Atlántico','Barranquilla'],['Bolívar','Cartagena de Indias'],['Sucre','Sincelejo'],['Córdoba','Montería'],['Magdalena','Santa Marta'],['Cesar','Valledupar'],['La Guajira','Riohacha']];
const deptCard=$('.dept-card');
if(deptCard){const pick=i=>{$$('[data-dept]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.dept===i)));$('#dept-name').textContent=depts[i][0];$('#dept-capital').textContent=depts[i][1];$('#dept-num').textContent=String(i+1).padStart(2,'0');deptCard.classList.remove('swap');void deptCard.offsetWidth;deptCard.classList.add('swap')};
let autoDept=true,cur=0;$$('[data-dept]').forEach(b=>b.addEventListener('click',()=>{autoDept=false;cur=+b.dataset.dept;pick(cur)}));
const mapEl=$('.map-stage');let mapVisible=false;if(mapEl)new IntersectionObserver(es=>mapVisible=es[0].isIntersecting).observe(mapEl);
setInterval(()=>{if(autoDept&&mapVisible&&!paused()&&!document.hidden){cur=(cur+1)%depts.length;pick(cur)}},4200)}

/* Ayuda: búsqueda, categorías y accesos directos */
const faq=$('.faq-block');
if(faq){const items=$$('details[data-cat]',faq),input=$('#faq-search'),empty=$('#faq-empty'),count=$('#faq-count');let tab='todas';
const norm=s=>s.toLocaleLowerCase('es').normalize('NFD').replace(/[̀-ͯ]/g,'');
const apply=()=>{const q=norm(input?.value||'');let n=0;items.forEach(d=>{const ok=(tab==='todas'||d.dataset.cat===tab)&&norm(d.textContent).includes(q);d.hidden=!ok;if(ok)n++;if(q&&ok)d.open=true});empty.hidden=n!==0;count.textContent=`${n} ${n===1?'pregunta':'preguntas'}`};
const setTab=t=>{tab=t;$$('[data-faq-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.faqTab===t)));apply()};
$$('[data-faq-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.faqTab)));
input?.addEventListener('input',()=>{if(input.value&&tab!=='todas')setTab('todas');else apply()});
input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();faq.scrollIntoView({behavior:paused()?'instant':'smooth'})}});
$$('[data-q]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.q;setTab('todas');faq.scrollIntoView({behavior:paused()?'instant':'smooth'})}));
$$('[data-topic]').forEach(b=>b.addEventListener('click',()=>{if(input)input.value='';setTab(b.dataset.topic);faq.scrollIntoView({behavior:paused()?'instant':'smooth'})}));
apply()}
/* Ayuda: conversación que se escribe sola */
const chat=$('.chat-stage');
if(chat&&!reduced.matches){const msgs=$$('.msg',chat),typing=$('.typing',chat);chat.classList.add('chat-live');let i=0;
const tick=()=>{if(paused()||document.hidden){setTimeout(tick,800);return}
if(i>=msgs.length){setTimeout(()=>{msgs.forEach(m=>m.classList.remove('show'));i=0;tick()},3200);return}
const m=msgs[i];if(m.classList.contains('cic')){typing.classList.add('show');setTimeout(()=>{typing.classList.remove('show');m.classList.add('show');i++;setTimeout(tick,1500)},1300)}else{m.classList.add('show');i++;setTimeout(tick,1200)}};
setTimeout(tick,600)}
/* Ayuda: ejemplo de cédula que se escribe */
$$('.typed').forEach(el=>{const txt=el.dataset.type||'';if(reduced.matches){el.textContent=txt;return}let k=0,dir=1;setInterval(()=>{if(paused())return;k+=dir;if(k>txt.length+8){dir=-1;k=txt.length}if(k<0){dir=1;k=0}el.textContent=txt.slice(0,Math.min(k,txt.length))},170)});

/* Campus: anillo, recorrido, logros y celebración */
const ring=$('#ring-fg');
if(ring){const acts=$$('.activity'),pct=$('#ring-pct'),tl=$('.timeline'),first=$('.timeline li'),second=$('.timeline li:nth-child(2)'),badge=$('#badge-first');let done=false;
const burst=el=>{if(paused())return;const r=el.getBoundingClientRect(),cols=['#e1673c','#e7a93c','#2e6e82','#173c48','#1f4e5f'];for(let j=0;j<34;j++){const c=document.createElement('i');c.className='confetti';c.style.left=r.left+r.width/2+'px';c.style.top=r.top+r.height/2+'px';c.style.background=cols[j%5];c.style.setProperty('--tx',(Math.random()*360-180)+'px');c.style.setProperty('--ty',(Math.random()*-260-40)+'px');c.style.setProperty('--r',(Math.random()*720-360)+'deg');document.body.append(c);setTimeout(()=>c.remove(),1600)}};
const update=src=>{const n=acts.filter(a=>a.checked).length,p=Math.round(n/acts.length*100);ring.style.strokeDashoffset=326.73*(1-n/acts.length);if(pct)pct.textContent=p+'%';
const all=n===acts.length;first?.classList.toggle('done',all);first?.classList.toggle('current',!all);second?.classList.toggle('current',all);if(tl)tl.style.setProperty('--tl',all?'17%':(n/acts.length*8)+'%');
if(first)$('small',first).textContent=all?'Completado · muestra':`En curso · ${n} de ${acts.length}`;
if(badge){badge.classList.toggle('unlocked',all);$('.badge-state',badge).textContent=all?'Desbloqueado':'Bloqueado'}
if(all&&!done&&src)burst(src);done=all};
acts.forEach(a=>a.addEventListener('change',()=>update(a.closest('label'))));update();
/* Menú lateral que acompaña la lectura */
const links=$$('.campus-menu a[href^="#"]');const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('is-active',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});links.forEach(l=>{const t=$(l.getAttribute('href'));if(t)so.observe(t)})}
})();
