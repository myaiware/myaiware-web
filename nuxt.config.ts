// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Cloudflare Pages deployment
  nitro: {
    preset: 'cloudflare-pages'
  },

  // Modules
  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiBase: process.env.API_BASE || 'http://localhost:8080',
    
    // Public keys (exposed to client-side)
    public: {
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
      apiBase: process.env.NUXT_PUBLIC_API_BASE || process.env.API_BASE || 'http://localhost:8080',
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000'
    }
  },

  // Route rules for caching and prerendering
  routeRules: {
    '/': { prerender: false }, // Homepage is dynamic
    '/i/**': { swr: 60 }, // Image pages cached for 1 minute
    '/u/**': { swr: 300 }, // User profiles cached for 5 minutes
    '/og/**': { headers: { 'cache-control': 's-maxage=3600' } } // OG images cached for 1 hour
  },

  // Image optimization
  image: {
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload/`
    }
  },

  // SEO configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://myaiware.com',
    name: 'MyAIware',
    description: 'Share stunning AI images with their prompts — discover, generate, remix.',
    defaultLocale: 'en'
  },

  // Color mode (dark-first)
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  // CSS framework
  css: ['~/assets/css/main.css'],

  // TypeScript configuration
  typescript: {
    strict: true
  }
})