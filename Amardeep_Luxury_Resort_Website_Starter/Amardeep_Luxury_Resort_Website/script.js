const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  lightboxImage.src = item.dataset.full;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}));
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const cfg = window.RESORT_CONFIG || {};
  const message = [
    "Hello Amardeep Luxury Resort, I would like to make an enquiry.",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Purpose: ${data.get("purpose")}`,
    `Message: ${data.get("message") || "Not provided"}`
  ].join("\n");
  const number = (cfg.whatsappNumber || "").replace(/\D/g, "");
  if (!number) {
    document.getElementById("formHint").textContent =
      "The form is ready. Add the owner's confirmed WhatsApp number in config.js to activate sending.";
    alert("Thanks! The enquiry form is ready. The resort's real WhatsApp number needs to be added before messages can be sent.");
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
