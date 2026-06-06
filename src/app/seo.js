export const SITE_URL = 'https://tenoutoften.com';
export const SITE_NAME = 'Ten Out Of Ten';
export const DEFAULT_TITLE = 'Ten Out Of Ten | Cinema Podcast & Independent Films';
export const DEFAULT_DESCRIPTION = 'Ten Out Of Ten is a cinema podcast and independent film platform for conversations, short films, and independent cinema. Covering Telugu cinema, world cinema, and independent films.';
export const DEFAULT_SOCIAL_DESCRIPTION = 'A cinema podcast and independent film platform spotlighting conversations, short films, and independent cinema.';
export const DEFAULT_OG_IMAGE = '/assets/FridayEver.jpg';

export const SEO_KEYWORDS = [
  'cinema podcast',
  'Telugu cinema',
  'independent films',
  'film reviews',
  'short films',
  'Ten Out Of Ten',
];

export function createPageMetadata({
  title,
  absoluteTitle,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
}) {
  const resolvedTitle = absoluteTitle || `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: path,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt || resolvedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}
