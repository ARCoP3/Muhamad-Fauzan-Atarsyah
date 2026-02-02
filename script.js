document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const footer = document.querySelector("#footer");
  const sections = document.querySelectorAll("section[id]");
  const navSections = document.querySelectorAll("section[data-nav]");
  const aboutMeSection = document.querySelector("#About-Me");

  let lastScrollTop = 0;
  let isNavbarVisible = true;
  let aboutMeOffset = 0;

  /* ================= INITIALIZE ================= */
  function initialize() {
    if (aboutMeSection) {
      aboutMeOffset = aboutMeSection.offsetTop - 100;
    }

    // Set initial state
    handleScroll();

    // Set current year in footer
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ================= SCROLL HANDLER ================= */
  function handleScroll() {
    const scrollY = window.scrollY;
    const aboutMeReached = scrollY >= aboutMeOffset;

    // Hide/show navbar based on scroll direction and section
    if (aboutMeReached) {
      const scrollDirection = scrollY > lastScrollTop ? "down" : "up";

      if (scrollDirection === "down" && isNavbarVisible) {
        // Hide navbar when scrolling down past About Me
        hideNavbar();
      } else if (scrollDirection === "up" && !isNavbarVisible) {
        // Show navbar when scrolling up
        showNavbar();
      } else if (scrollY < 100) {
        // Always show navbar at the top
        showNavbar();
      }
    } else {
      // Always show navbar before About Me section
      showNavbar();
    }

    lastScrollTop = scrollY;

    // Navbar shadow
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active nav link
    let currentSection = "";
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    // Navbar color by section
    let currentNav = "dark";
    navSections.forEach((section) => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        currentNav = section.dataset.nav;
      }
    });

    if (footer && scrollY >= footer.offsetTop - 120) {
      currentNav = "dark";
    }

    navbar.classList.remove("nav-dark", "nav-light");
    navbar.classList.add(`nav-${currentNav}`);

    // Scroll top button
    if (scrollTopBtn) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  }

  /* ================= NAVBAR VISIBILITY FUNCTIONS ================= */
  function hideNavbar() {
    navbar.classList.add("navbar-hidden");
    navbar.classList.remove("navbar-visible");
    isNavbarVisible = false;
  }

  function showNavbar() {
    navbar.classList.remove("navbar-hidden");
    navbar.classList.add("navbar-visible");
    isNavbarVisible = true;
  }

  /* ================= EVENT LISTENERS ================= */
  window.addEventListener("scroll", handleScroll);

  /* ================= NAV CLICK ================= */
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // HANYA intercept anchor
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
          }

          // Show navbar when clicking on a nav link
          showNavbar();

          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
      // selain #, biarkan browser pindah halaman
    });
  });

  /* ================= HOVER EFFECT ================= */
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0)";
    });
  });

  /* ================= CLICK OUTSIDE NAV ================= */
  document.addEventListener("click", function (e) {
    if (navbarCollapse.classList.contains("show") && !navbar.contains(e.target) && window.innerWidth < 992) {
      navbarToggler.click();
    }
  });

  /* ================= SCROLL TOP ================= */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      showNavbar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================= FORM VALIDATION ================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      let valid = true;

      if (!name.value.trim()) {
        name.classList.add("is-invalid");
        valid = false;
      } else {
        name.classList.remove("is-invalid");
      }

      if (!email.value.trim() || !email.value.includes("@")) {
        email.classList.add("is-invalid");
        valid = false;
      } else {
        email.classList.remove("is-invalid");
      }

      if (!message.value.trim()) {
        message.classList.add("is-invalid");
        valid = false;
      } else {
        message.classList.remove("is-invalid");
      }

      if (valid) {
        alert("Message sent.");
        contactForm.reset();
      }
    });
  }

  /* ================= MOBILE SPECIFIC ================= */
  const isMobile = window.innerWidth <= 767;

  // Mobile-specific adjustments
  if (isMobile) {
    // Make buttons more touch-friendly
    const buttons = document.querySelectorAll(".btn, .nav-link");
    buttons.forEach((button) => {
      button.style.minHeight = "44px";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.justifyContent = "center";
    });

    // Add touch feedback to cards
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)";
      });

      card.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
      });
    });
  }

  /* ================= INITIALIZATION ================= */
  initialize();

  // Reset navbar visibility on resize
  window.addEventListener("resize", function () {
    aboutMeOffset = aboutMeSection ? aboutMeSection.offsetTop - 100 : 0;
    handleScroll();
  });
});

// Fix for mobile navigation
document.addEventListener("DOMContentLoaded", function () {
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Fix for iOS viewport height
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVH();
  window.addEventListener("resize", setVH);
});

// Test if footer is loading properly
console.log("Portfolio loaded successfully");
