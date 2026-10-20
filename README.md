# Portfolio Terminal

Personal portfolio of **Gabriel Coelho Ramos**, Software Engineer focused on backend development and AWS cloud.
You explore it like a Linux terminal, using commands such as `ls`, `cd` and `cat`. If you'd rather not use a terminal, you can switch to a visual landing page.

## Features

- **Interactive terminal** built with [jQuery Terminal](https://terminal.jcubic.pl/), with an in-memory file system you can browse
- **Visual version for recruiters**: type `gui` (or `web` / `recruiter`), or click the `>_ gui` button, to open a minimal landing page with terminal-style animations
- **Bilingual** (English / Portuguese), switched at runtime with `lang en` / `lang pt`
- **Light and dark themes** based on the Catppuccin palette (`theme dark` / `theme light`)
- **Language and theme are shared** between the terminal and the landing page (stored in `localStorage`)
- **Mobile friendly**: an adaptive layout with a command shortcut toolbar
- **Tab autocompletion** and command history
- Respects `prefers-reduced-motion`

## Commands

| Command              | Description                     |
|----------------------|---------------------------------|
| `help`               | List available commands         |
| `ls`                 | List files and folders          |
| `cd <folder>`        | Enter a folder (`cd ..` goes back) |
| `cat <file>`         | Display a file                  |
| `pwd`                | Print the current directory     |
| `whoami`             | Who am I?                       |
| `clear`              | Clear the screen                |
| `lang <pt\|en>`      | Change language                 |
| `theme <dark\|light>`| Change theme                    |
| `gui`                | Open the visual landing page    |

## Project structure

```
portfolio-terminal/
├── index.html          # Terminal page
├── landing.html        # Visual landing page (opened by `gui`)
├── css/
│   ├── style.css       # Terminal styles
│   └── landing.css     # Landing page styles
├── js/
│   ├── layout.js       # Layout helpers and preferences (localStorage)
│   ├── filesystem.js   # Virtual file system content (PT/EN)
│   ├── commands.js     # Command implementations
│   ├── main.js         # Terminal bootstrap and mobile toolbar
│   └── landing.js      # Landing page animations, language and theme
├── assets/             # Favicon, Open Graph image and fonts
└── .github/workflows/
    └── deploy.yml      # Deploy to S3 + CloudFront
```

## Running locally

It is a static site with no build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

Every push to `main` triggers a GitHub Actions workflow that:

1. Syncs the files to a private **S3** bucket
2. Invalidates the **CloudFront** cache

The site is served over HTTPS through CloudFront (certificate from ACM, DNS on Route 53).
The workflow needs these repository secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID`.

## Tech stack

- HTML, CSS and vanilla JavaScript
- jQuery Terminal
- JetBrains Mono and Inter fonts
- AWS S3, CloudFront, ACM and Route 53
- GitHub Actions

## Contact

- GitHub: [Coelho013](https://github.com/Coelho013)
- LinkedIn: [gabriel-coelho-ramos](https://linkedin.com/in/gabriel-coelho-ramos)
- Email: coelhoramos.gabriel@gmail.com
