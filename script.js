// Header scroll efecto
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) header.classList.add('header-scrolled');
  else header.classList.remove('header-scrolled');
});

// Menú móvil
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu?.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) {
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = '#F8F8F8';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 2px 10px rgba(34,40,49,0.1)';
    navLinks.style.gap = '1rem';
  }
});

// Activar enlace actual en nav
(function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    const name = href?.split('/').pop();
    if ((path === '' && name === 'index.html') || name === path) a.classList.add('active');
  });
})();

// Smooth-scroll SOLO si el destino está en la misma página
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',e=>{
    const target = document.querySelector(anchor.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Sticky CTA se oculta cuando el footer es visible (sólo móvil)
(function stickyCTAObserver(){
  const footer = document.querySelector('footer');
  const stickyCTA = document.querySelector('.sticky-cta');
  if(!footer || !stickyCTA) return;
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      stickyCTA.style.display = entry.isIntersecting ? 'none' : 'block';
    });
  },{rootMargin:'0px 0px -100px 0px'});
  if (window.innerWidth <= 768) observer.observe(footer);
})();

// Cards de blog: clic en tarjeta abre "leer más"
document.querySelectorAll('.blog-card').forEach(card=>{
  card.addEventListener('click',e=>{
    if(!e.target.classList.contains('read-more')){
      const link = card.querySelector('.read-more');
      if(link) window.location.href = link.getAttribute('href');
    }
  });
  card.setAttribute('tabindex','0');
  card.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); card.click(); }
  });
});