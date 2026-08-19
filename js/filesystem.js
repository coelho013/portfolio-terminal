let currentLang = "en";

const currentYear = new Date().getFullYear();
const bornYear = 2003
let age = currentYear - bornYear;

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
      "  - AWS Cloud Practitioner → https://www.credly.com/badges/19b67c5d-83c9-4be4-9f59-656daa57122e/public_url",
      "  - AWS Solutions Architect Associate → {{loading}}",
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
      "Software Engineer @ Ibratan (06/2026 - Atual)",
      "─────────────────────────────────────",
      "Solução de análise de crédito, risco e fraude",
      "",
      "  • Desenvolvimento e manutenção de políticas de crédito personalizadas",
      "  • Automação de pipelines e versionamento com Git/GitHub",
      "",
      "",
      "Software Engineer @ Hopen Data (02/2026 - 06/2026)",
      "─────────────────────────────────────────────────────",
      "Plataforma de decisões políticas baseadas em dados públicos",
      "",
      "  • Desenvolvimento de funcionalidades e melhorias com Django/Python",
      "  • Construção de RESTful APIs com cache via Redis",
      "  • Integração com serviços AWS utilizando SDK (S3, SQS, Lambda)",
      "",
      "",
      "Software Engineer @ Logtrac Consultores Associados (02/2024 - 02/2026)",
      "──────────────────────────────────────────────────────────────────────────",
      "Plataforma de logística para o setor do agronegócio",
      "",
      "  • Desenvolvimento de soluções em Node.js, PL/SQL e Oracle APEX",
      "  • Criação de dashboards e indicadores para otimização de rotas e custos",
      "  • Manutenção e evolução de sistemas legados",
      "",
      "",
      "Data Analyst @ Soldamaq Comércio de Ferramentas (10/2022 - 02/2024)",
      "──────────────────────────────────────────────────────────────────────",
      "Análise de dados no setor de comércio varejista",
      "",
      "  • Criação de indicadores de desempenho (KPIs) para controle de custos e vendas",
      "  • Desenvolvimento de relatórios e painéis em Power BI",
      "  • Extração e transformação de dados com Power Query e Oracle Database",
      ""
    ].join("\n")
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

    "data.txt": [
      "╔══════════════════════════════════════════════════╗",
      "║          Análise de Dados                        ║",
      "╚══════════════════════════════════════════════════╝",
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
      "GitHub    → https://github.com/Coelho013",
      "LinkedIn  → https://linkedin.com/in/gabriel-coelho-ramos",
      "Email     → coelhoramos.gabriel@gmail.com",
      "",
      "─────────────────────────────────────────────────",
      "Aberto a oportunidades e projetos interessantes.",
      "Fique à vontade para entrar em contato!"
    ].join("\n")
  }
};

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
      "  - AWS Cloud Practitioner → https://www.credly.com/badges/19b67c5d-83c9-4be4-9f59-656daa57122e/public_url",
      "  - AWS Solutions Architect Associate → {{loading}}",
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
      "Software Engineer @ Ibratan (06/2026 - Now)",
      "───────────────────────────────────────",
      "Credit, risk and fraud analysis solution",
      "",
      "  • Development and maintenance of custom credit policies",
      "  • Pipeline automation and version control with Git/GitHub",
      "",
      "",
      "Software Engineer @ Hopen Data (02/2026 - 06/2026)",
      "─────────────────────────────────────────────────────",
      "Platform for data-driven political decision-making using public data",
      "",
      "  • Feature development and improvements with Django/Python",
      "  • RESTful API design with Redis caching layer",
      "  • AWS services integration using SDK (S3, SQS, Lambda)",
      "",
      "",
      "Software Engineer @ Logtrac Consultores Associados (02/2024 - 02/2026)",
      "──────────────────────────────────────────────────────────────────────────",
      "Logistics platform for the agribusiness sector",
      "",
      "  • Solution development with Node.js, PL/SQL and Oracle APEX",
      "  • Dashboard and KPI creation for route and cost optimization",
      "  • Maintenance and evolution of legacy systems",
      "",
      "",
      "Data Analyst @ Soldamaq Comércio de Ferramentas (10/2022 - 02/2024)",
      "──────────────────────────────────────────────────────────────────────",
      "Data analysis in the retail commerce sector",
      "",
      "  • KPI development for cost control and sales performance",
      "  • Report and dashboard creation with Power BI",
      "  • Data extraction and transformation using Power Query and Oracle Database",
      ""
    ].join("\n")
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

    "data.txt": [
      "╔══════════════════════════════════════════════════╗",
      "║          Data Analysis                           ║",
      "╚══════════════════════════════════════════════════╝",
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
      "GitHub    → https://github.com/Coelho013",
      "LinkedIn  → https://linkedin.com/in/gabriel-coelho-ramos",
      "Email     → coelhoramos.gabriel@gmail.com",
      "",
      "─────────────────────────────────────────────────",
      "Open to opportunities and interesting projects.",
      "Feel free to reach out!"
    ].join("\n")
  }
};

function getFilesystem() {
  return currentLang === "en" ? FILESYSTEM_EN : FILESYSTEM_PT;
}
