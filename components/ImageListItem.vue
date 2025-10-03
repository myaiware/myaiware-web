<template>
  <div class="card flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow">
    <!-- Image -->
    <div class="md:w-1/3 lg:w-1/4">
      <NuxtImg
        :src="`https://picsum.photos/${image.width}/${image.height}?random=${image.id}`"
        :alt="image.prompt.title"
        :width="image.width"
        :height="image.height"
        class="w-full h-48 md:h-full object-cover"
        loading="lazy"
        placeholder
      />
    </div>

    <!-- Content -->
    <div class="flex-1 p-6">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ image.prompt.title }}
            </h3>
            <div class="flex items-center space-x-4 text-sm text-gray-400">
              <NuxtLink :to="`/u/${image.user.handle}`" class="flex items-center space-x-2 hover:text-white transition-colors">
                <img 
                  :src="image.user.avatar_url" 
                  :alt="image.user.handle"
                  class="w-5 h-5 rounded-full"
                >
                <span>@{{ image.user.handle }}</span>
              </NuxtLink>
              <span>•</span>
              <span>{{ timeAgo(image.created_at) }}</span>
              <span>•</span>
              <span class="px-2 py-1 bg-gray-700 rounded-full text-xs">
                {{ getCategoryName(image.prompt.category) }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 ml-4">
            <button @click="copyPrompt" class="btn-ghost p-2" title="Copy prompt">
              <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
            </button>
            <button @click="likeImage" class="btn-ghost p-2" title="Like">
              <Icon 
                :name="isLiked ? 'heroicons:heart-solid' : 'heroicons:heart'" 
                :class="['w-4 h-4', isLiked ? 'text-red-500' : 'text-gray-400']"
              />
            </button>
            <button @click="shareImage" class="btn-ghost p-2" title="Share">
              <Icon name="heroicons:share" class="w-4 h-4" />
            </button>
            <NuxtLink :to="`/i/${image.id}`" class="btn-primary px-4 py-2">
              View Details
            </NuxtLink>
          </div>
        </div>

        <!-- Prompt -->
        <div class="flex-1 mb-4">
          <p class="text-gray-300 leading-relaxed">
            {{ image.prompt.body }}
          </p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in image.prompt.tags" 
            :key="tag"
            class="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 cursor-pointer transition-colors"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Stats -->
        <div class="flex items-center space-x-6 text-sm text-gray-400">
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:heart" class="w-4 h-4" />
            <span>{{ formatNumber(image.stats.likes) }} likes</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:eye" class="w-4 h-4" />
            <span>{{ formatNumber(image.stats.views) }} views</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:share" class="w-4 h-4" />
            <span>{{ formatNumber(image.stats.shares) }} shares</span>
          </div>
        </div>
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
    console.log('Prompt copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy prompt:', error)
  }
}

const likeImage = () => {
  isLiked.value = !isLiked.value
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
    try {
      await navigator.clipboard.writeText(shareData.url)
      console.log('URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }
}
</script>
