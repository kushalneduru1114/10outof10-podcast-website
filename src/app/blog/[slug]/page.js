import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import TransitionLink from '../../../components/TransitionLink';
import { BLOGS } from '../../../components/data';
import { createPageMetadata } from '../../seo';
import styles from './BlogPost.module.css';

function getBlog(slug) {
  return BLOGS.find((blog) => blog.slug === slug);
}

function isSectionHeading(contentBlock) {
  return contentBlock.length <= 90 && !/[.!?]$/.test(contentBlock);
}

export function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }) {
  const blog = getBlog(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested Ten Out Of Ten blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: blog.title,
    description: blog.metaDescription || blog.description,
    path: `/blog/${blog.slug}`,
    image: blog.image,
    imageAlt: `${blog.title} cover image`,
    type: 'article',
  });
}

export default function BlogPost({ params }) {
  const blog = getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const galleryImages = blog.gallery?.filter((src) => src !== blog.image) || [];

  return (
    <article className={styles.container}>
      <TransitionLink href="/blog" className={styles.backButton} aria-label="Go back to blog index">
        <FaArrowLeft aria-hidden="true" />
        Back to Blog
      </TransitionLink>

      <header className={styles.header}>
        {blog.subtitle && <p className={styles.subtitle}>{blog.subtitle}</p>}
        <h1>{blog.title}</h1>
        <p className={styles.date}>{blog.date}</p>
        <p className={styles.description}>{blog.description}</p>
      </header>

      {blog.image && (
        <div className={styles.heroImage}>
          <Image
            src={blog.image}
            alt={`${blog.title} cover image`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 960px"
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.contentBox}>
        {blog.content.map((contentBlock, index) => (
          isSectionHeading(contentBlock) ? (
            <h2 key={index}>{contentBlock}</h2>
          ) : (
            <p key={index}>{contentBlock}</p>
          )
        ))}
      </div>

      {galleryImages.length > 0 && (
        <section className={styles.gallery} aria-labelledby="gallery-title">
          <h2 id="gallery-title">TIFF 2025 Gallery</h2>
          <div className={styles.galleryGrid}>
            {galleryImages.map((src, index) => (
              <div key={src} className={styles.galleryFrame}>
                <Image
                  src={src}
                  alt={`TIFF 2025 trip photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
