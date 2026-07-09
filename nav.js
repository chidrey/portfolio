function toggleMobileNav(btn){
  var nav = btn.parentElement.querySelector('.mnavl');
  var open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobileNav(){
  var nav = document.querySelector('.mnavl.open');
  if (!nav) return;
  nav.classList.remove('open');
  document.body.style.overflow = '';
  var btn = document.querySelector('.mburger.open');
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
}
document.addEventListener('click', function(e){
  if (e.target.closest('.mnavl') || e.target.closest('.mburger')) return;
  closeMobileNav();
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closeMobileNav();
});
window.addEventListener('resize', function(){
  if (window.innerWidth > 768) closeMobileNav();
});
