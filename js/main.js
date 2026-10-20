$(function() {

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startTerminal);
    } else {
        startTerminal();
    }
});

function startTerminal() {

    const pad = IS_SMALL ? "" : "  ";

    const ok = () => `${pad}[[;${getThemeColors().green};][ OK \\]] `;

    const LOADING = [
        IS_SMALL ? "Loading Gabriel Coelho..." : "Loading Gabriel Coelho Ramos...",
        "Initializing portfolio...",
        "Loading projects...",
        "Loading skills...",
        "Establishing connection..."
    ];

    const WELCOME_BACK = {
        pt: "Bem-vindo de volta!",
        en: "Welcome back!"
    };

    const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FROM_GUI = /landing\.html/.test(document.referrer);

    function linkHints(text) {
        const c = getThemeColors();
        return text
            .replace("'help'", "'" + cmdLink("help", "help", c.green) + "'")
            .replace("'ls'", "'" + cmdLink("ls", "ls", c.green) + "'")
            .replace("'gui'", "'" + cmdLink("gui", "gui", c.green) + "'")
            .replace(/lang (en|pt)/, (m) => cmdLink(m, m, c.green));
    }

    function welcome(lines, langHint, guiHint) {
        return [
            "",
            pad + boxTop(),
            pad + boxLine("Gabriel Coelho Ramos", IS_SMALL ? 4 : 14),
            pad + boxDivider(),
            pad + boxEmpty(),
            ...lines.map((l) => pad + boxLine(l, 2)),
            pad + boxEmpty(),
            pad + boxLine(langHint, 2),
            pad + boxLine(guiHint, 2),
            pad + boxEmpty(),
            pad + boxBottom(),
            ""
        ].join("\n");
    }

    const WELCOME_TEXT = {
        pt: () => welcome([
            "Bem-vindo ao meu portfólio!",
            "",
            "Digite 'help' para ver os",
            "comandos ou 'ls' para explorar."
        ], "Mudar idioma: lang en", "Prefere visual? Digite 'gui'"),
        en: () => welcome([
            "Welcome to my portfolio!",
            "",
            "Type 'help' to see commands",
            "or 'ls' to start exploring."
        ], "Change language: lang pt", "Prefer a visual? Type 'gui'")
    };

    function welcomeFor(lang) {
        return linkHints(WELCOME_TEXT[lang]());
    }

    function interpret(input, term) {
        const parts = input.trim().split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        if (!command) return;

        if (COMMANDS[command]) {
            COMMANDS[command](term, args);
        } else {
            term.error(msg().cmdNotFound(command));
        }
    }

    applyLangAttribute();

    const term = $("#terminal").terminal(interpret, {
        greetings: false,
        prompt: getPrompt(),
        name: "portfolio",
        completion: function(input, callback) {
            const dir = getCurrentDir();
            const entries = Object.keys(dir);
            const commands = Object.keys(COMMANDS);
            callback([...commands, ...entries]);
        },

        onInit: function(term) {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

            async function boot() {
                term.set_prompt("");
                term.echo("");

                if (FROM_GUI) {
                    term.echo(ok() + WELCOME_BACK[currentLang]);
                    return;
                }

                for (const l of LOADING) {
                    term.echo(ok() + l);
                    await delay(REDUCED_MOTION ? 0 : 140);
                }
            }

            boot().then(() => {
                term.echo(welcomeFor(currentLang));
                refreshPrompt(term);

                setInterval(function() {
                    term.set_prompt(getPrompt());
                }, 1000);
            });
        }
    });

    applyTheme(currentTheme);

    const langBtn = document.getElementById("lang-btn");

    function syncControls() {
        if (langBtn) langBtn.textContent = currentLang === "pt" ? "EN" : "PT";
    }

    syncControls();

    const originalLang = COMMANDS.lang;
    COMMANDS.lang = function(t, args) {
        originalLang(t, args);
        syncControls();
        if (args && args.length > 0) {
            const lang = args[0].toLowerCase();
            if (lang === "pt" || lang === "en") {
                t.echo(welcomeFor(lang));
            }
        }
    };

    function runCommand(cmd) {
        if (term.paused()) return;
        term.echo(getPrompt() + $.terminal.escape_brackets(cmd));
        interpret(cmd, term);
        term.history().append(cmd);
        term.scroll_to_bottom();
    }

    function fillCommand(cmd) {
        const mobileInput = document.getElementById("mobile-input");
        if (IS_SMALL && mobileInput) {
            mobileInput.value = cmd + " ";
            mobileInput.focus();
        } else {
            term.focus();
            term.set_command(cmd + " ");
        }
    }

    $(document).on("click", ".cmd-link", function() {
        const cmd = this.getAttribute("data-cmd");
        if (this.hasAttribute("data-arg")) {
            fillCommand(cmd);
            return;
        }
        runCommand(cmd);
        if (cmd.startsWith("cd ")) runCommand("ls");
    });

    $(".statusbar .bar-btn").on("click", function(e) {
        e.preventDefault();
        runCommand("gui");
    });

    $("#lang-btn").on("click", function() {
        runCommand("lang " + (currentLang === "pt" ? "en" : "pt"));
    });

    $("#theme-btn").on("click", function() {
        runCommand("theme " + (currentTheme === "dark" ? "light" : "dark"));
    });

    function setupMobileToolbar() {
        const mobileInput = document.getElementById('mobile-input');
        const mobileSend = document.getElementById('mobile-send');
        const chips = document.querySelectorAll('.chip[data-cmd]');

        if (!mobileInput || !mobileSend) return;

        if (IS_SMALL) {
            term.disable();

            mobileInput.addEventListener('focus', function() {
                term.disable();
            });

            document.getElementById('terminal').addEventListener('click', function() {
                term.disable();
            });
        }

        function runMobileCommand() {
            const cmd = mobileInput.value.trim();
            if (!cmd) return;

            mobileInput.value = '';
            runCommand(cmd);
        }

        function writeMobileCommand(cmd, needsArg) {
            mobileInput.value = needsArg ? cmd + ' ' : cmd;
            mobileInput.focus();
            const end = mobileInput.value.length;
            mobileInput.setSelectionRange(end, end);
        }

        mobileSend.addEventListener('click', function() {
            runMobileCommand();
            mobileInput.focus();
        });

        mobileInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                runMobileCommand();
            }
        });

        chips.forEach(function(chip) {
            chip.addEventListener('click', function() {
                writeMobileCommand(
                    this.getAttribute('data-cmd'),
                    this.hasAttribute('data-arg')
                );
            });
        });
    }

    setupMobileToolbar();
}
