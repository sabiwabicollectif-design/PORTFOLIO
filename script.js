const items = document.querySelectorAll(".item.moving");

// Example data for modals
const imageData = [
  {
    title: "Title 1",
    description: "Description for image 1.",
    gallery: [
      "https://picsum.photos/id/201/200/150",
      "https://picsum.photos/id/202/200/150"
    ]
  },
  {
    title: "Title 2",
    description: "Description for image 2.",
    gallery: [
      "https://picsum.photos/id/203/200/150",
      "https://picsum.photos/id/204/200/150"
    ]
  },
  {
    title: "Title 3",
    description: "Description for image 3.",
    gallery: [
      "https://picsum.photos/id/205/200/150",
      "https://picsum.photos/id/206/200/150"
    ]
  },
  {
    title: "Title 4",
    description: "Description for image 4.",
    gallery: [
      "https://picsum.photos/id/207/200/150",
      "https://picsum.photos/id/208/200/150"
    ]
  },
  {
    title: "Title 5",
    description: "Description for image 5.",
    gallery: [
      "https://picsum.photos/id/209/200/150",
      "https://picsum.photos/id/210/200/150"
    ]
  },
  {
    title: "Title 6",
    description: "Description for image 6.",
    gallery: [
      "https://picsum.photos/id/211/200/150",
      "https://picsum.photos/id/212/200/150"
    ]
  },
  {
    title: "Title 7",
    description: "Description for image 7.",
    gallery: [
      "https://picsum.photos/id/213/200/150",
      "https://picsum.photos/id/214/200/150"
    ]
  }
];

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");
const modalClose = document.getElementById("modal-close");

// Assign hover & click events
items.forEach((item, index) => {
  item.style.cursor = "pointer";

  item.addEventListener("click", () => {
    const data = imageData[index];
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalGallery.innerHTML = "";
    data.gallery.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      modalGallery.appendChild(img);
    });

    modal.style.display = "flex";
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Moving images random motion
const targets = [];
items.forEach(() => {
  const scale = Math.random() * 0.5 + 0.75;
  targets.push({
    x: (Math.random() - 0.5) * window.innerWidth * 2,
    y: (Math.random() - 0.5) * window.innerHeight * 2,
    r: (Math.random() - 0.5) * 180,
    s: scale,
    speed: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 0.5,
    currentX: 0,
    currentY: 0,
    currentR: 0,
    currentS: 1
  });
});

function lerp(a, b, t) { return a + (b - a) * t; }

function animate() {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollY / maxScroll, 1);

  items.forEach((item, i) => {
    const t = targets[i];
    let p = (progress - t.delay) * t.speed;
    p = Math.max(0, Math.min(1, p));

    const targetX = t.x * p + i * 4;
    const targetY = t.y * p + i * 4;
    const targetR = t.r * p;
    const targetS = 1 + (t.s - 1) * p;

    t.currentX = lerp(t.currentX, targetX, 0.1);
    t.currentY = lerp(t.currentY, targetY, 0.1);
    t.currentR = lerp(t.currentR, targetR, 0.1);
    t.currentS = lerp(t.currentS, targetS, 0.1);

    item.style.transform = `
      translate(${t.currentX}px, ${t.currentY}px)
      rotate(${t.currentR}deg)
      scale(${t.currentS})
    `;
  });

  requestAnimationFrame(animate);
}

animate();