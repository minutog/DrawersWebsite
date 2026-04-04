const siteLinks = {
  download: "",
  about: "",
};

const projects = [
  {
    title: "Project 1",
    image: "site-assets/computer-disk.png",
    spriteClass: "sprite--disk",
    width: "8.4rem",
  },
  {
    title: "Project 2",
    image: "site-assets/roll-of-paper.png",
    spriteClass: "sprite--roll",
    width: "8.4rem",
  },
  {
    title: "Project 3",
    image: "site-assets/tent.png",
    spriteClass: "sprite--tent",
    width: "7.8rem",
  },
  {
    title: "Project 4",
    image: "site-assets/pretzel.png",
    spriteClass: "sprite--pretzel",
    width: "7.6rem",
  },
  {
    title: "Project 5",
    image: "site-assets/mirror-ball.png",
    spriteClass: "sprite--mirror-ball",
    width: "7.6rem",
  },
  {
    title: "Project 6",
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
          <div class="project-card__sprite sprite ${project.spriteClass}" style="--card-width: ${project.width};">
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

document.addEventListener("DOMContentLoaded", () => {
  buildProjectGrid();
  wireCtas();
});
