  <template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 scroll-smooth">
      <!-- Navigation Header -->
      <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10 transition-all duration-500" :class="{ 'shadow-lg': scrolled }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <img src="/myaiware-logo.png" alt="MyAIware" class="w-10 h-10 rounded-xl shadow-lg transition-transform duration-300 hover:scale-110">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MyAIware
              </h1>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#discover" @click="smoothScroll('discover')" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group">
                Khám phá
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <NuxtLink to="/gallery" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium relative group">
                Thư viện
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </NuxtLink>
              <CategoryMenu />
            </div>
            <div class="flex items-center space-x-4">
              <button @click="showLoginModal = true" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section with Parallax -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Logo Animation -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <img src="/myaiware-logo.png" alt="MyAIware" class="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl animate-float">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl animate-pulse"></div>
          </div>
        </div>

        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Chia sẻ ảnh AI
          </span>
          <br>
          <span class="text-gray-800 dark:text-white">cùng prompt tuyệt vời</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Khám phá, tạo và chia sẻ những hình ảnh AI tuyệt đẹp. Từ ảnh cưới studio đến ảnh trung thu, 
          tìm hiểu prompt để tạo ra những tác phẩm nghệ thuật độc đáo.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button @click="smoothScroll('gallery')" class="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <span class="flex items-center justify-center space-x-2">
              <span>Khám phá ngay</span>
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
          <button @click="showLoginModal = true" class="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/20 dark:border-white/20 text-gray-800 dark:text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            Tạo ảnh AI miễn phí
          </button>
        </div>

        <!-- Stats with Animation -->
        <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div class="text-center group">
            <div class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-all duration-300 group-hover:scale-110" data-counter="10000">10K+</div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">Hình ảnh AI</div>
          </div>
          <div class="text-center group">
            <div class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-all duration-300 group-hover:scale-110" data-counter="5000">5K+</div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">Prompt chất lượng</div>
          </div>
          <div class="text-center group">
            <div class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-all duration-300 group-hover:scale-110" data-counter="2000">2K+</div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">Người sáng tạo</div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Category Filter Section -->
    <section id="categories" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Danh mục phổ biến
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Khám phá các thể loại ảnh AI đa dạng từ nghệ thuật đến thương mại
          </p>
        </div>

        <div class="flex flex-wrap gap-4 justify-center mb-12">
          <button 
            v-for="(category, index) in categories" 
            :key="index"
            @click="selectedCategory = category.id"
            :class="[
              'px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105',
              selectedCategory === category.id 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            ]"
          >
            <span class="flex items-center space-x-2">
              <span>{{ category.icon }}</span>
              <span>{{ category.name }}</span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Modern Photo Gallery -->
    <section id="gallery" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Bộ sưu tập tuyệt vời
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Những tác phẩm AI đẹp nhất được tạo ra bởi cộng đồng MyAIware
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 12" :key="i" class="group">
            <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden animate-pulse aspect-square"></div>
          </div>
        </div>

        <!-- Masonry Gallery -->
        <div v-else class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <div 
            v-for="(image, index) in filteredImages" 
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
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
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
        <div class="text-center mt-16">
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Xem thêm tác phẩm
          </button>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" @click="closeLightbox">
      <div class="relative max-w-7xl max-h-full">
        <button @click="closeLightbox" class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="relative">
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
          
          <button v-if="lightboxIndex < filteredImages.length - 1" @click.stop="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Image Info -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
          <h3 class="text-2xl font-bold mb-2">{{ currentLightboxImage?.prompt.title }}</h3>
          <p class="text-gray-200 mb-4">{{ currentLightboxImage?.prompt.body }}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img :src="currentLightboxImage?.user.avatar" :alt="currentLightboxImage?.user.handle" class="w-8 h-8 rounded-full">
              <span class="font-medium">@{{ currentLightboxImage?.user.handle }}</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
                </svg>
                <span>{{ currentLightboxImage?.likes || 0 }}</span>
              </button>
              <button class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Sao chép Prompt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="showLoginModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700 shadow-2xl" @click.stop>
        <div class="text-center mb-6">
          <img src="/myaiware-logo.png" alt="MyAIware" class="w-16 h-16 mx-auto mb-4 rounded-xl shadow-lg">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Đăng nhập MyAIware</h3>
          <p class="text-gray-600 dark:text-gray-400">Nhận 3 lượt tạo ảnh miễn phí mỗi ngày!</p>
        </div>
        
        <div class="space-y-4">
          <button class="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Đăng nhập với Google</span>
          </button>
          
          <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-3">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Đăng nhập với Facebook</span>
          </button>
          
          <button class="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-3">
            <div class="w-5 h-5 bg-white rounded text-blue-500 flex items-center justify-center text-xs font-bold">Z</div>
            <span>Đăng nhập với Zalo</span>
          </button>
        </div>
        
        <button @click="showLoginModal = false" class="mt-6 w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium">
          Đóng
        </button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center space-x-3 mb-6">
                <img src="/myaiware-logo.png" alt="MyAIware" class="w-12 h-12 rounded-xl shadow-lg">
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MyAIware</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                Nền tảng chia sẻ ảnh AI và prompt hàng đầu Việt Nam. Khám phá, tạo và chia sẻ những tác phẩm nghệ thuật AI tuyệt vời.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 class="text-gray-800 dark:text-white font-semibold mb-4">Nền tảng</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#discover" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Khám phá</a></li>
                <li><NuxtLink to="/gallery" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Thư viện</NuxtLink></li>
                <li><NuxtLink to="/category/wedding" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ảnh cưới</NuxtLink></li>
                <li><NuxtLink to="/category/anime" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Anime</NuxtLink></li>
              </ul>
            </div>
            <div>
              <h3 class="text-gray-800 dark:text-white font-semibold mb-4">Hỗ trợ</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#help" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#contact" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Liên hệ</a></li>
                <li><a href="#privacy" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#terms" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Điều khoản sử dụng</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 MyAIware. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// SEO
useHead({
  title: 'MyAIware - Chia sẻ ảnh AI và Prompt tuyệt vời',
  meta: [
    { name: 'description', content: 'Nền tảng chia sẻ ảnh AI và prompt hàng đầu Việt Nam. Khám phá, tạo và chia sẻ những hình ảnh AI tuyệt đẹp cùng prompt chất lượng cao.' },
    { property: 'og:title', content: 'MyAIware - Chia sẻ ảnh AI và Prompt tuyệt vời' },
    { property: 'og:description', content: 'Khám phá và chia sẻ những hình ảnh AI tuyệt đẹp cùng prompt chất lượng cao.' },
    { property: 'og:image', content: '/myaiware-logo.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'theme-color', content: '#3B82F6' },
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

// Reactive data
const images = ref<Image[]>([]);
const pending = ref(true);
const showLoginModal = ref(false);
const scrolled = ref(false);
const selectedCategory = ref('all');
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

// Categories
const categories = ref<Category[]>([
  { id: 'all', name: 'Tất cả', icon: '🎨' },
  { id: 'wedding', name: 'Ảnh cưới Studio', icon: '💒' },
  { id: 'festival', name: 'Trung thu', icon: '🏮' },
  { id: 'portrait', name: 'Ảnh thẻ', icon: '📸' },
  { id: 'landscape', name: 'Phong cảnh', icon: '🏔️' },
  { id: 'anime', name: 'Anime', icon: '🎭' },
  { id: 'art', name: 'Nghệ thuật', icon: '🎨' },
]);

// Mock data
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
    id: '2',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    prompt: {
      title: 'Phong cảnh núi non hùng vĩ',
      body: 'Majestic mountain landscape at golden hour, dramatic clouds, misty valleys, cinematic composition, ultra-detailed, photorealistic'
    },
    user: {
      handle: 'nature_artist',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=nature_artist'
    },
    likes: 189,
    views: 890,
    category: 'landscape'
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
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    prompt: {
      title: 'Ảnh thẻ chuyên nghiệp',
      body: 'Professional headshot photo, clean background, perfect lighting, business attire, confident expression, high resolution'
    },
    user: {
      handle: 'portrait_master',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=portrait_master'
    },
    likes: 123,
    views: 567,
    category: 'portrait'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop',
    prompt: {
      title: 'Lễ hội trung thu rực rỡ',
      body: 'Mid-autumn festival celebration, colorful lanterns, traditional Vietnamese decorations, warm lighting, festive atmosphere'
    },
    user: {
      handle: 'festival_lover',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=festival_lover'
    },
    likes: 278,
    views: 1100,
    category: 'festival'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    prompt: {
      title: 'Nghệ thuật trừu tượng',
      body: 'Abstract digital art, flowing colors, geometric patterns, modern composition, vibrant palette, artistic expression'
    },
    user: {
      handle: 'abstract_artist',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=abstract_artist'
    },
    likes: 167,
    views: 723,
    category: 'art'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
    prompt: {
      title: 'Rừng thần tiên huyền ảo',
      body: 'Mystical enchanted forest, ethereal lighting, magical atmosphere, ancient trees, misty pathways, fantasy landscape, cinematic depth'
    },
    user: {
      handle: 'fantasy_world',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=fantasy_world'
    },
    likes: 412,
    views: 1850,
    category: 'landscape'
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
    id: '9',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=900&fit=crop',
    prompt: {
      title: 'Samurai anime character',
      body: 'Epic samurai warrior in anime style, detailed armor, katana sword, dramatic pose, cherry blossoms background, high contrast lighting'
    },
    user: {
      handle: 'samurai_art',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=samurai_art'
    },
    likes: 523,
    views: 2100,
    category: 'anime'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop',
    prompt: {
      title: 'CEO portrait chuyên nghiệp',
      body: 'Executive business portrait, confident expression, professional attire, corporate background, high-end photography, leadership presence'
    },
    user: {
      handle: 'corp_photographer',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=corp_photographer'
    },
    likes: 156,
    views: 678,
    category: 'portrait'
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=700&fit=crop',
    prompt: {
      title: 'Đèn lồng trung thu rực rỡ',
      body: 'Colorful mid-autumn festival lanterns, traditional Vietnamese celebration, warm golden lighting, festive decorations, cultural heritage'
    },
    user: {
      handle: 'culture_keeper',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=culture_keeper'
    },
    likes: 334,
    views: 1456,
    category: 'festival'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1100&fit=crop',
    prompt: {
      title: 'Digital art futuristic',
      body: 'Futuristic digital artwork, neon colors, cyberpunk aesthetic, geometric shapes, glowing effects, modern technology theme'
    },
    user: {
      handle: 'cyber_artist',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=cyber_artist'
    },
    likes: 445,
    views: 1789,
    category: 'art'
  },
  {
    id: '13',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
    prompt: {
      title: 'Núi Alps hùng vĩ',
      body: 'Majestic Alpine mountains, snow-capped peaks, pristine lakes, dramatic sky, panoramic view, breathtaking natural beauty'
    },
    user: {
      handle: 'mountain_explorer',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=mountain_explorer'
    },
    likes: 267,
    views: 1123,
    category: 'landscape'
  },
  {
    id: '14',
    url: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&h=1000&fit=crop',
    prompt: {
      title: 'Cô dâu bohemian style',
      body: 'Bohemian bride in flowing dress, flower crown, natural outdoor setting, dreamy atmosphere, free-spirited wedding photography'
    },
    user: {
      handle: 'boho_weddings',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=boho_weddings'
    },
    likes: 389,
    views: 1567,
    category: 'wedding'
  },
  {
    id: '15',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
    prompt: {
      title: 'Magical girl anime',
      body: 'Cute magical girl character, sparkly costume, magical wand, pastel colors, kawaii style, shoujo manga aesthetic'
    },
    user: {
      handle: 'magical_dreams',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=magical_dreams'
    },
    likes: 612,
    views: 2456,
    category: 'anime'
  },
  {
    id: '16',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop',
    prompt: {
      title: 'Doanh nhân thành đạt',
      body: 'Successful entrepreneur portrait, modern office background, confident smile, business casual attire, inspiring leadership'
    },
    user: {
      handle: 'success_stories',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=success_stories'
    },
    likes: 198,
    views: 834,
    category: 'portrait'
  },
  {
    id: '17',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=900&fit=crop',
    prompt: {
      title: 'Bánh trung thu truyền thống',
      body: 'Traditional Vietnamese mooncakes, mid-autumn festival treats, elegant presentation, cultural significance, festive arrangement'
    },
    user: {
      handle: 'tradition_lover',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=tradition_lover'
    },
    likes: 223,
    views: 967,
    category: 'festival'
  },
  {
    id: '18',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1300&fit=crop',
    prompt: {
      title: 'Abstract ocean waves',
      body: 'Abstract interpretation of ocean waves, fluid dynamics, blue gradient colors, organic shapes, peaceful meditation art'
    },
    user: {
      handle: 'ocean_dreams',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ocean_dreams'
    },
    likes: 345,
    views: 1234,
    category: 'art'
  },
  {
    id: '19',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    prompt: {
      title: 'Hoàng hôn trên biển',
      body: 'Golden sunset over calm ocean, peaceful seascape, warm colors, romantic atmosphere, horizon line, serene natural beauty'
    },
    user: {
      handle: 'sunset_chaser',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=sunset_chaser'
    },
    likes: 456,
    views: 1890,
    category: 'landscape'
  },
  {
    id: '20',
    url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1100&fit=crop',
    prompt: {
      title: 'Cô dâu hiện đại minimalist',
      body: 'Modern minimalist bride, clean lines, simple elegant dress, contemporary wedding photography, sophisticated style'
    },
    user: {
      handle: 'modern_bride',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=modern_bride'
    },
    likes: 312,
    views: 1445,
    category: 'wedding'
  },
  {
    id: '21',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
    prompt: {
      title: 'Mecha robot anime',
      body: 'Giant mecha robot, detailed mechanical design, action pose, futuristic battlefield, anime style, epic scale'
    },
    user: {
      handle: 'mecha_master',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=mecha_master'
    },
    likes: 678,
    views: 2789,
    category: 'anime'
  },
  {
    id: '22',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
    prompt: {
      title: 'Nữ giám đốc quyền lực',
      body: 'Powerful female executive, confident posture, professional blazer, corporate environment, leadership presence, success mindset'
    },
    user: {
      handle: 'power_women',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=power_women'
    },
    likes: 234,
    views: 1012,
    category: 'portrait'
  },
  {
    id: '23',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=800&fit=crop',
    prompt: {
      title: 'Lân sư rồng trung thu',
      body: 'Traditional dragon dance performance, mid-autumn festival celebration, vibrant colors, cultural performance, festive energy'
    },
    user: {
      handle: 'dragon_dance',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=dragon_dance'
    },
    likes: 567,
    views: 2134,
    category: 'festival'
  },
  {
    id: '24',
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=900&fit=crop',
    prompt: {
      title: 'Mandala sacred geometry',
      body: 'Intricate mandala design, sacred geometry patterns, spiritual artwork, meditative colors, symmetrical composition'
    },
    user: {
      handle: 'sacred_art',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=sacred_art'
    },
    likes: 389,
    views: 1567,
    category: 'art'
  }
];

// Computed properties
const filteredImages = computed(() => {
  if (selectedCategory.value === 'all') {
    return images.value;
  }
  return images.value.filter(image => image.category === selectedCategory.value);
});

const currentLightboxImage = computed(() => {
  return filteredImages.value[lightboxIndex.value];
});

// Methods
const smoothScroll = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
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
  if (lightboxIndex.value < filteredImages.value.length - 1) {
    lightboxIndex.value++;
  }
};

const previousImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--;
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    images.value = mockImages;
    pending.value = false;
  }, 1000);

  // Add scroll listener
  window.addEventListener('scroll', handleScroll);

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
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}
</style>