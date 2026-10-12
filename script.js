document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // 2. Lógica do Checklist Pré-Missão
  const checkboxes = document.querySelectorAll('#checklistItems input[type="checkbox"]');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progress-percent');
  const checkStatus = document.getElementById('checkStatus');

  function updateChecklist() {
    let currentTotal = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) {
        currentTotal += parseInt(cb.getAttribute('data-weight')) || 0;
      }
    });

    if (progressBar && progressPercent) {
      progressBar.style.width = currentTotal + '%';
      progressPercent.textContent = currentTotal + '%';
    }

    if (checkStatus) {
      if (currentTotal === 100) {
        checkStatus.style.backgroundColor = 'rgba(74, 93, 78, 0.4)';
        checkStatus.style.color = '#73d982';
        checkStatus.innerHTML = '✅ PROCESSO CONCLUÍDO: Todos os requisitos legais e de segurança foram preenchidos!';
      } else if (currentTotal >= 60) {
        checkStatus.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
        checkStatus.style.color = '#d4af37';
        checkStatus.innerHTML = '⚠️ EM ANDAMENTO: Verifique os itens pendentes antes de sair.';
      } else {
        checkStatus.style.backgroundColor = 'rgba(255, 85, 0, 0.15)';
        checkStatus.style.color = '#ff884d';
        checkStatus.innerHTML = '🛑 ALERTA: Documentações e itens essenciais de segurança estão faltando!';
      }
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateChecklist);
  });

  // 3. Accordion do FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('active');
    });
  });
});