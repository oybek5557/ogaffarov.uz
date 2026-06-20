(function(){
  "use strict";

  // Theme toggle
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  var saved = localStorage.getItem('theme');
  if(saved) root.setAttribute('data-theme', saved);
  function syncIcon(){
    if(!themeBtn) return;
    var isLight = root.getAttribute('data-theme') === 'light';
    themeBtn.innerHTML = isLight ? '<i class="fa fa-moon-o"></i>' : '<i class="fa fa-sun-o"></i>';
  }
  syncIcon();
  if(themeBtn){
    themeBtn.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncIcon();
    });
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
    });
  }

  // Active link highlighting on scroll
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');
  function onScroll(){
    var y = window.scrollY + 120;
    sections.forEach(function(sec){
      if(y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight){
        links.forEach(function(l){ l.classList.remove('active'); });
        var match = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
        if(match) match.classList.add('active');
      }
    });
    var toTop = document.querySelector('.to-top');
    if(toTop) toTop.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Back to top
  var toTopBtn = document.querySelector('.to-top');
  if(toTopBtn){
    toTopBtn.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(function(el){ io.observe(el); });

  // Animated skill bars
  var bars = document.querySelectorAll('.bar span');
  var barIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var target = entry.target.getAttribute('data-pct');
        entry.target.style.width = target + '%';
        barIo.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  bars.forEach(function(b){ barIo.observe(b); });

  // Typing effect for role text
  var roleEl = document.getElementById('typed-role');
  if(roleEl){
    var roles = JSON.parse(roleEl.getAttribute('data-roles') || '[]');
    var ri = 0, ci = 0, deleting = false;
    function tick(){
      var word = roles[ri] || '';
      if(!deleting){
        ci++;
        if(ci > word.length){ deleting = true; setTimeout(tick, 1400); return; }
      } else {
        ci--;
        if(ci < 0){ deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      }
      roleEl.textContent = word.slice(0, Math.max(ci,0));
      setTimeout(tick, deleting ? 45 : 90);
    }
    if(roles.length) tick();
  }

  // Tabs (experience / education)
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Contact form (AJAX submit to contact_process.php)
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var status = document.getElementById('form-status');
      var data = new FormData(form);
      status.textContent = 'Sending...';
      status.className = '';
      fetch('contact_process.php', { method: 'POST', body: data })
        .then(function(res){ return res.json().then(function(json){ return { ok: res.ok, json: json }; }); })
        .then(function(result){
          if(!result.ok || !result.json.success) throw new Error(result.json.message || 'fail');
          status.textContent = result.json.message;
          status.className = 'ok';
          form.reset();
        })
        .catch(function(err){
          status.textContent = err.message || 'Something went wrong. Please email me directly instead.';
          status.className = 'err';
        });
    });
  }
})();
