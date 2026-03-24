export type Video = {
  id: string;
  title: string;
  ytId: string;
  category: string;
  views: number;
  desc: string;
  tags: string[];
  thumbnail: string;
  date: string;
};

export const videos: Video[] = [
  {
    id: '1',
    title: 'Delhi Street Food Vlog - Must Try Foods!',
    ytId: 'dQw4w9WgXcQ',
    category: 'Travel',
    views: 45000,
    desc: 'Exploring the best street food in Delhi! From chole bhature to jalebi.',
    tags: ['streetfood', 'delhi', 'food'],
    thumbnail: '/assets/images/thumb1.jpg',
    date: '2024-10-01'
  },
  {
    id: '2',
    title: 'Street Food Delhi Nightlife Tour',
    ytId: 'kJQP7kiw5Fk',
    category: 'Travel',
    views: 32000,
    desc: 'Night market adventure in Delhi with amazing food stalls.',
    tags: ['nightlife', 'delhi', 'food'],
    thumbnail: '/assets/images/thumb2.jpg',
    date: '2024-09-28'
  },
  {
    id: '3',
    title: 'Latest iPhone 16 Review - Worth Buying?',
    ytId: 'pQR8mH2nK1s',
    category: 'Tech',
    views: 28000,
    desc: 'Full hands-on review of new iPhone features and performance.',
    tags: ['iphone', 'review', 'tech'],
    thumbnail: '/assets/images/thumb3.jpg',
    date: '2024-10-05'
  },
  {
    id: '4',
    title: 'Laptop Buying Guide 2024 - Budget to Premium',
    ytId: 'mYfPx8Kq2Lw',
    category: 'Tech',
    views: 21000,
    desc: 'Best laptops under 50k, 1 lakh and premium options.',
    tags: ['laptop', 'buyingguide', 'tech'],
    thumbnail: '/assets/images/thumb4.jpg',
    date: '2024-09-30'
  },
  {
    id: '5',
    title: '7 Day Minimalist Morning Routine',
    ytId: 'nPqR9jL3oM',
    category: 'Lifestyle',
    views: 18000,
    desc: 'Transform your day with this simple routine.',
    tags: ['morning', 'routine', 'minimalist'],
    thumbnail: '/assets/images/thumb5.jpg',
    date: '2024-10-03'
  },
  {
    id: '6',
    title: 'Delhi Nightlife Vlog - Hidden Gems',
    ytId: 'qS2tU4vN6p',
    category: 'Travel',
    views: 15000,
    desc: 'Secret spots for nightlife in Delhi you must visit.',
    tags: ['nightlife', 'delhi', 'travel'],
    thumbnail: '/assets/images/thumb6.jpg',
    date: '2024-09-25'
  },
  {
    id: '7',
    title: 'Productivity Apps I Use Daily',
    ytId: 'rT3uV5wO7q',
    category: 'Lifestyle',
    views: 12000,
    desc: 'Top 5 apps that changed my productivity.',
    tags: ['productivity', 'apps', 'lifestyle'],
    thumbnail: '/assets/images/thumb7.jpg',
    date: '2024-10-02'
  },
  {
    id: '8',
    title: 'Budget Gaming PC Build Under 50k',
    ytId: 'sU4vW6xP8r',
    category: 'Tech',
    views: 11000,
    desc: 'Complete guide to build powerful gaming rig on budget.',
    tags: ['gaming', 'pcbuild', 'budget'],
    thumbnail: '/assets/images/thumb8.jpg',
    date: '2024-09-29'
  },
  {
    id: '9',
    title: 'Healthy Breakfast Recipes - 5 Minutes',
    ytId: 'tV5wX7yQ9s',
    category: 'Lifestyle',
    views: 9000,
    desc: 'Quick and nutritious breakfast ideas for busy days.',
    tags: ['healthy', 'breakfast', 'recipes'],
    thumbnail: '/assets/images/thumb9.jpg',
    date: '2024-10-04'
  },
  {
    id: '10',
    title: 'Mumbai Local Train Vlog - Real Life',
    ytId: 'uW6xY8zR0t',
    category: 'Travel',
    views: 8000,
    desc: 'Experience the famous Mumbai locals like a local.',
    tags: ['mumbai', 'train', 'vlog'],
    thumbnail: '/assets/images/thumb10.jpg',
    date: '2024-09-27'
  },
  {
    id: '11',
    title: 'AirPods Pro 2 Review - Noise Cancellation Test',
    ytId: 'vX7yZ9aS1u',
    category: 'Tech',
    views: 7500,
    desc: 'In-depth test of best wireless earbuds.',
    tags: ['airpods', 'review', 'audio'],
    thumbnail: '/assets/images/thumb11.jpg',
    date: '2024-10-06'
  },
  {
    id: '12',
    title: 'Wardrobe Essentials for Men - Capsule Wardrobe',
    ytId: 'wY8zA0bT2v',
    category: 'Lifestyle',
    views: 6000,
    desc: '10 items every man should own.',
    tags: ['fashion', 'men', 'wardrobe'],
    thumbnail: '/assets/images/thumb12.jpg',
    date: '2024-09-26'
  }
];

export const categories = [
  { name: 'Travel', slug: 'travel' },
  { name: 'Tech', slug: 'tech' },
  { name: 'Lifestyle', slug: 'lifestyle' }
];

export function getLatestVideos(count = 6) {
  return [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
}

export function getTrendingVideos(count = 6) {
  return [...videos].sort((a, b) => b.views - a.views).slice(0, count);
}

export function getVideosByCategory(slug: string) {
  return videos.filter(v => v.category.toLowerCase() === slug.toLowerCase());
}

export function getRelatedVideos(category: string, excludeId: string, count = 4) {
  return videos
    .filter(v => v.category.toLowerCase() === category.toLowerCase() && v.id !== excludeId)
    .sort((a, b) => b.views - a.views)
    .slice(0, count);
}

export function getVideoById(id: string) {
  return videos.find(v => v.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug);
}
