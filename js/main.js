/* Sam McDevitt — portfolio interactions */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme toggle ---------- */
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealed.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealed.forEach(function (el) { io.observe(el); });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- hero canvas: quiet sensor point-cloud sweep ---------- */
  var canvas = document.getElementById("hero-canvas");
  if (!canvas || reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;
  var points = [];
  var POINT_COUNT = 90;

  function accentColor() {
    return getComputedStyle(root).getPropertyValue("--accent").trim() || "#D6491B";
  }
  function inkColor() {
    return getComputedStyle(root).getPropertyValue("--ink-2").trim() || "#4C535B";
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    points = [];
    for (var i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  var sweepX = 0;
  var last = 0;

  function frame(t) {
    if (!last) last = t;
    var dt = Math.min(t - last, 50);
    last = t;

    ctx.clearRect(0, 0, w, h);

    var accent = accentColor();
    var ink = inkColor();

    // drifting point cloud
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      p.x += p.vx * dt * 0.06;
      p.y += p.vy * dt * 0.06;
      if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
      if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;

      var near = Math.abs(p.x - sweepX);
      var lit = near < 90;
      var alpha = lit ? 0.55 - (near / 90) * 0.35 : 0.14;
      ctx.beginPath();
      ctx.arc(p.x, p.y, lit ? p.r + 0.6 : p.r, 0, Math.PI * 2);
      ctx.fillStyle = lit ? accent : ink;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    // sweep line
    sweepX += dt * 0.028;
    if (sweepX > w + 120) sweepX = -120;
    var grad = ctx.createLinearGradient(sweepX - 70, 0, sweepX, 0);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, accent);
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = grad;
    ctx.fillRect(sweepX - 70, 0, 70, h);
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = accent;
    ctx.fillRect(sweepX, 0, 1, h);
    ctx.globalAlpha = 1;

    requestAnimationFrame(frame);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); seed(); }, 150);
  });

  resize();
  seed();
  requestAnimationFrame(frame);
})();
