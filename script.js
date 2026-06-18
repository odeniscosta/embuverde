// ============ Tabão Verde — interações ============

document.getElementById('year').textContent = new Date().getFullYear();

/* Header: muda aparência ao rolar */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Menu mobile */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function closeNav(){
  mainNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  document.body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    // fecha os outros itens abertos
    document.querySelectorAll('.faq-item.is-open').forEach(open => {
      if (open !== item){
        open.classList.remove('is-open');
        open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        open.querySelector('.faq-a').style.maxHeight = null;
      }
    });

    item.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
  });
});

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* Formulário de contato -> abre WhatsApp com a mensagem preenchida */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = [
    `Olá, Tabão Verde! Meu nome é ${nome}.`,
    `Telefone para contato: ${telefone}.`,
    mensagem ? `Mensagem: ${mensagem}` : null
  ].filter(Boolean).join(' ');

  const url = `https://wa.me/5511919457686?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
});
