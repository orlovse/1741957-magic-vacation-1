// modules
import mobileHeight from "./modules/mobile-height-adjust.js";
import slider from "./modules/slider.js";
import menu from "./modules/menu.js";
import footer from "./modules/footer.js";
import chat from "./modules/chat.js";
import result from "./modules/result.js";
import form from "./modules/form.js";
import social from "./modules/social.js";
import FullPageScroll from "./modules/full-page-scroll";
import {AnimateLetters} from "./modules/animations.js";

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const body = document.querySelector(`body`);
body.onload = () => {
  body.classList.add(`loaded`);
};

// Add text animation
const animationIntroTitle = new AnimateLetters(
    `.intro__title`,
    1000,
    `active`,
    `transform`
);
setTimeout(() => {
  animationIntroTitle.runAnimation();
}, 500);

const animationIntroDate = new AnimateLetters(
    `.intro__date`,
    500,
    `active`,
    `transform`
);
setTimeout(() => {
  animationIntroDate.runAnimation();
}, 1000);

const animationPrizeTitle = new AnimateLetters(
    `.prizes__title`,
    500,
    `active`,
    `transform`
);
setTimeout(() => {
  animationPrizeTitle.runAnimation();
}, 500);

const animationStoryTitle = new AnimateLetters(
    `.slider__item-title`,
    500,
    `active`,
    `transform`
);
setTimeout(() => {
  animationStoryTitle.runAnimation();
}, 500);

const animationRulesTitle = new AnimateLetters(
    `.rules__title`,
    500,
    `active`,
    `transform`
);
setTimeout(() => {
  animationRulesTitle.runAnimation();
}, 500);

const animationGameTitle = new AnimateLetters(
    `.game__title`,
    500,
    `active`,
    `transform`
);
setTimeout(() => {
  animationGameTitle.runAnimation();
}, 500);
