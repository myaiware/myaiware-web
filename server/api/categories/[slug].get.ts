export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  // Mock categories data - same as index but with additional image data
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
        { id: 'traditional', name: 'Cưới truyền thống Việt Nam', slug: 'traditional', count: 456 },
        { id: 'modern', name: 'Cưới hiện đại phong cách Âu', slug: 'modern', count: 321 },
        { id: 'outdoor', name: 'Cưới ngoại cảnh biển đảo', slug: 'outdoor', count: 289 },
        { id: 'prewedding', name: 'Ảnh cưới concept nghệ thuật', slug: 'prewedding', count: 181 },
        { id: 'vintage', name: 'Phong cách vintage retro', slug: 'vintage', count: 156 },
        { id: 'minimalist', name: 'Tối giản hiện đại', slug: 'minimalist', count: 134 }
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
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop',
          title: 'Cặp đôi hạnh phúc',
          prompt: 'Happy wedding couple, traditional Vietnamese ao dai, golden hour lighting, romantic garden setting',
          user: { handle: 'vn_wedding', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=vn_wedding' },
          likes: 189,
          views: 890
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
        { id: 'realistic', name: 'Anime realistic', slug: 'realistic', count: 363 },
        { id: 'mecha', name: 'Mecha & Robot', slug: 'mecha', count: 245 },
        { id: 'fantasy', name: 'Fantasy anime', slug: 'fantasy', count: 189 }
      ],
      images: [
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
          title: 'Nữ ninja anime',
          prompt: 'Anime girl ninja, purple hair, traditional Japanese clothing, cherry blossom background, detailed art style',
          user: { handle: 'anime_master', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=anime_master' },
          likes: 567,
          views: 2340
        }
      ]
    },
    {
      id: 'food',
      name: 'Ẩm thực',
      slug: 'food',
      icon: '🍜',
      count: 2341,
      description: 'Món ăn Việt Nam và quốc tế đầy hấp dẫn',
      color: 'yellow',
      gradient: 'from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900 dark:to-orange-900',
      subcategories: [
        { id: 'vietnamese', name: 'Món Việt truyền thống', slug: 'vietnamese', count: 892 },
        { id: 'street-food', name: 'Ẩm thực đường phố', slug: 'street-food', count: 567 },
        { id: 'dessert', name: 'Tráng miệng & bánh kẹo', slug: 'dessert', count: 445 },
        { id: 'international', name: 'Món quốc tế', slug: 'international', count: 334 },
        { id: 'drinks', name: 'Đồ uống & cocktail', slug: 'drinks', count: 103 }
      ],
      images: [
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
          title: 'Phở Việt Nam truyền thống',
          prompt: 'Traditional Vietnamese pho, steaming hot broth, fresh herbs, wooden table, authentic restaurant setting',
          user: { handle: 'food_lover', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=food_lover' },
          likes: 334,
          views: 1567
        }
      ]
    },
    {
      id: 'travel',
      name: 'Du lịch',
      slug: 'travel',
      icon: '✈️',
      count: 1876,
      description: 'Khám phá những điểm đến tuyệt vời khắp Việt Nam và thế giới',
      color: 'cyan',
      gradient: 'from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900 dark:to-blue-900',
      subcategories: [
        { id: 'vietnam', name: 'Du lịch Việt Nam', slug: 'vietnam', count: 678 },
        { id: 'asia', name: 'Châu Á', slug: 'asia', count: 456 },
        { id: 'europe', name: 'Châu Âu', slug: 'europe', count: 334 },
        { id: 'beach', name: 'Biển đảo', slug: 'beach', count: 289 },
        { id: 'city', name: 'Thành phố', slug: 'city', count: 119 }
      ],
      images: [
        {
          id: '5',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          title: 'Vịnh Hạ Long tuyệt đẹp',
          prompt: 'Ha Long Bay Vietnam, limestone karsts, emerald water, traditional junk boat, golden sunset',
          user: { handle: 'travel_vn', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=travel_vn' },
          likes: 789,
          views: 3456
        }
      ]
    },
    {
      id: 'technology',
      name: 'Công nghệ',
      slug: 'technology',
      icon: '💻',
      count: 1234,
      description: 'Thiết bị công nghệ, AI và tương lai số',
      color: 'blue',
      gradient: 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900',
      subcategories: [
        { id: 'ai-robot', name: 'AI & Robot', slug: 'ai-robot', count: 445 },
        { id: 'gadgets', name: 'Thiết bị điện tử', slug: 'gadgets', count: 334 },
        { id: 'futuristic', name: 'Tương lai khoa học', slug: 'futuristic', count: 289 },
        { id: 'coding', name: 'Lập trình & Code', slug: 'coding', count: 166 }
      ],
      images: [
        {
          id: '6',
          url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
          title: 'Robot AI tương lai',
          prompt: 'Futuristic AI robot, glowing blue eyes, metallic surface, high-tech laboratory, cyberpunk aesthetic',
          user: { handle: 'tech_guru', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=tech_guru' },
          likes: 456,
          views: 2134
        }
      ]
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
      gradient: 'from-blue-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-sky-900',
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
      gradient: 'from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900',
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
      gradient: 'from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900 dark:to-rose-900',
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
      gradient: 'from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900',
      subcategories: [
        { id: 'modern', name: 'Kiến trúc hiện đại', slug: 'modern', count: 234 },
        { id: 'traditional', name: 'Kiến trúc cổ điển', slug: 'traditional', count: 167 },
        { id: 'interior', name: 'Nội thất', slug: 'interior', count: 145 },
        { id: 'exterior', name: 'Ngoại thất', slug: 'exterior', count: 108 }
      ],
      images: []
    },
    {
      id: 'nature',
      name: 'Thiên nhiên',
      slug: 'nature',
      icon: '🌿',
      count: 1567,
      description: 'Vẻ đẹp hoang dã của thiên nhiên và động vật',
      color: 'green',
      gradient: 'from-green-50 via-lime-50 to-emerald-50 dark:from-gray-900 dark:via-green-900 dark:to-lime-900',
      subcategories: [
        { id: 'wildlife', name: 'Động vật hoang dã', slug: 'wildlife', count: 567 },
        { id: 'plants', name: 'Thực vật & hoa lá', slug: 'plants', count: 445 },
        { id: 'weather', name: 'Thời tiết & khí hậu', slug: 'weather', count: 334 },
        { id: 'seasons', name: 'Bốn mùa', slug: 'seasons', count: 221 }
      ],
      images: []
    },
    {
      id: 'sports',
      name: 'Thể thao',
      slug: 'sports',
      icon: '⚽',
      count: 987,
      description: 'Các môn thể thao và hoạt động thể chất',
      color: 'red',
      gradient: 'from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900',
      subcategories: [
        { id: 'football', name: 'Bóng đá', slug: 'football', count: 334 },
        { id: 'basketball', name: 'Bóng rổ', slug: 'basketball', count: 234 },
        { id: 'fitness', name: 'Gym & Fitness', slug: 'fitness', count: 189 },
        { id: 'extreme', name: 'Thể thao mạo hiểm', slug: 'extreme', count: 156 },
        { id: 'traditional', name: 'Võ thuật truyền thống', slug: 'traditional', count: 74 }
      ],
      images: []
    },
    {
      id: 'business',
      name: 'Kinh doanh',
      slug: 'business',
      icon: '💼',
      count: 756,
      description: 'Thế giới doanh nghiệp và khởi nghiệp',
      color: 'slate',
      gradient: 'from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900',
      subcategories: [
        { id: 'startup', name: 'Khởi nghiệp', slug: 'startup', count: 234 },
        { id: 'office', name: 'Văn phòng làm việc', slug: 'office', count: 189 },
        { id: 'meeting', name: 'Họp & thuyết trình', slug: 'meeting', count: 167 },
        { id: 'finance', name: 'Tài chính & đầu tư', slug: 'finance', count: 166 }
      ],
      images: []
    },
    {
      id: 'education',
      name: 'Giáo dục',
      slug: 'education',
      icon: '📚',
      count: 645,
      description: 'Học tập và phát triển bản thân',
      color: 'emerald',
      gradient: 'from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900',
      subcategories: [
        { id: 'school', name: 'Trường học', slug: 'school', count: 234 },
        { id: 'university', name: 'Đại học', slug: 'university', count: 189 },
        { id: 'online', name: 'Học trực tuyến', slug: 'online', count: 134 },
        { id: 'books', name: 'Sách & tài liệu', slug: 'books', count: 88 }
      ],
      images: []
    },
    {
      id: 'health',
      name: 'Sức khỏe',
      slug: 'health',
      icon: '🏥',
      count: 534,
      description: 'Chăm sóc sức khỏe và y tế',
      color: 'teal',
      gradient: 'from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900 dark:to-cyan-900',
      subcategories: [
        { id: 'medical', name: 'Y tế & bệnh viện', slug: 'medical', count: 189 },
        { id: 'wellness', name: 'Chăm sóc sức khỏe', slug: 'wellness', count: 156 },
        { id: 'mental', name: 'Sức khỏe tinh thần', slug: 'mental', count: 134 },
        { id: 'nutrition', name: 'Dinh dưỡng', slug: 'nutrition', count: 55 }
      ],
      images: []
    }
  ];

  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
    });
  }

  return {
    success: true,
    data: category
  };
});