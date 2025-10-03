<template>
  <div class="card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
    <!-- Preview Images -->
    <div class="relative aspect-video overflow-hidden rounded-t-xl bg-gray-800">
      <!-- Multiple Images Grid -->
      <div v-if="collection.preview_images.length > 1" class="grid grid-cols-2 gap-1 h-full">
        <div 
          v-for="(image, index) in collection.preview_images.slice(0, 4)" 
          :key="image.id"
          :class="[
            'relative overflow-hidden',
            collection.preview_images.length === 2 ? 'col-span-1' : '',
            collection.preview_images.length === 3 && index === 0 ? 'col-span-2' : '',
            collection.preview_images.length >= 4 ? 'col-span-1' : ''
          ]"
        >
          <img 
            :src="`https://picsum.photos/400/300?random=${image.id}`"
            :alt="`Preview ${index + 1}`"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          >
          
          <!-- More images indicator -->
          <div 
            v-if="index === 3 && collection.image_count > 4"
            class="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <span class="text-white font-semibold text-lg">
              +{{ collection.image_count - 4 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Single Image -->
      <div v-else-if="collection.preview_images.length === 1" class="h-full">
        <img 
          :src="`https://picsum.photos/600/400?random=${collection.preview_images[0].id}`"
          :alt="collection.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
      </div>

      <!-- Empty State -->
      <div v-else class="h-full flex items-center justify-center">
        <div class="text-center">
          <Icon name="heroicons:photo" class="w-12 h-12 text-gray-600 mx-auto mb-2" />
          <p class="text-gray-500 text-sm">No images yet</p>
        </div>
      </div>

      <!-- Overlay Actions -->
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="flex space-x-2">
          <NuxtLink :to="`/collections/${collection.id}`" class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon name="heroicons:eye" class="w-5 h-5" />
          </NuxtLink>
          
          <button 
            v-if="canEdit"
            @click.stop="$emit('edit', collection)"
            class="btn-ghost p-2 bg-black/50 backdrop-blur-sm"
          >
            <Icon name="heroicons:pencil" class="w-5 h-5" />
          </button>
          
          <button @click.stop="shareCollection" class="btn-ghost p-2 bg-black/50 backdrop-blur-sm">
            <Icon name="heroicons:share" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Privacy Badge -->
      <div class="absolute top-2 left-2">
        <span 
          :class="[
            'px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm',
            collection.is_public 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          ]"
        >
          {{ collection.is_public ? 'Public' : 'Private' }}
        </span>
      </div>

      <!-- Image Count -->
      <div class="absolute top-2 right-2">
        <span class="px-2 py-1 text-xs font-medium bg-black/70 backdrop-blur-sm text-white rounded-full">
          {{ collection.image_count }} {{ collection.image_count === 1 ? 'image' : 'images' }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Title and Description -->
      <div class="mb-3">
        <h3 class="font-semibold text-white mb-1 line-clamp-1">
          {{ collection.name }}
        </h3>
        <p v-if="collection.description" class="text-sm text-gray-400 line-clamp-2">
          {{ collection.description }}
        </p>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <!-- Author -->
        <div class="flex items-center space-x-2">
          <img 
            :src="collection.user?.avatar_url || '/default-avatar.png'" 
            :alt="collection.user?.handle || 'User'"
            class="w-5 h-5 rounded-full"
          >
          <span class="text-sm text-gray-300">
            @{{ collection.user?.handle || 'unknown' }}
          </span>
        </div>

        <!-- Actions Menu -->
        <div class="relative">
          <button 
            v-if="canEdit"
            @click.stop="showMenu = !showMenu"
            class="btn-ghost p-1"
          >
            <Icon name="heroicons:ellipsis-horizontal" class="w-4 h-4" />
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="showMenu" 
            class="absolute right-0 mt-2 w-32 card shadow-lg z-10"
            @click.stop
          >
            <div class="py-1">
              <button 
                @click="editCollection"
                class="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Edit
              </button>
              <button 
                @click="duplicateCollection"
                class="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Duplicate
              </button>
              <hr class="my-1 border-gray-700">
              <button 
                @click="deleteCollection"
                class="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Created Date -->
      <div class="mt-2 text-xs text-gray-500">
        Created {{ formatDate(collection.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  collection: {
    id: string
    name: string
    description?: string
    is_public: boolean
    image_count: number
    preview_images: Array<{
      id: string
      cloudinary_public_id: string
      width?: number
      height?: number
    }>
    user?: {
      id: string
      handle: string
      avatar_url?: string
    }
    created_at: string
    updated_at: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  edit: [collection: Props['collection']]
  delete: [collection: Props['collection']]
}>()

const showMenu = ref(false)

// Mock current user - replace with actual auth
const currentUserId = ref('current-user-id')

const canEdit = computed(() => {
  return props.collection.user?.id === currentUserId.value
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const shareCollection = async () => {
  const shareData = {
    title: props.collection.name,
    text: props.collection.description || `Check out this collection: ${props.collection.name}`,
    url: `${window.location.origin}/collections/${props.collection.id}`
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
      console.log('Collection URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }
}

const editCollection = () => {
  showMenu.value = false
  emit('edit', props.collection)
}

const duplicateCollection = async () => {
  showMenu.value = false
  // TODO: Implement collection duplication
  console.log('Duplicate collection:', props.collection.id)
}

const deleteCollection = () => {
  showMenu.value = false
  emit('delete', props.collection)
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', () => {
    showMenu.value = false
  })
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
