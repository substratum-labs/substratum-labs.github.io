import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import styles from './internal.module.css';

export default function About(): React.JSX.Element {
  return (
    <Layout noFooter>
      <Head>
        <title>About | Substratum Labs</title>
        <meta
          name="description"
          content="Substratum Labs builds intelligent infrastructure for space operations, starting with satellite fleet safety."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.page}>
        <div className={styles.shell}>
          <section className={`${styles.hero} ${styles.simpleHero}`}>
            <div>
              <span className={styles.eyebrow}>About Substratum Labs</span>
              <h1>Intelligent infrastructure for space operations.</h1>
              <p className={styles.lede}>
                Substratum Labs builds intelligent infrastructure for space operations. Starting with satellite
                fleet safety, we develop operator-reviewed AI systems for risk triage, maneuver planning, and
                auditable safety gates. Over time, we aim to support the transition from human-supervised
                workflows to trusted autonomous mission operations.
              </p>
            </div>
          </section>

          <div className={styles.footer}>© 2026 Substratum Labs. All systems nominal.</div>
        </div>
      </main>
    </Layout>
  );
}
