/*
 * filesystem.js
 * 
 * Aqui você define toda a estrutura de pastas e arquivos do terminal.
 * O conteúdo está disponível em dois idiomas: PT-BR e EN.
 * A variável currentLang controla qual idioma está ativo.
 * 
 * - Chave com objeto como valor = pasta (diretório)
 * - Chave com string como valor = arquivo (conteúdo exibido com 'cat')
 */

// Idioma ativo: "pt" ou "en"
let currentLang = "en";

const currentYear = new Date().getFullYear();
const bornYear = 2003
let age = currentYear - bornYear;

/**
 * Filesystem em Português
 */
const FILESYSTEM_PT = {
    "about": {
        "me.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Gabriel Coelho Ramos                    ║",
            "║          Software Engineer                       ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            `Nascido em Campo Grande, MS, Brasil, com ${age} anos de idade.`,
            "",
            "Engenheiro de Software com foco em desenvolvimento backend, cloud computing",
            "e soluções de alta disponibilidade na AWS.",
            "",
            "Atualmente trabalhando em uma solução de análise de crédito e risco.",
            "",
            "Apaixonado por desenvolver soluções de alta performance e escaláveis,",
            "seguindo boas práticas de projeto e arquitetura.",
            "",
            "Localidade: Joinville, SC, Brasil"
        ].join("\n"),

        "education.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Formação Acadêmica                      ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Graduação",
            "  Cursando Ciência de Dados na Universidade Federal de Campo Grande, MS",
            "",
            "Certificações",
            "  - AWS Cloud Practitioner ╺▻ https://www.credly.com/badges/19b67c5d-83c9-4be4-9f59-656daa57122e/public_url",
            "",
            "Idiomas",
            "  - Português (nativo)",
            "  - Inglês (profissional)"
        ].join("\n"),

        "experience.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Experiência Profissional                ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Software Engineer @ Ibratan",
            "─────────────────────────────",
            "Solução de análise de crédito, risco e fraude",
            "",
            "  • Desenvolvimento de políticas personalizadas",
            "  • Versionamento de código",
            "  • Infraestrutura Cloud AWS",
        ].join("\n")
    },

    "projects": {
    },

    "skills": {
        "cloud.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Cloud & DevOps                          ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "AWS",
            "  S3 | CloudFront | EC2 | Lambda | API Gateway",
            "  Route 53 | ACM | IAM | DynamoDB | RDS | SQS",
            "",
            "",
            "Containers & CI/CD",
            "  Docker | GitHub Actions | Linux",
            "",
            "Monitoramento",
            "  CloudWatch | X-Ray"
        ].join("\n"),

        "dev.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Desenvolvimento                         ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Linguagens",
            "  Java | Python | JavaScript | TypeScript | SQL",
            "",
            "Backend",
            "  Spring | REST APIs | Serverless",
            "",
            "Frontend",
            "  React.js",
            "",
            "Banco de Dados",
            "  PostgreSQL | Oracle | Redis",
            "",
            "Ferramentas",
            "  Git | VS Code | Postman | Linux"
        ].join("\n")
    },

    "contact": {
        "links.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Contato                                 ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "GitHub    ╺▻ https://github.com/Coelho013",
            "LinkedIn  ╺▻ https://linkedin.com/in/gabriel-coelho-ramos",
            "Email     ╺▻ coelhoramos.gabriel@gmail.com",
            "",
            "─────────────────────────────────────────────────",
            "Aberto a oportunidades e projetos interessantes.",
            "Fique à vontade para entrar em contato!"
        ].join("\n")
    }
};

/**
 * Filesystem em Inglês
 */
const FILESYSTEM_EN = {
    "about": {
        "me.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Gabriel Coelho Ramos                    ║",
            "║          Software Engineer                       ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            `Born in Campo Grande, MS, Brazil, ${age} years old.`,
            "",
            "Software Engineer focused on backend development, cloud computing",
            "and highly available solutions on AWS.",
            "",
            "Currently working on a credit and risk analysis solution.",
            "",
            "Passionate about building high-performance and scalable solutions.",
            "Following best practices in design and architecture.",
            "",
            "Location: Joinville, SC, Brazil"
        ].join("\n"),

        "education.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Education                               ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Degree",
            "  Pursuing Data Science at Federal University of Campo Grande, MS",
            "",
            "Certifications",
            "  - AWS Cloud Practitioner ╺▻ https://www.credly.com/badges/19b67c5d-83c9-4be4-9f59-656daa57122e/public_url",
            "",
            "Languages",
            "  - Portuguese (native)",
            "  - English (professional)"
        ].join("\n"),

        "experience.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Professional Experience                 ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Software Engineer @ Ibratan",
            "─────────────────────────────",
            "Credit, risk and fraud analysis solution",
            "",
            "  • Custom policy development",
            "  • Code versioning",
            "  • AWS Cloud Infrastructure",
        ].join("\n")
    },

    "projects": {
    },

    "skills": {
        "cloud.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Cloud                                   ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "AWS",
            "  S3 | CloudFront | EC2 | Lambda | API Gateway",
            "  Route 53 | ACM | IAM | DynamoDB | RDS | SQS",
            "",
            "",
            "Containers & CI/CD",
            "  Docker | GitHub Actions | Linux",
            "",
            "Monitoring",
            "  CloudWatch | X-Ray"
        ].join("\n"),

        "dev.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Development                             ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "Languages",
            "  Java | Python | JavaScript | TypeScript | SQL",
            "",
            "Backend",
            "  Spring | REST APIs | Serverless",
            "",
            "Frontend",
            "  React.js",
            "",
            "Databases",
            "  PostgreSQL | Oracle | Redis",
            "",
            "Tools",
            "  Git | VS Code | Postman | Linux"
        ].join("\n")
    },

    "contact": {
        "links.txt": [
            "╔══════════════════════════════════════════════════╗",
            "║          Contact                                 ║",
            "╚══════════════════════════════════════════════════╝",
            "",
            "GitHub    ╺▻ https://github.com/Coelho013",
            "LinkedIn  ╺▻ https://linkedin.com/in/gabriel-coelho-ramos",
            "Email     ╺▻ coelhoramos.gabriel@gmail.com",
            "",
            "─────────────────────────────────────────────────",
            "Open to opportunities and interesting projects.",
            "Feel free to reach out!"
        ].join("\n")
    }
};

/**
 * Retorna o filesystem do idioma ativo
 */
function getFilesystem() {
    return currentLang === "en" ? FILESYSTEM_EN : FILESYSTEM_PT;
}
