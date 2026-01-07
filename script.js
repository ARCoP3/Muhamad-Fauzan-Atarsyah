// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Navbar scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
          }

          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add hover effect to nav links
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Initialize
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // Close navbar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    const isClickInsideNavbar = navbar.contains(e.target);
    const isNavbarOpen = navbarCollapse.classList.contains("show");

    if (!isClickInsideNavbar && isNavbarOpen && window.innerWidth < 992) {
      navbarToggler.click();
    }
  });
});

{
  /* <script>
      // Scroll to top functionality
      const scrollTopBtn = document.querySelector(".scroll-top");

      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      });

      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Update current year in copyright
      document.getElementById("currentYear").textContent = new Date().getFullYear();

      // Smooth scroll for internal links
      document.querySelectorAll(".footer-link").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");

          if (targetId.startsWith("#")) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              const headerOffset = 80;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }
        });
      });

      // Add hover effect for social profiles
      document.querySelectorAll(".social-profile").forEach((profile) => {
        profile.addEventListener("mouseenter", function () {
          this.style.transform = "translateX(4px)";
        });

        profile.addEventListener("mouseleave", function () {
          this.style.transform = "translateX(0)";
        });
      });
    </script> */
}
