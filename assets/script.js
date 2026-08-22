(function () {
  "use strict";

  const toRoman = (num) => {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romans[num - 1] || String(num);
  };

  function renderWorks() {
    const container = document.querySelector("[data-works-list]");
    if (!container || typeof WORKS === "undefined") return;

    const countEl = document.querySelector("[data-works-count]");
    if (countEl) {
      countEl.textContent = WORKS.length + (WORKS.length === 1 ? " piece" : " pieces");
    }

    WORKS.forEach((work, i) => {
      const row = document.createElement("article");
      row.className = "work-row";

      const isPdf = work.type === "pdf";
      const btnLabel = isPdf ? "View PDF" : "Read More";
      const btnClass = isPdf ? "pdf" : "essay";

      row.innerHTML = `
        <div class="work-numeral">${toRoman(i + 1)}</div>
        <div class="work-body">
          <h3>${work.title}${work.language ? ` <span class="lang">— ${work.language}</span>` : ""}</h3>
          <p>${work.description}</p>
          <div class="work-meta">
            <span>${work.date}</span>
            <span class="tag">${work.tag}</span>
          </div>
        </div>
        <a class="btn ${btnClass}" href="${work.href}">
          <span>${btnLabel}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
        <div class="work-desc">
        <p>
        ${work.more}
        </p>
        <p>
        ${work.more2}
        </p>
        </div>
      `;
      container.appendChild(row);
    });

    revealOnScroll();
  }

  function revealOnScroll() {
    const rows = document.querySelectorAll(".work-row");
    if (!("IntersectionObserver" in window) || rows.length === 0) {
      rows.forEach((r) => r.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    rows.forEach((r) => io.observe(r));
  }

  document.addEventListener("DOMContentLoaded", renderWorks);
})();
