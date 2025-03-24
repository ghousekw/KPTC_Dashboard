# KPTC Dashboard

A modern and responsive dashboard for KPTC (Kuwait Public Transportation Company) to monitor and manage transportation operations.

## Features

- **Real-time Statistics**: Monitor key performance indicators like on-time performance, maintenance alerts, and job orders
- **Interactive Charts**: Visualize data trends with responsive Chart.js integration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern interface with intuitive navigation

## Technology Stack

- HTML5/CSS3 for structure and styling
- JavaScript for interactivity
- Chart.js for data visualization
- Font Awesome for icons

## Project Structure

```
dashboard/
├── assets/
│   ├── images/
│   │   ├── kptc-logo.png       # Company logo
│   │   ├── kptc-logo-new.png   # Updated company logo
│   │   ├── backup/             # Backup images
│   │   └── placeholder/        # SVG placeholders for content
│   │       ├── chart-500x300.svg
│   │       ├── logo-placeholder.svg
│   │       └── profile-40x40.svg
│   └── js/
│       └── charts.js          # Chart rendering logic
└── index.html                 # Main dashboard page with embedded CSS and UI logic
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser or serve with a local server

```bash
# Example using Python's built-in HTTP server
python -m http.server 8000
```

3. Access the dashboard at `http://localhost:8000`

## Development

- **CSS**: Currently embedded in `index.html`
- **JavaScript**: Chart logic in `assets/js/charts.js`, UI logic embedded in `index.html`
- **Charts**: Using Chart.js library with SVG fallback placeholders

## Maintenance

- Keep dashboard statistics updated with real data sources
- Ensure placeholder SVG images work correctly when APIs are unavailable
- Monitor for 404 errors and fix any missing resources by using local placeholder SVGs
- Update mobile menu and sidebar overlay for proper responsive behavior 