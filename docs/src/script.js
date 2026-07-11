(function () {
  'use strict';

  // Translations
  const translations = {
    'en': {
      heroTitle: 'First NFT Blockchain',
      heroSubtitle: 'A simple demo of an NFT card with theme and language controls.',
      nftName: 'First NFT DIO',
      nftDesc: 'A minimal NFT demo card for learning HTML, CSS and JS.',
      metaCreator: 'Creator',
      metaSupply: 'Supply',
      btnMint: 'Mint',
      btnDetails: 'Details',
      infoTitle: 'Quick Info',
      infoItem1: 'No backend required',
      infoItem2: 'Accessible controls',
      infoItem3: 'Responsive layout',
      notesTitle: 'Notes',
      notesText: 'This demo runs entirely in the browser. Use the language selector and theme toggle to explore.',
      footerText: 'Made for learning HTML5, CSS3 and JavaScript.'
    },
    'pt-BR': {
      heroTitle: 'Primeiro NFT Blockchain',
      heroSubtitle: 'Um demo simples de um cartão NFT com controles de tema e idioma.',
      nftName: 'Primeiro NFT DIO',
      nftDesc: 'Um cartão NFT mínimo para aprender HTML, CSS e JS.',
      metaCreator: 'Criador',
      metaSupply: 'Quantidade',
      btnMint: 'Mintar',
      btnDetails: 'Detalhes',
      infoTitle: 'Informações Rápidas',
      infoItem1: 'Sem backend necessário',
      infoItem2: 'Controles acessíveis',
      infoItem3: 'Layout responsivo',
      notesTitle: 'Observações',
      notesText: 'Este demo roda inteiramente no navegador. Use o seletor de idioma e o tema para explorar.',
      footerText: 'Feito para aprender HTML5, CSS3 e JavaScript.'
    },
    'es': {
      heroTitle: 'Primer NFT Blockchain',
      heroSubtitle: 'Una demo simple de una tarjeta NFT con controles de tema e idioma.',
      nftName: 'Primer NFT DIO',
      nftDesc: 'Una tarjeta NFT mínima para aprender HTML, CSS y JS.',
      metaCreator: 'Creador',
      metaSupply: 'Suministro',
      btnMint: 'Mintear',
      btnDetails: 'Detalles',
      infoTitle: 'Información Rápida',
      infoItem1: 'No requiere backend',
      infoItem2: 'Controles accesibles',
      infoItem3: 'Diseño responsivo',
      notesTitle: 'Notas',
      notesText: 'Esta demo se ejecuta completamente en el navegador. Use el selector de idioma y el tema para explorar.',
      footerText: 'Hecho para aprender HTML5, CSS3 y JavaScript.'
    }
  };

  // Elements
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun = document.getElementById('iconSun');
  const langSelect = document.getElementById('langSelect');
  const liveRegion = document.getElementById('liveRegion');
  const yearSpan = document.getElementById('year');

  // Defaults
  const THEME_KEY = 'demo_theme';
  const LANG_KEY = 'demo_lang';
  const defaultTheme = 'dark'; // dark is primary
  const defaultLang = 'en';

  // Initialize year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Helpers
  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
      themeToggle.setAttribute('aria-pressed', 'false');
    } else {
      root.removeAttribute('data-theme');
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
      themeToggle.setAttribute('aria-pressed', 'true');
    }
    localStorage.setItem(THEME_KEY, theme);
    announce(`Theme set to ${theme}`);
  }

  function setLanguage(lang) {
    const map = translations[lang] || translations[defaultLang];
    // update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (map[key]) {
        el.textContent = map[key];
      }
    });
    // set html lang attribute
    document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : (lang === 'es' ? 'es' : 'en');
    localStorage.setItem(LANG_KEY, lang);
    announce(`Language set to ${lang}`);
  }

  function announce(message) {
    if (!liveRegion) return;
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  }

  // Event listeners
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem(THEME_KEY) || defaultTheme;
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  });

  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });

  // Keyboard accessibility for theme toggle
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  // Initialize from storage or defaults
  (function init() {
    const savedTheme = localStorage.getItem(THEME_KEY) || defaultTheme;
    setTheme(savedTheme);

    const savedLang = localStorage.getItem(LANG_KEY) || defaultLang;
    // If savedLang is 'pt' or 'pt-BR' normalize to 'pt-BR'
    const normalizedLang = savedLang === 'pt' ? 'pt-BR' : (savedLang === 'es' ? 'es' : savedLang);
    langSelect.value = normalizedLang;
    setLanguage(normalizedLang);

    // Make sure icons reflect theme
    if (savedTheme === 'light') {
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    } else {
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    }
  })();

  // Example action handlers (no backend)
  const mintBtn = document.getElementById('mintBtn');
  if (mintBtn) {
    mintBtn.addEventListener('click', () => {
      mintBtn.disabled = true;
      mintBtn.textContent = translations[document.documentElement.lang.startsWith('pt') ? 'pt-BR' : (document.documentElement.lang === 'es' ? 'es' : 'en')].btnMint + '...';
      setTimeout(() => {
        mintBtn.textContent = translations[document.documentElement.lang.startsWith('pt') ? 'pt-BR' : (document.documentElement.lang === 'es' ? 'es' : 'en')].btnMint;
        mintBtn.disabled = false;
        announce('Mint simulated');
        alert('Mint simulated — this demo has no blockchain backend.');
      }, 900);
    });
  }

})();
