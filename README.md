# Link Tree Website

A modern, elegant link tree website built with Next.js and Tailwind CSS, featuring a custom brand color palette and responsive design.

## Features

- 🎨 Custom brand color palette with elegant purple tones
- 📱 Fully responsive design (mobile-first approach)
- ⚡ Optimized for performance and Core Web Vitals
- ♿ Accessible design with proper contrast ratios
- 🎭 Smooth animations and hover effects
- 🔗 Social media links with recognizable icons
- 💼 Featured projects section with tech stack badges
- 🌙 Dark mode support

## Color Palette

The website uses a carefully crafted color palette:
- Background: `#faf9fb` (Brand 50)
- Foreground: `#2c1028` (Brand 900)
- Primary: `#6e2765` (Brand 600)
- Secondary: `#a87da3` (Brand 400)
- Accent: `#7e3775` (Brand 500)
- Muted: `#e2d4e0` (Brand 200)

## Setup Instructions

1. **Clone or download** the project files
2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
3. **Run the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
Edit the following components to add your information:
- `components/profile-header.tsx` - Name, bio, and profile photo
- `components/projects-section.tsx` - Your projects and tech stack
- `components/social-links-section.tsx` - Your social media links

### Styling
- Colors are defined in `app/globals.css` using CSS custom properties
- Components use Tailwind CSS classes with the custom color palette
- Animations and transitions are defined in the global CSS

## Performance Features

- Semantic HTML elements for better SEO
- Optimized images with proper alt text
- Minimal JavaScript bundle
- CSS-only animations for smooth performance
- Proper meta tags for social sharing

## Accessibility

- WCAG AA compliant contrast ratios
- Proper heading hierarchy
- Screen reader friendly
- Keyboard navigation support
- Focus indicators for interactive elements

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **TypeScript**: Full type safety
