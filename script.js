"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const globalNav = document.querySelector(".global-nav");
  const navLinks = globalNav ? globalNav.querySelectorAll("a") : [];

  const closeMenu = () => {
    if (!menuButton || !globalNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    globalNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && globalNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      globalNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const copyButton = document.querySelector("[data-copy-address]");
  const copyMessage = document.querySelector(".copy-message");

  if (copyButton && copyMessage) {
    copyButton.addEventListener("click", async () => {
      const address = copyButton.getAttribute("data-copy-address") || "";

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(address);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = address;
          textArea.setAttribute("readonly", "");
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          const copied = document.execCommand("copy");
          textArea.remove();
          if (!copied) throw new Error("copy command failed");
        }

        copyMessage.textContent = "住所をコピーしました。";
      } catch (error) {
        copyMessage.textContent = "コピーできませんでした。住所を選択してコピーしてください。";
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    ".section-heading, .feature-card, .menu-item, .gallery-placeholder, .review-points li, .social-card, .shop-details, .map-panel"
  );

  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );

    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }
});