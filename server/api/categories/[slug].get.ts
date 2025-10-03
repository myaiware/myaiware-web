export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  // Mock categories data - same as index but filtered by slug
  const categories = [
    {
      id: 'wedding',
      name: 'Ảnh cưới Studio',
      slug: 'wedding',
      icon: '💒',
      count: 1247,
      description: 'Ảnh cưới chuyên nghiệp với studio lighting, trang phục đẹp và không gian lãng mạn',
      color: 'pink',
      gradient: 'from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-pink-900 dark:to-purple-900',
      subcategories: [
        { id: 'traditional', name: 'Cưới truyền thống', slug: 'traditional', count: 456 },
        { id: 'modern', name: 'Cưới hiện đại', slug: 'modern', count: 321 },
        { id: 'outdoor', name: 'Cưới ngoại cảnh', slug: 'outdoor', count: 289 },
        { id: 'prewedding', name: 'Ảnh cưới concept', slug: 'prewedding', count: 181 }
      ],
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=1200&fit=crop',
          title: 'Cô dâu xinh đẹp trong studio',
          prompt: 'Beautiful bride in elegant white wedding dress, professional studio lighting, soft romantic atmosphere',
          user: { handle: 'wedding_pro', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=wedding_pro' },
          likes: 245,
          views: 1200
        }
      ]
    },
    {
      id: 'anime',
      name: 'Anime & Manga',
      slug: 'anime',
      icon: '🎭',
      count: 2156,
      description: 'Nhân vật anime và manga style với phong cách Nhật Bản độc đáo',
      color: 'purple',
      gradient: 'from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900',
      subcategories: [
        { id: 'character', name: 'Nhân vật anime', slug: 'character', count: 892 },
        { id: 'scenery', name: 'Phong cảnh anime', slug: 'scenery', count: 567 },
        { id: 'chibi', name: 'Chibi style', slug: 'chibi', count: 334 },
        { id: 'realistic', name: 'Anime realistic', slug: 'realistic', count: 363 }
      ],
      images: []
    },
    {
      id: 'landscape',
      name: 'Phong cảnh',
      slug: 'landscape',
      icon: '🏔️',
      count: 1834,
      description: 'Thiên nhiên và cảnh quan tuyệt đẹp từ khắp nơi trên thế giới',
      color: 'green',
      gradient: 'from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900',
      subcategories: [
        { id: 'mountain', name: 'Núi non', slug: 'mountain', count: 456 },
        { id: 'ocean', name: 'Biển cả', slug: 'ocean', count: 389 },
        { id: 'forest', name: 'Rừng cây', slug: 'forest', count: 334 },
        { id: 'sunset', name: 'Hoàng hôn', slug: 'sunset', count: 655 }
      ],
      images: []
    },
    {
      id: 'portrait',
      name: 'Ảnh thẻ',
      slug: 'portrait',
      icon: '📸',
      count: 987,
      description: 'Chân dung chuyên nghiệp và ảnh thẻ cho mọi mục đích sử dụng',
      color: 'blue',
      gradient: 'from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900',
      subcategories: [
        { id: 'professional', name: 'Ảnh thẻ công sở', slug: 'professional', count: 445 },
        { id: 'student', name: 'Ảnh thẻ học sinh', slug: 'student', count: 234 },
        { id: 'passport', name: 'Ảnh hộ chiếu', slug: 'passport', count: 189 },
        { id: 'visa', name: 'Ảnh visa', slug: 'visa', count: 119 }
      ],
      images: []
    },
    {
      id: 'festival',
      name: 'Lễ hội Trung thu',
      slug: 'festival',
      icon: '🏮',
      count: 543,
      description: 'Không khí lễ hội truyền thống Việt Nam đầy màu sắc',
      color: 'orange',
      gradient: 'from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900 dark:to-amber-900',
      subcategories: [
        { id: 'lantern', name: 'Đèn lồng', slug: 'lantern', count: 234 },
        { id: 'mooncake', name: 'Bánh trung thu', slug: 'mooncake', count: 156 },
        { id: 'children', name: 'Trẻ em rước đèn', slug: 'children', count: 98 },
        { id: 'decoration', name: 'Trang trí lễ hội', slug: 'decoration', count: 55 }
      ],
      images: []
    },
    {
      id: 'art',
      name: 'Nghệ thuật số',
      slug: 'art',
      icon: '🎨',
      count: 1678,
      description: 'Tác phẩm nghệ thuật và abstract art sáng tạo',
      color: 'indigo',
      gradient: 'from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900',
      subcategories: [
        { id: 'abstract', name: 'Trừu tượng', slug: 'abstract', count: 567 },
        { id: 'digital', name: 'Nghệ thuật số', slug: 'digital', count: 445 },
        { id: 'concept', name: 'Concept art', slug: 'concept', count: 334 },
        { id: 'illustration', name: 'Minh họa', slug: 'illustration', count: 332 }
      ],
      images: []
    },
    {
      id: 'fashion',
      name: 'Thời trang',
      slug: 'fashion',
      icon: '👗',
      count: 892,
      description: 'Xu hướng thời trang và street style hiện đại',
      color: 'pink',
      gradient: 'from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-pink-900 dark:to-purple-900',
      subcategories: [
        { id: 'streetwear', name: 'Street style', slug: 'streetwear', count: 234 },
        { id: 'formal', name: 'Trang phục công sở', slug: 'formal', count: 189 },
        { id: 'casual', name: 'Thời trang thường ngày', slug: 'casual', count: 267 },
        { id: 'haute-couture', name: 'Haute couture', slug: 'haute-couture', count: 202 }
      ],
      images: []
    },
    {
      id: 'architecture',
      name: 'Kiến trúc',
      slug: 'architecture',
      icon: '🏛️',
      count: 654,
      description: 'Công trình kiến trúc và nội thất đẹp mắt',
      color: 'gray',
      gradient: 'from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900',
      subcategories: [
        { id: 'modern', name: 'Kiến trúc hiện đại', slug: 'modern', count: 234 },
        { id: 'traditional', name: 'Kiến trúc cổ điển', slug: 'traditional', count: 167 },
        { id: 'interior', name: 'Nội thất', slug: 'interior', count: 145 },
        { id: 'exterior', name: 'Ngoại thất', slug: 'exterior', count: 108 }
      ],
      images: []
    }
  ];

  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: `Category '${slug}' not found`
    });
  }

  return {
    success: true,
    data: category
  };
});
