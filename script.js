// JavaScript untuk Blog Pribadi - Versi Stabil

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("Website blog pribadi dimuat!");

  // ========== MOBILE NAVIGATION ==========
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Tutup menu mobile saat klik link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector(".navbar");

  function handleScroll() {
    // Efek navbar saat scroll
    if (navbar && window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else if (navbar) {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("active");
      } else {
        backToTopBtn.classList.remove("active");
      }
    }

    // Update active nav link
    updateActiveNavLink();
  }

  window.addEventListener("scroll", handleScroll);

  // ========== BACK TO TOP BUTTON ==========
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Ambil nilai form
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      if (name && email) {
        // Tampilkan pesan sukses sederhana
        alert(`Terima kasih ${name}! Pesan Anda berhasil dikirim.`);
        contactForm.reset();
      } else {
        alert("Harap isi nama dan email!");
      }
    });
  }

  // ========== ANIMATED COUNTER ==========
  function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + "+";
      }
    }, 16);
  }

  // ========== ANIMASI SAAT SCROLL ==========
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  function handleScrollAnimations() {
    // Animate stats
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      if (isInViewport(stat) && !stat.classList.contains("animated")) {
        stat.classList.add("animated");
        const target = parseInt(stat.getAttribute("data-count") || 0);
        animateCounter(stat, target);
      }
    });

    // Animate cards
    const cards = document.querySelectorAll(".blog-card, .portfolio-item");
    cards.forEach((card, index) => {
      if (isInViewport(card) && !card.classList.contains("animated")) {
        card.classList.add("animated");
        card.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }

  // Panggil saat scroll
  window.addEventListener("scroll", handleScrollAnimations);

  // Panggil sekali saat load
  setTimeout(handleScrollAnimations, 500);

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip jika href adalah "#" saja
      if (href === "#" || href === "#!") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ========== UPDATE ACTIVE NAV LINK ==========
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

  // ========== IMAGE LOADING ==========
  // Tambahkan efek loading untuk gambar
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    // Set opacity 0 dulu, lalu fade in saat load
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";

    // Jika gambar sudah loaded (cache)
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.addEventListener("load", function () {
        this.style.opacity = "1";
      });

      // Fallback jika error
      img.addEventListener("error", function () {
        console.log("Gagal memuat gambar:", this.src);
        this.style.opacity = "1";
      });
    }
  });

  // ========== CARD HOVER EFFECT ==========
  const cards = document.querySelectorAll(".blog-card, .portfolio-item");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // ========== BUTTON HOVER EFFECT ==========
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // ========== HERO TITLE TYPING EFFECT - FIXED VERSION ==========
  document.addEventListener("DOMContentLoaded", function () {
    const heroTitle = document.querySelector(".hero-title");
    const authorName = document.getElementById("authorName");

    // Hanya jalankan jika elemen ditemukan dan belum di-typed
    if (heroTitle && authorName) {
      // Cek apakah sudah ada kelas 'typed' untuk mencegah duplikasi
      if (!heroTitle.classList.contains("typed")) {
        // Simpan teks asli
        const originalText = heroTitle.textContent.trim();
        const quoteText = originalText.replace(/["']/g, ""); // Hapus tanda kutip jika ada

        // Clear text untuk typing effect
        heroTitle.textContent = "";
        heroTitle.classList.add("typing-text");
        heroTitle.style.borderRight = "2px solid #4a6cf7";

        let i = 0;
        const typingSpeed = 50; // ms per karakter

        // Tambahkan tanda kutip di awal
        heroTitle.textContent = '"';

        function typeCharacter() {
          if (i < quoteText.length) {
            heroTitle.textContent += quoteText.charAt(i);
            i++;
            setTimeout(typeCharacter, typingSpeed);
          } else {
            // Selesai typing, tambahkan tanda kutip penutup
            setTimeout(() => {
              heroTitle.textContent += '"';
              heroTitle.classList.remove("typing-text");
              heroTitle.classList.add("typed");
              heroTitle.style.borderRight = "none";

              // Tampilkan nama penulis setelah delay
              setTimeout(() => {
                authorName.style.display = "block";
                authorName.style.opacity = "0";
                authorName.style.transition = "opacity 1s ease";

                // Trigger reflow untuk memastikan transisi berjalan
                authorName.offsetHeight;

                authorName.style.opacity = "1";
              }, 500);
            }, 300); // Delay sebelum menutup tanda kutip
          }
        }

        // Mulai typing effect dengan delay kecil
        setTimeout(() => {
          typeCharacter();
        }, 500);
      } else {
        // Jika sudah typed, langsung tampilkan author
        authorName.style.display = "block";
        authorName.style.opacity = "1";
      }
    }
  });

  // ========== INITIALIZE ==========
  handleScroll(); // Panggil sekali saat load
  console.log("JavaScript berhasil diinisialisasi!");
});

// ========== HELPER FUNCTIONS ==========
// Fungsi debounce untuk optimasi scroll event
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ========== NEWS INTERACTIONS ==========
// Efek hover pada kartu berita
const newsCards = document.querySelectorAll(".news-card");
newsCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
  });
});

// Simulasi klik pada berita trending
const breakingItems = document.querySelectorAll(".breaking-item");
breakingItems.forEach((item) => {
  item.addEventListener("click", function () {
    alert("Anda mengklik berita trending: " + this.textContent.replace("•", "").trim());
  });
});

// Animasi untuk badge kategori
const newsBadges = document.querySelectorAll(".news-badge");
newsBadges.forEach((badge) => {
  badge.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  badge.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// ========== PORTFOLIO FILTER FUNCTIONALITY ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-news-card");

if (filterButtons.length > 0 && portfolioItems.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "flex";
          item.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// ========== PORTFOLIO HOVER EFFECTS ==========
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const image = this.querySelector(".portfolio-news-image img");
    if (image) {
      image.style.transform = "scale(1.1)";
    }

    // Add glow effect to featured cards
    if (this.classList.contains("featured")) {
      this.style.boxShadow = "0 25px 50px rgba(74, 108, 247, 0.2)";
    }
  });

  item.addEventListener("mouseleave", function () {
    const image = this.querySelector(".portfolio-news-image img");
    if (image) {
      image.style.transform = "scale(1)";
    }

    if (this.classList.contains("featured")) {
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.12)";
    }
  });
});

// ========== PORTFOLIO STATS ANIMATION ==========
function animatePortfolioStats() {
  const statNumbers = document.querySelectorAll(".highlight-content h4");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.textContent);
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target + "+";
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(current) + "+";
            }
          }, 50);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => observer.observe(stat));
}

// Panggil setelah halaman dimuat
setTimeout(animatePortfolioStats, 1000);

// ========== ADD CSS ANIMATION FOR FILTER ==========
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ========== HERO TITLE TYPING EFFECT ==========
const heroTitle = document.querySelector(".hero-title");
const authorName = document.getElementById("authorName");

if (heroTitle && !heroTitle.classList.contains("typed") && authorName) {
  const originalText = heroTitle.textContent;
  const letters = originalText.split("");

  heroTitle.textContent = "";
  heroTitle.classList.add("typing-text");

  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < letters.length) {
      heroTitle.textContent += letters[i];
      i++;
    } else {
      clearInterval(typingInterval);
      heroTitle.classList.remove("typing-text");
      heroTitle.classList.add("typed");
      heroTitle.style.borderRight = "none";

      // Tampilkan nama penulis setelah typing selesai
      setTimeout(() => {
        authorName.style.display = "block";
        authorName.classList.add("fade-in");
      }, 300); // Delay 300ms setelah typing selesai
    }
  }, 50); // Kecepatan typing: 50ms per huruf
}

// Tambahkan ini ke script.js
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("navMobileToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const mobileClose = document.getElementById("mobileClose");
  const menuIcon = document.querySelector(".menu-icon");

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener("click", function () {
      mobileOverlay.classList.add("active");
      menuIcon.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    mobileClose.addEventListener("click", function () {
      mobileOverlay.classList.remove("active");
      menuIcon.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close menu when clicking links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        mobileOverlay.classList.remove("active");
        menuIcon.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const icon = this.querySelector("i");
      if (document.body.classList.contains("dark-theme")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector(".split-navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active nav link on scroll
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});

// Tambahkan juga di bagian atas script.js untuk theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

// ========== CERPEN FILTER FUNCTIONALITY ==========
document.addEventListener("DOMContentLoaded", function () {
  const cerpenFilterButtons = document.querySelectorAll(".cerpen-filter .filter-btn");
  const cerpenItems = document.querySelectorAll(".cerpen-item");

  if (cerpenFilterButtons.length > 0 && cerpenItems.length > 0) {
    cerpenFilterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        cerpenFilterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Filter cerpen items
        cerpenItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block";
            item.style.animation = "fadeIn 0.5s ease forwards";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Cerpen hover effects
  cerpenItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const image = this.querySelector(".cerpen-image img");
      if (image) {
        image.style.transform = "scale(1.05)";
      }
    });

    item.addEventListener("mouseleave", function () {
      const image = this.querySelector(".cerpen-image img");
      if (image) {
        image.style.transform = "scale(1)";
      }
    });
  });
});

// ========== TIMELINE INTERACTIONS ==========
const timelineItems = document.querySelectorAll(".timeline-item");
if (timelineItems.length > 0) {
  timelineItems.forEach((item) => {
    const viewDetailBtn = item.querySelector(".btn-view-detail");

    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)";
      this.style.transition = "transform 0.3s ease";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });

    // HAPUS ATAU KOMENTARI BAGIAN INI:
    /*
    if (viewDetailBtn) {
      viewDetailBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("Anda akan melihat detail pengalaman kerja ini.");
        // Bisa diganti dengan modal atau redirect ke halaman detail
      });
    }
    */
  });
}


