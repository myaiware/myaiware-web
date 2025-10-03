<template>
  <div class="relative group">
    <!-- Category Menu Trigger -->
    <button 
      class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
      @mouseenter="showDropdown = true"
      @mouseleave="handleMouseLeave"
    >
      <span>Danh mục</span>
      <svg 
        class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
        :class="{ 'rotate-180': showDropdown }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
      <span class="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="showDropdown"
        class="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        @mouseenter="showDropdown = true"
        @mouseleave="handleMouseLeave"
      >
        <!-- Dropdown Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Khám phá theo danh mục</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Tìm kiếm ảnh AI theo chủ đề yêu thích</p>
        </div>

        <!-- Categories Grid -->
        <div class="p-4">
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink 
              v-for="category in categories" 
              :key="category.id"
              :to="`/category/${category.id}`"
              class="group flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:scale-105"
              @click="closeDropdown"
            >
              <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                {{ category.icon }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ category.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ category.count }} ảnh
                </p>
              </div>
              <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Dropdown Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink 
            to="/gallery" 
            class="flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
            @click="closeDropdown"
          >
            <span>Xem tất cả danh mục</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

// Reactive data
const showDropdown = ref(false);
let hideTimeout: NodeJS.Timeout | null = null;

// Categories data
const categories = ref<Category[]>([
  {
    id: 'wedding',
    name: 'Ảnh cưới Studio',
    icon: '💒',
    count: 1247,
    description: 'Ảnh cưới chuyên nghiệp với studio lighting'
  },
  {
    id: 'anime',
    name: 'Anime & Manga',
    icon: '🎭',
    count: 2156,
    description: 'Nhân vật anime và manga style'
  },
  {
    id: 'landscape',
    name: 'Phong cảnh',
    icon: '🏔️',
    count: 1834,
    description: 'Thiên nhiên và cảnh quan tuyệt đẹp'
  },
  {
    id: 'portrait',
    name: 'Ảnh thẻ',
    icon: '📸',
    count: 987,
    description: 'Chân dung chuyên nghiệp và ảnh thẻ'
  },
  {
    id: 'festival',
    name: 'Lễ hội Trung thu',
    icon: '🏮',
    count: 543,
    description: 'Không khí lễ hội truyền thống Việt Nam'
  },
  {
    id: 'art',
    name: 'Nghệ thuật số',
    icon: '🎨',
    count: 1678,
    description: 'Tác phẩm nghệ thuật và abstract art'
  },
  {
    id: 'fashion',
    name: 'Thời trang',
    icon: '👗',
    count: 892,
    description: 'Xu hướng thời trang và street style'
  },
  {
    id: 'architecture',
    name: 'Kiến trúc',
    icon: '🏛️',
    count: 654,
    description: 'Công trình kiến trúc và nội thất'
  }
]);

// Methods
const handleMouseLeave = () => {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 150); // Small delay to allow moving to dropdown
};

const closeDropdown = () => {
  showDropdown.value = false;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

// Cleanup
onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});

// Clear timeout when mouse enters dropdown
const clearHideTimeout = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

// Watch for dropdown show/hide
watch(() => showDropdown.value, (newValue) => {
  if (newValue) {
    clearHideTimeout();
  }
});
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.dark .glass {
  background: rgba(17, 24, 39, 0.8);
}

/* Custom scrollbar for dropdown if needed */
.dropdown-content::-webkit-scrollbar {
  width: 4px;
}

.dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>
