const LANDING_EN = {
    "nav.exp": "experience",
    "nav.edu": "education",
    "nav.contact": "contact",
    "bio": "Software Engineer focused on backend development, cloud computing and highly available solutions on AWS. Currently working on a credit and risk analysis solution.",
    "cta.contact": "Get in touch",
    "cta.terminal": "Open terminal",
    "scroll": "scroll to see more",
    "h.exp": "Experience",
    "d.ibratan": "06/2026 — now",
    "ctx.ibratan": "Credit, risk and fraud analysis solution",
    "j.ib1": "Development and maintenance of custom credit policies",
    "j.ib2": "Pipeline automation and version control with Git/GitHub",
    "ctx.hopen": "Data-driven political decision platform using public data",
    "j.ho1": "Features and improvements with Django/Python",
    "j.ho2": "RESTful APIs with Redis caching",
    "j.ho3": "AWS integration via SDK (S3, SQS, Lambda)",
    "ctx.logtrac": "Logistics platform for agribusiness",
    "j.lo1": "Solutions with Node.js, PL/SQL and Oracle APEX",
    "j.lo2": "Dashboards and KPIs for route and cost optimization",
    "ctx.soldamaq": "Retail data analysis",
    "j.so1": "KPIs for cost and sales control",
    "j.so2": "Reports and dashboards in Power BI",
    "h.edu": "Education & Certifications",
    "edu.deg": "Data Science",
    "edu.uni": "Federal University · in progress",
    "edu.cred": "view credential ↗",
    "edu.prog": "in progress",
    "edu.lang": "Languages",
    "edu.langs": "Portuguese (native) · English (professional)",
    "h.contact": "Let's talk?",
    "contact.txt": "Open to opportunities and interesting projects.",
    "foot": "prefer the terminal?"
};

const LANDING_THEME_BG = { dark: "#1e1e2e", light: "#fdf6e3" };

const LANDING_PT = {};
document.querySelectorAll("[data-i18n]").forEach((el) => {
    LANDING_PT[el.dataset.i18n] = el.textContent;
});

let landingLang = loadPref("lang", ["pt", "en"], "en");
let landingTheme = loadPref("theme", ["dark", "light"], "dark");

function setLandingLang(lang) {
    const dict = lang === "en" ? LANDING_EN : LANDING_PT;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const value = dict[el.dataset.i18n];
        if (value) el.textContent = value;
    });
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.getElementById("lang-btn").textContent = lang === "en" ? "PT" : "EN";
    landingLang = lang;
    savePref("lang", lang);
}

function setLandingTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", LANDING_THEME_BG[theme]);
    landingTheme = theme;
    savePref("theme", theme);
}

setLandingLang(landingLang);
setLandingTheme(landingTheme);

document.getElementById("lang-btn").addEventListener("click", () => {
    setLandingLang(landingLang === "pt" ? "en" : "pt");
});

document.getElementById("theme-btn").addEventListener("click", () => {
    setLandingTheme(landingTheme === "light" ? "dark" : "light");
});

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, REDUCED_MOTION ? 0 : ms));

function promptHtml(path) {
    return `<span class="p-user">guest@portfolio</span>:<span class="p-path">${path}</span>$ `;
}

async function typeInto(el, text, speed) {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    el.appendChild(cursor);
    for (const ch of text) {
        cursor.before(ch);
        await wait(speed + Math.random() * 40);
    }
    return cursor;
}

function revealOutput(out) {
    if (!out) return;
    [...out.children].forEach((child, i) => {
        child.style.transitionDelay = (REDUCED_MOTION ? 0 : i * 90) + "ms";
    });
    out.classList.add("show");
}

async function runCmd(cmdEl) {
    cmdEl.innerHTML = promptHtml(cmdEl.dataset.path);
    const typed = document.createElement("span");
    typed.className = "typed";
    cmdEl.appendChild(typed);
    const cursor = await typeInto(typed, cmdEl.dataset.cmd, 55);
    await wait(200);
    cursor.remove();
}

async function playHero() {
    await runCmd(document.querySelector(".hero .cmd"));
    await typeInto(document.getElementById("name"), "Gabriel Coelho Ramos", 45);
    revealOutput(document.getElementById("hero-out"));
}

function watchSections() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            await runCmd(entry.target.querySelector(".cmd"));
            revealOutput(entry.target.querySelector(".out"));
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("section:not(.hero)").forEach((s) => io.observe(s));
}

function watchNav() {
    const links = document.querySelectorAll(".statusbar nav a");
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
}

watchNav();
playHero().then(watchSections);
