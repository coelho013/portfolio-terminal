$(function() {

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startTerminal);
    } else {
        startTerminal();
    }
});

function startTerminal() {

    const ok = () => `[[;${getThemeColors().green};][ OK \\]] `;

    const WELCOME_BACK = {
        pt: "Bem-vindo de volta!",
        en: "Welcome back!"
    };

    const FROM_GUI = /landing\.html/.test(document.referrer);

    const LOGO = [
        " ██████╗ ██████╗ ███████╗██╗     ██╗  ██╗ ██████╗  ██████╗  ██╗██████╗ ",
        "██╔════╝██╔═══██╗██╔════╝██║     ██║  ██║██╔═══██╗██╔═████╗███║╚════██╗",
        "██║     ██║   ██║█████╗  ██║     ███████║██║   ██║██║██╔██║╚██║ █████╔╝",
        "██║     ██║   ██║██╔══╝  ██║     ██╔══██║██║   ██║████╔╝██║ ██║ ╚═══██╗",
        "╚██████╗╚██████╔╝███████╗███████╗██║  ██║╚██████╔╝╚██████╔╝ ██║██████╔╝",
        " ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═╝╚═════╝ "
    ].join("\n");

    const FETCH = {
        pt: {
            rows: [
                ["Nome", "Gabriel Coelho Ramos"],
                ["Cargo", "Software Engineer @ Ibratan"],
                ["Foco", "Backend · AWS Cloud"],
                ["Local", "Joinville, SC — Brasil"],
                ["Stack", "Java · Python · TypeScript · SQL"],
                ["Cloud", "Lambda · S3 · SQS · CloudFront"]
            ],
            status: "aberto a oportunidades",
            hints: (l) => `Digite ${l("help")} para ver os comandos ou ${l("ls")} para explorar.`,
            hints2: (l) => `Prefere visual? Digite ${l("gui")} · Mudar idioma: ${l("lang en")}`
        },
        en: {
            rows: [
                ["Name", "Gabriel Coelho Ramos"],
                ["Role", "Software Engineer @ Ibratan"],
                ["Focus", "Backend · AWS Cloud"],
                ["Location", "Joinville, SC — Brazil"],
                ["Stack", "Java · Python · TypeScript · SQL"],
                ["Cloud", "Lambda · S3 · SQS · CloudFront"]
            ],
            status: "open to opportunities",
            hints: (l) => `Type ${l("help")} to see commands or ${l("ls")} to start exploring.`,
            hints2: (l) => `Prefer a visual? Type ${l("gui")} · Change language: ${l("lang pt")}`
        }
    };

    function welcomeFor(lang) {
        const f = FETCH[lang];
        const link = (cmd) => `<span class="cmd-link fetch-link" data-cmd="${cmd}">${cmd}</span>`;
        const rows = f.rows
            .map(([k, v]) => `<div class="fetch-row"><span class="fetch-key">${k}</span><span>${v}</span></div>`)
            .join("");

        return [
            `<div class="fetch">`,
            `<div><span class="fetch-user">guest@portfolio</span>:<span class="fetch-path">~</span>$ neofetch</div>`,
            `<div class="fetch-body">`,
            `<pre class="fetch-logo" aria-label="coelho013">${LOGO}</pre>`,
            `<div class="fetch-info">`,
            `<div><span class="fetch-user">coelho013</span>@<span class="fetch-user">portfolio</span></div>`,
            `<div class="fetch-sep">─────────────────────</div>`,
            rows,
            `<div class="fetch-row"><span class="fetch-key">Status</span><span class="fetch-status"><span class="fetch-dot"></span>${f.status}</span></div>`,
            `</div>`,
            `</div>`,
            `<div class="fetch-hints">${f.hints(link)}<br>${f.hints2(link)}</div>`,
            `</div>`
        ].join("");
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
            if (FROM_GUI) term.echo(ok() + WELCOME_BACK[currentLang]);
            term.echo(welcomeFor(currentLang), { raw: true });
            refreshPrompt(term);

            setInterval(function() {
                term.set_prompt(getPrompt());
            }, 1000);
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
                t.echo(welcomeFor(lang), { raw: true });
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

    $("#style-btn").on("click", function() {
        runCommand("style " + (currentStyle === "retro" ? "default" : "retro"));
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
