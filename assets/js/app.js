(() => {
  const services = {
    governance: {
      index: '01',
      kicker: 'Service 01',
      title: 'Program Governance',
      summary: 'Frameworks, controls and reporting that give owners clear visibility and decision-ready data.',
      image: 'assets/images/program-governance.webp',
      alt: 'Program Governance',
      capabilities: ['Capital Program Advisory & Management','Strategic Program Planning','Organizational Processes Optimization','Organizational Assets Development']
    },
    management: {
      index: '02',
      kicker: 'Service 02',
      title: 'Project Management',
      summary: 'Hands-on delivery leadership across design, procurement, construction and commissioning.',
      image: 'assets/images/project-management.webp',
      alt: 'Project Management',
      capabilities: ['Design Management','Procurement Management','Construction Management','Contract Administration','Resource Planning & Management','Risk Management']
    },
    assurance: {
      index: '03',
      kicker: 'Service 03',
      title: 'Performance Assurance',
      summary: 'Independent oversight of schedule, cost and quality to keep programs on target.',
      image: 'assets/images/performance-assurance.webp',
      alt: 'Performance Assurance',
      capabilities: ['Project Controls','Schedule Management','Cost Management','Earned Value Management']
    }
  };

  const locations = [
    ['Virginia, USA','Americas','North America',37.4,-78.7],['Washington, USA','Americas','North America',47.4,-120.7],['Texas, USA','Americas','North America',31,-99],['Iowa, USA','Americas','North America',42,-93.5],['Illinois, USA','Americas','North America',40,-89],['Wisconsin, USA','Americas','North America',44.5,-89.5],['Wyoming, USA','Americas','North America',43,-107.5],['Arizona, USA','Americas','North America',34,-111.7],['Georgia, USA','Americas','North America',32.7,-83.3],['Queretaro, Mexico','Americas','North America',20.59,-100.39],['Toronto, Canada','Americas','North America',43.65,-79.38],['Santiago, Chile','Americas','South America',-33.45,-70.67],['Rio de Janeiro, Brazil','Americas','South America',-22.91,-43.17],
    ['Milan, Italy','EMEA','Europe',45.46,9.19],['London, England','EMEA','Europe',51.51,-.13],['Cairo, Egypt','EMEA','Africa',30.04,31.24],['Brussels, Belgium','EMEA','Europe',50.85,4.35],['Dubai, UAE','EMEA','Middle East',25.2,55.27],['Abu Dhabi, UAE','EMEA','Middle East',24.45,54.38],['Frankfurt, Germany','EMEA','Europe',50.11,8.68],['Warsaw, Poland','EMEA','Europe',52.23,21.01],['Gavle-Sandviken, Sweden','EMEA','Europe',60.67,17.14],['Dublin, Ireland','EMEA','Europe',53.35,-6.26],['Amsterdam, Netherlands','EMEA','Europe',52.37,4.9],['Madrid, Spain','EMEA','Europe',40.42,-3.7],['Cape Town, South Africa','EMEA','Africa',-33.93,18.42],['Johannesburg, South Africa','EMEA','Africa',-26.2,28.04],['Doha, Qatar','EMEA','Middle East',25.29,51.53],['Vienna, Austria','EMEA','Europe',48.21,16.37],
    ['Hong Kong, China','APAC','Asia',22.32,114.17],['Hyderabad, India','APAC','Asia',17.39,78.49],['Mumbai, India','APAC','Asia',19.08,72.88],['Chennai, India','APAC','Asia',13.08,80.27],['Pune, India','APAC','Asia',18.52,73.86],['Jakarta, Indonesia','APAC','Asia',-6.21,106.85],['Kuala Lumpur, Malaysia','APAC','Asia',3.14,101.69],['Johor Bahru, Malaysia','APAC','Asia',1.49,103.74],['Auckland, New Zealand','APAC','Oceania',-36.85,174.76],['Singapore, Singapore','APAC','Asia',1.35,103.82],['Melbourne, Australia','APAC','Oceania',-37.81,144.96],['Sydney, Australia','APAC','Oceania',-33.87,151.21],['Seoul, South Korea','APAC','Asia',37.57,126.98],['Taipei, Taiwan','APAC','Asia',25.03,121.56],['Osaka, Japan','APAC','Asia',34.69,135.5],['Tokyo, Japan','APAC','Asia',35.68,139.69]
  ].map(([name,region,continent,lat,lon]) => ({name,region,continent,lat,lon}));

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    }));
  }

  const stage = document.querySelector('.service-stage');
  document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const service = services[tab.dataset.service];
      if (!service || !stage) return;
      document.querySelectorAll('.service-tab').forEach(btn => {
        const active = btn === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      stage.classList.add('is-changing');
      window.setTimeout(() => {
        document.querySelector('#service-index').textContent = service.index;
        document.querySelector('#service-kicker').textContent = service.kicker;
        document.querySelector('#service-title').textContent = service.title;
        document.querySelector('#service-summary').textContent = service.summary;
        const image = document.querySelector('#service-image');
        image.src = service.image;
        image.alt = service.alt;
        const list = document.querySelector('#service-capabilities');
        list.innerHTML = service.capabilities.map(item => `<li>${item}</li>`).join('');
        stage.classList.remove('is-changing');
      }, 180);
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        el.textContent = prefix + value.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: .55 });
  counters.forEach(el => counterObserver.observe(el));

  const map = document.querySelector('.project-map');
  if (map) {
    const canvas = map.querySelector('.map-canvas');
    const tooltip = map.querySelector('.map-tooltip');
    const status = map.querySelector('.map-status');
    locations.forEach(location => {
      const x = ((location.lon + 180) / 360) * 100;
      const y = ((90 - location.lat) / 180) * 100;
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'map-pin';
      pin.dataset.region = location.region;
      pin.style.left = x.toFixed(3) + '%';
      pin.style.top = y.toFixed(3) + '%';
      pin.setAttribute('aria-label', location.name + ' project location');
      const show = () => {
        map.querySelectorAll('.map-pin.is-active').forEach(p => p.classList.remove('is-active'));
        pin.classList.add('is-active');
        tooltip.innerHTML = `<strong>${location.name}</strong><span>${location.region}</span>`;
        tooltip.style.left = x.toFixed(3) + '%';
        tooltip.style.top = y.toFixed(3) + '%';
        tooltip.classList.add('is-visible');
      };
      const hide = () => { pin.classList.remove('is-active'); tooltip.classList.remove('is-visible'); };
      pin.addEventListener('mouseenter', show); pin.addEventListener('focus', show);
      pin.addEventListener('mouseleave', hide); pin.addEventListener('blur', hide);
      pin.addEventListener('click', show);
      canvas.appendChild(pin);
    });
    document.querySelectorAll('[data-map-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const region = button.dataset.mapFilter;
        document.querySelectorAll('[data-map-filter]').forEach(b => {
          const active = b === button;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        let visible = 0;
        map.querySelectorAll('.map-pin').forEach(pin => {
          const match = region === 'All' || pin.dataset.region === region;
          pin.classList.toggle('is-dimmed', !match);
          if (match) visible++;
        });
        status.textContent = region === 'All' ? 'Showing all project location markers.' : `Showing ${visible} project location markers for ${region}.`;
        tooltip.classList.remove('is-visible');
      });
    });
  }

  const form = document.querySelector('#lead-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const company = data.get('company');
      const interest = data.get('interest');
      const message = data.get('message') || 'Not provided';
      const subject = `Event inquiry — ${company} — ${interest}`;
      const body = `Hello Decima International,\n\nI would like to start a conversation.\n\nName: ${name}\nWork email: ${email}\nCompany: ${company}\nArea of interest: ${interest}\n\nProject / program context:\n${message}\n\nRegards,\n${name}`;
      document.querySelector('#form-status').textContent = 'Opening your email app with the introduction prepared…';
      window.location.href = `mailto:info@decimaintl.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
