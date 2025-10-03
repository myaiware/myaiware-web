<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
    <!-- Navigation Header -->
    <nav class="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-white">
              MyAI<span class="text-purple-400">ware</span>
            </h1>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#discover" class="text-gray-300 hover:text-white transition-colors">
              Khám phá
            </a>
            <a href="#generate" class="text-gray-300 hover:text-white transition-colors">
              Tạo ảnh AI
            </a>
            <a href="#categories" class="text-gray-300 hover:text-white transition-colors">
              Danh mục
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <button @click="showLoginModal = true" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl sm:text-7xl font-bold mb-6">
          <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Chia sẻ ảnh AI
          </span>
          <br>
          <span class="text-white">cùng prompt tuyệt vời</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Khám phá, tạo và chia sẻ những hình ảnh AI tuyệt đẹp. Từ ảnh cưới studio đến ảnh trung thu, 
          tìm hiểu prompt để tạo ra những tác phẩm nghệ thuật độc đáo.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button @click="scrollToGallery" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105">
            Khám phá ngay
          </button>
          <button @click="showLoginModal = true" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
            Tạo ảnh AI miễn phí
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-3xl font-bold text-white">10K+</div>
            <div class="text-gray-400">Hình ảnh AI</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">5K+</div>
            <div class="text-gray-400">Prompt chất lượng</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">2K+</div>
            <div class="text-gray-400">Người sáng tạo</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section id="categories" class="px-4 sm:px-6 lg:px-8 mb-8" ref="gallerySection">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">Danh mục phổ biến</h2>
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-full text-sm font-medium transition-all transform hover:scale-105',
              selectedCategory === category.id 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
            ]"
          >
            {{ category.icon }} {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Image Gallery -->
    <section id="discover" class="px-4 sm:px-6 lg:px-8 pb-20">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 12" :key="i" class="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-700/50"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-gray-700/50 rounded w-3/4"></div>
              <div class="h-3 bg-gray-700/50 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Masonry Grid -->
        <div v-else class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <div 
            v-for="image in filteredImages" 
            :key="image.id"
            class="break-inside-avoid bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
            @click="openImageModal(image)"
          >
            <!-- Image -->
            <div class="relative overflow-hidden">
              <img 
                :src="getImageUrl(image)" 
                :alt="image.prompt.title"
                class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Overlay Actions -->
              <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors text-white">
                  ❤️
                </button>
              </div>
              
              <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="w-full bg-purple-600/80 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-purple-700/80 transition-colors text-sm font-medium">
                  Sao chép Prompt
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3 class="text-white font-semibold mb-2 line-clamp-2">{{ image.prompt.title }}</h3>
              <p class="text-gray-400 text-sm mb-3 line-clamp-3">{{ image.prompt.body }}</p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-3">
                <span 
                  v-for="tag in image.prompt.tags.slice(0, 3)" 
                  :key="tag"
                  class="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-md text-xs"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- User & Stats -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="image.user.avatar_url" 
                    :alt="image.user.handle"
                    class="w-6 h-6 rounded-full"
                  >
                  <span class="text-gray-400 text-sm">@{{ image.user.handle }}</span>
                </div>
                <div class="flex items-center space-x-3 text-gray-400 text-sm">
                  <span class="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{{ image.stats.likes }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>{{ image.stats.views }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-12">
          <button 
            @click="loadMore" 
            :disabled="loadingMore"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loadingMore" class="inline-block animate-spin mr-2">⟳</span>
            {{ loadingMore ? 'Đang tải...' : 'Xem thêm' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10">
        <h3 class="text-xl font-bold text-white mb-4">Tạo ảnh AI miễn phí</h3>
        <p class="text-gray-400 mb-4">Đăng nhập để nhận 3 lượt tạo ảnh miễn phí mỗi ngày!</p>
        <div class="space-y-3">
          <button class="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
            <span>🔍</span>
            <span>Đăng nhập với Google</span>
          </button>
          <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>📘</span>
            <span>Đăng nhập với Facebook</span>
          </button>
          <button class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
            <span>🇻🇳</span>
            <span>Đăng nhập với Zalo</span>
          </button>
        </div>
        <button @click="showLoginModal = false" class="w-full mt-4 text-gray-400 hover:text-white transition-colors">
          Đóng
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="selectedImage = null">
      <div class="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-white">{{ selectedImage.prompt.title }}</h3>
            <button @click="selectedImage = null" class="text-gray-400 hover:text-white text-2xl">
              ✕
            </button>
          </div>
          
          <img 
            :src="getImageUrl(selectedImage)" 
            :alt="selectedImage.prompt.title"
            class="w-full rounded-xl mb-4"
          >
          
          <div class="bg-gray-800 rounded-xl p-4 mb-4">
            <h4 class="text-white font-semibold mb-2">Prompt:</h4>
            <p class="text-gray-300 mb-3">{{ selectedImage.prompt.body }}</p>
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Sao chép Prompt
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in selectedImage.prompt.tags" 
              :key="tag"
              class="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'MyAIware - Chia sẻ ảnh AI và Prompt tuyệt vời',
  meta: [
    { name: 'description', content: 'Khám phá và chia sẻ những hình ảnh AI tuyệt đẹp cùng prompt. Từ ảnh cưới studio đến ảnh trung thu, tìm hiểu cách tạo ra những tác phẩm nghệ thuật độc đáo.' },
    { property: 'og:title', content: 'MyAIware - Chia sẻ ảnh AI và Prompt tuyệt vời' },
    { property: 'og:description', content: 'Khám phá và chia sẻ những hình ảnh AI tuyệt đẹp cùng prompt. Từ ảnh cưới studio đến ảnh trung thu.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

// Reactive state
const selectedCategory = ref('all')
const loading = ref(true)
const loadingMore = ref(false)
const showLoginModal = ref(false)
const selectedImage = ref(null)
const gallerySection = ref(null)

// Categories with Vietnamese names and icons
const categories = ref([
  { id: 'all', name: 'Tất cả', icon: '🎨' },
  { id: 'wedding', name: 'Ảnh cưới Studio', icon: '💒' },
  { id: 'festival', name: 'Trung thu', icon: '🏮' },
  { id: 'portrait', name: 'Ảnh thẻ', icon: '📸' },
  { id: 'landscape', name: 'Phong cảnh', icon: '🏔️' },
  { id: 'anime', name: 'Anime', icon: '🎭' },
  { id: 'art', name: 'Nghệ thuật', icon: '🎨' }
])

// Mock data
const images = ref([])

// Computed
const filteredImages = computed(() => {
  if (selectedCategory.value === 'all') {
    return images.value
  }
  return images.value.filter(img => img.prompt.category === selectedCategory.value)
})

// Methods
const scrollToGallery = () => {
  gallerySection.value?.scrollIntoView({ behavior: 'smooth' })
}

const openImageModal = (image) => {
  selectedImage.value = image
}

const getImageUrl = (image) => {
  // Use placeholder images for demo
  const width = image.width || 400
  const height = image.height || 600
  return `https://picsum.photos/${width}/${height}?random=${image.id}`
}

const loadMore = () => {
  loadingMore.value = true
  setTimeout(() => {
    const newImages = generateMockImages(12)
    images.value.push(...newImages)
    loadingMore.value = false
  }, 1000)
}

// Generate mock data
function generateMockImages(count) {
  const prompts = [
    {
      title: 'Ảnh cưới studio lãng mạn',
      body: 'Cặp đôi trong studio với ánh sáng mềm mại, trang phục cưới truyền thống Việt Nam, nền trắng tinh khôi, phong cách nhiếp ảnh chuyên nghiệp',
      category: 'wedding',
      tags: ['ảnh-cưới', 'studio', 'lãng-mạn', 'việt-nam']
    },
    {
      title: 'Thiếu nữ áo dài trung thu',
      body: 'Cô gái xinh đẹp mặc áo dài truyền thống, cầm đèn lồng, bối cảnh trăng rằm, hoa sen, phong cách cổ điển Việt Nam',
      category: 'festival',
      tags: ['trung-thu', 'áo-dài', 'đèn-lồng', 'truyền-thống']
    },
    {
      title: 'Ảnh thẻ chuyên nghiệp',
      body: 'Chân dung chuyên nghiệp, ánh sáng đều, nền trắng, trang phục công sở, biểu cảm tự nhiên, chất lượng cao',
      category: 'portrait',
      tags: ['ảnh-thẻ', 'chuyên-nghiệp', 'chân-dung', 'công-sở']
    },
    {
      title: 'Phong cảnh Việt Nam tuyệt đẹp',
      body: 'Cảnh đẹp Việt Nam, ruộng bậc thang Sapa, ánh sáng vàng buổi sáng, sương mù, phong cách nhiếp ảnh phong cảnh',
      category: 'landscape',
      tags: ['phong-cảnh', 'sapa', 'ruộng-bậc-thang', 'việt-nam']
    }
  ]

  return Array.from({ length: count }, (_, i) => {
    const prompt = prompts[i % prompts.length]
    return {
      id: `img-${Date.now()}-${i}`,
      width: 400 + Math.floor(Math.random() * 400),
      height: 500 + Math.floor(Math.random() * 400),
      prompt: {
        id: `prompt-${i}`,
        title: prompt.title,
        body: prompt.body,
        tags: prompt.tags,
        category: prompt.category
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
    }
  })
}

// Initialize
onMounted(() => {
  setTimeout(() => {
    images.value = generateMockImages(20)
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>