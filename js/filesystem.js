let currentLang = loadPref("lang", ["pt", "en"], "en");

const currentYear = new Date().getFullYear();
const bornYear = 2003
let age = currentYear - bornYear;

const CREDLY_URL = "https://www.credly.com/badges/19b67c5d-83c9-4be4-9f59-656daa57122e/public_url";

const FILESYSTEM_PT = {
  "about": {
    "me.txt": [
      ...header("Gabriel Coelho Ramos", "Software Engineer"),
      "",
      `Nascido em Campo Grande, MS, Brasil, com ${age} anos de idade.`,
      "",
      ...para(
        "Engenheiro de Software com foco em desenvolvimento backend, cloud computing",
        "e soluções de alta disponibilidade na AWS."
      ),
      "",
      "Atualmente trabalhando em uma solução de análise de crédito e risco.",
      "",
      ...para(
        "Apaixonado por desenvolver soluções de alta performance e escaláveis,",
        "seguindo boas práticas de projeto e arquitetura."
      ),
      "",
      "Localidade: Joinville, SC, Brasil"
    ].join("\n"),

    "education.txt": [
      ...header("Formação Acadêmica"),
      "",
      "Graduação",
      "  Cursando Ciência de Dados na Universidade Federal de Campo Grande, MS",
      "",
      "Certificações",
      ...link("AWS Cloud Practitioner", CREDLY_URL),
      ...link("AWS Solutions Architect Associate", "{{loading}}"),
      "",
      "Idiomas",
      "  - Português (nativo)",
      "  - Inglês (profissional)"
    ].join("\n"),

    "experience.txt": [
      ...header("Experiência Profissional"),
      "",
      "Software Engineer @ Ibratan (06/2026 - Atual)",
      sep(37),
      "Solução de análise de crédito, risco e fraude",
      "",
      "  • Desenvolvimento e manutenção de políticas de crédito personalizadas",
      "  • Automação de pipelines e versionamento com Git/GitHub",
      "",
      "",
      "Software Engineer @ Hopen Data (02/2026 - 06/2026)",
      sep(53),
      "Plataforma de decisões políticas baseadas em dados públicos",
      "",
      "  • Desenvolvimento de funcionalidades e melhorias com Django/Python",
      "  • Construção de RESTful APIs com cache via Redis",
      "  • Integração com serviços AWS utilizando SDK (S3, SQS, Lambda)",
      "",
      "",
      "Software Engineer @ Logtrac Consultores Associados (02/2024 - 02/2026)",
      sep(74),
      "Plataforma de logística para o setor do agronegócio",
      "",
      "  • Desenvolvimento de soluções em Node.js, PL/SQL e Oracle APEX",
      "  • Criação de dashboards e indicadores para otimização de rotas e custos",
      "  • Manutenção e evolução de sistemas legados",
      "",
      "",
      "Data Analyst @ Soldamaq Comércio de Ferramentas (10/2022 - 02/2024)",
      sep(70),
      "Análise de dados no setor de comércio varejista",
      "",
      "  • Criação de indicadores de desempenho (KPIs) para controle de custos e vendas",
      "  • Desenvolvimento de relatórios e painéis em Power BI",
      "  • Extração e transformação de dados com Power Query e Oracle Database",
      ""
    ].join("\n")
  },

  "projects": {
    "terminal-portfolio.txt": [
      ...header("Terminal Portfolio"),
      "",
      "Este portfólio interativo",
      sep(30),
      ...para(
        "Portfólio em formato de terminal, navegável por comandos",
        "como ls, cd e cat."
      ),
      "",
      "Stack",
      "  JavaScript (vanilla) | HTML | CSS",
      "  jQuery Terminal",
      "",
      "Funcionalidades",
      "  • Sistema de arquivos navegável em memória",
      "  • Bilíngue (PT/EN) com troca em tempo real",
      "  • Temas claro e escuro (paleta Catppuccin)",
      "  • Layout adaptativo com atalhos de comando no mobile",
      "  • Autocomplete com Tab",
      "",
      "Infraestrutura",
      "  • Hospedagem estática em S3 + CloudFront",
      "  • Deploy contínuo com GitHub Actions",
      "  • Invalidação automática de cache no CloudFront",
      "",
      ""
    ].join("\n")
  },

  "skills": {
    "cloud.txt": [
      ...header("Cloud & DevOps"),
      "",
      "AWS",
      ...para(
        "  S3 | CloudFront | EC2 | Lambda | API Gateway",
        "  Route 53 | ACM | IAM | DynamoDB | RDS | SQS"
      ),
      "",
      "",
      "Containers & CI/CD",
      "  Docker | GitHub Actions | Linux",
      "",
      "Monitoramento",
      "  CloudWatch | X-Ray"
    ].join("\n"),

    "data.txt": [
      ...header("Análise de Dados"),
      "",
      "Visualização & BI",
      "  Power BI | DAX | Dashboards interativos",
      "",
      "ETL & Transformação",
      "  Power Query (M) | Python (Pandas, NumPy)",
      "",
      "Linguagens & Estatística",
      "  Python",
      "  R (ggplot2, dplyr, tidyr)",
      "",
      "Banco de Dados",
      "  SQL | Oracle | PostgreSQL",
      ""
    ].join("\n"),

    "dev.txt": [
      ...header("Desenvolvimento"),
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
      ...header("Contato"),
      "",
      ...contact("GitHub", "https://github.com/Coelho013", 10),
      ...contact("LinkedIn", "https://linkedin.com/in/gabriel-coelho-ramos", 10),
      ...contact("Email", "coelhoramos.gabriel@gmail.com", 10),
      "",
      sep(49),
      "Aberto a oportunidades e projetos interessantes.",
      "Fique à vontade para entrar em contato!"
    ].join("\n")
  }
};

const FILESYSTEM_EN = {
  "about": {
    "me.txt": [
      ...header("Gabriel Coelho Ramos", "Software Engineer"),
      "",
      `Born in Campo Grande, MS, Brazil, ${age} years old.`,
      "",
      ...para(
        "Software Engineer focused on backend development, cloud computing",
        "and highly available solutions on AWS."
      ),
      "",
      "Currently working on a credit and risk analysis solution.",
      "",
      ...para(
        "Passionate about building high-performance and scalable solutions.",
        "Following best practices in design and architecture."
      ),
      "",
      "Location: Joinville, SC, Brazil"
    ].join("\n"),

    "education.txt": [
      ...header("Education"),
      "",
      "Degree",
      "  Pursuing Data Science at Federal University of Campo Grande, MS",
      "",
      "Certifications",
      ...link("AWS Cloud Practitioner", CREDLY_URL),
      ...link("AWS Solutions Architect Associate", "{{loading}}"),
      "",
      "Languages",
      "  - Portuguese (native)",
      "  - English (professional)"
    ].join("\n"),

    "experience.txt": [
      ...header("Professional Experience"),
      "",
      "Software Engineer @ Ibratan (06/2026 - Now)",
      sep(39),
      "Credit, risk and fraud analysis solution",
      "",
      "  • Development and maintenance of custom credit policies",
      "  • Pipeline automation and version control with Git/GitHub",
      "",
      "",
      "Software Engineer @ Hopen Data (02/2026 - 06/2026)",
      sep(53),
      "Platform for data-driven political decision-making using public data",
      "",
      "  • Feature development and improvements with Django/Python",
      "  • RESTful API design with Redis caching layer",
      "  • AWS services integration using SDK (S3, SQS, Lambda)",
      "",
      "",
      "Software Engineer @ Logtrac Consultores Associados (02/2024 - 02/2026)",
      sep(74),
      "Logistics platform for the agribusiness sector",
      "",
      "  • Solution development with Node.js, PL/SQL and Oracle APEX",
      "  • Dashboard and KPI creation for route and cost optimization",
      "  • Maintenance and evolution of legacy systems",
      "",
      "",
      "Data Analyst @ Soldamaq Comércio de Ferramentas (10/2022 - 02/2024)",
      sep(70),
      "Data analysis in the retail commerce sector",
      "",
      "  • KPI development for cost control and sales performance",
      "  • Report and dashboard creation with Power BI",
      "  • Data extraction and transformation using Power Query and Oracle Database",
      ""
    ].join("\n")
  },

  "projects": {
    "terminal-portfolio.txt": [
      ...header("Terminal Portfolio"),
      "",
      "This interactive portfolio",
      sep(30),
      ...para(
        "A portfolio built as a terminal, navigable through commands",
        "like ls, cd and cat."
      ),
      "",
      "Stack",
      "  JavaScript (vanilla) | HTML | CSS",
      "  jQuery Terminal",
      "",
      "Features",
      "  • In-memory navigable file system",
      "  • Bilingual (PT/EN) with runtime switching",
      "  • Light and dark themes (Catppuccin palette)",
      "  • Adaptive layout with command shortcuts on mobile",
      "  • Tab autocompletion",
      "",
      "Infrastructure",
      "  • Static hosting on S3 + CloudFront",
      "  • Continuous deployment with GitHub Actions",
      "  • Automatic CloudFront cache invalidation",
      "",
      ""
    ].join("\n")
  },

  "skills": {
    "cloud.txt": [
      ...header("Cloud"),
      "",
      "AWS",
      ...para(
        "  S3 | CloudFront | EC2 | Lambda | API Gateway",
        "  Route 53 | ACM | IAM | DynamoDB | RDS | SQS"
      ),
      "",
      "",
      "Containers & CI/CD",
      "  Docker | GitHub Actions | Linux",
      "",
      "Monitoring",
      "  CloudWatch | X-Ray"
    ].join("\n"),

    "data.txt": [
      ...header("Data Analysis"),
      "",
      "Visualization & BI",
      "  Power BI | DAX | Interactive Dashboards",
      "",
      "ETL & Transformation",
      "  Power Query (M) | Python (Pandas, NumPy)",
      "",
      "Languages & Statistics",
      "  Python",
      "  R (ggplot2, dplyr, tidyr)",
      "",
      "Databases",
      "  SQL | Oracle | PostgreSQL",
      ""
    ].join("\n"),

    "dev.txt": [
      ...header("Development"),
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
      ...header("Contact"),
      "",
      ...contact("GitHub", "https://github.com/Coelho013", 10),
      ...contact("LinkedIn", "https://linkedin.com/in/gabriel-coelho-ramos", 10),
      ...contact("Email", "coelhoramos.gabriel@gmail.com", 10),
      "",
      sep(49),
      "Open to opportunities and interesting projects.",
      "Feel free to reach out!"
    ].join("\n")
  }
};

function getFilesystem() {
  return currentLang === "en" ? FILESYSTEM_EN : FILESYSTEM_PT;
}
