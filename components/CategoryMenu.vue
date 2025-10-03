<template>
  <div class="relative" ref="menuContainer">
    <!-- Category Menu Trigger -->
    <button 
      class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="toggleDropdown"
    >
      <span>Danh mục</span>
      <svg 
        class="w-4 h-4 transition-transform duration-300" 
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
        class="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        @mouseenter="handleDropdownEnter"
        @mouseleave="handleDropdownLeave"
      >
        <!-- Dropdown Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Khám phá theo danh mục</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Tìm kiếm ảnh AI theo chủ đề yêu thích</p>
        </div>

        <!-- Categories Tree -->
        <div class="p-4 max-h-96 overflow-y-auto">
          <div class="space-y-1">
            <div 
              v-for="category in categories" 
              :key="category.id"
              class="group"
            >
              <!-- Main Category -->
              <NuxtLink 
                :to="`/category/${category.id}`"
                class="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:scale-[1.02]"
                @click="closeDropdown"
                @mouseenter="handleDropdownEnter"
                @mouseleave="handleDropdownLeave"
              >
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                    {{ category.icon }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {{ category.name }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ category.count }} ảnh
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button 
                    v-if="category.subcategories && category.subcategories.length > 0"
                    @click.prevent="toggleSubcategories(category.id)"
                    class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <svg 
                      class="w-4 h-4 text-gray-400 transition-transform duration-200" 
                      :class="{ 'rotate-90': expandedCategories.includes(category.id) }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <svg 
                    v-else
                    class="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </NuxtLink>

              <!-- Subcategories -->
              <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0 max-h-0"
                enter-to-class="transform scale-100 opacity-100 max-h-96"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100 max-h-96"
                leave-to-class="transform scale-95 opacity-0 max-h-0"
              >
                        <div 
                          v-if="category.subcategories && expandedCategories.includes(category.id)"
                          class="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-600 pl-4"
                          @mouseenter="handleDropdownEnter"
                          @mouseleave="handleDropdownLeave"
                        >
                  <NuxtLink
                    v-for="subcategory in category.subcategories"
                    :key="subcategory.id"
                    :to="`/category/${category.id}/${subcategory.id}`"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 group/sub"
                    @click="closeDropdown"
                  >
                    <div class="w-2 h-2 bg-gray-400 rounded-full group-hover/sub:bg-blue-500 transition-colors duration-200"></div>
                    <span class="text-sm text-gray-600 dark:text-gray-400 group-hover/sub:text-gray-900 dark:group-hover/sub:text-white transition-colors duration-200">
                      {{ subcategory.name }}
                    </span>
                    <span class="text-xs text-gray-400 ml-auto">
                      {{ subcategory.count }}
                    </span>
                  </NuxtLink>
                </div>
              </Transition>
            </div>
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

interface Subcategory {
  id: string;
  name: string;
  count: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  subcategories?: Subcategory[];
}

// Reactive data
const showDropdown = ref(false);
const expandedCategories = ref<string[]>([]);
const menuContainer = ref<HTMLElement>();
let hideTimeout: NodeJS.Timeout | null = null;

// Fetch categories from API
const { data: categoriesResponse } = await useFetch('/api/categories');
const categories = computed(() => categoriesResponse.value?.data || []);

  // Hover management methods
  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    showDropdown.value = true;
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      showDropdown.value = false;
      expandedCategories.value = []; // Reset expanded categories when closing
    }, 500); // Increased delay for better UX
  };

  const handleDropdownEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  };

  const handleDropdownLeave = () => {
    hideTimeout = setTimeout(() => {
      showDropdown.value = false;
      expandedCategories.value = []; // Reset expanded categories when closing
    }, 500); // Increased delay for better UX
  };

// Toggle methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

const toggleSubcategories = (categoryId: string) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
  } else {
    expandedCategories.value.push(categoryId);
  }
};

const closeDropdown = () => {
  showDropdown.value = false;
  expandedCategories.value = [];
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
};

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (hideTimeout) {
    clearTimeout(hideTimeout);
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
