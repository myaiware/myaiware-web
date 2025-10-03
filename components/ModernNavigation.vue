<template>
  <nav class="fixed top-0 w-full z-50 transition-all duration-500" :class="navClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <img 
                src="/myaiware-logo.png" 
                alt="MyAIware" 
                class="w-10 h-10 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
              >
              <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="flex flex-col">
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MyAIware
              </h1>
              <span class="text-xs text-gray-500 dark:text-gray-400 -mt-1">AI Image Studio</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <!-- Navigation Pills -->
          <div class="flex items-center space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full p-1 border border-gray-200/50 dark:border-gray-700/50">
            <NavPill 
              v-for="item in navItems" 
              :key="item.id"
              :item="item"
              :is-active="isActive(item)"
              @click="handleNavClick(item)"
            />
          </div>

          <!-- Search Bar -->
          <div class="relative ml-4">
            <div class="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-gray-200/50 dark:border-gray-700/50 px-4 py-2 min-w-[280px] transition-all duration-300 focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <svg class="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Tìm kiếm ảnh AI, prompt..." 
                class="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400"
                v-model="searchQuery"
                @keydown.enter="handleSearch"
              >
              <kbd class="hidden sm:inline-flex items-center px-2 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-xs text-gray-500 dark:text-gray-400">⌘K</kbd>
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300"
          >
            <svg v-if="isDark" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
            <svg v-else class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>

          <!-- Notifications -->
          <button class="relative p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300">
            <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
          </button>

          <!-- User Menu / Login -->
          <div class="relative" ref="userMenuContainer">
            <button 
              v-if="user"
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full border-2 border-white/20">
            </button>
            <button 
              v-else
              class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm"
            >
              Đăng nhập
            </button>

            <!-- User Dropdown -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div 
                v-if="showUserMenu && user"
                class="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
              >
                <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div class="flex items-center space-x-3">
                    <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full">
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">{{ user.name }}</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="p-2">
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Hồ sơ</span>
                  </a>
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Cài đặt</span>
                  </a>
                  <hr class="my-2 border-gray-200/50 dark:border-gray-700/50">
                  <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span class="text-sm">Đăng xuất</span>
                  </a>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div 
        v-if="showMobileMenu"
        class="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
      >
        <div class="px-4 py-6 space-y-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              class="w-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-full px-4 py-3 pl-10 text-sm focus:outline-none focus:border-blue-500/50"
              v-model="searchQuery"
            >
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div class="space-y-2">
            <a 
              v-for="item in navItems" 
              :key="item.id"
              :href="item.href"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
              :class="{ 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': isActive(item) }"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span class="font-medium">{{ item.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Navigation items
const navItems = ref([
  { 
    id: 'home', 
    label: 'Trang chủ', 
    href: '/', 
    icon: 'HomeIcon',
    type: 'link'
  },
  { 
    id: 'gallery', 
    label: 'Thư viện', 
    href: '/gallery', 
    icon: 'PhotoIcon',
    type: 'link'
  },
  { 
    id: 'categories', 
    label: 'Danh mục', 
    href: '#', 
    icon: 'Squares2X2Icon',
    type: 'dropdown',
    component: 'CategoryMenu'
  },
  { 
    id: 'generate', 
    label: 'Tạo ảnh', 
    href: '/generate', 
    icon: 'SparklesIcon',
    type: 'link'
  }
]);

// State
const searchQuery = ref('');
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const scrolled = ref(false);
const isDark = ref(false);
const userMenuContainer = ref<HTMLElement>();

// Mock user data
const user = ref(null); // Set to user object when logged in

// Computed
const navClasses = computed(() => ({
  'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10 shadow-lg': scrolled.value,
  'bg-transparent': !scrolled.value
}));

// Methods
const isActive = (item: any) => {
  // Add logic to determine if nav item is active
  return false;
};

const handleNavClick = (item: any) => {
  if (item.type === 'dropdown') {
    // Handle dropdown toggle
  } else {
    // Navigate to link
    navigateTo(item.href);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  // Add theme toggle logic
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const handleClickOutside = (event: MouseEvent) => {
  if (userMenuContainer.value && !userMenuContainer.value.contains(event.target as Node)) {
    showUserMenu.value = false;
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  
  // Check initial scroll position
  handleScroll();
  
  // Check theme preference
  isDark.value = document.documentElement.classList.contains('dark');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.max-h-96::-webkit-scrollbar {
  width: 4px;
}

.max-h-96::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>
