'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './BlogCard.module.css';
import TransitionLink from './TransitionLink';

export default function BlogCard({ blog }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TransitionLink
      href={`/blog/${blog.slug}`}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {blog.image && (
        <div className={styles.imageFrame}>
          <Image
            src={blog.image}
            alt={`${blog.title} cover image`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 360px"
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.details}>
        {blog.subtitle && <p className={styles.subtitle}>{blog.subtitle}</p>}
        <h3 className={styles.title} style={{ color: isHovered ? '#c7a7ff' : '#ffffff' }}>
          {blog.title}
        </h3>
        <p className={styles.description}>{blog.description}</p>
        <p className={styles.date}>{blog.date}</p>
        <p className={styles.description}>{blog.description}</p>
      </div>

    </TransitionLink>
  );
}
