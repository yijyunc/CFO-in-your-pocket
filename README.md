# Runway Karma

> Credit Karma × Pigment for startups - helping founders track cash, model scenarios, and stay alive in seconds, not spreadsheets.

![Runway Karma Dashboard](https://img.shields.io/badge/MVP-Ready-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.1.6-38B2AC)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

## 📖 Demo Walkthrough

### 1. Dashboard View
- **Cash on Hand**: $480,000 (seed funding)
- **Monthly Burn**: $65,000 (operational costs)
- **Runway**: 7.4 months (auto-calculated)
- **Health Score**: Visual gauge with color-coded status
  - 🔴 0-39: Danger
  - 🟡 40-69: Warning  
  - 🟢 70-100: Safe

### 2. Scenario Simulator
- **Burn Rate Slider**: Adjust spending -30% to +30%
- **MRR Growth**: Model 0-10% monthly recurring revenue growth
- **Hire Toggle**: Add engineer (+$10k monthly burn)
- **Live Updates**: See real-time impact on runway and health score
- **Apply Changes**: Update dashboard with simulation results

### 3. Business Plan
- Problem, solution, market analysis
- Competitive landscape
- Revenue model and roadmap
- Perfect for pitch presentations

### 4. About Page
- Company mission and story
- Team information
- Contact details

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Component framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Key Components
```
src/
├── components/
│   ├── MetricCard.jsx     # Financial metric display
│   ├── Gauge.jsx          # Circular health score gauge
│   ├── InsightText.jsx    # Smart runway insights
│   ├── Sidebar.jsx        # Navigation sidebar
│   ├── Header.jsx         # Top header with company selector
│   └── Toast.jsx          # Notification system
├── pages/
│   ├── Dashboard.jsx      # Main financial dashboard
│   ├── Simulate.jsx       # Scenario modeling tool
│   ├── BizPlan.jsx        # Business plan presentation
│   └── About.jsx          # Company information
└── App.jsx                # Main application container
```

## 🎯 Features

### ✅ MVP Features (Current)
- [x] **Runway Health Score** - Instant financial health assessment
- [x] **3 Key Metrics** - Cash, burn, runway months
- [x] **Scenario Simulator** - Model burn changes and hiring decisions
- [x] **MRR Growth Impact** - See how revenue growth affects runway
- [x] **Live Updates** - Real-time calculation updates
- [x] **Multi-Company Demo** - Switch between Acme SaaS, BetaTech, Gamma Fintech
- [x] **Toast Notifications** - User feedback for actions
- [x] **Responsive Design** - Works on desktop and mobile
- [x] **Business Plan Page** - Pitch-ready content

### 🚧 Planned Features (Post-MVP)
- [ ] **Bank Integration** - Connect Plaid/Yodlee for live data
- [ ] **Stripe/Revenue Integration** - Automatic MRR tracking  
- [ ] **Peer Benchmarking** - Compare against similar startups
- [ ] **Advanced Scenarios** - Multi-variable modeling
- [ ] **Export Reports** - PDF/Excel runway reports
- [ ] **Team Collaboration** - Multi-user access
- [ ] **API Integration** - QuickBooks, Xero connectivity

## 🎨 Design System

### Color Palette
- **Primary**: Blue (`#3b82f6`) - Trust, stability
- **Secondary**: Indigo (`#6366f1`) - Innovation  
- **Danger**: Red (`#ef4444`) - Critical alerts
- **Warning**: Amber (`#f59e0b`) - Caution
- **Safe**: Green (`#10b981`) - Healthy status

### Typography
- **Font**: Inter (clean, modern, readable)
- **Scale**: Tailwind's default type scale
- **Weight**: 300-700 range for hierarchy

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Consistent sizing, hover states
- **Gauge**: Custom SVG with smooth animations
- **Sliders**: Custom styling for better UX

## 📊 Business Model

### Problem
- **42% of startups fail** from running out of cash
- Founders lack real-time runway visibility
- Enterprise tools too complex for early stage
- Spreadsheets become unwieldy and error-prone

### Solution
- **Instant Health Score** - Know your runway status in seconds
- **Scenario Modeling** - Plan for different growth/burn scenarios
- **Founder-First Design** - Simple, actionable insights

### Market
- **5M+ global startups** need financial planning
- **$11B FP&A SaaS market** growing 15% annually
- Underserved early-stage segment

### Revenue Model
- **Freemium**: Basic health score and simulator
- **Pro ($29/mo)**: Advanced scenarios, integrations
- **Team ($99/mo)**: Multi-user, benchmarking, API access

## 🚀 Deployment

### Development
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run test suite
```

### Production
```bash
npm run build      # Create optimized build
# Deploy /build folder to your hosting platform
```

### Hosting Options
- **Vercel** - Zero-config React deployment
- **Netlify** - Git-based deployment
- **AWS S3** - Static site hosting
- **GitHub Pages** - Free hosting for demos

## 🤝 Contributing

This is an MVP demo, but we welcome feedback and contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🙋‍♂️ Questions?

- **Email**: hello@runwaykarma.com
- **Twitter**: @runwaykarma
- **GitHub Issues**: For bugs and feature requests

---

**Built with ❤️ for the startup community**

*"Stay alive, not spreadsheets"*
