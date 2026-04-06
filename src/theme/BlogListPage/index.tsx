import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import styles from './styles.module.css';

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogCard({item}: {item: Props['items'][number]}): ReactNode {
  const {content: BlogPostContent} = item;
  const {metadata} = BlogPostContent;
  const {permalink, title, date, formattedDate, tags, description, readingTime} = metadata;

  return (
    <Link to={permalink} className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardMeta}>
          <time dateTime={date}>{formattedDate}</time>
          {readingTime && (
            <span className={styles.readingTime}>
              {Math.ceil(readingTime)} min read
            </span>
          )}
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
        {tags.length > 0 && (
          <div className={styles.cardTags}>
            {tags.map((tag) => (
              <span key={tag.permalink} className={styles.tag}>
                {tag.label}
              </span>
            ))}
          </div>
        )}
        <span className={styles.readMore}>Read more &rarr;</span>
      </div>
    </Link>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items} = props;
  return (
    <Layout>
      <div className={styles.blogListPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Technical deep-dives from the Substratum Labs team
          </p>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <BlogCard key={item.content.metadata.permalink} item={item} />
          ))}
        </div>
        <BlogListPaginator metadata={metadata} />
      </div>
    </Layout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
