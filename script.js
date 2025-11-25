// script.js - Portfólio Tamires Silva
// Sistema de alternância de tema com persistência e detecção de preferência do sistema

document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("mode-toggle");
  const body = document.body;

  // Função para atualizar o visual do botão
  function updateButton(isDark) {
    if (isDark) {
      toggleButton.innerHTML = '<i class="fas fa-sun"></i><span class="mode-text">Light</span>';
      toggleButton.setAttribute('aria-pressed', 'true');
      toggleButton.setAttribute('aria-label', 'Mudar para modo claro');
    } else {
      toggleButton.innerHTML = '<i class="fas fa-moon"></i><span class="mode-text">Modo</span>';
      toggleButton.setAttribute('aria-pressed', 'false');
      toggleButton.setAttribute('aria-label', 'Mudar para modo escuro');
    }
  }

  // Detecta a preferência de tema do sistema operacional
  const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Inicializa o tema
  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    let isDarkMode = false;

    if (savedTheme) {
      // Se há tema salvo, usa ele
      isDarkMode = savedTheme === "dark";
    } else if (prefersDarkScheme) {
      // Se não há tema salvo, usa a preferência do sistema
      isDarkMode = true;
    }

    if (isDarkMode) {
      body.classList.add("dark-mode");
      updateButton(true);
    } else {
      body.classList.remove("dark-mode");
      updateButton(false);
    }
  }

  // Inicializa o tema ao carregar
  initializeTheme();

  // Toggle de tema ao clicar no botão
  toggleButton.addEventListener("click", function(e) {
    e.preventDefault();

    // Animação de feedback ao clicar
    toggleButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      toggleButton.style.transform = '';
    }, 150);

    // Alterna o tema
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    
    // Atualiza o botão
    updateButton(isDark);

    // Salva a preferência no localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Listener para mudanças automáticas na preferência do sistema (opcional)
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Função para lidar com mudança de preferência do sistema
    function handleSystemThemeChange(e) {
      // Só aplica a mudança se o usuário não tiver definido uma preferência manual
      if (!localStorage.getItem("theme")) {
        const shouldBeDark = e.matches;
        
        if (shouldBeDark) {
          body.classList.add("dark-mode");
        } else {
          body.classList.remove("dark-mode");
        }
        
        updateButton(shouldBeDark);
      }
    }

    // Adiciona o listener (compatível com navegadores antigos e novos)
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (darkModeQuery.addListener) {
      // Fallback para navegadores mais antigos
      darkModeQuery.addListener(handleSystemThemeChange);
    }
  }

  // Smooth scroll para links de navegação
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Adiciona animação sutil ao scroll
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-5px)';
      header.style.boxShadow = '0 4px 20px var(--shadow)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
      header.style.boxShadow = '0 2px 15px var(--shadow)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });

  // Log de inicialização (pode ser removido em produção)
  console.log('🌟 Portfólio Tamires Silva carregado com sucesso!');
  console.log('Tema atual:', body.classList.contains('dark-mode') ? 'Escuro' : 'Claro');
});