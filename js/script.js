/**
 * SmartTutor — Main JavaScript
 * ============================
 * Author  : [Your Name] (demo portfolio project)
 * Version : 1.0.0
 *
 * TABLE OF CONTENTS
 * -----------------
 * 01. CONFIGURATION — Tutor info, contact details, WhatsApp, social links
 * 02. COURSE DATA — All course definitions
 * 03. TESTIMONIAL DATA — Sample (demo) testimonials
 * 04. DOM READY BOOTSTRAP
 * 05. THEME TOGGLE — Light/Dark mode with localStorage persistence
 * 06. NAVBAR — Scroll shadow, active link highlight
 * 07. MOBILE MENU — Open/close, keyboard accessibility
 * 08. SMOOTH SCROLL + NAV LINK HANDLERS
 * 09. SCROLL ANIMATION — IntersectionObserver for fade-in elements
 * 10. COUNTER ANIMATION — Hero section statistics
 * 11. COURSE RENDERING — Build and inject course cards
 * 12. COURSE FILTERING — Filter tabs
 * 13. COURSE SEARCH — Live search with debounce
 * 14. COURSE MODAL — Open, close, keyboard, outside-click
 * 15. TESTIMONIAL RENDERING — Build and inject testimonial cards
 * 16. FAQ ACCORDION — Accessible expand/collapse
 * 17. CONTACT FORM — Validation, demo submission, state management
 * 18. WHATSAPP BUTTON — Conditional rendering based on config
 * 19. SOCIAL LINKS — Conditional rendering based on config
 * 20. BACK-TO-TOP BUTTON
 * 21. FOOTER YEAR — Dynamic copyright year
 * 22. UTILITY FUNCTIONS
 */


/* =========================================================================
   01. CONFIGURATION
   =========================================================================
   Edit the values below to customise SmartTutor for a real tutor.
   -------------------------------------------------------------------------
   IMPORTANT:
   - Replace all demo/placeholder values before publishing.
   - Never put real API keys or secrets in this file — use a backend or
     environment-specific config instead.
   ========================================================================= */
const CONFIG = {
  // ---------- Tutor Info ----------
  tutorName:     "Arjun Sharma",        // Replace with the real tutor's name
  tutorTitle:    "Maths & CS Educator", // Replace with real title/specialisation
  tutorEmail:    "demo@smarttutor.example.com", // Replace with real email

  // ---------- WhatsApp ----------
  // Set to a real E.164 international number (digits only, no spaces or dashes).
  // Example: "919876543210" for India +91 98765 43210
  // Leave as an empty string ("") to hide the WhatsApp button entirely.
  whatsappNumber: "", // ← Set to real number before publishing

  // WhatsApp pre-filled message template
  whatsappMessage: "Hi! I found SmartTutor online and would like to enquire about your tutoring services.",

  // ---------- Social Links ----------
  // Set URL to "" or null to hide the link. Do NOT create dead links.
  social: {
    instagram: "", // e.g. "https://instagram.com/youraccount"
    linkedin:  "", // e.g. "https://linkedin.com/in/yourprofile"
    youtube:   "", // e.g. "https://youtube.com/@yourchannel"
    twitter:   "", // e.g. "https://twitter.com/youraccount"
  },

  // ---------- Form ----------
  // After connecting a real form service (Formspree, EmailJS, Flask endpoint),
  // set `formEndpoint` to the URL and `formMode` to "live".
  formMode:     "demo",  // "demo" | "live"
  formEndpoint: "",      // e.g. "https://formspree.io/f/yourformid"
};


/* =========================================================================
   02. COURSE DATA
   =========================================================================
   Each course object has:
   - id          : unique identifier (used for filter/search/modal)
   - icon        : emoji icon shown in card header
   - title       : course name
   - category    : "stem" | "tech" | "data" (used by filter tabs)
   - description : short summary shown on the card
   - difficulty  : "beginner" | "intermediate" | "advanced"
   - duration    : string describing the learning timeline
   - mode        : available learning modes
   - topics      : array of key topics (shown in modal)
   - fullDescription : longer description shown in modal
   ========================================================================= */
const courseData = [
  {
    id: "mathematics",
    icon: "🔢",
    title: "Mathematics",
    category: "stem",
    description: "From algebra and trigonometry to calculus and statistics — build a solid mathematical foundation with concept-first teaching.",
    difficulty: "beginner",
    duration: "3–6 months",
    mode: "Online & In-person",
    topics: [
      "Algebra & Polynomials",
      "Trigonometry",
      "Differential Calculus",
      "Integral Calculus",
      "Statistics & Probability",
      "Coordinate Geometry",
    ],
    fullDescription:
      "Our Mathematics course is designed for school and college students who want to truly understand maths rather than just memorise formulas. We focus on conceptual clarity, problem-solving techniques, and exam-ready practice. Sessions are tailored to your specific syllabus (CBSE, ISC, JEE, or college level).",
  },
  {
    id: "physics",
    icon: "⚛️",
    title: "Physics",
    category: "stem",
    description: "Master core physics concepts through clear explanations, real-world examples, and guided problem-solving from Mechanics to Modern Physics.",
    difficulty: "intermediate",
    duration: "3–6 months",
    mode: "Online & In-person",
    topics: [
      "Mechanics & Kinematics",
      "Laws of Motion",
      "Work, Energy & Power",
      "Electricity & Magnetism",
      "Optics & Waves",
      "Modern Physics",
    ],
    fullDescription:
      "Physics can feel abstract without the right guidance. This course bridges theory and application, helping you visualise concepts and solve problems confidently. Suitable for Class 11/12, JEE aspirants, and first-year engineering students.",
  },
  {
    id: "python",
    icon: "🐍",
    title: "Python Programming",
    category: "tech",
    description: "Learn Python from first principles — variables, loops, functions, OOP — through hands-on coding exercises and mini-projects.",
    difficulty: "beginner",
    duration: "2–4 months",
    mode: "Online",
    topics: [
      "Python Basics & Syntax",
      "Control Flow & Loops",
      "Functions & Modules",
      "Object-Oriented Programming",
      "File Handling",
      "Introduction to Libraries (NumPy, Pandas)",
    ],
    fullDescription:
      "Python is the most widely used language for data science, automation, and web development. This beginner-friendly course takes you from zero to writing practical programs. Each session includes live coding, exercises, and a small project to apply your learning.",
  },
  {
    id: "webdev",
    icon: "🌐",
    title: "Web Development",
    category: "tech",
    description: "Build real websites from scratch with HTML, CSS, and JavaScript. Learn responsive design, DOM manipulation, and practical project development.",
    difficulty: "beginner",
    duration: "3–5 months",
    mode: "Online",
    topics: [
      "HTML5 Semantic Structure",
      "CSS3 & Flexbox/Grid",
      "Responsive Design",
      "Vanilla JavaScript",
      "DOM Manipulation",
      "Building a Portfolio Project",
    ],
    fullDescription:
      "This course teaches you the core technologies behind every website on the internet. No frameworks — we start with solid HTML, CSS, and JS fundamentals so you understand exactly how the web works. By the end, you will have built and deployed your own project.",
  },
  {
    id: "datascience",
    icon: "📊",
    title: "Data Science Fundamentals",
    category: "data",
    description: "Explore the basics of data science: data analysis with Pandas, visualisation with Matplotlib, and an introduction to machine learning concepts.",
    difficulty: "intermediate",
    duration: "4–6 months",
    mode: "Online",
    topics: [
      "Python for Data Science",
      "Data Wrangling with Pandas",
      "Data Visualisation (Matplotlib, Seaborn)",
      "Descriptive Statistics",
      "Introduction to ML (Scikit-learn)",
      "A real mini-project",
    ],
    fullDescription:
      "Data science is one of the most in-demand fields today. This course gives you the practical skills to analyse real datasets, build visualisations, and understand machine learning concepts. Requires basic Python knowledge (our Python course is a great prerequisite).",
  },
  {
    id: "cs-foundations",
    icon: "💻",
    title: "CS Foundations",
    category: "data",
    description: "Cover the essential computer science topics: algorithms, data structures, complexity, and problem-solving strategies needed for academics and interviews.",
    difficulty: "intermediate",
    duration: "3–5 months",
    mode: "Online & In-person",
    topics: [
      "Algorithms & Complexity (Big O)",
      "Arrays, Linked Lists, Stacks, Queues",
      "Trees & Graphs",
      "Sorting & Searching",
      "Recursion & Dynamic Programming",
      "Problem-Solving Strategies",
    ],
    fullDescription:
      "Whether you are preparing for college exams, competitive coding, or placement interviews, this course builds the CS fundamentals that every software professional needs. We focus on understanding over memorisation, with plenty of practice problems.",
  },
];


/* =========================================================================
   03. TESTIMONIAL DATA
   =========================================================================
   NOTE: These are sample/fictional testimonials for demonstration only.
   Replace with real testimonials (with explicit student permission) before publishing.
   ========================================================================= */
const testimonialData = [
  {
    text: "The Python course was exactly what I needed before starting my BTech. Arjun explains everything so clearly — I went from zero coding experience to building small projects in just two months.",
    name: "Priya M.",
    detail: "BTech CSE, First Year — Demo testimonial",
    stars: 5,
    initials: "PM",
  },
  {
    text: "I struggled with calculus for two years. After just a month of sessions, I finally understand the concepts and my exam scores improved significantly. Highly recommend!",
    name: "Rahul S.",
    detail: "Class 12 student — Demo testimonial",
    stars: 5,
    initials: "RS",
  },
  {
    text: "The web development course was brilliant. We built a real project from scratch, and I now have something to show in interviews. The pace was perfect for a complete beginner.",
    name: "Ananya K.",
    detail: "BCA student — Demo testimonial",
    stars: 5,
    initials: "AK",
  },
  {
    text: "Data Science Fundamentals gave me confidence to start applying for internships. The mini-project we built together is already on my GitHub and recruiters have noticed it!",
    name: "Vivek T.",
    detail: "3rd year BTech — Demo testimonial",
    stars: 5,
    initials: "VT",
  },
  {
    text: "Physics always felt like magic to me. With SmartTutor, I understand the 'why' behind every formula, not just how to plug in numbers. My JEE scores improved noticeably.",
    name: "Sneha R.",
    detail: "JEE aspirant — Demo testimonial",
    stars: 5,
    initials: "SR",
  },
  {
    text: "The flexible scheduling is what makes SmartTutor work for me. As a working professional reskilling in CS, I need evening slots — and Arjun accommodates that perfectly.",
    name: "Aman D.",
    detail: "Working professional — Demo testimonial",
    stars: 5,
    initials: "AD",
  },
];


/* =========================================================================
   04. DOM READY BOOTSTRAP
   All initialisation is called once the DOM is fully parsed.
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initNavLinks();
  initScrollAnimations();
  renderCourses(courseData);
  initCourseFilters();
  initCourseSearch();
  initModal();
  renderTestimonials();
  initFaqAccordion();
  initContactForm();
  renderWhatsAppButton();
  renderSocialLinks();
  initBackToTop();
  initFooterYear();
  initCounters(); // starts when hero section is visible
});


/* =========================================================================
   05. THEME TOGGLE — Light / Dark Mode
   Theme preference is saved in localStorage so it persists across sessions.
   ========================================================================= */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Load saved theme; fall back to light mode
  const savedTheme = localStorage.getItem("smarttutor-theme") || "light";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next    = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("smarttutor-theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}


/* =========================================================================
   06. NAVBAR — Scroll shadow + active link highlighting
   ========================================================================= */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Add shadow class when page is scrolled past 10px
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
    updateActiveNavLink();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Run once immediately
}

/** Highlight the nav link whose section is currently in view */
function updateActiveNavLink() {
  const sections   = document.querySelectorAll("section[id]");
  const navLinks   = document.querySelectorAll(".nav-link");
  const scrollPos  = window.scrollY + 120; // offset for sticky nav

  sections.forEach((section) => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === id);
      });
    }
  });
}


/* =========================================================================
   07. MOBILE MENU — Open, close, keyboard accessibility
   ========================================================================= */
function initMobileMenu() {
  const btn  = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => toggleMobileMenu());

  // Close mobile menu when a link is tapped
  document.querySelectorAll(".mob-link, .mob-cta").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMobileMenu();
      btn.focus(); // Return focus to hamburger
    }
  });

  // Close if user clicks outside the nav area
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const btn  = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const open = menu.classList.contains("open");
  open ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
  const btn  = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  menu.classList.add("open");
  menu.removeAttribute("aria-hidden");
  menu.removeAttribute("hidden");
  btn.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  btn.setAttribute("aria-label", "Close navigation menu");
}

function closeMobileMenu() {
  const btn  = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  btn.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Open navigation menu");
  // Hide after transition finishes to keep it out of tab order
  setTimeout(() => {
    if (!menu.classList.contains("open")) {
      menu.setAttribute("hidden", "");
    }
  }, 300);
}


/* =========================================================================
   08. SMOOTH SCROLL — Handle all anchor links on the page
   ========================================================================= */
function initNavLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return; // ignore "#" only links

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}


/* =========================================================================
   09. SCROLL ANIMATIONS — Fade-in elements on scroll via IntersectionObserver
   ========================================================================= */
function initScrollAnimations() {
  // Skip if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-animate]").forEach((el) => {
      el.classList.add("animated");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => {
    observer.observe(el);
  });
}


/* =========================================================================
   10. COUNTER ANIMATION — Hero statistics
   Counts up numbers when the hero section becomes visible.
   ========================================================================= */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  // Skip animation if reduced motion is preferred
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    counters.forEach((c) => {
      c.textContent = c.dataset.target;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const steps    = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, duration / steps);
}


/* =========================================================================
   11. COURSE RENDERING
   Builds course cards from the courseData array and injects them into the DOM.
   ========================================================================= */
function renderCourses(courses) {
  const grid = document.getElementById("courses-grid");
  if (!grid) return;

  grid.innerHTML = ""; // Clear existing content

  if (courses.length === 0) {
    document.getElementById("no-courses").removeAttribute("hidden");
    return;
  }

  document.getElementById("no-courses").setAttribute("hidden", "");

  courses.forEach((course) => {
    const card = createCourseCard(course);
    grid.appendChild(card);
  });
}

/** Build a single course card element */
function createCourseCard(course) {
  const article = document.createElement("article");
  article.className = "course-card";
  article.dataset.id = course.id;
  article.dataset.category = course.category;

  const diffClass = `difficulty-${course.difficulty}`;

  article.innerHTML = `
    <div class="course-card-header">
      <div class="course-icon" aria-hidden="true">${course.icon}</div>
      <div>
        <h3 class="course-title">${escapeHtml(course.title)}</h3>
        <span class="difficulty-badge ${diffClass}">${capitalise(course.difficulty)}</span>
      </div>
    </div>
    <div class="course-card-body">
      <p class="course-description">${escapeHtml(course.description)}</p>
      <div class="course-meta">
        <span class="course-meta-pill">⏱ ${escapeHtml(course.duration)}</span>
        <span class="course-meta-pill">📡 ${escapeHtml(course.mode)}</span>
      </div>
      <div class="course-card-actions">
        <button class="btn btn-outline view-details-btn"
                data-id="${course.id}"
                aria-label="View details for ${escapeHtml(course.title)}">
          View Details
        </button>
        <a href="#contact" class="btn btn-primary enquire-btn"
           aria-label="Enquire about ${escapeHtml(course.title)}">
          Enquire Now
        </a>
      </div>
    </div>
  `;

  // Wire up "View Details" button to open modal
  article.querySelector(".view-details-btn").addEventListener("click", () => {
    openModal(course.id);
  });

  return article;
}


/* =========================================================================
   12. COURSE FILTERING — Filter tab buttons
   ========================================================================= */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      applyFiltersAndSearch();
    });
  });
}

/** Get the current active filter value */
function getActiveFilter() {
  const active = document.querySelector(".filter-btn.active");
  return active ? active.dataset.filter : "all";
}


/* =========================================================================
   13. COURSE SEARCH — Live search with debounce
   ========================================================================= */
let searchDebounceTimer = null;

function initCourseSearch() {
  const input      = document.getElementById("course-search");
  const clearBtn   = document.getElementById("search-clear");
  const resetBtn   = document.getElementById("reset-search");

  if (!input) return;

  input.addEventListener("input", () => {
    // Show/hide clear button
    clearBtn.hidden = input.value.trim() === "";

    // Debounce search to avoid filtering on every keystroke
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(applyFiltersAndSearch, 250);
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.hidden = true;
    input.focus();
    applyFiltersAndSearch();
  });

  resetBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.hidden = true;
    // Reset filter to "all"
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === "all");
      b.setAttribute("aria-selected", b.dataset.filter === "all" ? "true" : "false");
    });
    applyFiltersAndSearch();
    input.focus();
  });
}

/**
 * Apply the current active filter AND search query together.
 * This is the single source of truth for what cards are shown.
 */
function applyFiltersAndSearch() {
  const filter = getActiveFilter();
  const query  = (document.getElementById("course-search")?.value || "").trim().toLowerCase();

  const results = courseData.filter((course) => {
    const matchFilter = filter === "all" || course.category === filter;
    const matchSearch =
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.topics.some((t) => t.toLowerCase().includes(query));
    return matchFilter && matchSearch;
  });

  renderCourses(results);
}


/* =========================================================================
   14. COURSE MODAL — Open, close, keyboard trap, outside-click
   ========================================================================= */

/** Previously focused element before modal opened — for restoring focus */
let modalPreviousFocus = null;

function initModal() {
  const overlay  = document.getElementById("course-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (!overlay) return;

  // Ensure modal starts closed on initial load
  overlay.setAttribute("hidden", "");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // Close on close button
  closeBtn?.addEventListener("click", closeModal);

  // Close on outside-click (clicking the dark overlay itself)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Keyboard: Escape closes; Tab traps focus inside modal
  document.addEventListener("keydown", (e) => {
    if (!overlay.hasAttribute("hidden")) {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        trapFocus(e, overlay);
      }
    }
  });
}

function openModal(courseId) {
  const course  = courseData.find((c) => c.id === courseId);
  if (!course) return;

  const overlay  = document.getElementById("course-modal");
  const modalBody = document.getElementById("modal-body");
  if (!overlay || !modalBody) return;

  // Store focus so we can restore it when modal closes
  modalPreviousFocus = document.activeElement;

  // Populate modal content
  modalBody.innerHTML = buildModalContent(course);

  // Wire up the "Enquire" button inside modal
  const enquireBtn = modalBody.querySelector(".modal-enquire-btn");
  if (enquireBtn) {
    enquireBtn.addEventListener("click", () => {
      closeModal();
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
      // Pre-select course in form
      const courseSelect = document.getElementById("f-course");
      if (courseSelect) {
        courseSelect.value = course.id;
      }
    });
  }

  // Wire up the in-modal "Close" action button
  modalBody.querySelector(".modal-close-action")?.addEventListener("click", closeModal);

  // Show the modal
  overlay.removeAttribute("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll

  // Focus the close button for accessibility
  setTimeout(() => {
    document.getElementById("modal-close-btn")?.focus();
  }, 50);
}

function closeModal() {
  const overlay = document.getElementById("course-modal");
  if (!overlay) return;
  overlay.setAttribute("hidden", "");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  // Return focus to whatever triggered the modal
  modalPreviousFocus?.focus();
}

/** Trap keyboard focus within the modal while it is open */
function trapFocus(e, container) {
  const focusable = Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.disabled && el.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/** Build the modal inner HTML for a given course */
function buildModalContent(course) {
  const diffClass = `difficulty-${course.difficulty}`;
  const topicsHtml = course.topics
    .map((t) => `<li>${escapeHtml(t)}</li>`)
    .join("");

  return `
    <div class="modal-header">
      <div class="modal-icon" aria-hidden="true">${course.icon}</div>
      <div>
        <h2 class="modal-title" id="modal-title">${escapeHtml(course.title)}</h2>
        <p class="modal-subtitle">
          <span class="difficulty-badge ${diffClass}">${capitalise(course.difficulty)}</span>
        </p>
      </div>
    </div>

    <div class="modal-meta-grid">
      <div class="modal-meta-item">
        <p class="modal-meta-label">Duration</p>
        <p class="modal-meta-value">⏱ ${escapeHtml(course.duration)}</p>
      </div>
      <div class="modal-meta-item">
        <p class="modal-meta-label">Mode</p>
        <p class="modal-meta-value">📡 ${escapeHtml(course.mode)}</p>
      </div>
      <div class="modal-meta-item">
        <p class="modal-meta-label">Category</p>
        <p class="modal-meta-value">${capitalise(course.category)}</p>
      </div>
      <div class="modal-meta-item">
        <p class="modal-meta-label">Level</p>
        <p class="modal-meta-value">${capitalise(course.difficulty)}</p>
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">About This Course</p>
      <p>${escapeHtml(course.fullDescription)}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">Key Topics Covered</p>
      <ul>${topicsHtml}</ul>
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary modal-enquire-btn">Enquire About This Course</button>
      <button class="btn btn-outline modal-close-action" type="button">Close</button>
    </div>
  `;
}


/* =========================================================================
   15. TESTIMONIAL RENDERING
   Builds and injects testimonial cards from testimonialData array.
   ========================================================================= */
function renderTestimonials() {
  const grid = document.querySelector(".testimonials-grid");
  if (!grid) return;

  grid.innerHTML = "";

  testimonialData.forEach((t) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";
    card.setAttribute("aria-label", `Testimonial from ${t.name}`);

    const stars = "★".repeat(t.stars);

    card.innerHTML = `
      <div class="testimonial-quote" aria-hidden="true">"</div>
      <p class="testimonial-text">${escapeHtml(t.text)}</p>
      <div class="testimonial-author">
        <div class="author-avatar" aria-hidden="true">${t.initials}</div>
        <div>
          <p class="author-name">${escapeHtml(t.name)}
            <span class="testimonial-demo-label" aria-label="Demo content">Demo</span>
          </p>
          <p class="author-detail">${escapeHtml(t.detail)}</p>
          <p class="testimonial-stars" aria-label="${t.stars} out of 5 stars">${stars}</p>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* =========================================================================
   16. FAQ ACCORDION
   Each FAQ button toggles its associated answer panel.
   Works with mouse, touch, and keyboard (Enter/Space).
   Uses aria-expanded and aria-controls for accessibility.
   ========================================================================= */
function initFaqAccordion() {
  const faqBtns = document.querySelectorAll(".faq-question");

  faqBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const answerId   = btn.getAttribute("aria-controls");
      const answer     = document.getElementById(answerId);

      if (!answer) return;

      // Toggle this item
      btn.setAttribute("aria-expanded", !isExpanded);
      answer.hidden = isExpanded;
    });

    // Keyboard: Enter and Space already trigger click on buttons,
    // but be explicit for custom behaviour if needed
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
}


/* =========================================================================
   17. CONTACT FORM — Validation, demo mode, state management
   =========================================================================
   IMPORTANT (Demo mode):
   - In "demo" mode, the form DOES NOT send any data anywhere.
   - A clear demo success message is shown instead.
   - When CONFIG.formMode is "live", the form POSTs to CONFIG.formEndpoint.
   - Server-side validation should always be done on the backend for live use.
   ========================================================================= */
function initContactForm() {
  const form      = document.getElementById("booking-form");
  const submitBtn = document.getElementById("form-submit-btn");
  const charCount = document.getElementById("char-count");
  const msgInput  = document.getElementById("f-message");

  if (!form) return;

  // Character counter for the message textarea
  msgInput?.addEventListener("input", () => {
    const len = msgInput.value.length;
    charCount.textContent = `${len} / 1000`;
    charCount.style.color = len > 900 ? "#dc2626" : "var(--text-muted)";
  });

  // Inline validation on blur (when user leaves a field)
  ["f-name", "f-email", "f-message", "f-course"].forEach((id) => {
    document.getElementById(id)?.addEventListener("blur", () => {
      validateField(id);
    });
  });

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Prevent double-submit
    if (submitBtn.disabled) return;

    // Run full validation
    const valid = validateForm();
    if (!valid) return;

    // Set loading state
    setFormLoading(true);

    try {
      if (CONFIG.formMode === "demo") {
        // Simulate a short processing delay for realism
        await delay(1200);
        showFormSuccess();
      } else if (CONFIG.formMode === "live" && CONFIG.formEndpoint) {
        // Real form submission
        const formData = new FormData(form);
        const response = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          body:   formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showFormSuccess();
        } else {
          showFormError("The server returned an error. Please try again or contact us via WhatsApp.");
        }
      } else {
        // Misconfigured live mode
        showFormError("Form service is not configured. Please check the README for setup instructions.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      showFormError("A network error occurred. Please check your connection and try again.");
    } finally {
      setFormLoading(false);
    }
  });
}

/** Validate a single field by its ID. Returns true if valid. */
function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (!field || !error) return true;

  let message = "";

  if (fieldId === "f-name") {
    if (!field.value.trim()) {
      message = "Full name is required.";
    } else if (field.value.trim().length < 2) {
      message = "Name must be at least 2 characters.";
    }
  }

  if (fieldId === "f-email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!field.value.trim()) {
      message = "Email address is required.";
    } else if (!emailRegex.test(field.value.trim())) {
      message = "Please enter a valid email address (e.g. you@example.com).";
    }
  }

  if (fieldId === "f-course") {
    if (!field.value) {
      message = "Please select a course.";
    }
  }

  if (fieldId === "f-message") {
    if (!field.value.trim()) {
      message = "Please write a short message or describe your learning goals.";
    } else if (field.value.trim().length < 10) {
      message = "Message is too short. Please provide a bit more detail.";
    }
  }

  error.textContent = message;
  field.classList.toggle("error",   !!message);
  field.classList.toggle("success", !message && field.value.trim() !== "");

  return !message;
}

/** Validate the entire form. Returns true if all fields are valid. */
function validateForm() {
  const fieldValidations = [
    validateField("f-name"),
    validateField("f-email"),
    validateField("f-course"),
    validateField("f-message"),
  ];

  // Validate radio buttons (learning mode)
  const modeError = document.getElementById("f-mode-error");
  const modeChosen = document.querySelector('input[name="mode"]:checked');
  if (!modeChosen) {
    if (modeError) modeError.textContent = "Please select a preferred learning mode.";
    fieldValidations.push(false);
  } else {
    if (modeError) modeError.textContent = "";
  }

  return fieldValidations.every(Boolean);
}

function setFormLoading(isLoading) {
  const btn     = document.getElementById("form-submit-btn");
  const btnText = btn?.querySelector(".btn-text");
  const spinner = btn?.querySelector(".btn-spinner");

  if (btn) btn.disabled = isLoading;
  if (btnText) btnText.hidden = isLoading;
  if (spinner) spinner.hidden = !isLoading;
}

function showFormSuccess() {
  const successDiv = document.getElementById("form-success");
  const errorDiv   = document.getElementById("form-error");
  const form       = document.getElementById("booking-form");

  if (errorDiv)   errorDiv.hidden = true;
  if (successDiv) {
    successDiv.hidden = false;
    successDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Reset form fields but keep it visible
  if (form) form.reset();

  // Reset char count and field states
  const charCount = document.getElementById("char-count");
  if (charCount) charCount.textContent = "0 / 1000";

  document.querySelectorAll(".form-input").forEach((f) => {
    f.classList.remove("error", "success");
  });
  document.querySelectorAll(".field-error").forEach((e) => {
    e.textContent = "";
  });
}

function showFormError(message) {
  const errorDiv = document.getElementById("form-error");
  if (!errorDiv) return;
  errorDiv.hidden = false;
  if (message) {
    errorDiv.textContent = "❌ " + message;
  }
  errorDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}


/* =========================================================================
   18. WHATSAPP BUTTON
   Only renders if CONFIG.whatsappNumber is set to a real number.
   If unconfigured, shows a small note for the developer.
   ========================================================================= */
function renderWhatsAppButton() {
  const container = document.getElementById("whatsapp-container");
  if (!container) return;

  const number  = CONFIG.whatsappNumber.replace(/\D/g, ""); // digits only
  const message = encodeURIComponent(CONFIG.whatsappMessage);

  if (number) {
    const url = `https://wa.me/${number}?text=${message}`;
    container.innerHTML = `
      <a href="${url}" target="_blank" rel="noopener noreferrer"
         class="whatsapp-btn"
         aria-label="Chat with us on WhatsApp">
        <!-- WhatsApp SVG icon -->
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95l4.9-1.37A9.93 9.93 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.073-1.12l-.292-.174-3.026.847.849-3.07-.19-.308A7.953 7.953 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>
        Chat on WhatsApp
      </a>
    `;
  } else {
    // WhatsApp not configured — show developer note (not shown to end users)
    container.innerHTML = `
      <p class="whatsapp-unconfigured">
        💬 WhatsApp button hidden — set <code>CONFIG.whatsappNumber</code> in <code>js/script.js</code> to enable it.
      </p>
    `;
  }
}


/* =========================================================================
   19. SOCIAL LINKS — Footer and contact column
   Only renders links that have a non-empty URL in CONFIG.social.
   ========================================================================= */
function renderSocialLinks() {
  const footerContainer = document.getElementById("footer-social");
  if (!footerContainer) return;

  const socialIcons = {
    instagram: {
      label: "Instagram",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    },
    linkedin: {
      label: "LinkedIn",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    youtube: {
      label: "YouTube",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    },
    twitter: {
      label: "Twitter/X",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
  };

  const links = Object.entries(CONFIG.social)
    .filter(([, url]) => !!url)
    .map(([platform, url]) => {
      const icon = socialIcons[platform];
      if (!icon) return "";
      return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"
                 class="social-link" aria-label="${icon.label} (opens in new tab)">
                ${icon.svg}
              </a>`;
    })
    .join("");

  if (links) {
    footerContainer.innerHTML = links;
  } else {
    footerContainer.innerHTML = `<p class="no-social-note">Social links will appear here once configured in <code>js/script.js</code>.</p>`;
  }
}


/* =========================================================================
   20. BACK-TO-TOP BUTTON
   Shows after user scrolls 400px; smooth scrolls back on click.
   ========================================================================= */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      const show = window.scrollY > 400;
      btn.hidden = !show;
      btn.classList.toggle("visible", show);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* =========================================================================
   21. FOOTER YEAR — Dynamic current year for copyright notice
   ========================================================================= */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}


/* =========================================================================
   22. UTILITY FUNCTIONS
   ========================================================================= */

/**
 * Escape HTML special characters to prevent XSS when injecting user/data content.
 * Always use this when inserting dynamic strings into innerHTML.
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Capitalise the first letter of a string */
function capitalise(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Simple promise-based delay helper (used in demo form submission) */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
