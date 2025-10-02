# NiftyNode - MCP Server Platform

A modern, responsive frontend for the NiftyNode MCP server platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### ✨ Core Features
- **Modern UI/UX**: Clean, minimalistic design with rounded corners and soft shadows
- **Dark/Light Mode**: Full theme switching with animated backgrounds in dark mode
- **Responsive Layout**: Sidebar navigation with main content area
- **Redux State Management**: Centralized state with persistence
- **Authentication Ready**: Login and signup forms with Redux integration

### 🎨 Design System
- **Light Mode**: White sidebar, light gray content area, blue primary color (#60A5FA)
- **Dark Mode**: Black backgrounds with subtle gray borders, animated star field
- **Typography**: Geist Sans and Geist Mono fonts
- **Components**: Shadcn/ui with custom styling

### 📱 Routes & Pages
- **`/` (Home)**: Redirects to `/about` by default
- **`/about`**: Company information with feature highlights and statistics
- **`/join`**: Two-column layout with benefits and authentication forms
- **`/help`**: Support options, FAQ, and contact information
- **`/404`**: Custom 404 error page with navigation options

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **State Management**: Redux Toolkit + Redux Persist
- **Icons**: Lucide React
- **Theme**: Next-themes for dark/light mode

## 📁 Project Structure

```
src/
├── app/
│   ├── about/
│   │   ├── page.tsx        # About Us page
│   │   └── layout.tsx      # About page metadata
│   ├── join/
│   │   ├── page.tsx        # Join Us page
│   │   └── layout.tsx      # Join page metadata
│   ├── help/
│   │   ├── page.tsx        # Help page
│   │   └── layout.tsx      # Help page metadata
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (redirects to /about)
│   ├── not-found.tsx       # 404 error page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── ui/                 # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   └── theme-provider.tsx
│   ├── layout/
│   │   ├── main-layout.tsx # Main layout wrapper
│   │   ├── sidebar.tsx     # Navigation sidebar
│   │   └── animated-background.tsx
│   ├── pages/
│   │   ├── about-us.tsx    # About page content
│   │   ├── join-us.tsx     # Authentication forms
│   │   └── help.tsx        # Help and support
│   └── providers.tsx       # Redux providers
├── store/
│   ├── index.ts            # Store configuration
│   ├── api.ts              # Axios configuration
│   ├── reducers.ts         # Root reducer
│   ├── coreReducer.ts      # Reducer exports
│   └── slices/
│       └── auth/
│           ├── loginSlice.ts
│           └── signUpSlice.ts
└── lib/
    └── utils.ts            # Utility functions
```

## 🎯 Key Components

### Sidebar Navigation
- **NiftyNode** branding at top
- Navigation menu (About Us, Join Us, Help)
- Theme switcher button
- Active state highlighting

### Animated Background (Dark Mode)
- Moving star field animation
- Subtle grid pattern overlay
- Non-intrusive, enhances dark theme

### Authentication Forms
- Combined login/signup in Join Us page
- Redux integration for state management
- Form validation and loading states
- Toggle between login and signup modes

### Theme System
- CSS custom properties for consistent theming
- Smooth transitions between themes
- Proper contrast ratios for accessibility
- Custom scrollbar styling

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css` to modify theme colors:
- Primary: `--primary: 96 165 250` (Blue)
- Background: `--background: 255 255 255` (Light) / `0 0 0` (Dark)
- Borders: `--border: 226 232 240` (Light) / `51 65 85` (Dark)

### Adding New Pages
1. Create new route directory in `src/app/[route-name]/`
2. Add `page.tsx` and optional `layout.tsx` in the route directory
3. Create component in `src/components/pages/` if needed
4. Add menu item to `src/components/layout/sidebar.tsx`
5. The routing will work automatically with Next.js App Router

### Redux State
- Add new slices in `src/store/slices/`
- Export from `src/store/coreReducer.ts`
- Include in `src/store/reducers.ts`

## 📦 Dependencies

### Core
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5

### UI & Styling
- Tailwind CSS 4
- Shadcn/ui components
- Lucide React icons
- Next-themes

### State Management
- Redux Toolkit 2.9.0
- Redux Persist 6.0.0
- React Redux 9.2.0

### HTTP & Utils
- Axios 1.12.2
- Class Variance Authority
- Tailwind Merge

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - Shadcn/ui configuration

## 🎯 Future Enhancements

- [ ] Add more UI components as needed
- [ ] Implement backend API integration
- [ ] Add form validation library
- [ ] Include loading skeletons
- [ ] Add error boundaries
- [ ] Implement toast notifications
- [ ] Add unit tests

## 📄 License

This project is part of the NiftyNode MCP server platform.