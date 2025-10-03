<template>
  <div class="card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
    <!-- Image -->
    <div class="relative overflow-hidden">
      <NuxtImg
        :src="`https://picsum.photos/${image.width}/${image.height}?random=${image.id}`"
        :alt="image.prompt.title"
        :width="image.width"
        :height="image.height"
        class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        placeholder
      />
      
      <!-- Overlay with actions -->
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="flex space-x-2">
          <button @click.stop="copyPrompt" class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon name="heroicons:clipboard-document" class="w-5 h-5" />
          </button>
          <button @click.stop="likeImage" class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon 
              :name="isLiked ? 'heroicons:heart-solid' : 'heroicons:heart'" 
              :class="['w-5 h-5', isLiked ? 'text-red-500' : 'text-white']"
            />
          </button>
          <button @click.stop="shareImage" class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon name="heroicons:share" class="w-5 h-5" />
          </button>
          <NuxtLink :to="`/i/${image.id}`" @click.stop class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon name="heroicons:eye" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>

      <!-- Category badge -->
      <div class="absolute top-2 left-2">
        <span class="px-2 py-1 text-xs font-medium bg-black/70 backdrop-blur-sm text-white rounded-full">
          {{ getCategoryName(image.prompt.category) }}
        </span>
      </div>

      <!-- Stats overlay -->
      <div class="absolute bottom-2 right-2 flex space-x-2">
        <div class="flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white">
          <Icon name="heroicons:heart" class="w-3 h-3" />
          <span>{{ formatNumber(image.stats.likes) }}</span>
        </div>
        <div class="flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white">
          <Icon name="heroicons:eye" class="w-3 h-3" />
          <span>{{ formatNumber(image.stats.views) }}</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Title -->
      <h3 class="font-semibold text-white mb-2 line-clamp-2">
        {{ image.prompt.title }}
      </h3>

      <!-- Prompt preview -->
      <p class="text-sm text-gray-400 mb-3 line-clamp-2">
        {{ image.prompt.body }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span 
          v-for="tag in image.prompt.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
        >
          #{{ tag }}
        </span>
        <span v-if="image.prompt.tags.length > 3" class="px-2 py-1 text-xs text-gray-500">
          +{{ image.prompt.tags.length - 3 }}
        </span>
      </div>

      <!-- Author -->
      <div class="flex items-center justify-between">
        <NuxtLink :to="`/u/${image.user.handle}`" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            :src="image.user.avatar_url" 
            :alt="image.user.handle"
            class="w-6 h-6 rounded-full"
          >
          <span class="text-sm text-gray-300">@{{ image.user.handle }}</span>
        </NuxtLink>

        <!-- Time ago -->
        <span class="text-xs text-gray-500">
          {{ timeAgo(image.created_at) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: {
    id: string
    cloudinary_public_id: string
    width: number
    height: number
    prompt: {
      id: string
      title: string
      body: string
      tags: string[]
      category: string
    }
    user: {
      id: string
      handle: string
      avatar_url: string
    }
    stats: {
      likes: number
      views: number
      shares: number
    }
    created_at: string
  }
}

const props = defineProps<Props>()

const isLiked = ref(false) // Will be replaced with actual like state

const categories = {
  'all': 'All',
  'portrait': 'Portrait',
  'landscape': 'Landscape',
  'abstract': 'Abstract',
  'anime': 'Anime',
  'photography': 'Photography',
  'digital_art': 'Digital Art'
}

const getCategoryName = (category: string) => {
  return categories[category] || category
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`
}

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(props.image.prompt.body)
    // Show toast notification
    console.log('Prompt copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy prompt:', error)
  }
}

const likeImage = () => {
  isLiked.value = !isLiked.value
  // TODO: Call API to like/unlike image
  console.log('Like toggled:', isLiked.value)
}

const shareImage = async () => {
  const shareData = {
    title: props.image.prompt.title,
    text: props.image.prompt.body,
    url: `${window.location.origin}/i/${props.image.id}`
  }
  
  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.log('Share cancelled or failed:', error)
    }
  } else {
    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url)
      console.log('URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
