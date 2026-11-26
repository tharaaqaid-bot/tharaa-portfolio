/* ================================================================
   THARAA QAID — PORTFOLIO INTERACTIONS
   Vanilla JavaScript. No dependencies, no external services.
   ================================================================ */
(function () {
  'use strict';

  var $ = function (selector, scope) { return (scope || document).querySelector(selector); };
  var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------------
     Header shadow on scroll
  --------------------------------------------------------------- */
  var header = $('#siteHeader');
  var updateHeader = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------- */
  var revealItems = $$('[data-reveal]');

  // Subtle stagger for card grids.
  $$('.skills__grid > [data-reveal], .projects__grid > [data-reveal]').forEach(function (item, index) {
    item.style.setProperty('--reveal-delay', (index % 3) * 90 + 'ms');
  });

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -45px 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* ---------------------------------------------------------------
     Mobile menu
  --------------------------------------------------------------- */
  var menuToggle = $('#menuToggle');
  var nav = $('#primaryNav');

  function setMenu(open) {
    if (!menuToggle || !nav) return;
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    $$('.nav a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenu(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------------------------------------------------------------
     Active navigation link based on visible section
  --------------------------------------------------------------- */
  var navLinks = $$('.nav__link');
  var navByHash = {};
  navLinks.forEach(function (link) { navByHash[link.getAttribute('href')] = link; });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) { link.classList.remove('is-active'); });
        var link = navByHash['#' + entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    ['about', 'skills', 'projects', 'education', 'contact'].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------------
     Filter buttons (skills + projects)
  --------------------------------------------------------------- */
  $$('.filters').forEach(function (filterBar) {
    var section = filterBar.closest('.section');
    var grid = section ? section.querySelector('.skills__grid, .projects__grid') : null;
    if (!grid) return;

    var buttons = $$('.filter', filterBar);
    var items = $$(grid.dataset.items || '.skill-card, .project-card', grid);

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');

        buttons.forEach(function (other) {
          var isActive = other === button;
          other.classList.toggle('is-active', isActive);
          other.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        items.forEach(function (item) {
          var matches = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !matches);
          if (matches) item.classList.add('is-visible');
        });
      });
    });
  });

  /* ---------------------------------------------------------------
     Project case study modal
  --------------------------------------------------------------- */
  var modal = $('#projectModal');
  var dialog = modal ? $('.modal__dialog', modal) : null;
  var lastFocused = null;

  function openModal(card) {
    if (!modal || !dialog) return;

    var image = $('img', card);
    $('#modalTitle').textContent = card.dataset.title || 'Project';
    $('#modalCategory').textContent = card.querySelector('.project-card__cat')?.textContent || 'Case study';
    $('#modalYear').textContent = card.dataset.year || '';
    $('#modalRole').textContent = card.dataset.role || '';
    $('#modalSummary').textContent = card.dataset.summary || '';

    var modalImage = $('#modalImage');
    modalImage.src = image ? image.getAttribute('src') : '';
    modalImage.alt = image ? image.getAttribute('alt') : '';

    var highlights = $('#modalHighlights');
    highlights.innerHTML = '';
    (card.dataset.highlights || '').split('|').filter(Boolean).forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text.trim();
      highlights.appendChild(li);
    });

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    dialog.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  $$('.project-card__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(trigger.closest('.project-card'));
    });
  });

  if (modal) {
    $$('[data-close-modal]', modal).forEach(function (element) {
      element.addEventListener('click', closeModal);
    });

    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var focusables = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', dialog)
        .filter(function (element) { return !element.disabled && element.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  /* ---------------------------------------------------------------
     Toast notifications
  --------------------------------------------------------------- */
  var toast = $('#toast');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  /* ---------------------------------------------------------------
     Placeholder social links — clearly flagged, no broken URLs
  --------------------------------------------------------------- */
  $$('[data-placeholder]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      showToast('Add your ' + link.getAttribute('data-placeholder') + ' in index.html.');
    });
  });

  /* ---------------------------------------------------------------
     Copy email address
  --------------------------------------------------------------- */
  var copyButton = $('#copyEmail');
  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var email = $('#emailLink') ? $('#emailLink').textContent.trim() : '';

      function fallbackCopy() {
        var helper = document.createElement('textarea');
        helper.value = email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        try { document.execCommand('copy'); showToast('Email address copied to clipboard.'); }
        catch (error) { showToast('Copy the email address manually: ' + email); }
        document.body.removeChild(helper);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('Email address copied to clipboard.');
        }).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }

  /* ---------------------------------------------------------------
     Contact form — local demo, prepares a mailto message
  --------------------------------------------------------------- */
  var form = $('#contactForm');
  var success = $('#formSuccess');
  var mailtoLink = $('#mailtoLink');
  var resetButton = $('#resetForm');

  if (form && success) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fields = $$('input, select, textarea', form);
      var firstInvalid = null;

      fields.forEach(function (field) {
        var valid = field.checkValidity();
        field.classList.toggle('is-invalid', !valid);
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        showToast('Please complete the highlighted fields.');
        return;
      }

      var name = $('#name').value.trim();
      var email = $('#email').value.trim();
      var subject = $('#subject').value;
      var message = $('#message').value.trim();
      var to = $('#emailLink') ? $('#emailLink').textContent.trim() : 'hello@tharaaqaid.example';

      if (mailtoLink) {
        mailtoLink.href = 'mailto:' + to +
          '?subject=' + encodeURIComponent('[' + subject + '] Message from ' + name) +
          '&body=' + encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
      }

      form.hidden = true;
      success.hidden = false;
      if (!reduceMotion) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    $$('input, select, textarea', form).forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('is-invalid'); });
      field.addEventListener('change', function () { field.classList.remove('is-invalid'); });
    });
  }

  if (resetButton && form && success) {
    resetButton.addEventListener('click', function () {
      form.reset();
      $$('.is-invalid', form).forEach(function (field) { field.classList.remove('is-invalid'); });
      success.hidden = true;
      form.hidden = false;
      $('#name').focus();
    });
  }

  /* ---------------------------------------------------------------
     Animated stat counters
  --------------------------------------------------------------- */
  var counters = $$('[data-count]');

  function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { element.textContent = String(target); return; }

    var duration = 1300;
    var start = null;

    function tick(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (counter) { counterObserver.observe(counter); });
  } else {
    counters.forEach(function (counter) { counter.textContent = counter.getAttribute('data-count'); });
  }

  /* ---------------------------------------------------------------
     Misc
  --------------------------------------------------------------- */
  var year = $('#currentYear');
  if (year) year.textContent = String(new Date().getFullYear());

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (modal && !modal.hidden) closeModal();
    if (nav && nav.classList.contains('is-open')) setMenu(false);
  });
})();
