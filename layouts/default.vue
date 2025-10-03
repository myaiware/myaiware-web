<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 glass border-b border-gray-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">AI</span>
            </div>
            <span class="text-xl font-bold text-gradient">MyAIware</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">
              Discover
            </NuxtLink>
            <NuxtLink to="/generate" class="text-gray-300 hover:text-white transition-colors">
              Generate
            </NuxtLink>
            <NuxtLink to="/collections" class="text-gray-300 hover:text-white transition-colors">
              Collections
            </NuxtLink>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <button class="btn-ghost p-2">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
            </button>

            <!-- Auth buttons -->
            <template v-if="!user">
              <NuxtLink to="/auth/login" class="btn-ghost">
                Sign In
              </NuxtLink>
              <NuxtLink to="/auth/register" class="btn-primary">
                Get Started
              </NuxtLink>
            </template>

            <!-- User menu -->
            <template v-else>
              <div class="relative">
                <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 btn-ghost">
                  <img 
                    :src="user.avatar_url || '/default-avatar.png'" 
                    :alt="user.handle"
                    class="w-6 h-6 rounded-full"
                  >
                  <span class="hidden sm:block">{{ user.handle }}</span>
                </button>

                <!-- Dropdown menu -->
                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 card shadow-lg">
                  <div class="py-1">
                    <NuxtLink :to="`/u/${user.handle}`" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Profile
                    </NuxtLink>
                    <NuxtLink to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Settings
                    </NuxtLink>
                    <hr class="my-1 border-gray-700">
                    <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </template>

            <!-- Mobile menu button -->
            <button @click="showMobileMenu = !showMobileMenu" class="md:hidden btn-ghost p-2">
              <Icon name="heroicons:bars-3" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-700 py-4">
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" class="text-gray-300 hover:text-white px-2 py-1">
              Discover
            </NuxtLink>
            <NuxtLink to="/generate" class="text-gray-300 hover:text-white px-2 py-1">
              Generate
            </NuxtLink>
            <NuxtLink to="/collections" class="text-gray-300 hover:text-white px-2 py-1">
              Collections
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 border-t border-gray-700 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">AI</span>
              </div>
              <span class="text-xl font-bold text-gradient">MyAIware</span>
            </div>
            <p class="text-gray-400 mb-4">
              Share stunning AI images with their prompts — discover, generate, remix.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <Icon name="simple-icons:twitter" class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <Icon name="simple-icons:discord" class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <Icon name="simple-icons:github" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Platform</h3>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/discover" class="hover:text-white">Discover</NuxtLink></li>
              <li><NuxtLink to="/generate" class="hover:text-white">Generate</NuxtLink></li>
              <li><NuxtLink to="/collections" class="hover:text-white">Collections</NuxtLink></li>
              <li><NuxtLink to="/marketplace" class="hover:text-white">Marketplace</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Support</h3>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/help" class="hover:text-white">Help Center</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-white">Privacy</NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-white">Terms</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MyAIware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const user = ref(null) // Will be replaced with actual auth state
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})

const logout = () => {
  // Implement logout logic
  user.value = null
  showUserMenu.value = false
}
</script>
