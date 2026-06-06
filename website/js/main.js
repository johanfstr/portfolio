(function () {
  const grid = document.getElementById('projects-grid');
  const modal = document.getElementById('modal');
  const modalBackdrop = modal.querySelector('.modal-backdrop');
  const modalClose = modal.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalTech = document.getElementById('modal-tech');
  const modalDesc = document.getElementById('modal-desc');
  const modalDemo = document.getElementById('modal-demo');
  const modalLinkCode = document.getElementById('modal-link-code');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(filter) {
    const list = filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.year === filter);

    grid.innerHTML = list
      .map(
        (p) => `
      <article class="project-card" data-year="${p.year}" data-id="${p.id}">
        <span class="card-badge ${p.year}">${p.year}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.shortDesc)}</p>
        <div class="card-tech">${p.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>
        <div class="card-actions">
          <button class="btn btn-primary" data-action="open" data-id="${p.id}">Détails & démo</button>
          ${p.demoType === 'web' ? `<a href="${escapeAttr(p.demoPath)}" target="_blank" rel="noopener" class="btn btn-secondary">Tester le projet</a>` : ''}
        </div>
      </article>
    `
      )
      .join('');
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    if (!s) return '#';
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML.replace(/"/g, '&quot;');
  }

  function openModal(project) {
    modalTitle.textContent = project.title;
    modalBadge.textContent = project.year;
    modalBadge.className = 'modal-badge ' + project.year;
    modalTech.innerHTML = project.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join('');
    modalDesc.textContent = project.longDesc;

    modalLinkCode.href = project.codePath || '#';
    modalLinkCode.textContent = 'Voir le code (dossier du projet)';

    // Zone démo : vidéo ou interface de test
    modalDemo.innerHTML = '';
    modalDemo.classList.remove('video-placeholder');

    if (project.demoType === 'web' && project.demoPath) {
      const iframe = document.createElement('iframe');
      iframe.src = project.demoPath;
      iframe.title = 'Démo ' + project.title;
      modalDemo.appendChild(iframe);
      const openNew = document.createElement('a');
      openNew.href = project.demoPath;
      openNew.target = '_blank';
      openNew.rel = 'noopener';
      openNew.className = 'btn btn-secondary';
      openNew.style.marginTop = '8px';
      openNew.textContent = 'Ouvrir en plein écran';
      modalDemo.appendChild(openNew);
    } else if (project.demoType === 'video') {
      if (project.videoUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = project.videoUrl;
        iframe.title = 'Vidéo démo ' + project.title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        modalDemo.appendChild(iframe);
      } else {
        modalDemo.classList.add('video-placeholder');
        modalDemo.innerHTML = `
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p><strong>Vidéo démo</strong></p>
            <p>Ajoutez <code>videoUrl: "https://www.youtube.com/embed/VIDEO_ID"</code> dans <code>js/data.js</code> pour ce projet pour afficher une vidéo ici.</p>
          </div>
        `;
      }
    } else {
      modalDemo.classList.add('video-placeholder');
      modalDemo.innerHTML = `
        <div>
          <p>Projet hors-ligne (OCaml, C, Java). Lancez-le en local pour le tester.</p>
        </div>
      `;
    }

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const iframe = modalDemo.querySelector('iframe');
    if (iframe) iframe.src = '';
  }

  // Filtres
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  // Clic sur carte ou bouton "Détails & démo"
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    const btn = e.target.closest('[data-action="open"]');
    if (!card && !btn) return;
    const id = (card || btn).dataset.id;
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
    if (project) openModal(project);
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Init
  renderProjects('all');
})();
