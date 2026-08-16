/*
 * main.js
 * 
 * Inicialização do terminal.
 * Aqui o jQuery Terminal é configurado e a mensagem de boas-vindas é exibida.
 */

$(function() {

    // Mensagens de boas-vindas por idioma
    const LOADING = [
            "",
            "  [ OK ] Loading Gabriel Coelgo Ramos...",
            "  [ OK ] Initializing portfolio...",
            "  [ OK ] Loading projects...",
            "  [ OK ] Loading skills...",
            "  [ OK ] Establishing connection...",
    ].join("\n")
    const WELCOME = {
        pt: [
            "",
            "  ╔══════════════════════════════════════════════════╗",
            "  ║              Gabriel Coelho Ramos                ║",
            "  ╠══════════════════════════════════════════════════╣",
            "  ║                                                  ║",
            "  ║  Bem-vindo ao meu portfólio interativo!          ║",
            "  ║                                                  ║",
            "  ║  Digite 'help' para ver os comandos disponíveis  ║",
            "  ║  ou 'ls' para começar a explorar.                ║",
            "  ║                                                  ║",
            "  ║  Para mudar o idioma: lang en                    ║",
            "  ║                                                  ║",
            "  ╚══════════════════════════════════════════════════╝",
            ""
        ].join("\n"),
        en: [
            "",
            "  ╔══════════════════════════════════════════════════╗",
            "  ║              Gabriel Coelho Ramos                ║",
            "  ╠══════════════════════════════════════════════════╣",
            "  ║                                                  ║",
            "  ║  Welcome to my interactive portfolio!            ║",
            "  ║                                                  ║",
            "  ║  Type 'help' to see available commands           ║",
            "  ║  or 'ls' to start exploring.                     ║",
            "  ║                                                  ║",
            "  ║  To change language: lang pt                     ║",
            "  ║                                                  ║",
            "  ╚══════════════════════════════════════════════════╝",
            ""
        ].join("\n")
    };

    // Inicializa o terminal
    const term = $("#terminal").terminal(function(input, term) {
        // Faz o parse do input
        const parts = input.trim().split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        if (!command) return;

        // Verifica se o comando existe
        if (COMMANDS[command]) {
            COMMANDS[command](term, args);
        } else {
            term.error(msg().cmdNotFound(command));
        }
    }, {
        // Configurações do terminal
        greetings: false,
        prompt: getPrompt(),
        name: "portfolio",
        height: "100%",
        completion: function(input, callback) {
            // Autocomplete com Tab
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

    // Sobrescreve o comando lang para também re-exibir o welcome
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
});
