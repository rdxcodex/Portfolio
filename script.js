const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const dateInput = document.getElementById("date");

if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = formData.get("name")?.toString().trim();
    const service = formData.get("service")?.toString().trim();
    const date = formData.get("date")?.toString().trim();

    formMessage.textContent = `Thanks${name ? `, ${name}` : ""}. Your ${service || "appointment"} request for ${date || "the selected date"} has been received.`;
    bookingForm.reset();

    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
    }
  });
}
