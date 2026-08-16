/*
 * commands.js
 * 
 * Lógica dos comandos do terminal.
 * Você não precisa mexer aqui a menos que queira adicionar comandos novos.
 */

// Estado de navegação
let currentPath = [];
let currentTheme = "dark";

const BLUE_COLOR = "#005faf"
const BROWN_COLOR = '#ffa726';

/**
 * Retorna o diretório atual baseado no path
 */
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
    if (ua.includes("Firefox/")) return "Mozilla Firefox";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    if (ua.includes("MSIE") || ua.includes("Trident/")) return "Explorer";

    return "Any";
}

/**
 * Retorna o prompt formatado (ex: guest@portfolio:~/projects$)
 */
function getPrompt() {
   
    const clienteData = new Intl.DateTimeFormat('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'medium'
    }).format(new Date());

    const path = currentPath.length === 0 ? "~" : "~/" + currentPath.join("/");

    const styledPath = `[[[;${BLUE_COLOR};]${path}]]`;
    const styledDate = `[[[;${BROWN_COLOR};]${clienteData}]]`;
    const clientBrowser = `[[[;${BROWN_COLOR};]${getBrowser()}]]`

    return `┌${styledDate}${clientBrowser}${styledPath}\n└$ `;
}

/**
 * Mensagens do sistema por idioma
 */
const MESSAGES = {
    pt: {
        help: [
            "",
            "Comandos disponíveis:",
            "---------------------",
            "  ls                  Lista arquivos e pastas do diretório atual",
            "  cd <pasta>          Entra em uma pasta (cd .. para voltar)",
            "  cat <arq>           Exibe o conteúdo de um arquivo",
            "  clear               Limpa a tela",
            "  help                Mostra esta mensagem",
            "  whoami              Quem sou eu?",
            "  pwd                 Mostra o diretório atual",
            "  exit                Fecha janela",
            "  lang <pt|en>        Altera o idioma (português/inglês)",
            "  theme <dark|light>  Altera o tema",
            "",
            "Dica: comece com 'ls' para ver o que tem aqui!",
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
        themeInvalid: "Tema inválido. Use: theme dark  ou  theme light"
    },
    en: {
        help: [
            "",
            "Available commands:",
            "-------------------",
            "  ls                  List files and folders in current directory",
            "  cd <folder>         Enter a folder (cd .. to go back)",
            "  cat <file>          Display file contents",
            "  clear               Clear the screen",
            "  help                Show this message",
            "  whoami              Who am I?",
            "  pwd                 Show current directory",
            "  exit                Close window",
            "  lang <pt|en>        Change language (portuguese/english)",
            "  theme <dark|light>  Change theme",
            "",
            "Tip: start with 'ls' to explore!",
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
        themeInvalid: "Invalid theme. Use: theme dark  or  theme light"
    }
};

/**
 * Retorna as mensagens do idioma ativo
 */
function msg() {
    return MESSAGES[currentLang];
}

/**
 * Comandos disponíveis
 */
const COMMANDS = {

    help: function(term) {
        term.echo(msg().help);
    },

    ls: function(term) {
        const dir = getCurrentDir();
        const entries = Object.keys(dir);
        let output = "";

        for (const entry of entries) {
            if (typeof dir[entry] === "object") {
                // Pasta - exibe em azul com /
                output += `[[;${BLUE_COLOR};]${entry}/]  `;
            } else {
                // Arquivo - exibe em branco
                output += `${entry}  `;
            }
        }
        term.echo(output);
    },

    cd: function(term, args) {
        if (!args || args.length === 0 || args[0] === "~") {
            currentPath = [];
            term.set_prompt(getPrompt());
            return;
        }

        const target = args[0];

        if (target === "..") {
            if (currentPath.length > 0) {
                currentPath.pop();
            }
            term.set_prompt(getPrompt());
            return;
        }

        const dir = getCurrentDir();

        if (dir[target] && typeof dir[target] === "object") {
            currentPath.push(target);
            term.set_prompt(getPrompt());
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
            term.echo(dir[filename]);
        } else if (dir[filename] && typeof dir[filename] === "object") {
            term.error(msg().catIsDir(filename));
        } else {
            term.error(msg().catNotFound(filename));
        }
    },

    pwd: function(term) {
        const path = currentPath.length === 0 ? "~" : "~/" + currentPath.join("/");
        term.echo(path);
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
            term.set_prompt(getPrompt());
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

        const themes = {
            light: { color: "#657b83", background: "#fdf6e3"},
            dark:  { color: "#aaa", background: "#000"}
        }

        const theme = args[0].toLowerCase();

        const selected = themes[theme]
        if (selected) {
            document.documentElement.style.setProperty("--color", selected.color);
            document.documentElement.style.setProperty("--background", selected.background)
            currentTheme = theme
            term.set_prompt(getPrompt());
            term.echo(msg().themeChanged(theme))
        } else {
            term.error(msg().themeInvalid)
        }
    },

    exit: function(term) {
        window.close();
    }
};
