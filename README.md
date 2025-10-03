# MyAIware Web App

The web application for MyAIware - a modern AI prompt and image sharing platform.

## 🚀 Features

- **Modern UI**: Built with Nuxt 3, Vue 3, and Tailwind CSS
- **Dark-first Design**: Optimized for dark mode with beautiful gradients
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **SEO Optimized**: Server-side rendering with rich meta tags
- **Image Optimization**: Cloudinary integration with automatic optimization
- **Real-time Updates**: Live activity feeds and social interactions

## 🛠️ Tech Stack

- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Cloudflare Pages + Functions
- **Images**: Cloudinary with nuxt-image
- **SEO**: @nuxtjs/seo with automatic sitemap generation
- **Icons**: Heroicons and Simple Icons

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd myaiware-web
```

2. **Install dependencies**:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**:
```bash
cp env.example .env
```

Edit `.env` with your configuration:
```env
# API Configuration
NUXT_PUBLIC_API_BASE=http://localhost:8080

# Cloudinary Configuration
NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Turnstile (Cloudflare CAPTCHA)
NUXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key

# Site Configuration
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Cloudflare Pages

1. **Build the project**:
```bash
npm run build
```

2. **Deploy to Cloudflare Pages**:
   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set build output directory: `.output/public`
   - Set environment variables in Cloudflare Pages dashboard

### Environment Variables for Cloudflare Pages

Set these in your Cloudflare Pages dashboard:

```
NUXT_PUBLIC_API_BASE=https://api.myaiware.com
NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NUXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
NUXT_PUBLIC_SITE_URL=https://myaiware.com
```

## 📁 Project Structure

```
apps/web/
├── assets/           # CSS, images, fonts
├── components/       # Vue components
├── layouts/          # Nuxt layouts
├── pages/            # File-based routing
├── plugins/          # Nuxt plugins
├── public/           # Static assets
├── server/           # Server-side code
├── utils/            # Utility functions
├── nuxt.config.ts    # Nuxt configuration
└── package.json      # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#7C3AED)
- **Secondary**: Blue (#3B82F6)
- **Accent**: Pink (#EC4899)
- **Background**: Gray-900 (#111827)
- **Surface**: Gray-800 (#1F2937)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text
- **Body**: Regular weight with good contrast

### Components
- **Buttons**: Multiple variants (primary, secondary, ghost)
- **Cards**: Rounded with subtle borders and shadows
- **Forms**: Consistent styling with validation states
- **Navigation**: Responsive with mobile menu

## 🔧 Development

### Code Style
- **ESLint**: Configured with Vue 3 and TypeScript rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict mode enabled

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

### Adding New Pages
Create `.vue` files in the `pages/` directory. Nuxt will automatically generate routes.

### Adding Components
Create `.vue` files in the `components/` directory. Use PascalCase naming.

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the design system colors and spacing
- Use the custom CSS classes for common patterns
- Ensure responsive design with mobile-first approach

## 🌐 API Integration

The web app communicates with the MyAIware API:

### Base URL
- Development: `http://localhost:8080`
- Production: `https://api.myaiware.com`

### Key Endpoints
- `GET /v1/feed` - Get image feed
- `POST /v1/auth/google` - Google OAuth
- `POST /v1/auth/zalo` - Zalo OAuth
- `GET /v1/users/{handle}` - User profiles
- `POST /v1/collections` - Create collections

### Authentication
Uses JWT tokens stored in HTTP-only cookies for security.

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Adaptive navigation (hamburger menu on mobile)
- Responsive image grids (1-4 columns based on screen size)
- Touch-friendly interactions
- Optimized typography scaling

## 🔍 SEO Features

- **Server-side Rendering**: Fast initial page loads
- **Meta Tags**: Dynamic titles and descriptions
- **Open Graph**: Rich social media previews
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatically generated
- **Robots.txt**: Search engine directives

## 🚀 Performance

- **Image Optimization**: Cloudinary with automatic format selection
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Aggressive caching with SWR strategy
- **Compression**: Gzip/Brotli compression enabled

## 🔒 Security

- **CSP**: Content Security Policy headers
- **HTTPS**: Enforced in production
- **Secure Cookies**: HTTP-only and secure flags
- **CSRF Protection**: Built-in Nuxt protection
- **Input Validation**: Client and server-side validation

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors**:
   ```bash
   npm run lint:fix
   ```

2. **Images not loading**:
   - Check Cloudinary configuration
   - Verify CLOUDINARY_CLOUD_NAME environment variable

3. **API calls failing**:
   - Check API_BASE environment variable
   - Ensure API server is running
   - Check CORS configuration

4. **Styles not applying**:
   - Clear Nuxt cache: `rm -rf .nuxt`
   - Restart development server

### Getting Help

- Check the [Nuxt 3 documentation](https://nuxt.com/)
- Review [Tailwind CSS docs](https://tailwindcss.com/)
- Open an issue in the repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.