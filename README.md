# CloudLens

A premium, enterprise-grade full-stack dashboard designed to analyze and visualize cloud infrastructure spending across AWS and GCP. This application transforms raw billing data into actionable insights with a high-performance UI.

# 🚀 Features

# 1. Professional Dashboar
  Multi-Cloud Overview: Unified view of AWS and GCP spending.
  Smart KPI Cards:Instant visibility into Total Spend, Provider breakdown, and Top Spending Teams.
  
Interactive Visualizations:
  Trend Analysis: Line chart showing daily spending trajectory.
  Cost Distribution: Bar/Donut charts for top services and teams.

# 2. Advanced Data Grid
 Enterprise Table: Sortable columns, hover effects, and clean typography.
 Transaction Details: Click any row to open a detailed modal view with resource IDs and metadata.
 Compact Mode: Toggle between "Comfortable" and "Compact" density for data-heavy analysis.

# 3. Powerful Filtering & Exports
 Dynamic Filters: Filter by Cloud Provider, Team, Environment, and Time Range (Last 30 days, 6 months, etc.).
 Smart Date Logic: Automatically detects the data range (handling future data sets like 2025) to show relevant periods.
 CSV Export: One-click export of currently filtered data for external reporting.

# 4. Modern UI/UX
 Dark & Light Themes: Fully responsive theme toggling with persistent user preference.
 Glassmorphism: Premium aesthetic with backdrop blurs and subtle gradients.
 Responsive Sidebar: Collapsible navigation structure.


# 🛠 Tech Stack

# Frontend (Client)
* Framework: React 18 (Vite)
* Styling: Tailwind CSS (v3), CLSX, Tailwind-Merge
* Animations: Framer Motion
* Charts: Recharts
* Icons: Lucide React
* Utilities: Date-fns

# Backend (Server)
* Runtime: Node.js
* Framework: Express.js
* Data Processing: CSV-Parser
* Architecture: REST API


# 📦 Installation & Setup

# Prerequisites
* Node.js (v16+) installed.
* The `aws_line_items_12mo.csv` and `gcp_billing_12mo.csv` files placed inside the `server/` directory.

# 1. Start the Backend API

The backend reads the CSV files and serves normalized JSON data.

cmd :

cd server
npm install
node index.js


# 2. Start the Frontend Application

cd client
npm install
npm run dev


# Screenshots

# Dashboard Overview
![Dashboard UI](https://github.com/Janu1410/cloud-spend-viewer/blob/deaee0f30d35478f735cf89f6f3d2761b257673b/Dashboard.png)

# Chart
![Chart UI](https://github.com/Janu1410/cloud-spend-viewer/blob/cb3fe80d82e3f70b10d94533b124a7fde72cfb42/chart.png)

# Data
![Data UI](https://github.com/Janu1410/cloud-spend-viewer/blob/5cd3082b89ed396d5a6d0fce57dd3a6422d6af44/data.png)

# Detailed Reports
![Reports UI](https://github.com/Janu1410/cloud-spend-viewer/blob/677628d1ef3477b34c930eeb1fd8ee77759189f0/Reports.png)


# Setting
![Setting UI](assets/Setting.png)
