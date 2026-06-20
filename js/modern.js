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
    var roleGen = 0;
    function getRoles(){
      var lang = localStorage.getItem('site-lang') || 'en';
      var attr = lang === 'ru' ? 'data-roles-ru' : 'data-roles';
      return JSON.parse(roleEl.getAttribute(attr) || roleEl.getAttribute('data-roles') || '[]');
    }
    function startTyping(){
      var myGen = ++roleGen;
      var roles = getRoles();
      var ri = 0, ci = 0, deleting = false;
      function tick(){
        if(myGen !== roleGen) return;
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
    startTyping();
    document.addEventListener('site-lang-changed', startTyping);
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

  // Themed animated section backgrounds (canvas)
  (function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var A = '91,140,255';   // accent
    var B = '126,224,195';  // accent-2

    function initSecBg(canvas){
      var mode = canvas.getAttribute('data-anim');
      var ctx = canvas.getContext('2d');
      var W = 0, H = 0, t = 0, running = false, state = {};

      function setup(){
        if(mode === 'server'){
          var cols = Math.max(8, Math.floor(W / 22));
          state.cols = [];
          for(var i = 0; i < cols; i++){
            state.cols.push({ x: i * 22 + 11, y: Math.random() * H, speed: 1 + Math.random() * 1.8 });
          }
        } else if(mode === 'orbit'){
          state.cx = W * 0.5;
          state.cy = H * 0.5;
          var ringCount = 4;
          state.rings = [];
          var base = Math.min(W, H) * 0.12;
          for(var r = 0; r < ringCount; r++){
            var radius = base + r * (Math.min(W, H) * 0.11);
            var dotN = 3 + r;
            var dots = [];
            for(var dd = 0; dd < dotN; dd++){
              dots.push({ a: (Math.PI * 2 / dotN) * dd + Math.random() });
            }
            state.rings.push({
              radius: radius,
              dots: dots,
              speed: (0.003 + r * 0.0014) * (r % 2 === 0 ? 1 : -1)
            });
          }
        } else if(mode === 'timeline'){
          var tracks = 4;
          state.tracks = [];
          for(var tr = 0; tr < tracks; tr++){
            var y = H * (tr + 1) / (tracks + 1);
            var dots = [];
            var count = Math.max(4, Math.floor(W / 160));
            for(var d = 0; d < count; d++){
              dots.push({ x: Math.random() * W, r: 2 + Math.random() * 2 });
            }
            state.tracks.push({ y: y, dots: dots, speed: 0.3 + tr * 0.18 });
          }
        } else if(mode === 'mesh'){
          var gap = 54;
          state.gap = gap;
          state.cols2 = Math.ceil(W / gap) + 1;
          state.rows2 = Math.ceil(H / gap) + 1;
          state.ripples = [];
        } else if(mode === 'signal'){
          state.ripples = [];
          state.ox = W * 0.18;
          state.oy = H * 0.5;
        }
      }

      function resize(){
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        setup();
      }

      function draw(){
        t++;
        ctx.clearRect(0, 0, W, H);

        if(mode === 'server'){
          ctx.font = '14px monospace';
          state.cols.forEach(function(c){
            c.y += c.speed;
            if(c.y - 90 > H) c.y = -Math.random() * 80;
            for(var k = 0; k < 7; k++){
              var yy = c.y - k * 14;
              if(yy < 0 || yy > H) continue;
              var alpha = (1 - k / 7) * 0.7;
              ctx.fillStyle = 'rgba(' + (k === 0 ? B : A) + ',' + alpha + ')';
              ctx.fillText(Math.random() > 0.5 ? '1' : '0', c.x, yy);
            }
          });
        } else if(mode === 'orbit'){
          state.rings.forEach(function(ring){
            // ring path
            ctx.strokeStyle = 'rgba(' + A + ',0.10)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(state.cx, state.cy, ring.radius, 0, Math.PI * 2);
            ctx.stroke();
            // orbiting dots
            ring.dots.forEach(function(dot){
              dot.a += ring.speed;
              var px = state.cx + Math.cos(dot.a) * ring.radius;
              var py = state.cy + Math.sin(dot.a) * ring.radius;
              ctx.fillStyle = 'rgba(' + B + ',0.7)';
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fill();
            });
          });
          // center glow
          var pulse = 5 + 2 * Math.sin(t * 0.05);
          ctx.fillStyle = 'rgba(' + A + ',0.5)';
          ctx.beginPath();
          ctx.arc(state.cx, state.cy, pulse, 0, Math.PI * 2);
          ctx.fill();
        } else if(mode === 'timeline'){
          state.tracks.forEach(function(tk){
            ctx.strokeStyle = 'rgba(' + A + ',0.10)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, tk.y); ctx.lineTo(W, tk.y); ctx.stroke();
            tk.dots.forEach(function(dot){
              dot.x += tk.speed;
              if(dot.x > W + 10) dot.x = -10;
            });
            for(var j = 0; j < tk.dots.length; j++){
              var dt = tk.dots[j];
              if(j > 0){
                var prev = tk.dots[j - 1];
                if(Math.abs(dt.x - prev.x) < 200){
                  ctx.strokeStyle = 'rgba(' + A + ',0.18)';
                  ctx.beginPath(); ctx.moveTo(prev.x, tk.y); ctx.lineTo(dt.x, tk.y); ctx.stroke();
                }
              }
              ctx.fillStyle = 'rgba(' + B + ',0.7)';
              ctx.beginPath(); ctx.arc(dt.x, tk.y, dt.r, 0, Math.PI * 2); ctx.fill();
            }
          });
        } else if(mode === 'mesh'){
          if(t % 80 === 0 || state.ripples.length === 0){
            state.ripples.push({
              x: Math.random() * W, y: Math.random() * H, r: 0, max: 220 + Math.random() * 120
            });
          }
          state.ripples = state.ripples.filter(function(r){ return r.r < r.max; });
          state.ripples.forEach(function(r){ r.r += 1.6; });
          for(var cx = 0; cx < state.cols2; cx++){
            for(var cy = 0; cy < state.rows2; cy++){
              var px = cx * state.gap, py = cy * state.gap;
              var bright = 0;
              state.ripples.forEach(function(r){
                var d = Math.abs(Math.sqrt((px - r.x) * (px - r.x) + (py - r.y) * (py - r.y)) - r.r);
                if(d < 24) bright = Math.max(bright, (1 - d / 24) * (1 - r.r / r.max));
              });
              ctx.fillStyle = 'rgba(' + (bright > 0.1 ? B : A) + ',' + (0.12 + bright * 0.7) + ')';
              ctx.beginPath(); ctx.arc(px, py, 1.6 + bright * 2.5, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else if(mode === 'signal'){
          if(t % 70 === 0 || state.ripples.length === 0){
            state.ripples.push({ r: 0, max: Math.max(W, H) });
          }
          state.ripples = state.ripples.filter(function(r){ return r.r < r.max; });
          state.ripples.forEach(function(r){
            r.r += 1.8;
            var alpha = (1 - r.r / r.max) * 0.4;
            ctx.strokeStyle = 'rgba(' + A + ',' + alpha + ')';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(state.ox, state.oy, r.r, 0, Math.PI * 2); ctx.stroke();
          });
          var pulse = 4 + 2 * Math.sin(t * 0.08);
          ctx.fillStyle = 'rgba(' + B + ',0.8)';
          ctx.beginPath(); ctx.arc(state.ox, state.oy, pulse, 0, Math.PI * 2); ctx.fill();
        }

        if(running) requestAnimationFrame(draw);
      }

      resize();
      window.addEventListener('resize', resize);

      function start(){ if(!running){ running = true; requestAnimationFrame(draw); } }
      function stop(){ running = false; }

      if(reduce){ draw(); return; } // single static frame

      // Only animate while in view
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ e.isIntersecting ? start() : stop(); });
      }, {threshold:0.02});
      io.observe(canvas);
    }

    document.querySelectorAll('.sec-bg').forEach(initSecBg);
  })();

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
