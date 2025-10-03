<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
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
            <span class="text-blue-600 dark:text-blue-400 font-medium">
              {{ currentCategory?.name }}
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

    <!-- Main Content -->
    <div class="pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <span class="text-6xl mr-4">{{ currentCategory?.icon }}</span>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {{ currentCategory?.name }}
            </h1>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ getCategoryDescription(route.params.slug as string) }}
          </p>
          <div class="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ filteredImages.length }} ảnh</span>
            </span>
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
              </svg>
              <span>{{ totalViews }} lượt xem</span>
            </span>
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
              </svg>
              <span>{{ totalLikes }} lượt thích</span>
            </span>
          </div>
        </div>

        <!-- Sort Options -->
        <div class="mb-8 flex flex-wrap gap-4 justify-center">
          <button 
            v-for="sort in sortOptions" 
            :key="sort.id"
            @click="selectedSort = sort.id"
            :class="[
              'px-4 py-2 rounded-full font-medium transition-all duration-300',
              selectedSort === sort.id 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 shadow-md'
            ]"
          >
            {{ sort.name }}
          </button>
        </div>

        <!-- Gallery Grid -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 12" :key="i" class="group">
            <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden animate-pulse aspect-square"></div>
          </div>
        </div>

        <div v-else-if="filteredImages.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🎨</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Chưa có ảnh nào</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Hãy là người đầu tiên tạo ảnh cho danh mục này!</p>
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Tạo ảnh AI
          </button>
        </div>

        <div v-else class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <div 
            v-for="(image, index) in sortedImages" 
            :key="image.id"
            class="break-inside-avoid group cursor-pointer"
            @click="openLightbox(index)"
          >
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div class="relative overflow-hidden">
                <img 
                  :src="image.url" 
                  :alt="image.prompt.title" 
                  class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <!-- Hover Actions -->
                <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button class="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                  <button class="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                  </button>
                </div>

                <!-- Image Info Overlay -->
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ image.prompt.title }}</h3>
                  <p class="text-sm text-gray-200 line-clamp-2 mb-3">{{ image.prompt.body }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <img :src="image.user.avatar" :alt="image.user.handle" class="w-6 h-6 rounded-full border border-white/20">
                      <span class="text-sm font-medium">@{{ image.user.handle }}</span>
                    </div>
                    <div class="flex items-center space-x-3 text-sm">
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
                        </svg>
                        <span>{{ image.likes || 0 }}</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                        </svg>
                        <span>{{ image.views || 0 }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="filteredImages.length > 0" class="text-center mt-12">
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Tải thêm ảnh
          </button>
        </div>

        <!-- Related Categories -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Danh mục liên quan</h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink 
              v-for="category in relatedCategories" 
              :key="category.id"
              :to="`/category/${category.id}`"
              class="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <span class="text-2xl">{{ category.icon }}</span>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ category.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal (same as gallery page) -->
    <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" @click="closeLightbox">
      <div class="relative max-w-7xl max-h-[90vh] mx-4" @click.stop>
        <!-- Close Button -->
        <button @click="closeLightbox" class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Main Image -->
        <img 
          :src="currentLightboxImage?.url" 
          :alt="currentLightboxImage?.prompt.title"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        >
        
        <!-- Navigation Arrows -->
        <button v-if="lightboxIndex > 0" @click.stop="previousImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button v-if="lightboxIndex < sortedImages.length - 1" @click.stop="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Image Info -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-2xl font-bold mb-2">{{ currentLightboxImage?.prompt.title }}</h2>
          <p class="text-gray-300 mb-4">{{ currentLightboxImage?.prompt.body }}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img :src="currentLightboxImage?.user.avatar" :alt="currentLightboxImage?.user.handle" class="w-10 h-10 rounded-full border-2 border-white/20">
              <div>
                <p class="font-semibold">@{{ currentLightboxImage?.user.handle }}</p>
                <p class="text-sm text-gray-400">Nghệ sĩ AI</p>
              </div>
            </div>
            <div class="flex items-center space-x-6">
              <button class="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
                </svg>
                <span>{{ currentLightboxImage?.likes || 0 }}</span>
              </button>
              <button class="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                <span>Chia sẻ</span>
              </button>
              <button class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span>Copy Prompt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const route = useRoute();

// SEO
useHead({
  title: () => `${currentCategory.value?.name || 'Danh mục'} - MyAIware`,
  meta: [
    { name: 'description', content: () => getCategoryDescription(route.params.slug as string) },
    { property: 'og:title', content: () => `${currentCategory.value?.name || 'Danh mục'} - MyAIware` },
    { property: 'og:description', content: () => getCategoryDescription(route.params.slug as string) },
  ],
});

interface Image {
  id: string;
  url: string;
  prompt: {
    title: string;
    body: string;
  };
  user: {
    handle: string;
    avatar: string;
  };
  likes?: number;
  views?: number;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface SortOption {
  id: string;
  name: string;
}

// Reactive data
const images = ref<Image[]>([]);
const pending = ref(true);
const selectedSort = ref('newest');
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

// Categories
const categories = ref<Category[]>([
  { id: 'wedding', name: 'Ảnh cưới Studio', icon: '💒' },
  { id: 'festival', name: 'Trung thu', icon: '🏮' },
  { id: 'portrait', name: 'Ảnh thẻ', icon: '📸' },
  { id: 'landscape', name: 'Phong cảnh', icon: '🏔️' },
  { id: 'anime', name: 'Anime', icon: '🎭' },
  { id: 'art', name: 'Nghệ thuật', icon: '🎨' },
]);

// Sort options
const sortOptions = ref<SortOption[]>([
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến' },
  { id: 'most_liked', name: 'Nhiều lượt thích' },
  { id: 'most_viewed', name: 'Nhiều lượt xem' },
]);

// Mock data (same as before but with more variety)
const mockImages: Image[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1200&fit=crop',
    prompt: {
      title: 'Cô dâu xinh đẹp trong studio',
      body: 'Beautiful bride in elegant white wedding dress, professional studio lighting, soft romantic atmosphere, high fashion photography, detailed facial features, perfect makeup'
    },
    user: {
      handle: 'wedding_pro',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=wedding_pro'
    },
    likes: 245,
    views: 1200,
    category: 'wedding'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop',
    prompt: {
      title: 'Cô dâu phong cách vintage',
      body: 'Vintage style bride portrait, classic wedding dress, retro makeup, soft sepia tones, romantic atmosphere, timeless elegance'
    },
    user: {
      handle: 'vintage_bride',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=vintage_bride'
    },
    likes: 298,
    views: 1340,
    category: 'wedding'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop',
    prompt: {
      title: 'Anime girl với phong cách hiện đại',
      body: 'Modern anime girl character, vibrant colors, detailed eyes, flowing hair, urban background, digital art style, high quality illustration'
    },
    user: {
      handle: 'anime_creator',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=anime_creator'
    },
    likes: 356,
    views: 1500,
    category: 'anime'
  },
  // Add more images for different categories...
];

// Computed properties
const currentCategory = computed(() => {
  return categories.value.find(cat => cat.id === route.params.slug);
});

const filteredImages = computed(() => {
  return images.value.filter(image => image.category === route.params.slug);
});

const sortedImages = computed(() => {
  const sorted = [...filteredImages.value];
  
  switch (selectedSort.value) {
    case 'popular':
      return sorted.sort((a, b) => ((b.likes || 0) + (b.views || 0)) - ((a.likes || 0) + (a.views || 0)));
    case 'most_liked':
      return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    case 'most_viewed':
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    case 'newest':
    default:
      return sorted; // Assume they're already in newest order
  }
});

const currentLightboxImage = computed(() => {
  return sortedImages.value[lightboxIndex.value];
});

const totalViews = computed(() => {
  return filteredImages.value.reduce((sum, img) => sum + (img.views || 0), 0);
});

const totalLikes = computed(() => {
  return filteredImages.value.reduce((sum, img) => sum + (img.likes || 0), 0);
});

const relatedCategories = computed(() => {
  return categories.value.filter(cat => cat.id !== route.params.slug).slice(0, 4);
});

// Methods
const getCategoryDescription = (slug: string): string => {
  const descriptions: Record<string, string> = {
    wedding: 'Khám phá bộ sưu tập ảnh cưới studio tuyệt đẹp được tạo bằng AI, từ phong cách cổ điển đến hiện đại.',
    anime: 'Thế giới anime sống động với những nhân vật được thiết kế bằng AI, đầy màu sắc và cảm xúc.',
    landscape: 'Những khung cảnh thiên nhiên hùng vĩ và thơ mộng được tái hiện qua công nghệ AI.',
    portrait: 'Bộ sưu tập ảnh thẻ chuyên nghiệp và ảnh chân dung được tạo bằng AI với chất lượng cao.',
    festival: 'Không khí lễ hội trung thu ấm áp với đèn lồng rực rỡ và truyền thống văn hóa Việt Nam.',
    art: 'Nghệ thuật số và tác phẩm trừu tượng độc đáo được sáng tạo bởi trí tuệ nhân tạo.',
  };
  return descriptions[slug] || 'Khám phá bộ sưu tập ảnh AI tuyệt đẹp trong danh mục này.';
};

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = 'auto';
};

const nextImage = () => {
  if (lightboxIndex.value < sortedImages.value.length - 1) {
    lightboxIndex.value++;
  }
};

const previousImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--;
  }
};

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    images.value = mockImages;
    pending.value = false;
  }, 1000);

  // Keyboard navigation for lightbox
  const handleKeydown = (e: KeyboardEvent) => {
    if (lightboxOpen.value) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  };
  
  window.addEventListener('keydown', handleKeydown);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
