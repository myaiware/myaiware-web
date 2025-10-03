// Mock API endpoint for development
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Mock data generator
  const generateMockImages = (count: number, offset: number = 0) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `img-${offset + i}`,
      cloudinary_public_id: `sample-${offset + i}`,
      width: 512 + Math.floor(Math.random() * 512),
      height: 512 + Math.floor(Math.random() * 512),
      prompt: {
        id: `prompt-${offset + i}`,
        title: `Amazing AI Art ${offset + i + 1}`,
        body: 'A stunning digital artwork created with AI, featuring vibrant colors and intricate details that showcase the power of artificial intelligence in creative expression.',
        tags: ['digital-art', 'ai-generated', 'colorful'],
        category: ['portrait', 'landscape', 'abstract', 'anime', 'photography', 'digital_art'][Math.floor(Math.random() * 6)]
      },
      user: {
        id: `user-${offset + i}`,
        handle: `artist${offset + i + 1}`,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${offset + i}`
      },
      stats: {
        likes: Math.floor(Math.random() * 1000),
        views: Math.floor(Math.random() * 5000),
        shares: Math.floor(Math.random() * 100)
      },
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }))
  }

  const limit = Math.min(parseInt(query.limit as string) || 20, 50)
  const page = parseInt(query.page as string) || 1
  const offset = (page - 1) * limit

  const images = generateMockImages(limit, offset)
  
  return {
    images,
    next_cursor: (offset + limit).toString(),
    has_more: true
  }
})
