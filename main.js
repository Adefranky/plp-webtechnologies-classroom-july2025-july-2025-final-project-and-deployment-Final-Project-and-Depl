// Shared JS for navigation toggle, year, simple form validation, and scroll reveal
(function(){
  'use strict';

  // set years (defensive: update only if element exists)
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(new Date().getFullYear());
  });

  // mobile nav toggles (supports multiple pages each with own toggle id)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    if (!targetId) return; // defensive: ensure attribute exists
    const nav = document.getElementById(targetId);

    // remember initial display state for a graceful restore
    if (nav && window.getComputedStyle(nav).display === 'none') {
      nav.dataset.initialDisplay = 'none';
    }

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));

      if (!nav) return;
      // toggle class for maintainability; fall back to inline style if needed
      nav.classList.toggle('open', !expanded);
      if (nav.classList.contains('open')) {
        nav.style.display = 'block';
      } else {
        // restore to initial hidden state or let CSS decide
        nav.style.display = nav.dataset.initialDisplay === 'none' ? 'none' : '';
      }
    });
  });

  // contact form validation and fake submit (defensive access to fields)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = (form.name && form.name.value || '').trim();
      const email = (form.email && form.email.value || '').trim();
      const message = (form.message && form.message.value || '').trim();
      const msg = document.getElementById('formMsg');
      if(!msg) return;
      if(name.length < 2 || email.indexOf('@') === -1 || message.length < 10){
        msg.textContent = 'Please fill all fields correctly (message needs 10+ characters).';
        msg.style.color = 'crimson';
        return;
      }
      // simulate successful submission
      msg.textContent = 'Thanks — your message has been received. (Demo)';
      msg.style.color = 'green';
      form.reset();
    });
  }

  // scroll reveal with IntersectionObserver fallback
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },{threshold:0.15});
    document.querySelectorAll('[data-anim]').forEach(el=>obs.observe(el));
  } else {
    // if IntersectionObserver isn't supported, reveal all elements
    document.querySelectorAll('[data-anim]').forEach(el=>el.classList.add('in-view'));
  }

})();
