/* ==========================================
   AWS BUILDER CENTER - BITS VIZAG STUDENT COMMUNITY
   Interactive Engine & Microinteractions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initParticleCanvas();
  initCursorGlow();
  initScrollProgress();
  initNavigation();
  initCounterAnimation();
  initTechExplorerModal();
  initGalleryLightbox();
  initFAQAccordion();
  initMobileMenu();
  initLucideIcons();
});

/* 1. Loading Screen Handler */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);
}

/* 2. Interactive Background Canvas with Floating Particles */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 45);
  const particles = [];
  const colors = ['#FF9900', '#59F3D5', '#87EFFF', '#B38BFF', '#F29EFF'];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw faint connecting lines
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* 3. Radial Mouse Spotlight Glow */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* 4. Top Reading Scroll Progress Indicator */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* 5. Sticky Navigation & Scroll-Spy */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-spy active link detection
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 6. Animated Counter Numbers */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-target'), 10);
          let currentCount = 0;
          const duration = 2000;
          const increment = Math.ceil(countTo / (duration / 16));

          const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= countTo) {
              target.textContent = countTo + '+';
              clearInterval(timer);
            } else {
              target.textContent = currentCount + '+';
            }
          }, 16);

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => observer.observe(stat));
}

/* 7. Technology Explorer Interactive Modal */
const techData = {
  ai: {
    title: 'Artificial Intelligence (AI)',
    badge: 'Generative AI & Machine Learning',
    description: 'Artificial Intelligence empowers systems to perceive, reason, learn, and act intelligently. From Foundation Models to Amazon Bedrock, explore how modern generative AI is reshaping software engineering.',
    whyMatters: 'AI enables hyper-personalized customer experiences, automated document intelligence, real-time decision synthesis, and powerful copilot assistants for modern cloud applications.',
    awsResources: 'Explore Amazon Bedrock, AWS Trainium, Amazon Q, and AWS Skill Builder AI Practitioner pathways.'
  },
  ml: {
    title: 'Machine Learning (ML)',
    badge: 'Predictive Modeling & SageMaker',
    description: 'Machine Learning provides systems the ability to automatically learn and improve from experience without being explicitly programmed.',
    whyMatters: 'Predictive analytics powers recommendation engines, fraud detection, computer vision, natural language processing, and automated anomaly detection at global scale.',
    awsResources: 'Learn with Amazon SageMaker, AWS DeepRacer, and AWS ML University courses.'
  },
  cloud: {
    title: 'Cloud Computing',
    badge: 'Core Infrastructure & Global Network',
    description: 'Cloud Computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.',
    whyMatters: 'Allows organizations to trade capital expense for variable expense, scale elastically across global availability zones, and innovate rapidly without managing physical server racks.',
    awsResources: 'Start with AWS Cloud Practitioner, AWS EC2, S3, and VPC Architecture Foundations.'
  },
  cybersecurity: {
    title: 'Cloud Cybersecurity',
    badge: 'Zero Trust & IAM Security',
    description: 'Security in the cloud involves protecting data, applications, and infrastructure from cyber threats using strict encryption and identity management.',
    whyMatters: 'With AWS Shared Responsibility Model, security is job zero. Protecting customer privacy, data integrity, and compliance is essential for modern cloud architectures.',
    awsResources: 'Explore AWS IAM, AWS GuardDuty, AWS KMS, AWS WAF, and Security Specialty credentials.'
  },
  devops: {
    title: 'DevOps & CI/CD',
    badge: 'Automation & Infrastructure as Code',
    description: 'DevOps combines cultural philosophies, practices, and tools that increase an organization\'s ability to deliver applications and services at high velocity.',
    whyMatters: 'Automating build, test, deployment pipelines (CI/CD) and codifying infrastructure with CloudFormation/CDK eliminates human error and drastically accelerates release cycles.',
    awsResources: 'Master AWS CodePipeline, AWS CodeBuild, AWS CDK, and CloudFormation.'
  },
  containers: {
    title: 'Containers & Microservices',
    badge: 'Docker, ECS & Kubernetes',
    description: 'Containers package code and all its dependencies so the application runs quickly and reliably from one computing environment to another.',
    whyMatters: 'Microservice architectures built on containers allow independent scaling, seamless deployment, fault isolation, and cloud-native portability.',
    awsResources: 'Discover Amazon ECS, Amazon EKS (Elastic Kubernetes Service), and AWS Fargate.'
  },
  networking: {
    title: 'Cloud Networking',
    badge: 'VPC, Transit Gateway & CloudFront',
    description: 'Networking connects compute, storage, and database components securely across private virtual networks and edge locations worldwide.',
    whyMatters: 'Delivers sub-millisecond latency to global users via Content Delivery Networks (CDNs) and establishes isolated subnets with custom routing rules.',
    awsResources: 'Explore AWS VPC, Route 53, CloudFront, and AWS Direct Connect.'
  },
  iot: {
    title: 'Internet of Things (IoT)',
    badge: 'Edge Computing & Connected Devices',
    description: 'AWS IoT provides cloud services that connect millions of IoT devices to other devices and AWS cloud services without managing infrastructure.',
    whyMatters: 'Enables smart campus systems, industrial automation, telematics, real-time sensor processing, and predictive maintenance.',
    awsResources: 'Check out AWS IoT Core, AWS IoT Greengrass, and IoT Analytics.'
  },
  serverless: {
    title: 'Serverless Architecture',
    badge: 'Event-Driven Computing',
    description: 'Serverless allows you to build and run applications without thinking about servers. AWS automatically manages provisioning, scaling, and maintenance.',
    whyMatters: 'Pay only for actual execution duration down to the millisecond. Zero idle capacity charges with auto-scaling from zero to millions of requests.',
    awsResources: 'Learn AWS Lambda, Amazon EventBridge, AWS Step Functions, and Amazon DynamoDB.'
  },
  databases: {
    title: 'Modern Cloud Databases',
    badge: 'Relational, NoSQL & Graph',
    description: 'Purpose-built database engines engineered for specific application needs, ranging from transactional SQL to high-speed document stores.',
    whyMatters: 'Guarantees sub-millisecond query response times, multi-region replication, automated backups, and serverless auto-scaling.',
    awsResources: 'Master Amazon Aurora, DynamoDB, ElastiCache, and Amazon Neptune.'
  }
};

function initTechExplorerModal() {
  const modalOverlay = document.getElementById('tech-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const cards = document.querySelectorAll('.tech-card');

  if (!modalOverlay) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const techKey = card.getAttribute('data-tech');
      const data = techData[techKey];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-badge').textContent = data.badge;
        document.getElementById('modal-desc').textContent = data.description;
        document.getElementById('modal-why').textContent = data.whyMatters;
        document.getElementById('modal-aws').textContent = data.awsResources;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* 8. Gallery Lightbox Modal */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox) return;

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const caption = item.querySelector('.gallery-caption');

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Campus Gallery Image';
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* 9. FAQ Accordion Handler */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((otherItem) => otherItem.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 10. Mobile Navigation Drawer */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-menu .nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

/* Initialize Lucide Icons fallback if script included */
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
