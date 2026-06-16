document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light / Dark) ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `
          <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41"></path>
          </svg>
        `;
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `
          <svg class="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        `;
      });
    }
  };

  // Initialize Theme
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  });

  // --- 2. Direction Management (LTR / RTL) ---
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  
  const applyDirection = (dir) => {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      localStorage.setItem('direction', 'rtl');
      rtlToggleBtns.forEach(btn => {
        btn.textContent = 'LTR';
      });
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      localStorage.setItem('direction', 'ltr');
      rtlToggleBtns.forEach(btn => {
        btn.textContent = 'RTL';
      });
    }
    // Dispatch custom event so pages can adjust dynamically (e.g. alignment charts)
    window.dispatchEvent(new CustomEvent('directionchanged', { detail: { direction: dir } }));
  };

  // Initialize Direction
  const savedDirection = localStorage.getItem('direction') || 'ltr';
  applyDirection(savedDirection);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(currentDir);
    });
  });

  // --- 3. Sticky Header and Active Navigation Link Highlighting ---
  const header = document.getElementById('sticky-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90');
        header.classList.remove('bg-white', 'dark:bg-slate-950');
      } else {
        header.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90');
        header.classList.add('bg-white', 'dark:bg-slate-950');
      }
    });
  }

  // Highlight Active Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (href === 'index.html' && (currentPath.endsWith('/') || currentPath === '')))) {
      link.classList.add('text-medical-blueLight', 'font-semibold');
      link.classList.remove('text-slate-600', 'dark:text-slate-300');
    } else {
      link.classList.remove('text-medical-blueLight', 'font-semibold');
      link.classList.add('text-slate-600', 'dark:text-slate-300');
    }
  });

  // --- 4. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('animate-fadeInUp');
    });
  }

  // --- 5. Scroll-to-Top Button ---
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scroll-to-top';
  scrollTopBtn.className = 'fixed bottom-6 right-6 p-3 bg-medical-blueLight text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 hover:bg-medical-blue hover:scale-110 z-50 focus:outline-none';
  scrollTopBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  `;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.add('opacity-100');
    } else {
      scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollTopBtn.classList.remove('opacity-100');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- 6. Patient Mock Session Setup ---
  if (!localStorage.getItem('currentUser')) {
    const defaultUser = {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@athlete.com',
      phone: '+1 (555) 019-2834',
      injuryType: 'ACL Tear Recovery (Left Knee)',
      rehabStage: 'Active Agility & Strengthening',
      recoveryProgress: 72,
      weeksCompleted: 8,
      weeksTotal: 12
    };
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
  }
});
