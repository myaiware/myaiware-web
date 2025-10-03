<template>
  <div class="min-h-screen" :class="category?.gradient || 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900'">
    <!-- Navigation Header -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10 transition-all duration-500 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <img src="/myaiware-logo.png" alt="MyAIware" class="w-10 h-10 rounded-xl shadow-lg transition-transform duration-300 hover:scale-110">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MyAIware
              </h1>
            </NuxtLink>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group">
              Trang chủ
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <NuxtLink to="/gallery" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group">
              Thư viện
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
            <CategoryMenu />
            <span class="text-blue-600 dark:text-blue-400 font-medium flex items-center space-x-2">
              <span class="text-2xl">{{ category?.icon }}</span>
              <span>{{ category?.name }}</span>
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="pending" class="pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải danh mục...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center py-16">
          <div class="text-6xl mb-4">😔</div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Không tìm thấy danh mục</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Danh mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <NuxtLink to="/gallery" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Về thư viện
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="category" class="pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <span class="text-6xl mr-4">{{ category.icon }}</span>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {{ category.name }}
            </h1>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ category.description }}
          </p>
          <div class="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ category.count }} ảnh</span>
            </span>
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ Math.floor(category.count * 4.2) }}K lượt xem</span>
            </span>
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
              </svg>
              <span>{{ Math.floor(category.count * 2.1) }}K lượt thích</span>
            </span>
          </div>
        </div>

        <!-- Subcategories -->
        <div v-if="category.subcategories && category.subcategories.length > 0" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Phân loại chi tiết</h2>
          <div class="flex flex-wrap gap-3 justify-center">
            <button class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg">
              Tất cả
            </button>
            <button 
              v-for="subcategory in category.subcategories" 
              :key="subcategory.id"
              class="px-6 py-3 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-full font-medium shadow-md transition-all duration-300 hover:scale-105"
            >
              {{ subcategory.name }} ({{ subcategory.count }})
            </button>
          </div>
        </div>

        <!-- Gallery Placeholder -->
        <div class="text-center py-16">
          <div class="text-6xl mb-4">{{ category.icon }}</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bộ sưu tập {{ category.name.toLowerCase() }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Sắp có những hình ảnh {{ category.name.toLowerCase() }} tuyệt đẹp được tạo bằng AI!</p>
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Tạo ảnh {{ category.name }} AI
          </button>
        </div>

        <!-- Related Categories -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Danh mục liên quan</h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink 
              v-for="relatedCategory in getRelatedCategories()" 
              :key="relatedCategory.id"
              :to="`/category/${relatedCategory.slug}`"
              class="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span class="text-2xl">{{ relatedCategory.icon }}</span>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ relatedCategory.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get route params
const route = useRoute();
const slug = route.params.slug as string;

// Fetch category data
const { data: categoryData, pending, error } = await $fetch(`/api/categories/${slug}`).catch(() => ({ data: null, pending: false, error: true }));
const category = categoryData?.data;

// SEO
useHead({
  title: category ? `${category.name} - MyAIware` : 'Danh mục không tồn tại - MyAIware',
  meta: [
    { name: 'description', content: category?.description || 'Danh mục không tồn tại' },
    { property: 'og:title', content: category ? `${category.name} - MyAIware` : 'Danh mục không tồn tại' },
    { property: 'og:description', content: category?.description || 'Danh mục không tồn tại' },
  ],
});

// Get related categories (mock function)
const getRelatedCategories = () => {
  const allCategories = [
    { id: 'wedding', name: 'Ảnh cưới Studio', slug: 'wedding', icon: '💒' },
    { id: 'anime', name: 'Anime & Manga', slug: 'anime', icon: '🎭' },
    { id: 'landscape', name: 'Phong cảnh', slug: 'landscape', icon: '🏔️' },
    { id: 'portrait', name: 'Ảnh thẻ', slug: 'portrait', icon: '📸' },
    { id: 'festival', name: 'Lễ hội Trung thu', slug: 'festival', icon: '🏮' },
    { id: 'art', name: 'Nghệ thuật số', slug: 'art', icon: '🎨' },
    { id: 'fashion', name: 'Thời trang', slug: 'fashion', icon: '👗' },
    { id: 'architecture', name: 'Kiến trúc', slug: 'architecture', icon: '🏛️' }
  ];
  
  return allCategories
    .filter(cat => cat.slug !== slug)
    .slice(0, 3);
};
</script>