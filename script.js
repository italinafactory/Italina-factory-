const header=document.querySelector('.topbar');
const menuBtn=document.querySelector('.menu-button');
const nav=document.querySelector('.main-nav');
const slides=[...document.querySelectorAll('.hero-slide')];
let slide=0;
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menuBtn.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.classList.toggle('active',open);
  menuBtn.setAttribute('aria-expanded',open);
  document.body.classList.toggle('menu-open',open);
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');menuBtn.classList.remove('active');document.body.classList.remove('menu-open');
}));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 setInterval(()=>{
   slides[slide].classList.remove('active');
   slide=(slide+1)%slides.length;
   slides[slide].classList.add('active');
   document.querySelector('#slide-number').textContent=String(slide+1).padStart(2,'0');
 },6000);
}
const io=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const counterIO=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,target=+el.dataset.count;
  let start=0;const duration=1300,t0=performance.now();
  function tick(now){const p=Math.min((now-t0)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+(target===100?'':'');if(p<1)requestAnimationFrame(tick)}
  requestAnimationFrame(tick);counterIO.unobserve(el);
 })
},{threshold:.7});
document.querySelectorAll('[data-count]').forEach(el=>counterIO.observe(el));
const filters=document.querySelectorAll('.filters button');
const items=document.querySelectorAll('.gallery-item');
filters.forEach(btn=>btn.addEventListener('click',()=>{
 filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const f=btn.dataset.filter;
 items.forEach(item=>item.classList.toggle('hidden',f!=='all'&&item.dataset.category!==f));
}));
const dialog=document.querySelector('.lightbox');
const dialogImg=dialog.querySelector('img');
const dialogCaption=dialog.querySelector('.lightbox-caption');
items.forEach(item=>item.addEventListener('click',()=>{
 dialogImg.src=item.querySelector('img').src;
 dialogImg.alt=item.querySelector('img').alt;
 dialogCaption.textContent=item.querySelector('figcaption b').textContent+' — '+item.querySelector('figcaption span').textContent;
 dialog.showModal();
}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
