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
