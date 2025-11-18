// Page animations & interactions
document.addEventListener('DOMContentLoaded', ()=> {
  // animate skill bars
  document.querySelectorAll('.bar-fill').forEach(el=>{
    const value = el.dataset.fill || 80;
    setTimeout(()=> el.style.width = value + '%', 450);
  });

  // UX chart with Chart.js
  const ctx = document.getElementById('uxChart');
  if(ctx){
    const uxChart = new Chart(ctx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Research','Prototyping','Testing','Interaction'],
        datasets:[{data:[30,30,20,20], backgroundColor:['#0077b6','#00a3ff','#46b6ff','#8fd6ff'], hoverOffset:6}]
      },
      options:{
        cutout: '68%',
        plugins:{legend:{position:'bottom',labels:{boxWidth:10}}}
      }
    });
  }

  // fade-in on scroll
  const panels = document.querySelectorAll('.panel, .project-card, .exp-card');
  function checkScroll(){
    const top = window.innerHeight;
    panels.forEach(p=>{
      const r = p.getBoundingClientRect();
      if(r.top < top - 80) p.style.opacity = 1, p.style.transform = 'translateY(0)';
    });
  }
  panels.forEach(p=>{p.style.opacity=0; p.style.transform='translateY(30px)'; p.style.transition='all 0.8s ease-out'});
  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // Filters
  const filters = document.querySelectorAll('.filter');
  const projectsGrid = document.getElementById('projectsGrid');
  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card=>{
        if(f==='all') card.style.display='flex';
        else card.style.display = (card.dataset.type === f) ? 'flex' : 'none';
      });
    });
  });

  // Project modal & carousel data
  const projectData = {
    project1:{
      title:'Real-time Trading Engine',
      desc:'Node.js & React backend handling heavy concurrent loads with real-time backtesting.',
      images:['images/project1.png','images/project1-2.png','images/project1-3.png'],
      links:'<a class="link" href="https://github.com" target="_blank" rel="noopener">GitHub</a>'
    },
    project2:{
      title:'E-commerce Platform',
      desc:'Scalable store with payments, analytics and optimized checkout flow.',
      images:['images/project2.png','images/project2-2.png','images/project2-3.png'],
      links:'<a class="link" href="https://github.com" target="_blank" rel="noopener">GitHub</a>'
    },
    project3:{
      title:'Portfolio & CMS',
      desc:'Personal portfolio with CMS-backed blog and analytics dashboards.',
      images:['images/project3.png','images/project3-2.png','images/project3-3.png'],
      links:'<a class="link" href="https://github.com" target="_blank" rel="noopener">GitHub</a>'
    },
    uiux1:{
      title:'Mobile Wallet Prototype',
      desc:'High-fidelity prototype tested with users — improved onboarding adoption.',
      images:['images/uiux1.png'],
      links:''
    },
    uiux2:{
      title:'Task Manager Redesign',
      desc:'UX improvements & microinteractions to simplify workflows.',
      images:['images/uiux2.png'],
      links:''
    },
    uiux3:{
      title:'Analytics Dashboard',
      desc:'Data-first design for clarity and quick insights.',
      images:['images/uiux3.png'],
      links:''
    }
  };

  // open modal
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');
  let currentImages = [], currentIndex = 0;

  function openModal(key){
    const data = projectData[key];
    if(!data) return;
    modal.setAttribute('aria-hidden','false');
    modalImage.src = data.images[0];
    modalImage.alt = data.title;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalLinks.innerHTML = data.links || '';
    currentImages = data.images;
    currentIndex = 0;
  }

  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalImage.src='';}

  document.querySelectorAll('.open-project').forEach(btn=>{
    btn.addEventListener('click', (e)=> openModal(e.currentTarget.dataset.project));
  });
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  document.querySelector('#projectModal .prev').addEventListener('click', ()=>{
    if(!currentImages.length) return;
    currentIndex = (currentIndex-1+currentImages.length)%currentImages.length;
    modalImage.src = currentImages[currentIndex];
  });
  document.querySelector('#projectModal .next').addEventListener('click', ()=>{
    if(!currentImages.length) return;
    currentIndex = (currentIndex+1)%currentImages.length;
    modalImage.src = currentImages[currentIndex];
  });

  // close modal on outside click or escape
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal();});
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

});
