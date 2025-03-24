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
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── images/
│   │   ├── kptc-logo.png  # Company logo
│   │   └── placeholder/   # SVG placeholders for content
│   └── js/
│       ├── charts.js      # Chart rendering logic
│       └── main.js        # UI interaction logic
└── index.html             # Main dashboard page
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

- **CSS**: All styles are in `assets/css/styles.css`
- **JavaScript**: UI logic in `main.js`, chart logic in `charts.js`
- **Charts**: Using Chart.js library with fallback placeholders

## Maintenance

- Keep dashboard statistics updated with real data sources
- Ensure placeholder images work correctly
- Monitor for 404 errors and fix any missing resources 