<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-white mb-2">User Not Found</h1>
        <p class="text-gray-400 mb-4">The user you're looking for doesn't exist.</p>
        <NuxtLink to="/" class="btn-primary">
          Back to Home
        </NuxtLink>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="profile" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Header -->
      <div class="card p-8 mb-8">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <!-- Avatar -->
          <div class="relative">
            <img 
              :src="profile.avatar_url || '/default-avatar.png'" 
              :alt="profile.handle"
              class="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
            >
            <div v-if="profile.is_online" class="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>

          <!-- Profile Info -->
          <div class="flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h1 class="text-3xl font-bold text-white">@{{ profile.handle }}</h1>
              
              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button 
                  v-if="!isOwnProfile" 
                  @click="toggleFollow"
                  :disabled="followLoading"
                  :class="[
                    'btn',
                    profile.is_following 
                      ? 'btn-secondary' 
                      : 'btn-primary'
                  ]"
                >
                  <Icon v-if="followLoading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
                  {{ profile.is_following ? 'Unfollow' : 'Follow' }}
                </button>
                
                <NuxtLink v-if="isOwnProfile" to="/settings" class="btn-secondary">
                  Edit Profile
                </NuxtLink>
                
                <button @click="shareProfile" class="btn-ghost p-2">
                  <Icon name="heroicons:share" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Bio -->
            <p v-if="profile.bio" class="text-gray-300 mb-4 max-w-2xl">
              {{ profile.bio }}
            </p>

            <!-- Social Links -->
            <div v-if="profile.social_links && Object.keys(profile.social_links).length > 0" class="flex gap-4 mb-4">
              <a 
                v-for="(url, platform) in profile.social_links" 
                :key="platform"
                :href="url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <Icon :name="getSocialIcon(platform)" class="w-5 h-5" />
              </a>
            </div>

            <!-- Stats -->
            <div class="flex flex-wrap gap-6 text-sm">
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ formatNumber(profile.stats.total_images) }}</div>
                <div class="text-gray-400">Images</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ formatNumber(profile.stats.total_prompts) }}</div>
                <div class="text-gray-400">Prompts</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ formatNumber(profile.stats.total_likes) }}</div>
                <div class="text-gray-400">Likes</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ formatNumber(profile.stats.followers_count) }}</div>
                <div class="text-gray-400">Followers</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-white">{{ formatNumber(profile.stats.following_count) }}</div>
                <div class="text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="mb-8">
        <div class="flex space-x-8 border-b border-gray-700">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'pb-4 px-2 font-medium transition-colors',
              activeTab === tab.id 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-gray-400 hover:text-white'
            ]"
          >
            {{ tab.name }}
            <span v-if="tab.count !== undefined" class="ml-2 text-sm opacity-75">
              ({{ formatNumber(tab.count) }})
            </span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="min-h-96">
        <!-- Images Tab -->
        <div v-if="activeTab === 'images'">
          <div v-if="userImages.length === 0" class="text-center py-12">
            <Icon name="heroicons:photo" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-400 mb-2">No images yet</h3>
            <p class="text-gray-500">
              {{ isOwnProfile ? "Start creating amazing AI art!" : `${profile.handle} hasn't shared any images yet.` }}
            </p>
          </div>
          
          <div v-else class="masonry-grid">
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
        </div>

        <!-- Collections Tab -->
        <div v-else-if="activeTab === 'collections'">
          <div v-if="userCollections.length === 0" class="text-center py-12">
            <Icon name="heroicons:folder" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-400 mb-2">No collections yet</h3>
            <p class="text-gray-500">
              {{ isOwnProfile ? "Create your first collection!" : `${profile.handle} hasn't created any collections yet.` }}
            </p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard 
              v-for="collection in userCollections" 
              :key="collection.id"
              :collection="collection"
            />
          </div>
        </div>

        <!-- Liked Tab -->
        <div v-else-if="activeTab === 'liked'">
          <div v-if="likedImages.length === 0" class="text-center py-12">
            <Icon name="heroicons:heart" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-400 mb-2">No liked images</h3>
            <p class="text-gray-500">
              {{ isOwnProfile ? "Like some images to see them here!" : `${profile.handle} hasn't liked any images yet.` }}
            </p>
          </div>
          
          <div v-else class="masonry-grid">
            <div 
              v-for="column in likedMasonryColumns" 
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $fetch } = useNuxtApp()

const handle = route.params.handle as string

// Reactive state
const activeTab = ref('images')
const followLoading = ref(false)
const columnCount = ref(3)

// Tabs configuration
const tabs = computed(() => [
  { id: 'images', name: 'Images', count: profile.value?.stats.total_images },
  { id: 'collections', name: 'Collections', count: userCollections.value.length },
  { id: 'liked', name: 'Liked', count: likedImages.value.length }
])

// Fetch user profile
const { data: profile, pending, error } = await useLazyAsyncData(`profile-${handle}`, () => 
  $fetch(`/api/users/${handle}`)
)

// Mock data - replace with actual API calls
const userImages = ref([])
const userCollections = ref([])
const likedImages = ref([])

// Check if this is the current user's profile
const isOwnProfile = computed(() => {
  // TODO: Compare with current user
  return false
})

// Masonry layout for images
const masonryColumns = computed(() => {
  if (!userImages.value) return []
  
  const columns = Array.from({ length: columnCount.value }, (_, i) => ({
    id: i,
    images: []
  }))
  
  userImages.value.forEach((image, index) => {
    const columnIndex = index % columnCount.value
    columns[columnIndex].images.push(image)
  })
  
  return columns
})

// Masonry layout for liked images
const likedMasonryColumns = computed(() => {
  if (!likedImages.value) return []
  
  const columns = Array.from({ length: columnCount.value }, (_, i) => ({
    id: i,
    images: []
  }))
  
  likedImages.value.forEach((image, index) => {
    const columnIndex = index % columnCount.value
    columns[columnIndex].images.push(image)
  })
  
  return columns
})

// Meta tags
useHead({
  title: () => profile.value ? `@${profile.value.handle}` : 'User Profile',
  meta: [
    { name: 'description', content: () => profile.value?.bio || `View ${handle}'s AI art and prompts on MyAIware` }
  ]
})

// SEO meta
useSeoMeta({
  title: () => profile.value ? `@${profile.value.handle} - MyAIware` : 'User Profile',
  description: () => profile.value?.bio || `View ${handle}'s AI art and prompts on MyAIware`,
  ogTitle: () => profile.value ? `@${profile.value.handle} on MyAIware` : 'User Profile',
  ogDescription: () => profile.value?.bio || `View ${handle}'s AI art and prompts`,
  ogImage: () => profile.value?.avatar_url || '/og-image.jpg'
})

// Responsive column count
onMounted(() => {
  const updateColumns = () => {
    const width = window.innerWidth
    if (width < 768) columnCount.value = 1
    else if (width < 1024) columnCount.value = 2
    else columnCount.value = 3
  }
  
  updateColumns()
  window.addEventListener('resize', updateColumns)
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateColumns)
  })
})

// Helper functions
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const getSocialIcon = (platform: string) => {
  const icons = {
    twitter: 'simple-icons:twitter',
    instagram: 'simple-icons:instagram',
    website: 'heroicons:globe-alt',
    github: 'simple-icons:github'
  }
  return icons[platform] || 'heroicons:link'
}

const toggleFollow = async () => {
  if (!profile.value) return
  
  followLoading.value = true
  try {
    const action = profile.value.is_following ? 'unfollow' : 'follow'
    await $fetch(`/api/users/${profile.value.id}/${action}`, { method: 'POST' })
    
    profile.value.is_following = !profile.value.is_following
    profile.value.stats.followers_count += profile.value.is_following ? 1 : -1
  } catch (error) {
    console.error('Follow action failed:', error)
  } finally {
    followLoading.value = false
  }
}

const shareProfile = async () => {
  const shareData = {
    title: `@${profile.value.handle} on MyAIware`,
    text: profile.value.bio || `Check out ${profile.value.handle}'s AI art on MyAIware`,
    url: window.location.href
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
      console.log('Profile URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }
}
</script>
