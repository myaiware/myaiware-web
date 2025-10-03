<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global meta tags
useHead({
  titleTemplate: '%s - MyAIware',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#3B82F6' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', href: '/myaiware-logo.png' },
    { rel: 'apple-touch-icon', href: '/myaiware-logo.png' }
  ]
})

// SEO configuration
useSeoMeta({
  title: 'MyAIware',
  description: 'Share stunning AI images with their prompts — discover, generate, remix.',
  ogTitle: 'MyAIware - AI Image & Prompt Sharing Platform',
  ogDescription: 'Discover, share, and remix AI-generated images with their prompts. Join the creative community.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
