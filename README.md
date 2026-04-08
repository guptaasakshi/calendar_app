# 🗓 Interactive Wall Calendar

A pixel-perfect wall calendar component built with **Next.js 14** + **Tailwind CSS**, visually matching the reference image:
- Spiral binding rings at top
- Full-width hero photo with diagonal blue cut + white triangle (exact reference design)
- Year/month text overlaid on blue shape
- **Left panel:** lined Notes section (per-month localStorage)
- **Right panel:** date grid with MON–SUN headers
- **Bottom bar:** selected range status + Clear button
- Floating on a grey background with generous space on all sides

## ✨ Features

- Date range selection with hover preview
- Visual states: start, end, in-range strip, today ring, weekend color
- Notes auto-saved per month (localStorage)
- Month navigation with flip animation
- Dark mode toggle
- Fully responsive (stacks on mobile)

## 🛠 Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- React Hooks (useState, useEffect, useCallback)
- localStorage for notes

## 🚀 Run Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 🌐 Deploy

```bash
npx vercel
```

## 📁 Structure

```
calendar-app/
├── app/
│   ├── page.jsx          ← entry point
│   ├── layout.jsx
│   └── globals.css       ← all custom styles (reference-matching design)
├── components/
│   ├── Calendar.jsx      ← main state + layout
│   ├── ImageSection.jsx  ← hero image with diagonal shapes
│   ├── Header.jsx        ← nav arrows + dark mode
│   ├── CalendarGrid.jsx  ← 7-col grid
│   ├── Day.jsx           ← single day cell
│   ├── Notes.jsx         ← lined notepad
│   └── RangeHighlight.jsx← bottom status bar
└── utils/
    └── dateUtils.js      ← all date logic
```