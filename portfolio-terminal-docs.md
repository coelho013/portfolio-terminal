# Portfolio Terminal - Documentacao do Projeto

## Visao Geral

Portfolio pessoal com interface de terminal Linux, onde o visitante navega por diretorios e arquivos usando comandos como `ls`, `cd`, `cat` para descobrir informacoes sobre voce.

---

## Stack Tecnologica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | HTML5 + CSS3 + JavaScript | Base do site estatico |
| Terminal | jQuery Terminal (jquery.terminal) | Biblioteca madura com filesystem virtual, autocompletion, historico |
| Estilo | CSS customizado (tema terminal) | Fundo preto, fonte monospace, cores verdes |
| Build/Bundle | Nenhum (vanilla) ou Vite (opcional) | Simplicidade para site estatico |
| Versionamento | Git + GitHub | Controle de versao e trigger de deploy |

### Dependencias principais

```html
<!-- jQuery (dependencia do jquery.terminal) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>

<!-- jQuery Terminal -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery.terminal@2.x/css/jquery.terminal.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal@2.x/js/jquery.terminal.min.js"></script>
```

### Estrutura de arquivos do projeto

```
portfolio-terminal/
├── index.html              # Pagina principal com terminal
├── css/
│   └── style.css           # Estilos customizados do terminal
├── js/
│   ├── filesystem.js       # Definicao das pastas e arquivos virtuais
│   ├── commands.js         # Logica dos comandos (ls, cd, cat, help)
│   └── main.js             # Inicializacao do terminal
├── assets/
│   └── favicon.ico
├── .github/
│   └── workflows/
│       └── deploy.yml      # Pipeline de deploy
└── README.md
```

---

## Arquitetura Cloud (AWS)

```
                    ┌─────────────────────────────────────────────┐
                    │              INTERNET                        │
                    └──────────────────┬──────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────────┐
                    │          Route 53 (DNS)                      │
                    │   seudominio.com → CloudFront Distribution   │
                    │   Hosted Zone: $0.50/mes                     │
                    └──────────────────┬──────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────────┐
                    │        CloudFront (CDN)                      │
                    │   - Certificado SSL via ACM (gratuito)       │
                    │   - Cache em edge locations globais          │
                    │   - Origin Access Control (OAC)              │
                    │   - Redirect HTTP → HTTPS                    │
                    │   Custo: ~$0 para trafego baixo              │
                    └──────────────────┬──────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────────┐
                    │        S3 Bucket (privado)                   │
                    │   - Armazena HTML/CSS/JS/assets              │
                    │   - Block Public Access ATIVADO              │
                    │   - Acesso apenas via CloudFront (OAC)       │
                    │   Custo: ~$0.01/mes                          │
                    └─────────────────────────────────────────────┘
```

### Servicos AWS utilizados

| Servico | Funcao | Custo |
|---------|--------|-------|
| **S3** | Armazenamento dos arquivos estaticos | ~$0.023/GB/mes (poucos centavos) |
| **CloudFront** | CDN global + HTTPS + cache | 1TB gratis/mes (free tier permanente) |
| **ACM** | Certificado SSL/TLS | Gratuito |
| **Route 53** | DNS gerenciado | $0.50/hosted zone + $0.40/milhao de queries |

**Custo mensal estimado total: ~$1 a $2/mes** (dominio pago anualmente a parte)

### Configuracao passo a passo

#### 1. S3 Bucket

- Nome: `seudominio.com` (ou qualquer nome unico)
- Regiao: `us-east-1` (recomendado para integracao com CloudFront)
- Block Public Access: **Habilitado** (tudo bloqueado)
- Versionamento: Opcional (util para rollback)

#### 2. CloudFront Distribution

- Origin: Seu bucket S3
- Origin Access Control (OAC): Criar novo OAC e associar ao bucket
- Viewer Protocol Policy: **Redirect HTTP to HTTPS**
- Default Root Object: `index.html`
- Custom Error Pages: 403/404 → `/index.html` (SPA behavior)
- Alternate Domain Name (CNAME): `seudominio.com`, `www.seudominio.com`
- SSL Certificate: Selecionar o certificado do ACM

#### 3. ACM (Certificate Manager)

- **IMPORTANTE**: Criar na regiao `us-east-1` (obrigatorio para CloudFront)
- Request public certificate
- Domain: `seudominio.com` e `*.seudominio.com`
- Validacao: DNS (Route 53 facilita criando o registro automaticamente)

#### 4. Route 53

- Criar Hosted Zone: `seudominio.com`
- Registros:
  - `A` (Alias) → CloudFront Distribution
  - `AAAA` (Alias) → CloudFront Distribution (IPv6)
  - `CNAME` www → CloudFront Distribution (ou redirect)

#### 5. Bucket Policy (gerada automaticamente pelo OAC)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::SEU-BUCKET/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::SEU-ACCOUNT-ID:distribution/SEU-DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

---

## GitHub Actions - Pipeline de Deploy

### Pre-requisitos

1. Criar um IAM User ou IAM Role para deploy com permissoes:
   - `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` no bucket
   - `cloudfront:CreateInvalidation` na distribution
2. Adicionar como GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION` (us-east-1)
   - `S3_BUCKET` (nome do bucket)
   - `CLOUDFRONT_DISTRIBUTION_ID`

### Workflow: `.github/workflows/deploy.yml`

```yaml
name: Deploy Portfolio to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # 1. Checkout do codigo
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Configurar credenciais AWS
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      # 3. Sync dos arquivos para o S3
      - name: Sync files to S3
        run: |
          aws s3 sync . s3://${{ secrets.S3_BUCKET }} \
            --delete \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "README.md"

      # 4. Invalidar cache do CloudFront
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

### Como funciona o fluxo

```
[git push main] → [GitHub Actions trigger]
       │
       ▼
[Checkout codigo] → [Configura AWS CLI] → [S3 Sync] → [Invalida Cache CloudFront]
       │                                                          │
       ▼                                                          ▼
[Arquivos atualizados no S3]              [CloudFront busca versao nova do S3]
                                                          │
                                                          ▼
                                          [Usuarios veem a versao atualizada]
```

### IAM Policy minima para o deploy user

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::SEU-BUCKET",
        "arn:aws:s3:::SEU-BUCKET/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::SEU-ACCOUNT-ID:distribution/SEU-DISTRIBUTION-ID"
    }
  ]
}
```

---

## Registro de Dominio - Opcoes

| Registrar | Preco .com/ano | Observacao |
|-----------|---------------|------------|
| Route 53 | ~$13 | Integrado com AWS, DNS automatico |
| Namecheap | ~$9-11 | Popular, barato, transferir NS para Route 53 |
| Cloudflare Registrar | ~$10 | Preco de custo, DNS gratis se usar Cloudflare |
| GoDaddy | ~$12-20 | Evitar, precos sobem na renovacao |

**Dica**: Se usar Route 53 como registrar, o hosted zone e criado automaticamente. Se comprar fora, precisa apontar os nameservers do registrar para os NS do Route 53.

---

## Proximos Passos

1. [x] Registrar dominio
2. [x] Criar repositorio no GitHub
3. [x] Montar estrutura basica do projeto (index.html + jQuery Terminal)
4. [x] Definir filesystem virtual (pastas e conteudo)
5. [x] Implementar comandos (ls, cd, cat, help, clear)
6. [x] Configurar bucket S3 + CloudFront + ACM + Route 53
7. [x] Configurar GitHub Secrets
8. [x] Criar workflow do GitHub Actions
9. [x] Primeiro deploy e validar HTTPS + dominio customizado
10. [x] Iterar no conteudo e visual

---

## Referencias

- [jQuery Terminal - Documentacao](https://terminal.jcubic.pl/)
- [jQuery Terminal - GitHub](https://github.com/jcubic/jquery.terminal)
- [FreeCodeCamp - Terminal Portfolio Tutorial](https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website)
- [AWS - Static Website with CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html)
- [GitHub Actions - AWS Credentials](https://github.com/aws-actions/configure-aws-credentials)
