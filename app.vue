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
    { name: 'theme-color', content: '#7c3aed' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
