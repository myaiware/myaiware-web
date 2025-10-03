// Mock API endpoint for user profiles
export default defineEventHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')
  
  if (!handle) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Handle is required'
    })
  }

  // Mock user data
  const mockUser = {
    id: `user-${handle}`,
    handle: handle,
    bio: `I'm ${handle}, an AI art enthusiast creating stunning digital artwork. Follow me for daily inspiration and creative prompts!`,
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${handle}`,
    social_links: {
      twitter: `https://twitter.com/${handle}`,
      instagram: `https://instagram.com/${handle}`,
      website: `https://${handle}.art`
    },
    stats: {
      total_images: Math.floor(Math.random() * 500) + 50,
      total_prompts: Math.floor(Math.random() * 300) + 30,
      total_likes: Math.floor(Math.random() * 5000) + 500,
      total_views: Math.floor(Math.random() * 50000) + 5000,
      followers_count: Math.floor(Math.random() * 1000) + 100,
      following_count: Math.floor(Math.random() * 500) + 50
    },
    is_following: Math.random() > 0.5,
    created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }

  return mockUser
})
