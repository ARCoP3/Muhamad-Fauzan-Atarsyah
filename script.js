document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const footer = document.querySelector("#footer");
  const sections = document.querySelectorAll("section[id]");
  const navSections = document.querySelectorAll("section[data-nav]");

  /* ================= SCROLL HANDLER ================= */
  function handleScroll() {
    const scrollY = window.scrollY;

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

  window.addEventListener("scroll", handleScroll);
  handleScroll();

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

  /* ================= FOOTER YEAR ================= */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ================= SCROLL TOP ================= */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
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
});

// Mobile detection and adjustments
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.innerWidth <= 767;

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          const navbarCollapse = document.getElementById("navbarNav");
          if (navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }

          // Scroll to element
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      });
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

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name && email && message) {
        // In a real application, you would send this data to a server
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  // Update mobile/desktop states if needed
  const isMobileNow = window.innerWidth <= 767;

  // You can add any resize-specific logic here
  if (isMobileNow) {
    document.body.classList.add("mobile-view");
    document.body.classList.remove("desktop-view");
  } else {
    document.body.classList.add("desktop-view");
    document.body.classList.remove("mobile-view");
  }
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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });
});

// Test if footer is loading properly
console.log("Footer loaded:", document.querySelector("#footer") !== null);

// Check for common mobile issues
if (window.innerWidth <= 768) {
  console.log("Mobile device detected");

  // Force reflow for footer
  const footer = document.querySelector("#footer");
  if (footer) {
    footer.style.display = "none";
    setTimeout(() => {
      footer.style.display = "";
    }, 10);
  }
}
