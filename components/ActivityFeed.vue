<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 5" :key="i" class="card p-4 animate-pulse">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-700 rounded w-3/4"></div>
            <div class="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Items -->
    <div v-else-if="activities.length > 0" class="space-y-4">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="card p-4 hover:bg-gray-750 transition-colors"
      >
        <div class="flex items-start space-x-3">
          <!-- User Avatar -->
          <NuxtLink :to="`/u/${activity.user.handle}`">
            <img 
              :src="activity.user.avatar_url || '/default-avatar.png'" 
              :alt="activity.user.handle"
              class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-purple-500 transition-all"
            >
          </NuxtLink>

          <!-- Activity Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <!-- Activity Text -->
              <p class="text-sm text-gray-300">
                <NuxtLink 
                  :to="`/u/${activity.user.handle}`" 
                  class="font-medium text-white hover:text-purple-400 transition-colors"
                >
                  @{{ activity.user.handle }}
                </NuxtLink>
                {{ getActivityText(activity.activity_type) }}
                <span v-if="activity.target" class="font-medium text-white">
                  {{ activity.target.title || 'an image' }}
                </span>
              </p>

              <!-- Activity Icon -->
              <Icon 
                :name="getActivityIcon(activity.activity_type)" 
                :class="[
                  'w-4 h-4 flex-shrink-0',
                  getActivityIconColor(activity.activity_type)
                ]"
              />
            </div>

            <!-- Target Preview -->
            <div v-if="activity.target && activity.target.target_type === 'image'" class="mt-2">
              <NuxtLink 
                :to="`/i/${activity.target.id}`"
                class="block w-fit"
              >
                <div class="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <img 
                    :src="`https://picsum.photos/80/80?random=${activity.target.id}`"
                    :alt="activity.target.title || 'Image'"
                    class="w-12 h-12 rounded-lg object-cover"
                  >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">
                      {{ activity.target.title || 'Untitled' }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ formatTimeAgo(activity.created_at) }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- User Target Preview -->
            <div v-else-if="activity.target && activity.target.target_type === 'user'" class="mt-2">
              <NuxtLink 
                :to="`/u/${activity.target.id}`"
                class="inline-flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Icon name="heroicons:user" class="w-4 h-4" />
                <span>View Profile</span>
              </NuxtLink>
            </div>

            <!-- Timestamp -->
            <p v-if="!activity.target || activity.target.target_type !== 'image'" class="text-xs text-gray-500 mt-1">
              {{ formatTimeAgo(activity.created_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center pt-4">
        <button 
          @click="loadMore" 
          :disabled="loadingMore"
          class="btn-secondary"
        >
          <Icon v-if="loadingMore" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
          {{ loadingMore ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:rss" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">No Activity Yet</h3>
      <p class="text-gray-500 mb-4">
        Follow some users to see their activity here.
      </p>
      <NuxtLink to="/discover" class="btn-primary">
        Discover Users
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ActivityItem {
  id: string
  activity_type: string
  user: {
    id: string
    handle: string
    avatar_url?: string
  }
  target?: {
    id: string
    target_type: string
    title?: string
    thumbnail_url?: string
  }
  created_at: string
}

const { $fetch } = useNuxtApp()

// Reactive state
const activities = ref<ActivityItem[]>([])
const pending = ref(false)
const loadingMore = ref(false)
const hasMore = ref(true)
const offset = ref(0)

// Load initial activities
const loadActivities = async (reset = false) => {
  if (reset) {
    pending.value = true
    offset.value = 0
    activities.value = []
  } else {
    loadingMore.value = true
  }

  try {
    const newActivities = await $fetch('/api/social/activity', {
      query: {
        limit: 20,
        offset: offset.value
      }
    })

    if (reset) {
      activities.value = newActivities
    } else {
      activities.value.push(...newActivities)
    }

    hasMore.value = newActivities.length === 20
    offset.value += newActivities.length
  } catch (error) {
    console.error('Failed to load activities:', error)
  } finally {
    pending.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (!loadingMore.value && hasMore.value) {
    loadActivities(false)
  }
}

// Helper functions
const getActivityText = (type: string) => {
  const texts = {
    follow: 'started following',
    like: 'liked',
    upload: 'uploaded',
    comment: 'commented on'
  }
  return texts[type] || 'interacted with'
}

const getActivityIcon = (type: string) => {
  const icons = {
    follow: 'heroicons:user-plus',
    like: 'heroicons:heart',
    upload: 'heroicons:photo',
    comment: 'heroicons:chat-bubble-left'
  }
  return icons[type] || 'heroicons:bell'
}

const getActivityIconColor = (type: string) => {
  const colors = {
    follow: 'text-blue-400',
    like: 'text-red-400',
    upload: 'text-green-400',
    comment: 'text-yellow-400'
  }
  return colors[type] || 'text-gray-400'
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`
}

// Load activities on mount
onMounted(() => {
  loadActivities(true)
})

// Refresh function for parent components
defineExpose({
  refresh: () => loadActivities(true)
})
</script>
