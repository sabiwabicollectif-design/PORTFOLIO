// BARMAG image gallery
const barmagImages = [
  "pag1.pdf",
  "pag2.pdf",
  "pag3.pdf"
];

let barmagIndex = 0;
const barmagLink = document.querySelector(".barmag-link");
const pressModal = document.getElementById("press-modal");
const pressModalImg = document.getElementById("press-modal-img");
const pressModalClose = document.getElementById("press-modal-close");

// Open modal and show first image
barmagLink.addEventListener("click", (e) => {
  e.preventDefault();
  barmagIndex = 0;
  pressModal.style.display = "flex";
  pressModalImg.src = barmagImages[barmagIndex];
});

// Cycle images on click
pressModalImg.addEventListener("click", () => {
  barmagIndex = (barmagIndex + 1) % barmagImages.length;
  pressModalImg.src = barmagImages[barmagIndex];
});

// Close modal
pressModalClose.addEventListener("click", () => {
  pressModal.style.display = "none";
});

// Close modal if clicked outside
window.addEventListener("click", (e) => {
  if (e.target === pressModal) pressModal.style.display = "none";
});