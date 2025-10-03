export default defineEventHandler(async (event) => {
  // Mock categories data - in real app this would come from database
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
    }
  ];

  return {
    success: true,
    data: categories,
    total: categories.length
  };
});
