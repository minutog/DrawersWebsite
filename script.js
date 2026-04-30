const siteLinks = {
  download: "https://download.drawers.computer/Drawers.dmg",
  about: "mailto:gonzalo_minuto@mde.harvard.edu",
};

const mobileEmailCapture = {
  appsScriptEndpoint: "https://script.google.com/macros/s/AKfycbx8i-Om1UcBBqiHQSE9zu9luzWF9z3Fceo-ssA3196iouvjc0ZQdJIuuh3lZdfyoPmNYg/exec",
  fallbackEndpoint: "https://formsubmit.co/ajax/gonzalominuto@gmail.com",
  subject: "Drawers mobile download request",
  modalTitle: "We'll email you the link so that you can open it on your mac. You will love Drawers!",
  successTitle: "We'll email you the file, thanks so much for your interest in Drawers.",
};

const mobileViewportQuery = "(max-width: 768px)";

function isMobileViewport() {
  return window.matchMedia(mobileViewportQuery).matches;
}

const introDeviceScreen = {
  left: 0.145,
  top: 0.03,
  width: 0.71,
  height: 0.58,
};

const introDeviceLandingOffsetY = 0.1;

const emojiScrollTargets = {
  candle: {
    startRotate: -7,
    endRotate: -25,
    spin: 12,
    x: 0.26,
    y: 0.15,
    widthRatio: 0.36,
    z: 7,
  },
  roll: {
    startRotate: 28,
    endRotate: 336,
    spin: -14,
    x: 0.82,
    y: 0.16,
    widthRatio: 0.38,
    z: 6,
  },
  disk: {
    startRotate: -11,
    endRotate: 14,
    spin: 18,
    x: 0.54,
    y: 0.24,
    widthRatio: 0.26,
    z: 3,
  },
  mirror: {
    startRotate: -8,
    endRotate: 20,
    spin: -30,
    x: 0.08,
    y: 0.77,
    widthRatio: 0.4,
    z: 5,
  },
  pretzel: {
    startRotate: 15,
    endRotate: -50,
    spin: 14,
    x: 0.49,
    y: 0.80,
    widthRatio: 0.38,
    z: 6,
  },
  tent: {
    startRotate: -12,
    endRotate: -6,
    spin: -17,
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

const workspaceProjects = [
  {
    title: "Project 1",
    image: "site-assets/workspace-project-1.png",
  },
  {
    title: "Project 2",
    image: "site-assets/workspace-project-2.png",
  },
  {
    title: "Project 3",
    image: "site-assets/workspace-project-3.png",
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

function buildWorkspaceCarousel() {
  const screen = document.querySelector("[data-workspace-screen]");
  if (!screen) return;

  screen.innerHTML = workspaceProjects
    .map(
      (project, index) => `
        <div class="workspace-carousel__project" data-workspace-carousel-item data-project-index="${index}">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
        </div>
      `,
    )
    .join("");
}

function buildMobileWorkspaceCarousel() {
  const track = document.querySelector("[data-mobile-workspace-track]");
  if (!track) return;

  track.innerHTML = workspaceProjects
    .map(
      (project, index) => `
        <div class="mobile-workspace-carousel__project" data-mobile-workspace-project="${index}">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
        </div>
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

function easeOutBack(value) {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

function setupAboutContentCap() {
  if (isMobileViewport()) {
    return;
  }

  const aboutContent = document.querySelector(".about__content");
  const aboutButton = document.querySelector(".about__button");

  if (!aboutContent || !aboutButton) {
    return;
  }

  let rafId = 0;

  function updateContentCap() {
    rafId = 0;

    const buttonRect = aboutButton.getBoundingClientRect();
    const contentRect = aboutContent.getBoundingClientRect();
    const buttonVisible = buttonRect.top < window.innerHeight && buttonRect.bottom > 0;
    const currentOffset = Number.parseFloat(
      aboutContent.style.getPropertyValue("--about-content-offset") || "0",
    );
    const naturalTop = contentRect.top - currentOffset;
    const topLimit = 16;
    const offset = buttonVisible && naturalTop < topLimit ? topLimit - naturalTop : 0;

    aboutContent.style.setProperty("--about-content-offset", `${offset}px`);
  }

  function requestUpdate() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateContentCap);
  }

  updateContentCap();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function setupEmojiScrollAnimation() {
  if (isMobileViewport()) {
    return;
  }

  const introDevice = document.querySelector("[data-intro-device]");
  const emojiElements = Array.from(document.querySelectorAll("[data-emoji]"));
  const introAppElements = Array.from(document.querySelectorAll("[data-intro-app]"));
  const projectGrid = document.querySelector("[data-project-grid]");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!introDevice || !projectGrid || emojiElements.length === 0 || reduceMotionQuery.matches) {
    return;
  }

  const projectTargetElements = Array.from(document.querySelectorAll("[data-project-emoji-target]"));
  const projectTargetsByKey = new Map(
    projectTargetElements.map((element) => [element.dataset.projectEmojiTarget, element]),
  );
  const introAppConfig = {
    gmail: { delay: 0.05, shiftX: -26, shiftY: 24 },
    instagram: { delay: 0, shiftX: -12, shiftY: 20 },
    slack: { delay: 0.1, shiftX: 26, shiftY: 20 },
    message: { delay: 0.08, shiftX: 16, shiftY: 26 },
  };

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
    const appsPopProgress = clamp((clusterProgress - 0.72) / 0.24, 0, 1);
    const appsFadeProgress = clamp((gridProgress - 0.08) / 0.3, 0, 1);
    const appsFade = 1 - easeInOutCubic(appsFadeProgress);

    introAppElements.forEach((element) => {
      const config = introAppConfig[element.dataset.introApp] || { delay: 0, shiftX: 0, shiftY: 20 };
      const localPopProgress = clamp((appsPopProgress - config.delay) / (1 - config.delay), 0, 1);
      const popEase = easeOutBack(localPopProgress);
      const opacity = clamp(localPopProgress * 1.5, 0, 1) * appsFade;
      const scale = lerp(0.35, 1, popEase);
      const shiftX = lerp(config.shiftX, 0, popEase);
      const shiftY = lerp(config.shiftY, 0, popEase);

      element.style.setProperty("--intro-app-opacity", `${opacity}`);
      element.style.setProperty("--intro-app-scale", `${scale}`);
      element.style.setProperty("--intro-app-shift-x", `${shiftX}px`);
      element.style.setProperty("--intro-app-shift-y", `${shiftY}px`);
    });

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

function setupWorkspaceProjectCarousel() {
  if (isMobileViewport()) {
    return;
  }

  const workspaceSection = document.querySelector("[data-workspace-section]");
  const workspaceDevice = document.querySelector("[data-workspace-device]");
  const workspaceScreen = document.querySelector("[data-workspace-screen]");
  const carouselItems = Array.from(document.querySelectorAll("[data-workspace-carousel-item]"));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (
    !workspaceSection ||
    !workspaceDevice ||
    !workspaceScreen ||
    carouselItems.length === 0 ||
    reduceMotionQuery.matches
  ) {
    return;
  }

  let rafId = 0;
  const holdUnits = 0.48;
  const moveUnits = 1;

  function getWorkspaceTrackOffset(progress, slideWidth) {
    const segments = [];

    for (let index = 0; index < workspaceProjects.length; index += 1) {
      segments.push({
        type: "hold",
        index,
        duration: holdUnits,
      });

      if (index < workspaceProjects.length - 1) {
        segments.push({
          type: "move",
          from: index,
          to: index + 1,
          duration: moveUnits,
        });
      }
    }

    const totalDuration = segments.reduce((sum, segment) => sum + segment.duration, 0);
    const timelinePosition = progress * totalDuration;

    let cursor = 0;

    for (const segment of segments) {
      const nextCursor = cursor + segment.duration;

      if (timelinePosition <= nextCursor) {
        if (segment.type === "hold") {
          return -segment.index * slideWidth;
        }

        const localProgress = easeInOutCubic((timelinePosition - cursor) / segment.duration);
        return -lerp(segment.from * slideWidth, segment.to * slideWidth, localProgress);
      }

      cursor = nextCursor;
    }

    return -(workspaceProjects.length - 1) * slideWidth;
  }

  function updateWorkspaceSceneHeight() {
    const deviceHeight = workspaceDevice.getBoundingClientRect().height;
    const stickTop = Math.max(0, (window.innerHeight - deviceHeight) / 2);
    const totalUnits = workspaceProjects.length * holdUnits + (workspaceProjects.length - 1) * moveUnits;
    const scrollLength = window.innerHeight * Math.max(1.8, totalUnits * 0.9);

    workspaceSection.style.setProperty("--workspace-device-height", `${deviceHeight}px`);
    workspaceSection.style.setProperty("--workspace-stick-top", `${stickTop}px`);
    workspaceSection.style.setProperty("--workspace-scroll-length", `${scrollLength}px`);
  }

  function updateWorkspaceCarousel() {
    rafId = 0;

    const sectionRect = workspaceSection.getBoundingClientRect();
    const sectionStyles = window.getComputedStyle(workspaceSection);
    const scrollLength = Number.parseFloat(sectionStyles.getPropertyValue("--workspace-scroll-length")) || 1;
    const stickTop = Number.parseFloat(sectionStyles.getPropertyValue("--workspace-stick-top")) || 0;
    const pinStart = window.scrollY + sectionRect.top - stickTop;
    const localScroll = clamp(window.scrollY - pinStart, 0, scrollLength);
    const sceneProgress = clamp(localScroll / scrollLength, 0, 1);
    const slideWidth = workspaceScreen.clientWidth;
    const trackOffset = getWorkspaceTrackOffset(sceneProgress, slideWidth);

    carouselItems.forEach((item, index) => {
      const x = index * slideWidth + trackOffset;
      item.style.setProperty("--workspace-x", `${x}px`);
      item.style.opacity = "1";
    });

    workspaceDevice.classList.toggle("workspace__frame--active", sceneProgress > 0 && sceneProgress < 1);
  }

  function requestUpdate() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateWorkspaceCarousel);
  }

  function handleResize() {
    updateWorkspaceSceneHeight();
    requestUpdate();
  }

  updateWorkspaceSceneHeight();
  updateWorkspaceCarousel();

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
}

function setupMobileWorkspaceAutoplay() {
  const landing = document.querySelector(".mobile-landing");
  const slides = Array.from(document.querySelectorAll("[data-mobile-workspace-project]"));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!landing || slides.length === 0 || !isMobileViewport()) {
    return;
  }

  let currentIndex = 0;
  let intervalId = 0;

  function render({ immediate = false } = {}) {
    slides.forEach((slide, index) => {
      const delta = index - currentIndex;
      let position = delta;

      if (delta > 1) {
        position -= slides.length;
      } else if (delta < -1) {
        position += slides.length;
      }

      slide.style.transition = immediate || reduceMotionQuery.matches
        ? "none"
        : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease";
      slide.style.transform = `translate3d(${position * 100}%, 0, 0)`;
      slide.style.opacity = position === 0 ? "1" : "0";
      slide.style.zIndex = String(position === 0 ? 2 : 1);
    });
  }

  function advance() {
    currentIndex = (currentIndex + 1) % slides.length;
    render();
  }

  function start() {
    if (intervalId) {
      window.clearInterval(intervalId);
    }

    intervalId = window.setInterval(advance, 3000);
  }

  render({ immediate: true });
  start();
}

function setupMobileLandingBalance() {
  const landing = document.querySelector(".mobile-landing");
  const content = document.querySelector(".mobile-landing__content");
  const wordmark = document.querySelector(".mobile-landing__wordmark");
  const textBlock = document.querySelector("[data-mobile-text-block]");
  const device = document.querySelector("[data-mobile-workspace-device]");
  const ctaWrap = document.querySelector(".mobile-landing__cta-wrap");

  if (!landing || !content || !wordmark || !textBlock || !device || !ctaWrap || !isMobileViewport()) {
    return;
  }

  const deviceAspect = 4000 / 3074;
  let rafId = 0;

  function updateBalance() {
    rafId = 0;

    const contentRect = content.getBoundingClientRect();
    const wordmarkRect = wordmark.getBoundingClientRect();
    const textBlockRect = textBlock.getBoundingClientRect();
    const ctaRect = ctaWrap.getBoundingClientRect();
    const contentStyles = window.getComputedStyle(content);
    const horizontalPadding =
      (Number.parseFloat(contentStyles.paddingLeft) || 0) + (Number.parseFloat(contentStyles.paddingRight) || 0);
    const baseMinGap = clamp(window.innerHeight * 0.016, 8, 18);
    const maxDeviceHeightByWidth = Math.max(0, (contentRect.width - horizontalPadding) / deviceAspect);
    const availableRegion = Math.max(0, ctaRect.top - wordmarkRect.bottom);
    const minSpaceForDevice = Math.max(0, availableRegion - textBlockRect.height);

    let deviceHeight = Math.max(0, Math.min(maxDeviceHeightByWidth, minSpaceForDevice - baseMinGap * 3));
    let gap = Math.max(0, (minSpaceForDevice - deviceHeight) / 3);

    if (gap < baseMinGap) {
      gap = Math.min(baseMinGap, Math.max(0, minSpaceForDevice / 3));
      deviceHeight = Math.max(0, Math.min(maxDeviceHeightByWidth, minSpaceForDevice - gap * 3));
      gap = Math.max(0, (minSpaceForDevice - deviceHeight) / 3);
    }

    content.style.setProperty("--mobile-flow-gap", `${gap}px`);
    content.style.setProperty("--mobile-device-height", `${deviceHeight}px`);
  }

  function requestUpdate() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(updateBalance);
  }

  requestUpdate();
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);

  if (document.fonts?.ready) {
    document.fonts.ready.then(requestUpdate).catch(() => {});
  }
}

function setupMobileRequestModal() {
  const modal = document.querySelector("[data-mobile-request-modal]");
  const openButton = document.querySelector("[data-mobile-request-open]");
  const closeButtons = Array.from(document.querySelectorAll("[data-mobile-request-close]"));
  const form = document.querySelector("[data-mobile-request-form]");
  const panel = document.querySelector("[data-mobile-request-panel]");
  const input = document.querySelector("[data-mobile-request-email]");
  const title = document.querySelector("#mobile-request-title");
  const submitButton = form?.querySelector('[type="submit"]');
  const targetFrame = document.querySelector("[data-mobile-request-target]");
  const sourceInput = form?.querySelector('[name="source"]');
  const userAgentInput = form?.querySelector('[name="userAgent"]');

  if (!modal || !openButton || !form || !panel || !input || !title || !submitButton || !targetFrame || !sourceInput || !userAgentInput) {
    return;
  }

  let isSubmitting = false;
  let pendingIframeSubmit = false;

  function isAppsScriptConfigured() {
    return Boolean(mobileEmailCapture.appsScriptEndpoint && /^https:\/\/script\.google\.com\//.test(mobileEmailCapture.appsScriptEndpoint));
  }

  function resetModal() {
    pendingIframeSubmit = false;
    title.textContent = mobileEmailCapture.modalTitle;
    form.hidden = false;
    form.reset();
    submitButton.disabled = false;
    submitButton.classList.remove("pill-button--disabled");
    sourceInput.value = "Drawers mobile landing";
    userAgentInput.value = navigator.userAgent;
  }

  function showSuccessState() {
    title.textContent = mobileEmailCapture.successTitle;
    form.hidden = true;
    window.setTimeout(() => {
      if (!modal.hidden) {
        closeModal();
      }
    }, 1800);
  }

  function openModal() {
    resetModal();
    modal.hidden = false;
    window.setTimeout(() => input.focus(), 40);
  }

  function closeModal() {
    modal.hidden = true;
    resetModal();
    isSubmitting = false;
  }

  openButton.addEventListener("click", openModal);

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting || !input.reportValidity()) {
      return;
    }

    const email = input.value.trim();
    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.classList.add("pill-button--disabled");
    sourceInput.value = "Drawers mobile landing";
    userAgentInput.value = navigator.userAgent;

    if (isAppsScriptConfigured()) {
      pendingIframeSubmit = true;
      form.action = mobileEmailCapture.appsScriptEndpoint;
      form.method = "POST";
      form.target = "mobile-request-target";
      form.submit();
      return;
    }

    try {
      const response = await fetch(mobileEmailCapture.fallbackEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _replyto: email,
          _subject: mobileEmailCapture.subject,
          _template: "table",
          source: "Drawers mobile landing",
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || (result && (result.success === false || result.success === "false"))) {
        throw new Error("Email capture failed");
      }

      showSuccessState();
    } catch (error) {
      window.alert("We couldn't save your email right now. Please try again in a moment.");
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.classList.remove("pill-button--disabled");
    }
  });

  targetFrame.addEventListener("load", () => {
    if (!pendingIframeSubmit) {
      return;
    }

    pendingIframeSubmit = false;
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.classList.remove("pill-button--disabled");
    showSuccessState();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildProjectGrid();
  buildWorkspaceCarousel();
  buildMobileWorkspaceCarousel();
  wireCtas();
  setupAboutContentCap();
  setupEmojiScrollAnimation();
  setupWorkspaceProjectCarousel();
  setupMobileWorkspaceAutoplay();
  setupMobileLandingBalance();
  setupMobileRequestModal();
});
