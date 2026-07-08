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

const openSourceProjects = [
  {
    name: 'Castor',
    label: 'Accountable Agent Runtime',
    description:
      'An accountable runtime for AI agents, with checkpoint and replay, human approval, capability controls, and resource budgets.',
    href: 'https://github.com/substratum-labs/castor',
  },
  {
    name: 'Roche',
    label: 'Sandbox Orchestration',
    description:
      'A universal sandbox orchestrator for isolated agent execution, lifecycle management, and consistent control across backends.',
    href: 'https://github.com/substratum-labs/roche',
  },
];

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
  const {permalink, title, date, tags, description, readingTime} = metadata;
  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));

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
          <h1 className={styles.title}>{metadata.blogTitle}</h1>
          <p className={styles.subtitle}>{metadata.blogDescription}</p>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <BlogCard key={item.content.metadata.permalink} item={item} />
          ))}
        </div>
        <BlogListPaginator metadata={metadata} />
        {metadata.page === 1 && (
          <section className={styles.openSourceSection} aria-labelledby="open-source-title">
            <div className={styles.openSourceHeader}>
              <h2 id="open-source-title">Open Source Infrastructure</h2>
              <p>
                General-purpose systems that support accountable, isolated agent execution.
              </p>
            </div>
            <div className={styles.projectGrid}>
              {openSourceProjects.map((project) => (
                <article className={styles.projectCard} key={project.name}>
                  <span className={styles.projectLabel}>{project.label}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a
                    className={styles.projectLink}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer">
                    View on GitHub &rarr;
                  </a>
                </article>
              ))}
            </div>
            <a
              className={styles.allProjectsLink}
              href="https://github.com/substratum-labs"
              target="_blank"
              rel="noopener noreferrer">
              Explore all projects on GitHub &rarr;
            </a>
          </section>
        )}
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
