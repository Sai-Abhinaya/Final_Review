# 📚 Learning Progress Tracking Dashboard

A performance-optimized Single Page Application (SPA) built with React, Vite, React Router, and Recharts to track student learning progress across multiple modules and activities.

## 🎯 Project Overview

The Learning Progress Tracking Dashboard is a comprehensive frontend application that demonstrates modern React development practices with a focus on:

- **Component-based Architecture**: Reusable, well-organized components
- **State Management**: Efficient state handling with custom hooks
- **Derived State Calculations**: Memoized computations to prevent redundant re-renders
- **Routing & Navigation**: Client-side routing with React Router
- **Data Visualization**: Interactive charts using Recharts
- **Performance Optimization**: Lazy loading and memoization techniques
- **Accessibility**: WCAG compliant with ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first, adaptive UI

## 📁 Project Structure

```
src/
├── components/
│   ├── common/                 # Reusable UI components
│   │   ├── ProgressBar.jsx     # Progress indicator with status
│   │   ├── SummaryCard.jsx     # Metric cards
│   │   └── LoadingIndicator.jsx # Loading spinner
│   ├── charts/                 # Data visualization components
│   │   ├── ModuleComparisonChart.jsx     # Bar chart
│   │   ├── CompletionTrendChart.jsx      # Line chart
│   │   └── DetailedAnalyticsChart.jsx    # Category analytics
│   └── layout/                 # Layout components
│       ├── Header.jsx          # App header
│       ├── Navigation.jsx      # Route navigation
│       └── Layout.jsx          # Main layout wrapper
├── hooks/                      # Custom React hooks
│   ├── useProgressData.js      # Data management & async updates
│   └── useDerivedState.js      # Memoized derived state
├── pages/                      # Route pages
│   ├── Dashboard.jsx           # Overall progress summary
│   ├── ModulesPage.jsx         # Module-wise tracking
│   └── AnalyticsPage.jsx       # Charts & analytics
├── utils/                      # Utility functions
│   ├── constants.js            # App constants
│   ├── mockData.js             # Mock data generation
│   └── dataCalculations.js     # Pure calculation functions
├── styles/                     # CSS modules
│   ├── components.css          # Component styles
│   ├── layout.css              # Layout styles
│   └── charts.css              # Chart styles
├── App.jsx                     # Root component with routing
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
npm run build

# Preview the production build
npm run preview
```

## 📊 Features

### 1. **Dashboard Page** (`/`)
- Overall completion percentage
- Key performance metrics (hours invested, learning streak)
- Top performing modules
- Category breakdown
- Visual progress indicators

### 2. **Modules Page** (`/modules`)
- Complete module list with detailed progress
- Category filtering (Dropdown control)
- Expandable module details
- Activity tracking per module
- Quick actions to update progress and time spent
- Responsive module cards

### 3. **Analytics Page** (`/analytics`)
- Performance metrics summary
- Module comparison chart (bar chart)
- Learning progress trend (line chart)
- Category-wise analytics (dual-axis bar chart)
- Recent activity timeline
- Comprehensive learning insights

## 🏗️ Architecture Highlights

### Component-Based Design

All UI elements are built as reusable, composable components:

```jsx
// Example: Using SummaryCard component
<SummaryCard
  title="Overall Progress"
  value={85}
  unit="%"
  icon="🎯"
  backgroundColor="#dbeafe"
  ariaLabel="Overall completion: 85%"
/>
```

### State Management with Custom Hooks

#### `useProgressData` Hook
- Manages raw progress data
- Handles async updates with optimistic UI
- Provides loading indicators
- Simulates real API calls

```jsx
const {
  modules,
  isLoading,
  updateModuleProgress,
  addModuleTime,
} = useProgressData();
```

#### `useDerivedState` Hook
- Computes memoized derived values
- Prevents unnecessary recalculations
- Uses `useMemo` for performance

```jsx
const {
  overallCompletion,
  averageTime,
  categoryStats,
  rankedModules,
} = useDerivedState(modules, activities, categories);
```

### Pure Utility Functions

All calculations are in pure functions without side effects:

```javascript
// dataCalculations.js
export const calculateOverallCompletion = (modules) => { ... };
export const calculateAverageTime = (modules) => { ... };
export const calculateCategoryStats = (modules, categories) => { ... };
```

### Controlled Inputs

All inputs update state predictably:

```jsx
<select
  value={selectedCategory || ''}
  onChange={(e) => setSelectedCategory(e.target.value || null)}
  aria-label="Filter modules by category"
>
  {/* options */}
</select>
```

## ♿ Accessibility Features

- **ARIA Labels**: All components have descriptive ARIA labels
- **Semantic HTML**: Proper use of nav, section, main
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant colors
- **Status Announcements**: Loading states with `role="status"`
- **Screen Reader Friendly**: Proper heading hierarchy and labels
- **Focus Management**: Visible focus indicators

## 📈 Performance Optimizations

1. **Memoization**: All components wrapped with `React.memo`
2. **Derived State**: Expensive calculations memoized with `useMemo`
3. **Lazy Loading**: Chart components use Suspense
4. **Code Splitting**: Pages loaded via React Router
5. **CSS Optimization**: Modular CSS files loaded on demand

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "recharts": "^3.7.0"
}
```

## 🎨 Styling Approach

- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Variables**: Consistent theming (in base styles)
- **Mobile-First**: Responsive design with media queries
- **Animations**: Smooth transitions and micro-interactions
- **Dark Mode Ready**: Foundation for dark mode support

## 📐 Responsive Breakpoints

- **Desktop**: 1024px and above (full layout)
- **Tablet**: 768px to 1023px (adjusted grid)
- **Mobile**: Below 768px (single column, optimized)

## 🔄 Asynchronous Operations

The app simulates async API calls:

```javascript
// Optimistic UI update + async confirmation
updateModuleProgress(moduleId, newValue);
// UI updates immediately, then confirms after 500ms
```

## 📊 Data Structure

### Module Object
```javascript
{
  id: 'react',
  name: 'React Fundamentals',
  category: 'Frontend',
  completion: 85,
  timespent: 42,
  lastUpdated: Date,
  activities: [ { id, name, completion }, ... ]
}
```

### Derived Metrics
```javascript
{
  overallCompletion: 72,
  averageTime: 24.5,
  totalTime: 172,
  learningStreak: 7,
  categoryStats: [ { name, completion, timeSpent }, ... ]
}
```

## 🧪 Best Practices Implemented

✅ Component composition and reusability  
✅ Custom hooks for logic extraction  
✅ Memoization for performance  
✅ Pure functions for calculations  
✅ Props validation with JSDoc  
✅ Semantic HTML elements  
✅ ARIA attributes for accessibility  
✅ Responsive mobile-first design  
✅ Error handling and loading states  
✅ Keyboard navigation support  

## 🎓 Learning Outcomes

This project demonstrates:

- **React Hooks**: `useState`, `useCallback`, `useMemo`, `useEffect`
- **React Router**: Client-side routing with nested routes
- **Performance**: Memoization, lazy loading, code splitting
- **Data Visualization**: Recharts integration and customization
- **CSS Architecture**: Modular, scalable CSS organization
- **UI/UX Engineering**: Responsive design, accessibility, animations
- **State Management**: Custom hooks over external libraries
- **Derived State**: Computing values from raw data efficiently

## 🚀 Future Enhancements

- Dark mode support
- User authentication
- Real API integration
- Export data functionality
- Goal setting and tracking
- Notifications and alerts
- Advanced filtering options
- Data persistence with LocalStorage

## 📝 License

This project is provided as-is for educational purposes.

## 👨‍💻 Development

Created as a comprehensive frontend engineering demonstration showcasing modern React patterns and UI best practices.

---

**Start the dev server:**
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser! 🎉

