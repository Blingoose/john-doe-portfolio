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

/**
 * toggles a CSS class on a single element or a NodeList of elements.
 * @param {HTMLElement|NodeList} target - The target element(s) to apply the action on.
 * @param {string} action - The action to perform: "add" or "remove".
 * @param {string} cssClass - The CSS class to be added or removed.
 */

function toggleCSSClass(target, action, cssClass) {
  // convert action to lowercase and determine if it's an "add" or "remove" action.
  const isAddAction = action.toLowerCase() === "add";
  const isRemoveAction = action.toLowerCase() === "remove";

  // check if the target is a NodeList.
  if (target instanceof NodeList) {
    // iterate through each element in the NodeList.
    target.forEach((element) => {
      // perform the add or remove action as specified.
      if (isAddAction) {
        element.classList.add(cssClass);
      } else if (isRemoveAction) {
        element.classList.remove(cssClass);
      }
    });
  } else {
    // the target is a single HTMLElement.
    // perform the add or remove action as specified.
    if (isAddAction) {
      target.classList.add(cssClass);
    } else if (isRemoveAction) {
      target.classList.remove(cssClass);
    }
  }
}

// intialize an IntersectionObserver to detect when the skills section comes into view.
// when the section is at least 40% visible, set the animation end values for skill bars and skill text,
// and add the animation classes to start the skill bar and text animations.
// when the section is completely out of view, remove the animation classes to reset the animations.
const observer = new IntersectionObserver(
  (entries) => {
    // grab only 1 entry, since we only have one target section.
    const entry = entries[0];
    if (entry.intersectionRatio >= 0.4) {
      // set the animation end values for skill bars, skill text,
      // and invoke requestAnimationFrame to prepare for the animations.
      setAnimationEndValue();
      // stop observing the skills section, as the animation only needs to be triggered once.
      // observer.unobserve(entry.target);
      // add the animation classes to start the skill bar and skill text animations.
      toggleCSSClass(skillValues, "add", "skill-value-animate");
      toggleCSSClass(skillTexts, "add", "skill-text-animate");
    } else if (entry.intersectionRatio === 0) {
      // remove the animation classes to reset the skill bar and text animations when the section is completely out of view.
      toggleCSSClass(skillValues, "remove", "skill-value-animate");
      toggleCSSClass(skillTexts, "remove", "skill-text-animate");
    }
  },
  // set the observer's threshold to trigger callbacks at 0% (completely out of view) and 40% visibility.
  { threshold: [0, 0.4] }
);

const skillsSection = document.querySelector(".skills");

// start observing the skillsSection, waiting for it to come into view to trigger the skill bar and text animations.
observer.observe(skillsSection);
