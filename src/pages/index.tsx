import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import styles from './index.module.css';

export default function Home(): React.JSX.Element {
  return (
    <HtmlClassNameProvider className="homepage-page">
      <Layout>
      <Head>
        <title>Substratum Labs</title>
        <meta name="description" content="The Infrastructure Beneath Intelligence" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.page}>
        {/* Background layers */}
        <div className={styles.milkyWay} />
        <div className={styles.gridBackground} />
        <div className={styles.stars} />

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="/" className={styles.logoContainer}>
            <svg className={styles.logoSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <g transform="translate(50, 50) scale(0.75)">
                <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
                <g fill="none" stroke="currentColor" strokeWidth="4">
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(45)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(90)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(135)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(180)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(225)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(270)" />
                  <path d="M 0 -18 Q 16 -18 28.3 -28.3" transform="rotate(315)" />
                </g>
              </g>
            </svg>
            <span className={styles.logoText}>Substratum Labs</span>
          </a>
          <a href="/blog" className={styles.navLink}>Blog</a>
        </nav>

        {/* Hero */}
        <header className={styles.hero}>
          <svg className={styles.orbitalGraphic} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(500, 500) rotate(-25)">
              <line x1="-400" y1="0" x2="400" y2="0" stroke="rgba(30, 58, 110, 0.5)" strokeWidth="1" />
              <line x1="0" y1="-400" x2="0" y2="400" stroke="rgba(30, 58, 110, 0.5)" strokeWidth="1" />
              <ellipse cx="0" cy="0" rx="350" ry="160" fill="none" stroke="var(--parchment-white)" strokeOpacity="0.15" strokeWidth="1" />
              <ellipse cx="0" cy="0" rx="250" ry="110" fill="none" stroke="var(--parchment-white)" strokeOpacity="0.3" strokeWidth="1" />
              <ellipse cx="0" cy="0" rx="150" ry="60" fill="none" stroke="var(--parchment-white)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="-280" cy="-95" r="5" fill="var(--amber-transit)" />
              <circle cx="280" cy="95" r="3" fill="var(--amber-transit)" />
              <circle cx="150" cy="-88" r="6" fill="var(--amber-transit)" />
              <circle cx="-180" cy="76" r="4" fill="var(--amber-transit)" />
              <circle cx="-50" cy="-56" r="4" fill="var(--amber-transit)" />
              <circle cx="0" cy="0" r="3" fill="var(--parchment-white)" opacity="0.8" />
            </g>
          </svg>

          <h1 className={styles.heroTitle}>
            The Infrastructure<br />Beneath Intelligence
          </h1>
          <a href="#mission" className={styles.btn}>Explore Mission</a>
        </header>

        {/* Projects */}
        <section id="mission" className={styles.projectsSection}>
          <h2 className={styles.sectionTitle}>Our Primitives</h2>
          <div className={styles.projectsGrid}>
            {/* Castor */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <a href="https://github.com/substratum-labs/castor" target="_blank" rel="noopener noreferrer">
                  <h2>Castor</h2>
                </a>
                <span className={styles.badge}>Kernel</span>
              </div>
              <p className={styles.projectDesc}>
                An OS kernel for AI agents. Process model, memory management, journaling, fork, scheduling, and resource accounting as kernel primitives. Any agent framework runs on top — LangChain, CrewAI, AutoGen, or your own.
              </p>
              <a
                href="https://substratum-labs.github.io/castor-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btn}
                style={{marginTop: '1.5rem'}}
              >
                View Docs
              </a>
            </div>

            {/* Castor Server */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <a href="https://github.com/substratum-labs/castor-server" target="_blank" rel="noopener noreferrer">
                  <h2>Castor Server</h2>
                </a>
                <span className={styles.badge}>Agent Platform</span>
              </div>
              <p className={styles.projectDesc}>
                Self-hosted agent deployment platform, built on Castor. Native HTTP/SSE API with fork, deterministic replay, and budget control. Adapter layers for Anthropic Managed Agents and OpenAI SDKs — bring your existing client code, run on your infrastructure with any model.
              </p>
            </div>

            {/* Roche */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <a href="https://github.com/substratum-labs/roche" target="_blank" rel="noopener noreferrer">
                  <h2>Roche</h2>
                </a>
                <span className={styles.badge}>Sandbox</span>
              </div>
              <p className={styles.projectDesc}>
                Capability-scoped sandbox orchestrator for AI agent execution. One unified abstraction over Docker, Firecracker, and WebAssembly. The grant defines what the agent can do — the runtime enforces it.
              </p>
              <a
                href="https://substratum-labs.github.io/roche-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btn}
                style={{marginTop: '1.5rem'}}
              >
                View Docs
              </a>
            </div>
          </div>
        </section>

      </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
