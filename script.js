const siteLinks = {
  download: "",
  about: "",
};

const introDeviceScreen = {
  left: 0.145,
  top: 0.03,
  width: 0.71,
  height: 0.58,
};

const introDeviceLandingOffsetY = 0.1;

const emojiScrollTargets = {
  candle: {
    startRotate: 0,
    endRotate: -14,
    spin: 12,
    x: 0.26,
    y: 0.15,
    widthRatio: 0.36,
    z: 7,
  },
  roll: {
    startRotate: 8,
    endRotate: 16,
    spin: -14,
    x: 0.82,
    y: 0.16,
    widthRatio: 0.38,
    z: 6,
  },
  disk: {
    startRotate: -11,
    endRotate: 4,
    spin: 18,
    x: 0.54,
    y: 0.44,
    widthRatio: 0.26,
    z: 3,
  },
  mirror: {
    startRotate: -8,
    endRotate: -10,
    spin: -16,
    x: 0.18,
    y: 0.67,
    widthRatio: 0.4,
    z: 5,
  },
  pretzel: {
    startRotate: 12,
    endRotate: 8,
    spin: 14,
    x: 0.49,
    y: 0.68,
    widthRatio: 0.38,
    z: 6,
  },
  tent: {
    startRotate: 9,
    endRotate: -6,
    spin: -13,
    x: 0.79,
    y: 0.83,
    widthRatio: 0.33,
    z: 5,
  },
};

const projects = [
  {
    title: "Project 1",
    emojiKey: "disk",
    image: "site-assets/computer-disk.png",
    spriteClass: "sprite--disk",
    width: "8.4rem",
  },
  {
    title: "Project 2",
    emojiKey: "roll",
    image: "site-assets/roll-of-paper.png",
    spriteClass: "sprite--roll",
    width: "8.4rem",
  },
  {
    title: "Project 3",
    emojiKey: "tent",
    image: "site-assets/tent.png",
    spriteClass: "sprite--tent",
    width: "7.8rem",
  },
  {
    title: "Project 4",
    emojiKey: "pretzel",
    image: "site-assets/pretzel.png",
    spriteClass: "sprite--pretzel",
    width: "7.6rem",
  },
  {
    title: "Project 5",
    emojiKey: "mirror",
    image: "site-assets/mirror-ball.png",
    spriteClass: "sprite--mirror-ball",
    width: "7.6rem",
  },
  {
    title: "Project 6",
    emojiKey: "candle",
    image: "site-assets/candle.png",
    spriteClass: "sprite--candle",
    width: "7.6rem",
  },
];

function buildProjectGrid() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card reveal-block" data-reveal>
          <div class="project-card__sprite sprite ${project.spriteClass}" data-project-emoji-target="${project.emojiKey}" style="--card-width: ${project.width};">
            <img src="${project.image}" alt="" loading="lazy" decoding="async" />
          </div>
          <h3 class="project-card__title">${project.title}</h3>
        </article>
      `,
    )
    .join("");
}

function wireCtas() {
  document.querySelectorAll("[data-link-key]").forEach((link) => {
    const href = siteLinks[link.dataset.linkKey];

    if (!href) {
      link.setAttribute("href", "#");
      link.addEventListener("click", (event) => event.preventDefault());
      return;
    }

    link.setAttribute("href", href);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function easeInOutCubic(value) {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function setupEmojiScrollAnimation() {
  const introDevice = document.querySelector("[data-intro-device]");
  const emojiElements = Array.from(document.querySelectorAll("[data-emoji]"));
  const projectGrid = document.querySelector("[data-project-grid]");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!introDevice || !projectGrid || emojiElements.length === 0 || reduceMotionQuery.matches) {
    return;
  }

  const projectTargetElements = Array.from(document.querySelectorAll("[data-project-emoji-target]"));
  const projectTargetsByKey = new Map(
    projectTargetElements.map((element) => [element.dataset.projectEmojiTarget, element]),
  );

  if (projectTargetsByKey.size === 0) {
    return;
  }

  document.documentElement.classList.add("emoji-scroll-active");

  let emojiStates = [];
  let rafId = 0;

  function measureEmojiStates() {
    emojiElements.forEach((element) => {
      element.classList.remove("hero__float--animated");
      element.style.removeProperty("--float-base-width");
      element.style.removeProperty("--float-x");
      element.style.removeProperty("--float-y");
      element.style.removeProperty("--float-scale");
      element.style.removeProperty("--float-rotate");
      element.style.removeProperty("z-index");
    });

    emojiStates = emojiElements.map((element) => {
      const rect = element.getBoundingClientRect();
      const config = emojiScrollTargets[element.dataset.emoji];

      return {
        element,
        config,
        projectTargetElement: projectTargetsByKey.get(element.dataset.emoji),
        startLeft: rect.left,
        startTop: rect.top,
        startWidth: rect.width,
        startHeight: rect.height,
      };
    });

    emojiStates.forEach((state) => {
      state.element.classList.add("hero__float--animated");
      state.element.style.setProperty("--float-base-width", `${state.startWidth}px`);
      state.element.style.setProperty("--float-x", `${state.startLeft}px`);
      state.element.style.setProperty("--float-y", `${state.startTop}px`);
      state.element.style.setProperty("--float-scale", "1");
      state.element.style.setProperty("--float-rotate", `${state.config.startRotate}deg`);
      state.element.style.zIndex = String(state.config.z);
    });
  }

  function updateEmojiAnimation() {
    rafId = 0;

    const introRect = introDevice.getBoundingClientRect();
    const screenLeft = introRect.left + introRect.width * introDeviceScreen.left;
    const screenTop = introRect.top + introRect.height * introDeviceScreen.top;
    const screenWidth = introRect.width * introDeviceScreen.width;
    const screenHeight = introRect.height * introDeviceScreen.height;
    const introTop = window.scrollY + introRect.top;
    const clusterEndScroll = Math.max(1, introTop - window.innerHeight * 0.28);
    const projectGridRect = projectGrid.getBoundingClientRect();
    const projectGridTop = window.scrollY + projectGridRect.top;
    const gridTravelStart = Math.max(clusterEndScroll, projectGridTop - window.innerHeight * 0.9);
    const gridTravelEnd = Math.max(gridTravelStart + 1, projectGridTop - window.innerHeight * 0.55);
    const clusterProgress = easeInOutCubic(clamp(window.scrollY / clusterEndScroll, 0, 1));
    const gridProgress = easeInOutCubic(
      clamp((window.scrollY - gridTravelStart) / (gridTravelEnd - gridTravelStart), 0, 1),
    );

    emojiStates.forEach((state) => {
      if (!state.projectTargetElement) {
        return;
      }

      const targetWidth = introRect.width * state.config.widthRatio;
      const startCenterX = state.startLeft + state.startWidth / 2;
      const startCenterY = state.startTop + state.startHeight / 2;
      const clusterCenterX = screenLeft + screenWidth * state.config.x;
      const clusterCenterY = screenTop + screenHeight * state.config.y + introRect.height * introDeviceLandingOffsetY;
      const clusterScale = targetWidth / state.startWidth;
      const clusterRotate =
        lerp(state.config.startRotate, state.config.endRotate, clusterProgress) +
        Math.sin(clusterProgress * Math.PI) * state.config.spin;
      const phaseOneCenterX = lerp(startCenterX, clusterCenterX, clusterProgress);
      const phaseOneCenterY = lerp(startCenterY, clusterCenterY, clusterProgress);
      const projectRect = state.projectTargetElement.getBoundingClientRect();
      const projectCenterX = projectRect.left + projectRect.width / 2;
      const projectCenterY = projectRect.top + projectRect.height / 2;
      const projectScale = projectRect.width / state.startWidth;
      const currentCenterX = lerp(phaseOneCenterX, projectCenterX, gridProgress);
      const currentCenterY = lerp(phaseOneCenterY, projectCenterY, gridProgress);
      const currentLeft = currentCenterX - state.startWidth / 2;
      const currentTop = currentCenterY - state.startHeight / 2;
      const currentScale = lerp(lerp(1, clusterScale, clusterProgress), projectScale, gridProgress);
      const gridRotateDrift = Math.sin(gridProgress * Math.PI) * state.config.spin * 0.4;
      const currentRotate = lerp(clusterRotate, 0, gridProgress) + gridRotateDrift;

      state.element.style.setProperty("--float-x", `${currentLeft}px`);
      state.element.style.setProperty("--float-y", `${currentTop}px`);
      state.element.style.setProperty("--float-scale", `${currentScale}`);
      state.element.style.setProperty("--float-rotate", `${currentRotate}deg`);
    });
  }

  function requestAnimationUpdate() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateEmojiAnimation);
  }

  function handleResize() {
    measureEmojiStates();
    requestAnimationUpdate();
  }

  measureEmojiStates();
  updateEmojiAnimation();

  window.addEventListener("scroll", requestAnimationUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
}

document.addEventListener("DOMContentLoaded", () => {
  buildProjectGrid();
  wireCtas();
  setupEmojiScrollAnimation();
});
