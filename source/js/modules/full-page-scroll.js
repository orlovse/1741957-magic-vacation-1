import throttle from "lodash/throttle";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(
      `.screen:not(.screen--result)`
    );
    this.menuElements = document.querySelectorAll(
      `.page-header__menu .js-menu-link`
    );

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
      `wheel`,
      throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, { trailing: true })
    );
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
      (screen) => location.hash.slice(1) === screen.id
    );
    this.activeScreen = newIndex < 0 ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    let fromStoryToPrize = false;
    this.screenElements.forEach((screen) => {
      if (
        screen.classList.contains(`screen--story`) &&
        screen.classList.contains(`active`)
      ) {
        fromStoryToPrize = true;
        screen.classList.add(`from-story-to-prize`);
        setTimeout(() => {
          screen.classList.add(`screen--hidden`);
          screen.classList.remove(`active`);
          screen.classList.remove(`from-story-to-prize`);
        }, 1000);
      } else {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      }
    });
    if (fromStoryToPrize) {
      setTimeout(() => {
        document.body.classList.remove("slide2", "slide3", "slide4");
        this.screenElements[this.activeScreen].classList.remove(
          `screen--hidden`
        );
        setTimeout(() => {
          this.screenElements[this.activeScreen].classList.add(`active`);
        }, 100);
      }, 1000);
    } else {
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);
      }, 100);
    }
    //Load svg on prizes page
    if (
      this.screenElements[this.activeScreen].classList.contains(
        "screen--prizes"
      )
    ) {
      document
        .querySelector(".screen--prizes .prize-1")
        .setAttribute(`src`, `img/prize-1.svg`);
      document
        .querySelector(".screen--prizes .prize-2")
        .setAttribute(`src`, `img/prize-2.svg`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
      (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
        this.screenElements.length - 1,
        ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
