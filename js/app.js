const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");

// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});

// set year
// const date = document.querySelector("#date");
// date.innerHTML = new Date().getFullYear();

// animate the skill bars and their corresponding percentage text when they come into view.
const skillValues = document.querySelectorAll(".skill-value");
const skillTexts = document.querySelectorAll(".skill-text");

// set custom CSS variables on each element based on their data attributes.
function setAnimationEndValue() {
  // iterate through each skillValue element.
  skillValues.forEach((skillValue) => {
    // retrieve the skill level from the data attribute.
    const skillLevel = skillValue.getAttribute("data-skill-level");
    // set the custom CSS variable for skillValue using the retrieved skill level.
    skillValue.style.setProperty("--skill-level", `${skillLevel}%`);

    // select the skillText sibling element of the current skillValue.
    const skillText = skillValue.nextElementSibling;
    // set the custom CSS variable for skillText using the same skill level.
    skillText.style.setProperty("--skill-level", `${skillLevel}%`);

    // animate the percentage text in the skillText element based on the skillValue.
    animatePercentages(skillValue, skillText, skillLevel);
  });
}

function animatePercentages(skillValue, skillText, skillLevel) {
  // retrieve the current width of the skillValue bar and parse it as a number (removing the "px" unit).
  const skillValueWidth = parseFloat(window.getComputedStyle(skillValue).width);

  // retrieve the total width of the skillValue's parent container and parse it as a number (removing the "px" unit).
  const skillContainerWidth = parseFloat(
    window.getComputedStyle(skillValue.parentElement).width
  );

  // calculate the current percentage of the skillValue bar.
  const currentPercentage = Math.round(
    (skillValueWidth / skillContainerWidth) * 100
  );

  // update the skillText element's content with the current percentage value and a % symbol appended to it.
  skillText.textContent = `${currentPercentage}%`;

  // if the current percentage is less than the desired skill level,
  // continue updating the skillText by recursively invoking the animatePercentages function using requestAnimationFrame.
  if (currentPercentage < skillLevel) {
    requestAnimationFrame(() =>
      animatePercentages(skillValue, skillText, skillLevel)
    );
  }
}

function addAnimationClasses() {
  // add the animation class to each skillValue element.
  skillValues.forEach((skillValue) => {
    skillValue.classList.add("skill-value-animate");
  });
  // add the animation class to each skillText element.
  skillTexts.forEach((skillText) => {
    skillText.classList.add("skill-text-animate");
  });
}

// initialize an IntersectionObserver to detect when the skills section comes into view.
// when the section becomes 40% visible, set the animation end values, stop observing the section,
// and add the animation classes to start the animation.
const observer = new IntersectionObserver(
  (entries) => {
    // grab only 1 entry, since we only have one target section.
    const entry = entries[0];
    if (entry.isIntersecting) {
      // set the animation end values for skill bars, skill text,
      // and invoke requestAnimationFrame to get ready for the animation classes to be added.
      setAnimationEndValue();
      // stop observing the skills section, as the animation only needs to be triggered once.
      observer.unobserve(entry.target);
      // add the animation classes to start the skill bar and text animations.
      addAnimationClasses();
    }
  },
  { threshold: 0.4 }
);

const skillsSection = document.querySelector(".skills");

// start observing the skillsSection, waiting for it to come into view to trigger the skill bar and text animations.
observer.observe(skillsSection);
