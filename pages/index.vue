<template>
  <div>
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl sm:text-6xl font-bold mb-6">
          <span class="text-gradient">Share stunning AI images</span>
          <br>
          <span class="text-white">with their prompts</span>
        </h1>
        <p class="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Discover, generate, and remix AI-generated images. Join the creative community and explore endless possibilities.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/auth/register" class="btn-primary text-lg px-8 py-3">
            Get Started Free
          </NuxtLink>
          <NuxtLink to="/discover" class="btn-secondary text-lg px-8 py-3">
            Explore Gallery
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="px-4 sm:px-6 lg:px-8 mb-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === category.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              ]"
            >
              {{ category.name }}
            </button>
          </div>
          
          <div class="flex items-center gap-4">
            <select v-model="sortBy" class="input text-sm">
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
            
            <button @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'" class="btn-ghost p-2">
              <Icon :name="viewMode === 'grid' ? 'heroicons:list-bullet' : 'heroicons:squares-2x2'" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Feed -->
    <section class="px-4 sm:px-6 lg:px-8 pb-20">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 12" :key="i" class="card animate-pulse">
            <div class="aspect-square bg-gray-700"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Masonry Grid -->
        <div v-else-if="viewMode === 'grid'" class="masonry-grid">
          <div 
            v-for="column in masonryColumns" 
            :key="column.id"
            class="masonry-column"
            :style="{ width: `${100 / columnCount}%` }"
          >
            <ImageCard 
              v-for="image in column.images" 
              :key="image.id"
              :image="image"
              class="masonry-item"
            />
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-6">
          <ImageListItem 
            v-for="image in images" 
            :key="image.id"
            :image="image"
          />
        </div>

        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-12">
          <button @click="loadMore" :disabled="loadingMore" class="btn-primary">
            <Icon v-if="loadingMore" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
            {{ loadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Discover AI Art',
  meta: [
    { name: 'description', content: 'Discover stunning AI-generated images and their prompts. Get inspired and create your own.' }
  ]
})

// Reactive state
const selectedCategory = ref('all')
const sortBy = ref('recent')
const viewMode = ref('grid')
const columnCount = ref(4)
const page = ref(1)
const loadingMore = ref(false)

// Categories
const categories = ref([
  { id: 'all', name: 'All' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'anime', name: 'Anime' },
  { id: 'photography', name: 'Photography' },
  { id: 'digital_art', name: 'Digital Art' }
])

// Mock data - will be replaced with API calls
const { data: images, pending, refresh } = await useLazyAsyncData('feed', () => {
  return $fetch('/api/feed', {
    query: {
      category: selectedCategory.value,
      sort: sortBy.value,
      page: page.value
    }
  })
}, {
  default: () => generateMockImages(20),
  watch: [selectedCategory, sortBy]
})

const hasMore = computed(() => images.value.length >= page.value * 20)

// Masonry layout
const masonryColumns = computed(() => {
  if (!images.value) return []
  
  const columns = Array.from({ length: columnCount.value }, (_, i) => ({
    id: i,
    images: []
  }))
  
  images.value.forEach((image, index) => {
    const columnIndex = index % columnCount.value
    columns[columnIndex].images.push(image)
  })
  
  return columns
})

// Responsive column count
onMounted(() => {
  const updateColumns = () => {
    const width = window.innerWidth
    if (width < 640) columnCount.value = 1
    else if (width < 1024) columnCount.value = 2
    else if (width < 1280) columnCount.value = 3
    else columnCount.value = 4
  }
  
  updateColumns()
  window.addEventListener('resize', updateColumns)
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateColumns)
  })
})

const loadMore = async () => {
  loadingMore.value = true
  page.value++
  
  try {
    const newImages = await $fetch('/api/feed', {
      query: {
        category: selectedCategory.value,
        sort: sortBy.value,
        page: page.value
      }
    })
    
    images.value.push(...newImages)
  } catch (error) {
    console.error('Failed to load more images:', error)
    page.value-- // Revert page increment on error
  } finally {
    loadingMore.value = false
  }
}

// Mock data generator
function generateMockImages(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `img-${i}`,
    cloudinary_public_id: `sample-${i}`,
    width: 512 + Math.floor(Math.random() * 512),
    height: 512 + Math.floor(Math.random() * 512),
    prompt: {
      id: `prompt-${i}`,
      title: `Amazing AI Art ${i + 1}`,
      body: 'A stunning digital artwork created with AI, featuring vibrant colors and intricate details that showcase the power of artificial intelligence in creative expression.',
      tags: ['digital-art', 'ai-generated', 'colorful'],
      category: categories.value[Math.floor(Math.random() * categories.value.length)].id
    },
    user: {
      id: `user-${i}`,
      handle: `artist${i + 1}`,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
    },
    stats: {
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      shares: Math.floor(Math.random() * 100)
    },
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
}
</script>
