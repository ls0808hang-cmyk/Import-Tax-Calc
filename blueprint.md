# Project Blueprint: 해외직구 관부가세 계산기 (Import Tax Calculator)

## Overview
A web-based calculator designed to help users estimate import taxes (Duty and VAT) when purchasing goods from overseas (e.g., USA, Europe, Japan, China). The application focuses on providing a simple, fast, and mobile-responsive user experience with clean aesthetics.

## Project Documentation

### Style & Design
- **Modern & Clean UI:** Uses a refined, card-based layout with box-shadows and subtle borders for a clean, modern look.
- **Typography:** Uses 'Pretendard' for a premium Korean web experience.
- **Color Palette:**
  - Primary: `#2563eb` (Blue)
  - Primary Hover: `#1d4ed8`
  - Background: `#f8fafc` (Light grey-blue)
  - Text: `#334155` (Slate)
  - Highlight: `#e11d48` (Rose red)
- **Responsive Design:** Mobile-first approach using media queries for vertical stacking on small screens.

### Features
- **Country Selection:** Different exemption limits for USA ($200) vs. other countries ($150).
- **Category Selection:** Pre-defined duty rates for common items (Clothing, Electronics, Cosmetics, Books, etc.).
- **Real-time Input:** Fields for USD price and current exchange rate.
- **Tax Calculation:** 
  - Automatically determines exemption status.
  - Calculates Duty (관세) and VAT (부가세) based on the entire amount if the limit is exceeded.
  - Provides a total estimated payment in KRW.
- **About Page:** Provides service information, expertise, and contact details.
- **Privacy Policy Page:** Details data collection practices, AdSense usage, and privacy guidelines.
- **SEO Optimized Content:** Includes a detailed guide on import tax rules (List clearance vs. General clearance, 합산과세, etc.).

## Current Plan: Initial Implementation
1.  **HTML Structure:** Define the input form, result area, and SEO content sections.
2.  **CSS Styling:** Implement a responsive and polished visual design.
3.  **JavaScript Logic:** 
    - Handle input events.
    - Implement tax calculation logic based on Korean customs regulations.
    - Update the DOM with calculated results.
4.  **Verification:** Ensure the calculator works correctly for various scenarios (Exempt vs. Taxable).

### Steps
- [x] Setup `index.html` with the provided structure.
- [x] Create `style.css` with modern design principles.
- [x] Implement `main.js` with tax calculation logic.
- [x] Create `blueprint.md` for project tracking.
