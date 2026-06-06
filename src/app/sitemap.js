import { BLOGS } from '../components/data';
import { SITE_URL } from './seo';

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/team', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...BLOGS.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ];
}
