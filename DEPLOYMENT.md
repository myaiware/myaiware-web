# MyAIware.com - Cloudflare Pages Deployment Guide

## 🚀 Quick Deploy to Cloudflare Pages

### Method 1: Automatic GitHub Integration (Recommended)

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository: `myaiware/myaiware-web`
   - Choose the `main` branch

2. **Configure Build Settings:**
   ```
   Framework preset: Nuxt.js
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   Node.js version: 18
   ```

3. **Set Environment Variables:**
   ```bash
   NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NUXT_PUBLIC_API_BASE=https://your-api-domain.com/v1
   NUXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
   NUXT_PUBLIC_SITE_URL=https://myaiware.pages.dev
   NODE_VERSION=18
   ```

4. **Deploy:**
   - Click "Save and Deploy"
   - Your site will be available at `https://myaiware-web.pages.dev`

### Method 2: Manual Deployment with Wrangler CLI

1. **Install Wrangler CLI:**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Build and Deploy:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=myaiware-web
   ```

## 🔧 Configuration

### Important Notes

- **wrangler.toml**: This file is configured for Cloudflare Pages compatibility. Build settings should be configured in the Cloudflare Pages dashboard, not in the wrangler.toml file.
- **Build Output**: The application builds to the `dist` directory when using the `cloudflare-pages` preset.

### Environment Variables

Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `myaiware` |
| `NUXT_PUBLIC_API_BASE` | Backend API URL | `https://api.myaiware.com/v1` |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile key | `0x4AAA...` |
| `NUXT_PUBLIC_SITE_URL` | Your domain | `https://myaiware.com` |
| `NODE_VERSION` | Node.js version | `18` |

### Custom Domain

1. Go to Cloudflare Pages → Your Project → Custom domains
2. Add your domain: `myaiware.com`
3. Follow DNS configuration instructions
4. Enable "Always Use HTTPS"

## 🛡️ Security Features

- **CSP Headers**: Content Security Policy configured
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Turnstile Integration**: Bot protection on forms
- **HTTPS Only**: Automatic HTTPS redirect

## 📊 Performance Optimizations

- **Edge Caching**: Static assets cached globally
- **Image Optimization**: Cloudinary integration
- **Code Splitting**: Automatic with Nuxt 3
- **SSR**: Server-side rendering for SEO

## 🔄 CI/CD Pipeline

Every push to `main` branch automatically:
1. Builds the application
2. Runs tests and linting
3. Deploys to production
4. Invalidates CDN cache

## 📝 Build Configuration

The site is configured for Cloudflare Pages with:
- **Nitro Preset**: `cloudflare-pages`
- **Output Directory**: `.output/public`
- **Functions**: Supported in `/functions` directory
- **Routes**: Configured via `_routes.json`

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version is 18+
- Verify all dependencies are installed
- Check environment variables are set

### 500 Errors
- Check Cloudflare Functions logs
- Verify API endpoints are accessible
- Check CSP headers aren't blocking resources

### Slow Loading
- Enable Cloudflare caching rules
- Optimize images via Cloudinary
- Check bundle size with `nuxt analyze`

## 📞 Support

For deployment issues:
1. Check [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
2. Review build logs in Cloudflare dashboard
3. Contact support via GitHub issues

---

🎉 **Your MyAIware.com is now live on Cloudflare Pages!**
