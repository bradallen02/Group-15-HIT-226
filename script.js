const carouselContainer = document.querySelector(".carousel-container");
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");

// Set up the carousel
const imgWidth = carouselContainer.clientWidth / 5; // The width of a single image
const numImages = carouselImages.length;
let currentPosition = 0;

// Move the carousel to a new position
function moveTo(position) {
  if (position < 0) {
    position = Math.floor((numImages - 1) / 5) * 5; // Move to the last complete set of 5 images
  } else if (position >= numImages) {
    position = 0; // Cycle back to the beginning
  } else if (position > numImages - 5 && position < numImages) {
    position = numImages - 5; // Ensure the last set is a complete set of 5 images
  }

  carouselSlide.style.transform = `translateX(${-imgWidth * position}px)`;
  currentPosition = position;
  updateButtons();
}

// Set up buttons
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

// Move to the previous image
prevButton.addEventListener("click", () => {
  moveTo(currentPosition - 1);
});

// Move to the next image
nextButton.addEventListener("click", () => {
  moveTo(currentPosition + 1);
});

// Disable the buttons when at the end of the carousel
function updateButtons() {
  prevButton.disabled = currentPosition === 0;
  nextButton.disabled = currentPosition === numImages - 1;
}

// Update the buttons when the page loads and the carousel is moved
document.addEventListener("DOMContentLoaded", updateButtons);
carouselSlide.addEventListener("transitionend", updateButtons);

// Set up the carousel to cycle automatically
let autoAdvanceTimer = setInterval(() => {
  moveTo(currentPosition + 1);
}, 3000);

// Stop the automatic cycling when the user interacts with the carousel
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoAdvanceTimer);
});

carouselContainer.addEventListener("mouseleave", () => {
  autoAdvanceTimer = setInterval(() => {
    moveTo(currentPosition + 1);
  }, 3500);
});
