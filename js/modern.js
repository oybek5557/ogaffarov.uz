(function(){
  "use strict";

  // Page-load fade transition
  document.documentElement.classList.add('js');
  window.addEventListener('load', function(){
    document.body.classList.remove('page-loading');
  });

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

    // Scroll progress bar
    var progress = document.querySelector('.scroll-progress');
    if(progress){
      var h = document.documentElement;
      var scrolled = (h.scrollTop || document.body.scrollTop);
      var height = (h.scrollHeight - h.clientHeight) || 1;
      progress.style.width = (scrolled / height * 100) + '%';
    }

    // Nav shrink
    var nav = document.querySelector('.nav');
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Back to top
  var toTopBtn = document.querySelector('.to-top');
  if(toTopBtn){
    toTopBtn.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // Reveal on scroll (with stagger for grouped children)
  var revealEls = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(function(el){ io.observe(el); });

  // Stagger any group of cards/items by giving each a transition delay
  ['.cards-grid', '.tag-cloud', '.facts', '.stats-grid'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(group){
      Array.prototype.forEach.call(group.children, function(child, i){
        child.style.transitionDelay = (i * 70) + 'ms';
      });
    });
  });

  // Animated number counters (stat cards)
  var counters = document.querySelectorAll('.stat-card .num');
  var countIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      var raw = el.textContent.trim();
      var num = parseInt(raw.replace(/\D/g, ''), 10) || 0;
      var suffix = raw.replace(/[0-9]/g, '');
      var start = null, dur = 1400;
      function step(ts){
        if(!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(num * eased) + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      countIo.unobserve(el);
    });
  }, {threshold:0.5});
  counters.forEach(function(c){ countIo.observe(c); });

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

  // Mouse parallax on hero portrait + blobs
  var hero = document.querySelector('.hero');
  var portraitWrap = document.querySelector('.hero-portrait-wrap');
  var heroBlobs = document.querySelectorAll('.hero .blob');
  if(hero && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false){
    hero.addEventListener('mousemove', function(e){
      var rect = hero.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      if(portraitWrap) portraitWrap.style.transform = 'translate(' + (px * -18) + 'px,' + (py * -18) + 'px)';
      heroBlobs.forEach(function(b, i){
        var depth = (i + 1) * 14;
        b.style.transform = 'translate(' + (px * depth) + 'px,' + (py * depth) + 'px)';
      });
    });
    hero.addEventListener('mouseleave', function(){
      if(portraitWrap) portraitWrap.style.transform = '';
      heroBlobs.forEach(function(b){ b.style.transform = ''; });
    });
  }

  // Network/particle background in hero
  var netCanvas = document.querySelector('.hero-net');
  if(netCanvas && hero){
    var ctx = netCanvas.getContext('2d');
    var nodes = [];
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function resizeNet(){
      netCanvas.width = hero.offsetWidth;
      netCanvas.height = hero.offsetHeight;
      var count = Math.min(60, Math.round((netCanvas.width * netCanvas.height) / 18000));
      nodes = [];
      for(var i = 0; i < count; i++){
        nodes.push({
          x: Math.random() * netCanvas.width,
          y: Math.random() * netCanvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    }
    function drawNet(){
      ctx.clearRect(0, 0, netCanvas.width, netCanvas.height);
      var maxDist = 140;
      nodes.forEach(function(n){
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > netCanvas.width) n.vx *= -1;
        if(n.y < 0 || n.y > netCanvas.height) n.vy *= -1;
      });
      for(var i = 0; i < nodes.length; i++){
        for(var j = i + 1; j < nodes.length; j++){
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < maxDist){
            ctx.strokeStyle = 'rgba(91,140,255,' + (1 - dist / maxDist) * 0.25 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(126,224,195,.6)';
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      if(!reduceMotion) requestAnimationFrame(drawNet);
    }
    resizeNet();
    drawNet();
    window.addEventListener('resize', resizeNet);
  }

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
