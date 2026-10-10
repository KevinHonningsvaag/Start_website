const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const themeToggle = document.querySelector(".theme-toggle");

const themeStorage = {
  get() {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  },
  set(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Theme still changes for the current page even if storage is blocked.
    }
  },
};

const setTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";

  document.body.dataset.theme = nextTheme;

  if (themeToggle) {
    const label = nextTheme === "dark" ? "Light" : "Dark";
    themeToggle.textContent = label;
    themeToggle.setAttribute("aria-label", `Bytt til ${label.toLowerCase()} theme`);
  }
};

const savedTheme = themeStorage.get();
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    themeStorage.set(nextTheme);
    setTheme(nextTheme);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((other) => {
      if (other !== item) {
        other.open = false;
      }
    });
  });
});

const countdown = document.querySelector(".countdown");

if (countdown) {
  const targetDate = new Date(countdown.dataset.target);
  const daysEl = countdown.querySelector('[data-unit="days"]');
  const hoursEl = countdown.querySelector('[data-unit="hours"]');
  const minutesEl = countdown.querySelector('[data-unit="minutes"]');
  const secondsEl = countdown.querySelector('[data-unit="seconds"]');
  const messageEl = document.querySelector("[data-countdown-message]");

  const updateCountdown = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "0";
      if (hoursEl) hoursEl.textContent = "0";
      if (minutesEl) minutesEl.textContent = "0";
      if (secondsEl) secondsEl.textContent = "0";
      if (messageEl) {
        messageEl.textContent = "Opptaket er i gang.";
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
