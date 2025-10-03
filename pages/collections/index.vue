<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Collections</h1>
        <p class="text-gray-400">Discover curated collections of AI art</p>
      </div>
      
      <div class="flex items-center gap-4 mt-4 sm:mt-0">
        <!-- Create Collection Button -->
        <button 
          v-if="isAuthenticated"
          @click="showCreateModal = true"
          class="btn-primary"
        >
          <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
          Create Collection
        </button>
        
        <!-- View Toggle -->
        <div class="flex items-center bg-gray-800 rounded-lg p-1">
          <button 
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            ]"
          >
            <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          </button>
          <button 
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            ]"
          >
            <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 items-center mb-8">
      <div class="flex gap-2">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="selectedFilter = filter.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            selectedFilter === filter.id 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          ]"
        >
          {{ filter.name }}
        </button>
      </div>
      
      <select v-model="sortBy" class="input text-sm">
        <option value="recent">Most Recent</option>
        <option value="popular">Most Popular</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 9" :key="i" class="card animate-pulse">
        <div class="aspect-video bg-gray-700 rounded-t-xl"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-gray-700 rounded w-3/4"></div>
          <div class="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Collections Grid -->
    <div v-else-if="collections.length > 0">
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CollectionCard 
          v-for="collection in collections" 
          :key="collection.id"
          :collection="collection"
          @edit="editCollection"
          @delete="deleteCollection"
        />
      </div>

      <!-- List View -->
      <div v-else class="space-y-4">
        <CollectionListItem 
          v-for="collection in collections" 
          :key="collection.id"
          :collection="collection"
          @edit="editCollection"
          @delete="deleteCollection"
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

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Icon name="heroicons:folder" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        {{ selectedFilter === 'mine' ? 'No collections yet' : 'No collections found' }}
      </h3>
      <p class="text-gray-500 mb-4">
        {{ selectedFilter === 'mine' 
          ? 'Create your first collection to organize your favorite images.' 
          : 'Try adjusting your filters or create a new collection.' 
        }}
      </p>
      <button 
        v-if="isAuthenticated"
        @click="showCreateModal = true"
        class="btn-primary"
      >
        Create Collection
      </button>
    </div>

    <!-- Create/Edit Collection Modal -->
    <CollectionModal
      v-if="showCreateModal || editingCollection"
      :collection="editingCollection"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Collections',
  meta: [
    { name: 'description', content: 'Discover and create curated collections of AI-generated images and prompts.' }
  ]
})

const { $fetch } = useNuxtApp()

// Reactive state
const collections = ref([])
const pending = ref(false)
const loadingMore = ref(false)
const hasMore = ref(true)
const viewMode = ref('grid')
const selectedFilter = ref('all')
const sortBy = ref('recent')
const showCreateModal = ref(false)
const editingCollection = ref(null)
const page = ref(1)

// Mock auth state - replace with actual auth
const isAuthenticated = ref(true)

// Filters
const filters = ref([
  { id: 'all', name: 'All Collections' },
  { id: 'public', name: 'Public' },
  { id: 'mine', name: 'My Collections' },
  { id: 'following', name: 'Following' }
])

// Load collections
const loadCollections = async (reset = false) => {
  if (reset) {
    pending.value = true
    page.value = 1
    collections.value = []
  } else {
    loadingMore.value = true
  }

  try {
    const query = {
      limit: 20,
      offset: (page.value - 1) * 20,
      public_only: selectedFilter.value === 'public',
      user_id: selectedFilter.value === 'mine' ? 'current-user-id' : undefined // Replace with actual user ID
    }

    const newCollections = await $fetch('/api/collections', { query })

    if (reset) {
      collections.value = newCollections
    } else {
      collections.value.push(...newCollections)
    }

    hasMore.value = newCollections.length === 20
    if (!reset) page.value++
  } catch (error) {
    console.error('Failed to load collections:', error)
  } finally {
    pending.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (!loadingMore.value && hasMore.value) {
    loadCollections(false)
  }
}

const editCollection = (collection) => {
  editingCollection.value = collection
}

const deleteCollection = async (collection) => {
  if (!confirm('Are you sure you want to delete this collection?')) return

  try {
    await $fetch(`/api/collections/${collection.id}`, { method: 'DELETE' })
    collections.value = collections.value.filter(c => c.id !== collection.id)
  } catch (error) {
    console.error('Failed to delete collection:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingCollection.value = null
}

const handleSave = (savedCollection) => {
  if (editingCollection.value) {
    // Update existing collection
    const index = collections.value.findIndex(c => c.id === savedCollection.id)
    if (index !== -1) {
      collections.value[index] = savedCollection
    }
  } else {
    // Add new collection
    collections.value.unshift(savedCollection)
  }
  closeModal()
}

// Watch filters and reload
watch([selectedFilter, sortBy], () => {
  loadCollections(true)
})

// Load collections on mount
onMounted(() => {
  loadCollections(true)
})
</script>
