$(function() {

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startTerminal);
    } else {
        startTerminal();
    }
});

function startTerminal() {

    const pad = IS_SMALL ? "" : "  ";

    const LOADING = IS_SMALL ? [
            "",
            "[ OK ] Loading Gabriel Coelho...",
            "[ OK ] Initializing portfolio...",
            "[ OK ] Loading projects...",
            "[ OK ] Loading skills...",
            "[ OK ] Establishing connection...",
    ].join("\n") : [
            "",
            "  [ OK ] Loading Gabriel Coelho Ramos...",
            "  [ OK ] Initializing portfolio...",
            "  [ OK ] Loading projects...",
            "  [ OK ] Loading skills...",
            "  [ OK ] Establishing connection...",
    ].join("\n")

    function welcome(lines, langHint) {
        return [
            "",
            pad + boxTop(),
            pad + boxLine("Gabriel Coelho Ramos", IS_SMALL ? 4 : 14),
            pad + boxDivider(),
            pad + boxEmpty(),
            ...lines.map((l) => pad + boxLine(l, 2)),
            pad + boxEmpty(),
            pad + boxLine(langHint, 2),
            pad + boxEmpty(),
            pad + boxBottom(),
            ""
        ].join("\n");
    }

    const WELCOME = {
        pt: welcome([
            "Bem-vindo ao meu portfólio!",
            "",
            "Digite 'help' para ver os",
            "comandos ou 'ls' para explorar."
        ], "Mudar idioma: lang en"),
        en: welcome([
            "Welcome to my portfolio!",
            "",
            "Type 'help' to see commands",
            "or 'ls' to start exploring."
        ], "Change language: lang pt")
    };

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
        height: "100%",
        completion: function(input, callback) {
            const dir = getCurrentDir();
            const entries = Object.keys(dir);
            const commands = Object.keys(COMMANDS);
            callback([...commands, ...entries]);
        },

        onInit: function(term) {
            const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));
            const lines = LOADING.split("\n")

            async function runLoadingEachLines() {
                term.set_prompt('')

                for (const l of lines) {
                    term.echo(l)
                    await delay(500)
                }
            }

            runLoadingEachLines().then(() => {
                term.echo(WELCOME[currentLang])
                term.set_prompt(getPrompt())
                
                setInterval(function() {
                    term.set_prompt(getPrompt())
                }, 1000)
            })   
        }
    });

    applyTheme(currentTheme);

    const originalLang = COMMANDS.lang;
    COMMANDS.lang = function(t, args) {
        originalLang(t, args);
        if (args && args.length > 0) {
            const lang = args[0].toLowerCase();
            if (lang === "pt" || lang === "en") {
                t.echo(WELCOME[lang]);
            }
        }
    };

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
            term.echo(getPrompt() + cmd);
            interpret(cmd, term);
            term.history().append(cmd);
            term.scroll_to_bottom();
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
