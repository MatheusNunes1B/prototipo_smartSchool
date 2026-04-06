// ==============================
//   SMART SCHOOL — app.js
// ==============================

/**
 * Navegação entre telas
 */
function goTo(screenId) {
  closeMiniPerfil();

  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = 'none';
    screen.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    setTimeout(() => {
      target.style.display = 'flex';
      target.classList.add('active');

      const scrollContent = target.querySelector('.scroll-content');
      if (scrollContent) scrollContent.scrollTop = 0;

      // Anima barras de progresso ao entrar no perfil
      if (screenId === 'screen-perfil') {
        animateBarras();
      }
    }, 20);
  }
}

/**
 * Alterna entre abas Pendentes e Concluídas
 */
function switchTab(tab) {
  document.getElementById('tab-pendentes').classList.toggle('active', tab === 'pendentes');
  document.getElementById('tab-concluidas').classList.toggle('active', tab === 'concluidas');
  document.getElementById('lista-pendentes').classList.toggle('hidden', tab !== 'pendentes');
  document.getElementById('lista-concluidas').classList.toggle('hidden', tab !== 'concluidas');
}

/**
 * Mini popup de perfil
 */
function toggleMiniPerfil(e) {
  e.stopPropagation();
  const popup = document.getElementById('mini-perfil');
  popup.classList.toggle('hidden');
}

function closeMiniPerfil() {
  const popup = document.getElementById('mini-perfil');
  if (popup) popup.classList.add('hidden');
}

// Fecha o mini popup ao clicar fora
document.addEventListener('click', function () {
  closeMiniPerfil();
});

/**
 * Modal de Manutenção
 */
function openManut() {
  document.getElementById('manut-overlay').classList.remove('hidden');
}

function closeManut() {
  document.getElementById('manut-overlay').classList.add('hidden');
}

/**
 * Anima as barras de progresso na tela de perfil
 */
function animateBarras() {
  const barras = document.querySelectorAll('#screen-perfil .barra-fill');
  barras.forEach(barra => {
    const largura = barra.style.width;
    barra.style.width = '0%';
    setTimeout(() => { barra.style.width = largura; }, 80);
  });
}

/**
 * Toggle senha (olho)
 */
document.querySelector('.toggle-password')?.addEventListener('click', function () {
  const input = document.getElementById('login-senha');
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  this.classList.toggle('fa-eye', !isPass);
  this.classList.toggle('fa-eye-slash', isPass);
});

/**
 * Botão Entrar
 */
document.getElementById('btn-entrar')?.addEventListener('click', function (e) {
  e.stopPropagation();

  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();

  if (!email || !senha) {
    const card = document.querySelector('.login-card');
    if (card) {
      card.style.animation = 'none';
      void card.offsetHeight;
      card.style.animation = 'shake 0.4s ease';
    }
    return;
  }

  goTo('screen-painel');
});

/**
 * Botão Enviar Tarefa
 */
document.querySelector('.btn-enviar')?.addEventListener('click', function () {
  if (this.disabled) return;

  const original = this.textContent;
  this.textContent = '✓ Enviado!';
  this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  this.style.boxShadow = '0 6px 20px rgba(34,197,94,0.4)';
  this.disabled = true;

  setTimeout(() => {
    this.textContent = original;
    this.style.background = '';
    this.style.boxShadow = '';
    this.disabled = false;
  }, 2500);
});

/**
 * Animação de entrada dos cards
 */
function animateIn(screenEl) {
  if (!screenEl) return;

  const items = screenEl.querySelectorAll(
    '.task-card, .task-item, .material-item, .date-card, .detail-card, .subject-badge, .perfil-info-card, .perfil-section-card, .btn-sair'
  );

  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.32s ease ${i * 0.06}s, transform 0.32s ease ${i * 0.06}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// Observer para animações de entrada
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('active')) {
      animateIn(mutation.target);
    }
  });
});

document.querySelectorAll('.screen').forEach(s => {
  observer.observe(s, { attributes: true, attributeFilter: ['class'] });
});

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  const loginScreen = document.getElementById('screen-login');
  if (loginScreen) {
    loginScreen.style.display = 'flex';
    loginScreen.classList.add('active');
    animateIn(loginScreen);
  }
});