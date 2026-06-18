# 🎭 Le Phosphore — Performance Venue

Showcase website for a fictional Belle Époque-inspired performance venue, with a dynamic show schedule loaded from a JSON file.

---

## ✨ Features

- Curtain opening animation on page load
- Show schedule dynamically loaded from `spectacles.json`
- Individual show detail page with available seats progress bar
- Fully responsive design (mobile / desktop)
- HTTPS redirect via `.htaccess`
- Header and footer loaded dynamically via jQuery

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| SCSS | Styles (compiled to CSS) |
| JavaScript (ES Modules) | Dynamic logic |
| jQuery | Partial component loading |
| JSON | Show data source |
| Apache / .htaccess | HTTPS redirect |

---

## 📁 Project Structure

```
/
├── index.html
├── spectacles.json          # Show data
├── .htaccess                # HTTPS redirect
├── assets/
│   ├── css/
│   │   └── style.min.css    # CSS compiled from SCSS
│   ├── js/
│   │   ├── main.js
│   │   └── detail-program.js
│   ├── img/                 # Images & icons
│   └── pages/
│       ├── header.html      # Shared header
│       ├── footer.html      # Shared footer
│       └── carousel.html    # Homepage carousel
```

---

## 🚀 Running Locally

This is a static site. Simply serve it with a local server:

```bash
# With VS Code
# → Install the "Live Server" extension and click "Go Live"

# With Node.js
npx serve .

# With Python
python -m http.server 8000
```

> ⚠️ Do not open `index.html` directly in the browser (double-click): `fetch()` calls to `spectacles.json` will fail due to CORS restrictions.

---

## 📦 `spectacles.json` Format

```json
[
  {
    "spectacles": [
      {
        "id": 1,
        "titre": "Show name",
        "type": "Theatre",
        "artiste": "Artist name",
        "date": "2025-03-15",
        "horaire": "20h30",
        "duree": "1h45",
        "prix": 25,
        "description": "Show description...",
        "image": "/assets/img/spectacle.webp",
        "places_total": 200,
        "places_vendues": 180
      }
    ]
  }
]
```

---

## 🎨 Color Palette

| Name | Value |
|---|---|
| Burgundy | `#6b1d3a` |
| Gold | `#d4a843` |
| Dark background | `#2a2d34` |
| Cream | `#f5f0e8` |

---

## 📄 License

credit: Nelly Fabre - web developper
