/* ═══════════════════════════════════════════════════════════
   DevOps Portfolio — script.js
   • Canvas particle network (hero background)
   • Typed text effect
   • Terminal animation
   • Navbar scroll behavior
   • Scroll-reveal (IntersectionObserver)
   • Animated counters
   • Skill bar fill animation
   • Hamburger mobile menu
   • Contact form handler
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── Wait for DOM ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initNavbar();
  initTyped();
  initTerminal();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initHamburger();
  initContactForm();
  initSkillGraph();
});

/* ══════════════════════════════════════════
   11. INTERACTIVE SKILL GRAPH (D3.js)
══════════════════════════════════════════ */
function initSkillGraph() {
  const container = document.getElementById('skill-graph-container');
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const svg = d3.select('#skill-graph-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('overflow', 'visible');

  // Graph Data
  const nodes = [
    // 🟦 Category Hubs
    { id: 'hub-tech', label: 'TECHNICAL SKILLS', cat: 'tech', type: 'hub', color: '3b82f6' },
    { id: 'hub-ind', label: 'INDUSTRY KNOWLEDGE', cat: 'ind', type: 'hub', color: '10b981' },
    { id: 'hub-tool', label: 'TOOLS & SOFTWARE', cat: 'tool', type: 'hub', color: 'eab308' },

    // 🟦 Technical Skills (Blue)
    { id: 'tech-cloud', label: 'Cloud Computing', cat: 'tech', icon: '☁️', color: '3b82f6' },
    { id: 'tech-cicd', label: 'CI/CD Pipelines', cat: 'tech', icon: '🔄', color: '3b82f6' },
    { id: 'tech-azure', label: 'Azure', cat: 'tech', icon: '☁️', color: '3b82f6' },
    { id: 'tech-gha', label: 'GitHub Actions', cat: 'tech', icon: '🤖', color: '3b82f6' },
    { id: 'tech-shell', label: 'Shell Scripting', cat: 'tech', icon: '🐚', color: '3b82f6' },
    { id: 'tech-docker', label: 'Docker', cat: 'tech', icon: '🐳', color: '3b82f6' },
    { id: 'tech-ci', label: 'Continuous Integration', cat: 'tech', icon: '🔁', color: '3b82f6' },

    // 🟩 Industry Knowledge (Green)
    { id: 'ind-cloud', label: 'Cloud Computing', cat: 'ind', icon: '🌐', color: '10b981' },
    { id: 'ind-config', label: 'Configuration Management', cat: 'ind', icon: '⚙️', color: '10b981' },
    { id: 'ind-agile', label: 'Agile Methodologies', cat: 'ind', icon: '🏃', color: '10b981' },
    { id: 'ind-devops', label: 'DevOps Practices', cat: 'ind', icon: '🚀', color: '10b981' },

    // 🟨 Tools & Software (Yellow)
    { id: 'tool-tf', label: 'Terraform', cat: 'tool', icon: '🏗️', color: 'eab308' },
    { id: 'tool-adv', label: 'Azure DevOps', cat: 'tool', icon: '♾️', color: 'eab308' },
    { id: 'tool-jenkins', label: 'Jenkins', cat: 'tool', icon: '👨‍✈️', color: 'eab308' },
    { id: 'tool-nginx', label: 'Nginx', cat: 'tool', icon: '🟢', color: 'eab308' },
    { id: 'tool-dotnet', label: '.NET Core', cat: 'tool', icon: '⚡', color: 'eab308' },
    { id: 'tool-angular', label: 'Angular', cat: 'tool', icon: '🅰️', color: 'eab308' },
    { id: 'tool-sql', label: 'SQL Server', cat: 'tool', icon: '🗄️', color: 'eab308' },
    { id: 'tool-azure', label: 'Microsoft Azure', cat: 'tool', icon: '☁️', color: 'eab308' },
    { id: 'tool-docker', label: 'Docker', cat: 'tool', icon: '🐳', color: 'eab308' },
  ];

  const links = [
    // Hub to Items
    { source: 'hub-tech', target: 'tech-cloud' },
    { source: 'hub-tech', target: 'tech-cicd' },
    { source: 'hub-tech', target: 'tech-azure' },
    { source: 'hub-tech', target: 'tech-gha' },
    { source: 'hub-tech', target: 'tech-shell' },
    { source: 'hub-tech', target: 'tech-docker' },
    { source: 'hub-tech', target: 'tech-ci' },

    { source: 'hub-ind', target: 'ind-cloud' },
    { source: 'hub-ind', target: 'ind-config' },
    { source: 'hub-ind', target: 'ind-agile' },
    { source: 'hub-ind', target: 'ind-devops' },

    { source: 'hub-tool', target: 'tool-tf' },
    { source: 'hub-tool', target: 'tool-adv' },
    { source: 'hub-tool', target: 'tool-jenkins' },
    { source: 'hub-tool', target: 'tool-nginx' },
    { source: 'hub-tool', target: 'tool-dotnet' },
    { source: 'hub-tool', target: 'tool-angular' },
    { source: 'hub-tool', target: 'tool-sql' },
    { source: 'hub-tool', target: 'tool-azure' },
    { source: 'hub-tool', target: 'tool-docker' },

    // Cross-links
    { source: 'tech-azure', target: 'tool-azure' },
    { source: 'tech-docker', target: 'tool-docker' },
    { source: 'tech-gha', target: 'tech-cicd' },
    { source: 'ind-config', target: 'tool-tf' },
  ];

  // Simulation - Significantly increased spacing and repulsion
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(130).strength(0.8))
    .force('charge', d3.forceManyBody().strength(-1200)) // Stronger repulsion
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(d => d.type === 'hub' ? 140 : 85)) // Larger collision radius
    .force('x', d3.forceX(width / 2).strength(0.2))
    .force('y', d3.forceY(height / 2).strength(0.2));

  // Render Links
  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link-line');

  // Render Nodes
  const node = svg.append('g')
    .selectAll('.node-pod')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', d => `node-pod ${d.type || ''}`)
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

  node.each(function (d) {
    const g = d3.select(this);
    if (d.type === 'hub') {
      // Background box for Hubs as requested
      const hubLabelWidth = d.label.length * 9.5 + 30;
      const hubHeight = 44;

      g.append('rect')
        .attr('class', 'hub-bg-box')
        .attr('width', hubLabelWidth)
        .attr('height', hubHeight)
        .attr('x', -hubLabelWidth / 2)
        .attr('y', -hubHeight / 2)
        .attr('rx', 12)
        .attr('ry', 12)
        .style('fill', 'rgba(15, 23, 42, 0.4)') // Semi-transparent as requested
        .style('stroke', `#${d.color}`)
        .style('stroke-width', '2px')
        .style('backdrop-filter', 'blur(10px)');

      g.append('text')
        .attr('class', 'node-category-label hub-text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .style('fill', `#${d.color}`)
        .style('font-size', '15px')
        .style('font-weight', '800')
        .text(d.label);
    } else {
      const labelWidth = d.label.length * 8 + 55;
      const height = 36;

      g.append('rect')
        .attr('class', `node-glow ${d.cat}`)
        .attr('width', labelWidth + 4)
        .attr('height', height + 4)
        .attr('x', -(labelWidth + 4) / 2)
        .attr('y', -(height + 4) / 2)
        .attr('rx', 20)
        .attr('ry', 20)
        .style('opacity', 0);

      g.append('rect')
        .attr('class', `node-rect ${d.cat}`)
        .attr('width', labelWidth)
        .attr('height', height)
        .attr('x', -labelWidth / 2)
        .attr('y', -height / 2)
        .attr('rx', 18)
        .attr('ry', 18);

      g.append('text')
        .attr('class', 'node-icon-emoji')
        .attr('dominant-baseline', 'central')
        .attr('text-anchor', 'middle')
        .attr('x', -labelWidth / 2 + 20)
        .attr('y', 0)
        .style('font-size', '16px')
        .text(d.icon);

      g.append('text')
        .attr('class', 'node-text')
        .attr('dominant-baseline', 'central')
        .attr('x', -labelWidth / 2 + 38)
        .attr('y', 0)
        .text(d.label);
    }
  });

  // State Management
  let selectedCat = null;

  function updateVisuals() {
    if (!selectedCat) {
      node.style('opacity', 1).classed('faded', false);
      link.classed('active', false).style('opacity', 0.4);
      node.selectAll('.node-glow').style('opacity', 0);
      return;
    }

    node.classed('faded', d => d.cat !== selectedCat && d.type !== 'hub');
    node.style('opacity', d => (d.cat === selectedCat || d.id === `hub-${selectedCat}`) ? 1 : 0.2);

    link.classed('active', l =>
      (l.source.cat === selectedCat || l.source.id === `hub-${selectedCat}`) &&
      (l.target.cat === selectedCat || l.target.id === `hub-${selectedCat}`)
    ).style('opacity', function (l) {
      return d3.select(this).classed('active') ? 0.8 : 0.05;
    });

    node.each(function (d) {
      if (d.cat === selectedCat && d.type !== 'hub') {
        d3.select(this).select('.node-glow').style('opacity', 0.6);
      } else {
        d3.select(this).select('.node-glow').style('opacity', 0);
      }
    });
  }

  // Interactivity
  node.on('click', (event, d) => {
    event.stopPropagation();
    if (d.type === 'hub') {
      selectedCat = (selectedCat === d.cat) ? null : d.cat;
    } else {
      selectedCat = d.cat;
    }
    updateVisuals();
  });

  svg.on('click', () => {
    selectedCat = null;
    updateVisuals();
  });

  node.on('mouseenter', (event, d) => {
    if (selectedCat) return;
    link.classed('active', l => l.source.id === d.id || l.target.id === d.id);
    d3.select(event.currentTarget).select('.node-glow').style('opacity', 0.6);
  }).on('mouseleave', (event, d) => {
    if (selectedCat) return;
    link.classed('active', false);
    d3.select(event.currentTarget).select('.node-glow').style('opacity', 0);
  });

  // Initial State: Highlight all hubs briefly or maintain neutral?
  // The user said "Initially highlight these 3". I'll add a class to hubs initially.
  node.filter(d => d.type === 'hub').classed('initial-highlight', true);

  // Tick Function
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('transform', d => `translate(${d.x},${d.y})`);
  });

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  window.addEventListener('resize', () => {
    const newWidth = container.offsetWidth;
    const newHeight = container.offsetHeight;
    if (newWidth === 0 || newHeight === 0) return;
    svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
    simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(0.3).restart();
  });
}

/* ══════════════════════════════════════════
   1. HERO CANVAS — particle network
══════════════════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 130;
  const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#a5b4fc'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r = Math.random() * 2 + 1.2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.3;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        const force = (90 - dist) / 90 * 0.04;
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
      }

      // Speed limit
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 1.2) { this.vx = this.vx / speed * 1.2; this.vy = this.vy / speed * 1.2; }

      // Wrap edges
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.25;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    loop();
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
  });

  document.getElementById('hero').addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  document.getElementById('hero').addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  init();
}

/* ══════════════════════════════════════════
   2. NAVBAR — scroll behavior + active link
══════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active link
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════
   3. TYPED TEXT EFFECT
══════════════════════════════════════════ */
function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = ['Engineer', 'Architect', 'Automation Expert', 'Cloud Builder', 'GitOps Wizard'];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = phrases[pIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) {
        setTimeout(() => { deleting = true; tick(); }, 2400);
        return;
      }
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    tick();
  }

  function tick() {
    const delay = deleting ? 55 : (cIdx === phrases[pIdx].length ? 80 : 80);
    setTimeout(type, delay);
  }

  setTimeout(tick, 700);
}

/* ══════════════════════════════════════════
   4. TERMINAL ANIMATION
══════════════════════════════════════════ */
function initTerminal() {
  const cmdEl = document.getElementById('terminal-cmd');
  const outputEl = document.getElementById('terminal-output');
  if (!cmdEl || !outputEl) return;

  const sessions = [
    {
      cmd: 'kubectl get pods -n production',
      output: `NAME                          READY   STATUS
api-deployment-7d4f9-kx2p8    2/2     Running
db-statefulset-0              1/1     Running
cache-deployment-5bc9-rqz4t   1/1     Running
worker-job-8bm9w              1/1     Running
[4/4 running] ✓ All healthy`,
      color: '#10b981'
    },
    {
      cmd: 'terraform apply -auto-approve',
      output: `Plan: 3 to add, 2 to change, 0 to destroy.

Apply complete!
  + aws_eks_cluster.main
  + aws_rds_instance.db
  ~ aws_security_group.ingress

Apply complete! Resources: 3 added, 2 changed.`,
      color: '#6366f1'
    },
    {
      cmd: 'helm upgrade --install myapp ./chart',
      output: `Release "myapp" has been upgraded. Happy helming!
NAME: myapp
LAST DEPLOYED: $(date)
NAMESPACE: default
STATUS: deployed
REVISION: 7 ✓`,
      color: '#06b6d4'
    },
    {
      cmd: 'docker build -t kesava/app:latest .',
      output: `[+] Building 4.2s (12/12) FINISHED
 => [internal] load build context     0.1s
 => [1/5] FROM node:18-alpine         0.0s
 => [2/5] WORKDIR /app                0.0s
 => [5/5] RUN npm run build           3.2s
 => exporting to image                0.3s
Successfully built image ✓`,
      color: '#f59e0b'
    }
  ];

  let sessIdx = 0;

  function runSession(sess) {
    cmdEl.textContent = '';
    outputEl.textContent = '';
    outputEl.style.color = sess.color;

    let i = 0;
    const typeCmd = () => {
      if (i < sess.cmd.length) {
        cmdEl.textContent += sess.cmd[i++];
        setTimeout(typeCmd, 35);
      } else {
        setTimeout(() => showOutput(sess), 300);
      }
    };
    typeCmd();
  }

  function showOutput(sess) {
    const lines = sess.output.split('\n');
    let lineIdx = 0;

    const showLine = () => {
      if (lineIdx < lines.length) {
        outputEl.textContent += (lineIdx > 0 ? '\n' : '') + lines[lineIdx++];
        setTimeout(showLine, 130);
      }
    };
    showLine();

    // Schedule next session
    setTimeout(() => {
      sessIdx = (sessIdx + 1) % sessions.length;
      runSession(sessions[sessIdx]);
    }, (lines.length * 130) + 3500);
  }

  runSession(sessions[0]);
}

/* ══════════════════════════════════════════
   5. SCROLL REVEAL — IntersectionObserver
══════════════════════════════════════════ */
function initScrollReveal() {
  // Add reveal class to all target elements
  const targets = [
    '.about-content', '.about-image-wrapper',
    '.skill-category', '.project-card',
    '.timeline-item', '.cert-card',
    '.contact-item', '.contact-form',
    '.skill-bars-section',
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   6. ANIMATED COUNTERS (hero stats)
══════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   7. SKILL BAR ANIMATION
══════════════════════════════════════════ */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      // Small delay so the reveal animation completes first
      setTimeout(() => {
        bar.style.width = `${bar.dataset.width}%`;
      }, 300);
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ══════════════════════════════════════════
   8. HAMBURGER MOBILE MENU
══════════════════════════════════════════ */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    // Animate spans
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ══════════════════════════════════════════
   9. CONTACT FORM
══════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#f87171';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Simulate send
    const span = submitBtn.querySelector('span');
    span.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      span.textContent = 'Send Message';
      submitBtn.disabled = false;
      form.reset();
      successEl.classList.add('visible');
      setTimeout(() => successEl.classList.remove('visible'), 5000);
    }, 1500);
  });

  // Clear error state on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
}

/* ══════════════════════════════════════════
   10. SMOOTH RETURN TO TOP (logo click)
══════════════════════════════════════════ */
document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
