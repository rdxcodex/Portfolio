const body = document.body;
const pageLoader = document.getElementById("pageLoader");
const header = document.querySelector(".site-header");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const typingText = document.getElementById("typingText");
const year = document.getElementById("year");

const typingWords = [
  "Website Developer",
  "Modern Business Websites",
  "Restaurant Website Demos",
  "Clinic & Gym Landing Pages",
  "Premium Local Business Portfolios"
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer = null;

const setLoadedState = () => {
  body.classList.add("is-loaded");

  if (pageLoader) {
    window.setTimeout(() => {
      pageLoader.remove();
    }, 600);
  }
};

const closeMenu = () => {
  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  body.classList.remove("menu-open");
};

const toggleMenu = () => {
  if (!navToggle || !siteNav) {
    return;
  }

  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("menu-open", isOpen);
};

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const updateActiveSection = () => {
  const current = window.scrollY + 140;

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const section = document.querySelector(targetId);
    if (!section) {
      return;
    }

    const isActive =
      current >= section.offsetTop && current < section.offsetTop + section.offsetHeight;

    link.classList.toggle("active", isActive);
  });
};

const revealImmediately = () => {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
};

const initRevealObserver = () => {
  if (!("IntersectionObserver" in window)) {
    revealImmediately();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
};

const startTypingEffect = () => {
  if (!typingText) {
    return;
  }

  const currentWord = typingWords[typeIndex];
  const visibleText = currentWord.slice(0, charIndex);
  typingText.textContent = visibleText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex += 1;
    typingTimer = window.setTimeout(startTypingEffect, 85);
    return;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingTimer = window.setTimeout(startTypingEffect, 1400);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    typingTimer = window.setTimeout(startTypingEffect, 42);
    return;
  }

  isDeleting = false;
  typeIndex = (typeIndex + 1) % typingWords.length;
  typingTimer = window.setTimeout(startTypingEffect, 180);
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!siteNav || !navToggle) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Node)) {
    return;
  }

  if (!siteNav.contains(target) && !navToggle.contains(target)) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveSection();
});

window.addEventListener("load", setLoadedState);

if (document.readyState === "complete") {
  setLoadedState();
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

updateHeaderState();
updateActiveSection();
initRevealObserver();
startTypingEffect();

sections.forEach((section) => {
  section.addEventListener("focusin", updateActiveSection);
});

window.addEventListener("beforeunload", () => {
  if (typingTimer) {
    window.clearTimeout(typingTimer);
  }
});
