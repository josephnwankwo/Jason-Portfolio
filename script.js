///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const navLink = document.querySelector(".main-nav-link");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// close mobile nav when the nav on nav is clicked

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky background

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Carousel for testimonials

const slides = document.getElementById("slides");
const slideCount = slides.children.length;
let currentIndex = 0;

// Create dots
const dotsContainer = document.createElement("div");
dotsContainer.className = "dots";
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
}

// Append to carousel
document.querySelector(".section-testimonials").appendChild(dotsContainer);
const dots = document.querySelectorAll(".dot");

function updateCarousel() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function moveToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? slideCount - 1 : currentIndex - 1;
  updateCarousel();
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slideCount;
  updateCarousel();
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Dropdown functionality

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

// Optional: Close when clicking outside
document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("dropdown");
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});
