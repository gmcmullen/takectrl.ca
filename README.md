# CTRL - Canadian Tech Rights Lab

A retro BBS-style website for the Canadian Tech Rights Lab, built with Jekyll and featuring ASCII art headers, keyboard navigation, and a Netlify CMS backend.

## Features

- **Retro BBS Aesthetic**: Classic terminal-style interface with ASCII art headers
- **Keyboard Navigation**: Full keyboard support for navigation (1-9 keys, H for help, etc.)
- **Dynamic ASCII Headers**: Randomly rotating ASCII art headers on each page load
- **Dark/Light Mode**: Toggle between dark and light themes
- **Netlify CMS**: Content management system for easy updates
- **Responsive Design**: Works on desktop and mobile devices
- **Jekyll-based**: Static site generation with GitHub Pages support

## Keyboard Shortcuts

- **1-9**: Navigate to numbered menu items
- **H**: Show help dialog
- **Q**: Quit (with confirmation)
- **M**: Return to main menu
- **P**: Go to previous page
- **L**: Toggle light/dark mode
- **R**: Randomize ASCII header

## Project Structure

```
takectrl.ca/
├── _layouts/          # Jekyll layout templates
├── _posts/           # Blog posts
├── _projects/        # Project pages
├── pages/            # Static pages (terms, privacy, etc.)
├── admin/            # Netlify CMS configuration
├── fonts/            # IBM Plex Mono font files
├── icons/            # BeOS-style icons
├── styles.css        # Main stylesheet
├── _config.yml       # Jekyll configuration
└── README.md         # This file
```

## Setup

### Prerequisites

- Ruby (for Jekyll)
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/gmcmullen/takectrl.ca.git
   cd takectrl.ca
   ```

2. Install Jekyll:
   ```bash
   gem install jekyll bundler
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Visit `http://localhost:4000` in your browser

### Netlify CMS

The site uses Netlify CMS for content management. Access the admin panel at `/admin` to:
- Create and edit blog posts
- Manage project pages
- Update static pages
- Edit the home page

## Customization

### ASCII Headers

ASCII art headers are defined in `_layouts/default.html` and rotate randomly. To add new headers:
1. Add new ASCII art in the `#ascii-headers` div
2. Include a comment with the font name
3. Ensure proper formatting and spacing

### Styling

The site uses CSS custom properties for theming. Key variables:
- `--bbs-pink`: Primary pink color (#ff69b4)
- `--bbs-bg`: Background color
- `--bbs-text`: Text color
- `--bbs-dim`: Dimmed text color

### Content

- **Blog Posts**: Add markdown files to `_posts/` with YAML front matter
- **Projects**: Add markdown files to `_projects/` 
- **Pages**: Add markdown files to `pages/`

## Deployment

The site is configured for GitHub Pages deployment. Simply push to the main branch to deploy.

## License

Copyright 2025 Canadian Tech Rights Lab

## Contact

For questions or contributions, contact: info [at] takectrl.ca