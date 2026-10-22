let currentPath = [];
let currentTheme = loadPref("theme", ["dark", "light"], "dark");
let currentStyle = document.documentElement.dataset.style;

const THEMES = {
    dark: {
        base: "#1e1e2e",
        text: "#cdd6f4",
        green: "#a6e3a1",
        blue: "#89b4fa",
        mauve: "#cba6f7",
        peach: "#fab387",
        teal: "#94e2d5",
        surface0: "#313244",
        overlay0: "#6c7086",
        red: "#f38ba8",
        yellow: "#f9e2af"
    },
    light: {
        base: "#fdf6e3",
        text: "#4c4f69",
        green: "#40a02b",
        blue: "#1e66f5",
        mauve: "#8839ef",
        peach: "#fe640b",
        teal: "#179299",
        surface0: "#ccd0da",
        overlay0: "#9ca0b0",
        red: "#d20f39",
        yellow: "#df8e1d"
    }
};

const RETRO_THEMES = {
    dark: {
        base: "#0d0904",
        text: "#ffc266",
        green: "#a8ff7a",
        blue: "#ffdb8a",
        mauve: "#ff9d3c",
        peach: "#ff6a3d",
        teal: "#ffd27a",
        surface0: "#2b1e0c",
        overlay0: "#9a7438",
        red: "#ff5b4a",
        yellow: "#ffe08a"
    },
    light: {
        base: "#f2e9d6",
        text: "#2a1d0e",
        green: "#2f6b2a",
        blue: "#1d4f7a",
        mauve: "#a8401a",
        peach: "#b8501d",
        teal: "#2d6a6a",
        surface0: "#d9cbad",
        overlay0: "#8a7656",
        red: "#a3241a",
        yellow: "#8a5a10"
    }
};

function getThemeColors() {
    return (currentStyle === "retro" ? RETRO_THEMES : THEMES)[currentTheme];
}

function applyTheme(theme) {
    if (!THEMES[theme]) return;

    document.documentElement.dataset.theme = theme;
    currentTheme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", getThemeColors().base);
}

function applyStyle(style) {
    document.documentElement.dataset.style = style;
    currentStyle = style;
    applyTheme(currentTheme);
}

function applyLangAttribute() {
    document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
}

function getCurrentDir() {
    let dir = getFilesystem();
    for (const folder of currentPath) {
        dir = dir[folder];
    }
    return dir;
}

function getBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    if (ua.includes("MSIE") || ua.includes("Trident/")) return "Explorer";

    return "Any";
}

function getPath() {
    return currentPath.length === 0 ? "~" : "~/" + currentPath.join("/");
}

function getPrompt() {
    const c = getThemeColors();
    return `[[;${c.green};]guest@portfolio]:[[;${c.blue};]${getPath()}]$ `;
}

function refreshPrompt(term) {
    term.set_prompt(getPrompt());
    const windowPath = document.getElementById("window-path");
    if (windowPath) windowPath.textContent = getPath();
}

function cmdLink(text, cmd, color, needsArg) {
    const attrs = needsArg ? `{"data-cmd":"${cmd}","data-arg":"1"}` : `{"data-cmd":"${cmd}"}`;
    return `[[;${color || ""};;cmd-link;;${attrs}]${$.terminal.escape_brackets(text)}]`;
}

const MESSAGES = {
    pt: {
        help: [
            "",
            "Comandos disponíveis:",
            "---------------------",
            ...helpEntry("ls", "Lista arquivos e pastas"),
            ...helpEntry("cd <pasta>", "Entra em uma pasta"),
            ...helpEntry("cat <arq>", "Exibe um arquivo"),
            ...helpEntry("clear", "Limpa a tela"),
            ...helpEntry("help", "Mostra esta mensagem"),
            ...helpEntry("whoami", "Quem sou eu?"),
            ...helpEntry("pwd", "Diretório atual"),
            ...helpEntry("lang <pt|en>", "Altera o idioma"),
            ...helpEntry("theme <dark|light>", "Altera o tema"),
            ...helpEntry("style <default|retro>", "Altera o visual"),
            ...helpEntry("gui", "Abre a versão visual"),
            "",
            "Dica: 'cd ..' volta uma pasta",
            ""
        ].join("\n"),
        cmdNotFound: (cmd) => `'${cmd}': comando não encontrado. Digite 'help' para ajuda.`,
        cdNotDir: (t) => `cd: '${t}' não é um diretório`,
        cdNotFound: (t) => `cd: '${t}' não encontrado`,
        catUsage: "cat: informe o nome do arquivo",
        catIsDir: (f) => `cat: '${f}' é um diretório`,
        catNotFound: (f) => `cat: '${f}' não encontrado`,
        langUsage: "Uso: lang <pt|en>\nIdioma atual: ",
        langChanged: (l) => `Idioma alterado para: ${l === "pt" ? "Português" : "English"}`,
        langInvalid: "Idioma inválido. Use: lang pt  ou  lang en",
        themeUsage: "Uso: Tema <dark|light>\nTema atual: ",
        themeChanged: (t) => `Tema alterado para: ${t}`,
        themeInvalid: "Tema inválido. Use: theme dark  ou  theme light",
        guiStarting: "Iniciando interface gráfica...",
        styleUsage: "Uso: style <default|retro>\nVisual atual: ",
        styleChanged: (s) => `Visual alterado para: ${s}`,
        styleInvalid: "Visual inválido. Use: style default  ou  style retro"
    },
    en: {
        help: [
            "",
            "Available commands:",
            "-------------------",
            ...helpEntry("ls", "List files and folders"),
            ...helpEntry("cd <folder>", "Enter a folder"),
            ...helpEntry("cat <file>", "Display a file"),
            ...helpEntry("clear", "Clear the screen"),
            ...helpEntry("help", "Show this message"),
            ...helpEntry("whoami", "Who am I?"),
            ...helpEntry("pwd", "Current directory"),
            ...helpEntry("lang <pt|en>", "Change language"),
            ...helpEntry("theme <dark|light>", "Change theme"),
            ...helpEntry("style <default|retro>", "Change the look"),
            ...helpEntry("gui", "Open the visual version"),
            "",
            "Tip: 'cd ..' goes back one folder",
            ""
        ].join("\n"),
        cmdNotFound: (cmd) => `'${cmd}': command not found. Type 'help' for help.`,
        cdNotDir: (t) => `cd: '${t}' is not a directory`,
        cdNotFound: (t) => `cd: '${t}' not found`,
        catUsage: "cat: specify a file name",
        catIsDir: (f) => `cat: '${f}' is a directory`,
        catNotFound: (f) => `cat: '${f}' not found`,
        langUsage: "Usage: lang <pt|en>\nCurrent language: ",
        langChanged: (l) => `Language changed to: ${l === "pt" ? "Português" : "English"}`,
        langInvalid: "Invalid language. Use: lang pt  or  lang en",
        themeUsage: "Usage: theme <dark|light>\nCurrent theme: ",
        themeChanged: (t) => `Theme changed to: ${t}`,
        themeInvalid: "Invalid theme. Use: theme dark  or  theme light",
        guiStarting: "Starting graphical interface...",
        styleUsage: "Usage: style <default|retro>\nCurrent look: ",
        styleChanged: (s) => `Look changed to: ${s}`,
        styleInvalid: "Invalid look. Use: style default  or  style retro"
    }
};

function msg() {
    return MESSAGES[currentLang];
}

const COMMANDS = {

    help: function(term) {
        term.echo(fitContent(msg().help));
    },

    ls: function(term) {
        const dir = getCurrentDir();
        const entries = Object.keys(dir);
        const c = getThemeColors();
        const items = currentPath.length > 0 ? [cmdLink("../", "cd ..", c.overlay0)] : [];

        for (const entry of entries) {
            if (typeof dir[entry] === "object") {
                items.push(cmdLink(`${entry}/`, `cd ${entry}`, c.blue));
            } else {
                items.push(cmdLink(entry, `cat ${entry}`));
            }
        }
        term.echo(items.join(IS_SMALL ? "\n" : "  "));
    },

    cd: function(term, args) {
        if (!args || args.length === 0 || args[0] === "~") {
            currentPath = [];
            refreshPrompt(term);
            return;
        }

        const target = args[0];

        if (target === "..") {
            if (currentPath.length > 0) {
                currentPath.pop();
            }
            refreshPrompt(term);
            return;
        }

        const dir = getCurrentDir();

        if (dir[target] && typeof dir[target] === "object") {
            currentPath.push(target);
            refreshPrompt(term);
        } else if (dir[target]) {
            term.error(msg().cdNotDir(target));
        } else {
            term.error(msg().cdNotFound(target));
        }
    },

    cat: function(term, args) {
        if (!args || args.length === 0) {
            term.error(msg().catUsage);
            return;
        }

        const filename = args[0];
        const dir = getCurrentDir();

        if (dir[filename] && typeof dir[filename] === "string") {
            const content = fitContent(dir[filename]);
            const lines = content.split("\n");
            let hasLoading = content.includes("{{loading}}");

            if (hasLoading) {
                for (const line of lines) {
                    if (line.includes("{{loading}}")) {
                        const before = line.replace("{{loading}}", "");
                        term.echo(before + '<span class="terminal-spinner"></span>', {raw: true});
                    } else {
                        term.echo(line);
                    }
                }
            } else {
                term.echo(content);
            }
        } else if (dir[filename] && typeof dir[filename] === "object") {
            term.error(msg().catIsDir(filename));
        } else {
            term.error(msg().catNotFound(filename));
        }
    },

    pwd: function(term) {
        term.echo(getPath());
    },

    whoami: function(term) {
        term.echo("guest");
    },

    clear: function(term) {
        term.clear();
    },

    lang: function(term, args) {
        if (!args || args.length === 0) {
            const current = currentLang === "pt" ? "Português" : "English";
            term.echo(msg().langUsage + current);
            return;
        }

        const lang = args[0].toLowerCase();

        if (lang === "pt" || lang === "en") {
            currentPath = [];
            currentLang = lang;
            savePref("lang", lang);
            applyLangAttribute();
            refreshPrompt(term);
            term.echo(msg().langChanged(lang));
        } else {
            term.error(msg().langInvalid);
        }
    },

    theme: function(term, args) {
        if (!args || args.length === 0) {
            term.echo(msg().themeUsage + currentTheme)
            return;
        }

        const theme = args[0].toLowerCase();

        if (THEMES[theme]) {
            applyTheme(theme);
            savePref("theme", theme);
            refreshPrompt(term);
            term.echo(msg().themeChanged(theme));
        } else {
            term.error(msg().themeInvalid);
        }
    },

    style: function(term, args) {
        if (!args || args.length === 0) {
            term.echo(msg().styleUsage + currentStyle);
            return;
        }

        const style = args[0].toLowerCase();

        if (style === "default" || style === "retro") {
            applyStyle(style);
            savePref("style", style);
            refreshPrompt(term);
            term.echo(msg().styleChanged(style));
        } else {
            term.error(msg().styleInvalid);
        }
    },

    gui: function(term) {
        const c = getThemeColors();
        const width = IS_SMALL ? 16 : 24;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        function bar(i) {
            const filled = "█".repeat(i) + "░".repeat(width - i);
            return `[[;${c.mauve};][${filled}\\]] ${Math.round(i / width * 100)}%`;
        }

        async function launch() {
            term.pause();
            term.echo(bar(0));
            for (let i = 1; i <= width; i++) {
                await delay(28);
                term.update(-1, bar(i));
            }
            term.echo(`[[;${c.green};][ OK \\]] ${msg().guiStarting}`);
            await delay(450);
            window.location.href = "landing.html?style=" + currentStyle;
        }

        launch();
    },
};

COMMANDS.web = COMMANDS.gui;
COMMANDS.recruiter = COMMANDS.gui;
