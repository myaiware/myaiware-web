export default defineEventHandler(async (event) => {
  // Mock categories data with extensive fake data - in real app this would come from database
  const categories = [
    {
      id: 'wedding',
      name: 'Ảnh cưới Studio',
      slug: 'wedding',
      icon: '💒',
      count: 1247,
      description: 'Ảnh cưới chuyên nghiệp với studio lighting, trang phục đẹp và không gian lãng mạn',
      color: 'pink',
      subcategories: [
        { id: 'traditional', name: 'Cưới truyền thống', slug: 'traditional', count: 456 },
        { id: 'modern', name: 'Cưới hiện đại', slug: 'modern', count: 321 },
        { id: 'outdoor', name: 'Cưới ngoại cảnh', slug: 'outdoor', count: 289 },
        { id: 'prewedding', name: 'Ảnh cưới concept', slug: 'prewedding', count: 181 }
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
      subcategories: [
        { id: 'character', name: 'Nhân vật anime', slug: 'character', count: 892 },
        { id: 'scenery', name: 'Phong cảnh anime', slug: 'scenery', count: 567 },
        { id: 'chibi', name: 'Chibi style', slug: 'chibi', count: 334 },
        { id: 'realistic', name: 'Anime realistic', slug: 'realistic', count: 363 }
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
      subcategories: [
        { id: 'mountain', name: 'Núi non', slug: 'mountain', count: 456 },
        { id: 'ocean', name: 'Biển cả', slug: 'ocean', count: 389 },
        { id: 'forest', name: 'Rừng cây', slug: 'forest', count: 334 },
        { id: 'sunset', name: 'Hoàng hôn', slug: 'sunset', count: 655 }
      ]
    },
    {
      id: 'portrait',
      name: 'Ảnh thẻ',
      slug: 'portrait',
      icon: '📸',
      count: 987,
      description: 'Chân dung chuyên nghiệp và ảnh thẻ cho mọi mục đích sử dụng',
      color: 'blue',
      subcategories: [
        { id: 'professional', name: 'Ảnh thẻ công sở', slug: 'professional', count: 445 },
        { id: 'student', name: 'Ảnh thẻ học sinh', slug: 'student', count: 234 },
        { id: 'passport', name: 'Ảnh hộ chiếu', slug: 'passport', count: 189 },
        { id: 'visa', name: 'Ảnh visa', slug: 'visa', count: 119 }
      ]
    },
    {
      id: 'festival',
      name: 'Lễ hội Trung thu',
      slug: 'festival',
      icon: '🏮',
      count: 543,
      description: 'Không khí lễ hội truyền thống Việt Nam đầy màu sắc',
      color: 'orange',
      subcategories: [
        { id: 'lantern', name: 'Đèn lồng', slug: 'lantern', count: 234 },
        { id: 'mooncake', name: 'Bánh trung thu', slug: 'mooncake', count: 156 },
        { id: 'children', name: 'Trẻ em rước đèn', slug: 'children', count: 98 },
        { id: 'decoration', name: 'Trang trí lễ hội', slug: 'decoration', count: 55 }
      ]
    },
    {
      id: 'art',
      name: 'Nghệ thuật số',
      slug: 'art',
      icon: '🎨',
      count: 1678,
      description: 'Tác phẩm nghệ thuật và abstract art sáng tạo',
      color: 'indigo',
      subcategories: [
        { id: 'abstract', name: 'Trừu tượng', slug: 'abstract', count: 567 },
        { id: 'digital', name: 'Nghệ thuật số', slug: 'digital', count: 445 },
        { id: 'concept', name: 'Concept art', slug: 'concept', count: 334 },
        { id: 'illustration', name: 'Minh họa', slug: 'illustration', count: 332 }
      ]
    },
    {
      id: 'fashion',
      name: 'Thời trang',
      slug: 'fashion',
      icon: '👗',
      count: 892,
      description: 'Xu hướng thời trang và street style hiện đại',
      color: 'pink',
      subcategories: [
        { id: 'streetwear', name: 'Street style', slug: 'streetwear', count: 234 },
        { id: 'formal', name: 'Trang phục công sở', slug: 'formal', count: 189 },
        { id: 'casual', name: 'Thời trang thường ngày', slug: 'casual', count: 267 },
        { id: 'haute-couture', name: 'Haute couture', slug: 'haute-couture', count: 202 }
      ]
    },
    {
      id: 'architecture',
      name: 'Kiến trúc',
      slug: 'architecture',
      icon: '🏛️',
      count: 654,
      description: 'Công trình kiến trúc và nội thất đẹp mắt',
      color: 'gray',
      subcategories: [
        { id: 'modern', name: 'Kiến trúc hiện đại', slug: 'modern', count: 234 },
        { id: 'traditional', name: 'Kiến trúc cổ điển', slug: 'traditional', count: 167 },
        { id: 'interior', name: 'Nội thất', slug: 'interior', count: 145 },
        { id: 'exterior', name: 'Ngoại thất', slug: 'exterior', count: 108 }
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
      subcategories: [
        { id: 'vietnamese', name: 'Món Việt truyền thống', slug: 'vietnamese', count: 892 },
        { id: 'street-food', name: 'Ẩm thực đường phố', slug: 'street-food', count: 567 },
        { id: 'dessert', name: 'Tráng miệng & bánh kẹo', slug: 'dessert', count: 445 },
        { id: 'international', name: 'Món quốc tế', slug: 'international', count: 334 },
        { id: 'drinks', name: 'Đồ uống & cocktail', slug: 'drinks', count: 103 }
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
      subcategories: [
        { id: 'vietnam', name: 'Du lịch Việt Nam', slug: 'vietnam', count: 678 },
        { id: 'asia', name: 'Châu Á', slug: 'asia', count: 456 },
        { id: 'europe', name: 'Châu Âu', slug: 'europe', count: 334 },
        { id: 'beach', name: 'Biển đảo', slug: 'beach', count: 289 },
        { id: 'city', name: 'Thành phố', slug: 'city', count: 119 }
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
      subcategories: [
        { id: 'ai-robot', name: 'AI & Robot', slug: 'ai-robot', count: 445 },
        { id: 'gadgets', name: 'Thiết bị điện tử', slug: 'gadgets', count: 334 },
        { id: 'futuristic', name: 'Tương lai khoa học', slug: 'futuristic', count: 289 },
        { id: 'coding', name: 'Lập trình & Code', slug: 'coding', count: 166 }
      ]
    },
    {
      id: 'nature',
      name: 'Thiên nhiên',
      slug: 'nature',
      icon: '🌿',
      count: 1567,
      description: 'Vẻ đẹp hoang dã của thiên nhiên và động vật',
      color: 'green',
      subcategories: [
        { id: 'wildlife', name: 'Động vật hoang dã', slug: 'wildlife', count: 567 },
        { id: 'plants', name: 'Thực vật & hoa lá', slug: 'plants', count: 445 },
        { id: 'weather', name: 'Thời tiết & khí hậu', slug: 'weather', count: 334 },
        { id: 'seasons', name: 'Bốn mùa', slug: 'seasons', count: 221 }
      ]
    },
    {
      id: 'sports',
      name: 'Thể thao',
      slug: 'sports',
      icon: '⚽',
      count: 987,
      description: 'Các môn thể thao và hoạt động thể chất',
      color: 'red',
      subcategories: [
        { id: 'football', name: 'Bóng đá', slug: 'football', count: 334 },
        { id: 'basketball', name: 'Bóng rổ', slug: 'basketball', count: 234 },
        { id: 'fitness', name: 'Gym & Fitness', slug: 'fitness', count: 189 },
        { id: 'extreme', name: 'Thể thao mạo hiểm', slug: 'extreme', count: 156 },
        { id: 'traditional', name: 'Võ thuật truyền thống', slug: 'traditional', count: 74 }
      ]
    },
    {
      id: 'business',
      name: 'Kinh doanh',
      slug: 'business',
      icon: '💼',
      count: 756,
      description: 'Thế giới doanh nghiệp và khởi nghiệp',
      color: 'slate',
      subcategories: [
        { id: 'startup', name: 'Khởi nghiệp', slug: 'startup', count: 234 },
        { id: 'office', name: 'Văn phòng làm việc', slug: 'office', count: 189 },
        { id: 'meeting', name: 'Họp & thuyết trình', slug: 'meeting', count: 167 },
        { id: 'finance', name: 'Tài chính & đầu tư', slug: 'finance', count: 166 }
      ]
    },
    {
      id: 'education',
      name: 'Giáo dục',
      slug: 'education',
      icon: '📚',
      count: 645,
      description: 'Học tập và phát triển bản thân',
      color: 'emerald',
      subcategories: [
        { id: 'school', name: 'Trường học', slug: 'school', count: 234 },
        { id: 'university', name: 'Đại học', slug: 'university', count: 189 },
        { id: 'online', name: 'Học trực tuyến', slug: 'online', count: 134 },
        { id: 'books', name: 'Sách & tài liệu', slug: 'books', count: 88 }
      ]
    },
    {
      id: 'health',
      name: 'Sức khỏe',
      slug: 'health',
      icon: '🏥',
      count: 534,
      description: 'Chăm sóc sức khỏe và y tế',
      color: 'teal',
      subcategories: [
        { id: 'medical', name: 'Y tế & bệnh viện', slug: 'medical', count: 189 },
        { id: 'wellness', name: 'Chăm sóc sức khỏe', slug: 'wellness', count: 156 },
        { id: 'mental', name: 'Sức khỏe tinh thần', slug: 'mental', count: 134 },
        { id: 'nutrition', name: 'Dinh dưỡng', slug: 'nutrition', count: 55 }
      ]
    }
  ];

  return {
    success: true,
    data: categories,
    total: categories.length
  };
});
