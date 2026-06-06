import BlogCard from '../../components/BlogCard';
import { BLOGS } from '../../components/data';
import styles from './BlogPage.module.css';

export const metadata = {
  title: 'Blog | Ten Out Of Ten',
  description: 'Read essays, festival notes, and cinema writing from the Ten Out Of Ten team.',
};

export default function BlogIndexPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.kicker}>Writing</p>
        <h1>Blog</h1>
      </div>

      <div className={styles.grid}>
        {BLOGS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
